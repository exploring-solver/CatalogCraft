package com.ivar7284.catalogcraft

import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.*
import androidx.camera.core.resolutionselector.AspectRatioStrategy
import androidx.camera.core.resolutionselector.ResolutionSelector
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.Volley
import com.ivar7284.catalogcraft.databinding.ActivityCameraBinding
import com.ivar7284.catalogcraft.utils.VolleyMultipartRequest
import com.ivar7284.catalogcraft.utils.appSettingOpen
import com.ivar7284.catalogcraft.utils.warningPermissionDialog
import java.io.File
import java.text.SimpleDateFormat
import java.util.*
import kotlin.math.abs

class CameraActivity : AppCompatActivity() {

    val URL = "http://panel.mait.ac.in:8012/catalogue/search-similar-images/"

    private val binding: ActivityCameraBinding by lazy {
        ActivityCameraBinding.inflate(layoutInflater)
    }

    private val multiplePermissionId = 14
    private val multiplePermissionNameList = if (Build.VERSION.SDK_INT >= 33) {
        arrayListOf(
            android.Manifest.permission.CAMERA
        )
    } else {
        arrayListOf(
            android.Manifest.permission.CAMERA,
            android.Manifest.permission.WRITE_EXTERNAL_STORAGE
        )
    }

    private lateinit var imageCapture: ImageCapture
    private lateinit var cameraProvider: ProcessCameraProvider
    private lateinit var camera: Camera
    private lateinit var cameraSelector: CameraSelector
    var lensFacing = CameraSelector.LENS_FACING_BACK

    private lateinit var loadingScreen: View

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(binding.root)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        loadingScreen = findViewById(R.id.loading_screen)

        if (checkMultiplePermission()) {
            startCamera()
        }

        binding.captureIb.setOnClickListener {
            takePhoto()
        }

        binding.flipIb.setOnClickListener {
            lensFacing = if (lensFacing == CameraSelector.LENS_FACING_FRONT){
                CameraSelector.LENS_FACING_BACK
            }else CameraSelector.LENS_FACING_FRONT

            bindCameraUserCases()
        }

