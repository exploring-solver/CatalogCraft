package com.ivar7284.catalogcraft

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.SurfaceTexture
import android.hardware.camera2.*
import android.os.Bundle
import android.os.Handler
import android.os.HandlerThread
import android.util.Log
import android.view.Surface
import android.view.TextureView
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.request.forms.*
import io.ktor.http.*
import io.ktor.util.InternalAPI
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.io.ByteArrayOutputStream
import java.io.File

class ModelViewActivity : AppCompatActivity() {

    private lateinit var textureView: TextureView
    private lateinit var cameraManager: CameraManager
    private lateinit var handler: Handler
    private lateinit var cameraDevice: CameraDevice
    private var captureSession: CameraCaptureSession? = null

    private val requestPermissionLauncher =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { isGranted: Boolean ->
            if (isGranted) {
                openCamera()
            } else {
                Log.e("ModelViewActivity", "Camera permission denied")
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_model_view)

        textureView = findViewById(R.id.texture_view)
        textureView.surfaceTextureListener = object : TextureView.SurfaceTextureListener {
            override fun onSurfaceTextureAvailable(surface: SurfaceTexture, width: Int, height: Int) {
                if (ContextCompat.checkSelfPermission(this@ModelViewActivity, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
                    openCamera()
                } else {
                    requestPermissionLauncher.launch(Manifest.permission.CAMERA)
                }
            }

            override fun onSurfaceTextureSizeChanged(surface: SurfaceTexture, width: Int, height: Int) {}
            override fun onSurfaceTextureDestroyed(surface: SurfaceTexture): Boolean = true
            override fun onSurfaceTextureUpdated(surface: SurfaceTexture) {}
        }

        cameraManager = getSystemService(Context.CAMERA_SERVICE) as CameraManager

        val handlerThread = HandlerThread("CameraThread")
        handlerThread.start()
        handler = Handler(handlerThread.looper)
    }

    private fun captureImageAndPredict() {
        val bitmap = textureView.bitmap
        if (bitmap != null) {
            val file = bitmapToFile(bitmap, "temp_image.png")
            bitmap.recycle() // Clean up the bitmap
            if (file != null) {
                CoroutineScope(Dispatchers.IO).launch {
                    predict(file)
                }
            }
        }
    }

    private fun bitmapToFile(bitmap: Bitmap, fileName: String): File? {
        val bytesOut = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, bytesOut)
        return try {
            val file = File(cacheDir, fileName)
            file.createNewFile()
            file.writeBytes(bytesOut.toByteArray())
            file
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    @OptIn(InternalAPI::class)
    private suspend fun predict(imageFile: File) {
        val client = HttpClient(CIO)
        try {
            val response: String = client.submitFormWithBinaryData(
                url = "http://192.168.192.7:8000/predict",
                formData = formData {
                    append("file", imageFile, Headers.build {
                        append(HttpHeaders.ContentType, "image/png")
                        append(HttpHeaders.ContentDisposition, "filename=${imageFile.name}")
                    })
                }
            ).toString()

            Log.d("Predictions", response)
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e("ModelViewActivity", "Prediction failed: ${e.localizedMessage}")
        } finally {
            client.close()
        }
    }

    private fun openCamera() {
        try {
            val cameraId = cameraManager.cameraIdList[0]
            val characteristics = cameraManager.getCameraCharacteristics(cameraId)
            val surfaceTexture = textureView.surfaceTexture
            if (surfaceTexture != null) {
                val surface = Surface(surfaceTexture)
                cameraManager.openCamera(cameraId, object : CameraDevice.StateCallback() {
                    override fun onOpened(camera: CameraDevice) {
                        cameraDevice = camera
                        val captureRequest = cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW)
                        captureRequest.addTarget(surface)
                        cameraDevice.createCaptureSession(listOf(surface), object : CameraCaptureSession.StateCallback() {
                            override fun onConfigured(session: CameraCaptureSession) {
                                captureSession = session
                                session.setRepeatingRequest(captureRequest.build(), null, handler)
                                captureImageAndPredict()
                            }

                            override fun onConfigureFailed(session: CameraCaptureSession) {
                                Log.e("ModelViewActivity", "Capture session configuration failed")
                            }
                        }, handler)
                    }

                    override fun onDisconnected(camera: CameraDevice) {
                        cameraDevice.close()
                    }

                    override fun onError(camera: CameraDevice, error: Int) {
                        cameraDevice.close()
                        Log.e("ModelViewActivity", "Camera error: $error")
                    }
                }, handler)
            } else {
                Log.e("ModelViewActivity", "SurfaceTexture is null")
            }
        } catch (e: SecurityException) {
            e.printStackTrace()
            Log.e("ModelViewActivity", "Security exception: ${e.localizedMessage}")
        } catch (e: CameraAccessException) {
            e.printStackTrace()
            Log.e("ModelViewActivity", "Camera access exception: ${e.localizedMessage}")
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        captureSession?.close()
        cameraDevice.close()
    }
}