        binding.flashIb.setOnClickListener {
            setFlashIcon(camera)
        }

    }
    private fun checkMultiplePermission(): Boolean {
        val listPermissionNeeded = arrayListOf<String>()
        for (permission in multiplePermissionNameList) {
            if (ContextCompat.checkSelfPermission(
                    this,
                    permission
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                listPermissionNeeded.add(permission)
            }
        }
        if (listPermissionNeeded.isNotEmpty()) {
            ActivityCompat.requestPermissions(
                this,
                listPermissionNeeded.toTypedArray(),
                multiplePermissionId
            )
            return false
        }
        return true
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray,
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        if (requestCode == multiplePermissionId) {
            if (grantResults.isNotEmpty()) {
                var isGrant = true
                for (element in grantResults) {
                    if (element == PackageManager.PERMISSION_DENIED) {
                        isGrant = false
                    }
                }
                if (isGrant) {
                    // here all permission granted successfully
                    startCamera()
                } else {
                    var someDenied = false
                    for (permission in permissions) {
                        if (!ActivityCompat.shouldShowRequestPermissionRationale(
                                this,
                                permission
                            )
                        ) {
                            if (ActivityCompat.checkSelfPermission(
                                    this,
                                    permission
                                ) == PackageManager.PERMISSION_DENIED
                            ) {
                                someDenied = true
                            }
                        }
                    }
                    if (someDenied) {
                        // here app Setting open because all permission is not granted
                        // and permanent denied
                        appSettingOpen(this)
                    } else {
                        // here warning permission show
                        warningPermissionDialog(this) { _: DialogInterface, which: Int ->
                            when (which) {
                                DialogInterface.BUTTON_POSITIVE ->
                                    checkMultiplePermission()
                            }
                        }
                    }
                }
            }
        }
    }

    private fun startCamera(){
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)
        cameraProviderFuture.addListener({
            cameraProvider = cameraProviderFuture.get()
            bindCameraUserCases()
        }, ContextCompat.getMainExecutor(this))
    }

    private fun aspectRatio(width: Int, height: Int): Int {
        val previewRatio = maxOf(width, height).toDouble() / minOf(width, height)
        return if (abs(previewRatio - 4.0/3.0) <= abs(previewRatio - 16.0/9.0)){
            AspectRatio.RATIO_4_3
        } else{
            AspectRatio.RATIO_16_9
        }
    }

    private fun bindCameraUserCases() {
        val screenAspectRatio = aspectRatio(
            binding.cameraPv.width,
            binding.cameraPv.height
        )
        val rotation = binding.cameraPv.display.rotation
        val resolutionSelector = ResolutionSelector.Builder()
            .setAspectRatioStrategy(
                AspectRatioStrategy(
                    screenAspectRatio,
                    AspectRatioStrategy.FALLBACK_RULE_AUTO
                )
            ).build()
        val preview = Preview.Builder()
            .setResolutionSelector(resolutionSelector)
            .setTargetRotation(rotation)
            .build()
            .also {
                it.setSurfaceProvider(binding.cameraPv.surfaceProvider)
            }
        imageCapture = ImageCapture.Builder()
            .setCaptureMode(ImageCapture.CAPTURE_MODE_MAXIMIZE_QUALITY)
            .setResolutionSelector(resolutionSelector)
            .setTargetRotation(rotation)
            .build()
        cameraSelector = CameraSelector.Builder()
            .requireLensFacing(lensFacing)
            .build()

        try {
            cameraProvider.unbindAll()
            camera = cameraProvider.bindToLifecycle(
                this, cameraSelector,preview,imageCapture
            )
        }catch (e: Exception){
            e.printStackTrace()
        }
    }

    private fun takePhoto() {
        val imageFolder = getExternalFilesDir(Environment.DIRECTORY_PICTURES)
        if (imageFolder != null && !imageFolder.exists()) {
            imageFolder.mkdir()
        }

        val fileName = SimpleDateFormat("yyyy-MM-dd_HH:mm:ss", Locale.getDefault())
            .format(System.currentTimeMillis()) + ".jpg"
        val imageFile = File(imageFolder, fileName)

        val outputOption = ImageCapture.OutputFileOptions.Builder(imageFile).build()

        imageCapture.takePicture(
            outputOption,
            ContextCompat.getMainExecutor(this),
            object : ImageCapture.OnImageSavedCallback {
                override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
                    val message =
                        getString(R.string.photo_capture_succeeded, outputFileResults.savedUri)
                    Toast.makeText(
                        applicationContext,
                        getString(R.string.please_wait_while_fetching_details_about_your_picture),
                        Toast.LENGTH_SHORT
                    ).show()
                    showLoadingScreen()
                    sendImageToServer(imageFile)
                }

                override fun onError(exception: ImageCaptureException) {
                    Toast.makeText(
                        applicationContext,
                        exception.message.toString(),
                        Toast.LENGTH_SHORT
                    ).show()
                    Log.d("camera error", exception.message.toString())
                }
            }
        )
    }

    private fun fileToByteArray(file: File): ByteArray {
        return file.readBytes()
    }

    private fun sendImageToServer(imageFile: File) {

        val accessToken = getAccessToken()
        val byteArray = fileToByteArray(imageFile)
        val url = "http://panel.mait.ac.in:8012/catalogue/search-similar-images/"

        val multipartRequest = object : VolleyMultipartRequest(
            Request.Method.POST, url,
            Response.Listener { response ->
                Log.i("Response", String(response.data))
                hideLoadingScreen()
                val intent = Intent(applicationContext, HomeActivity::class.java).apply {
                    putExtra("catalog_data", String(response.data))
                }
                startActivity(intent)
                finish()
            },
            Response.ErrorListener { error ->
                hideLoadingScreen()
                Log.e("Error", error.message ?: "Unknown error")
            }
        ) {
            override fun getHeaders(): MutableMap<String, String> {
                val headers = HashMap<String, String>()
                headers["Authorization"] = "Bearer $accessToken"
                return headers
            }
            override fun getByteData(): Map<String, DataPart> {
                val params = HashMap<String, DataPart>()
                params["image"] = DataPart("image.jpg", byteArray, "image/jpeg")
                return params
            }
        }

        Volley.newRequestQueue(this).add(multipartRequest)
    }

    private fun getAccessToken(): String? {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        return sharedPreferences.getString("access_token", null)
    }

    private fun setFlashIcon(camera: Camera) {
        if (camera.cameraInfo.hasFlashUnit()){
            if(camera.cameraInfo.torchState.value == 0){
                camera.cameraControl.enableTorch(true)
                binding.flashIb.setImageResource(R.drawable.flash_off_icon)
            }else{
                camera.cameraControl.enableTorch(false)
                binding.flashIb.setImageResource(R.drawable.flash_on_icon)
            }
        }else{
            Toast.makeText(
                this,
                getString(R.string.flash_is_not_available),
                Toast.LENGTH_SHORT
            ).show()
            binding.flashIb.isEnabled = false
        }
    }

    private fun showLoadingScreen() {
        loadingScreen.visibility = View.VISIBLE
    }

    private fun hideLoadingScreen() {
        loadingScreen.visibility = View.GONE
    }
}
