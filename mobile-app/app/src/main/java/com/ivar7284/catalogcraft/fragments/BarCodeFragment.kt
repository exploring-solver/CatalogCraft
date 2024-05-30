package com.ivar7284.catalogcraft.fragments

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentManager
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.ivar7284.catalogcraft.CameraActivity
import com.ivar7284.catalogcraft.HomeActivity
import com.ivar7284.catalogcraft.ModelViewActivity
import com.ivar7284.catalogcraft.R
import com.ivar7284.catalogcraft.SearchActivity
import com.journeyapps.barcodescanner.ScanContract
import com.journeyapps.barcodescanner.ScanIntentResult
import com.journeyapps.barcodescanner.ScanOptions
import org.json.JSONException
import org.json.JSONObject

class BarCodeFragment : Fragment() {
    private lateinit var modelBtn: Button
    private lateinit var barcodeBtn: Button
    private lateinit var cameraBtn: Button
    private lateinit var searchBar: TextView
    private lateinit var sharedPreferences: SharedPreferences

    private val requestPermissionLauncher =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { isGranted: Boolean ->
            if (isGranted) {
                showCamera()
            } else {
                // Handle the case when the permission is not granted
                Toast.makeText(requireContext(), "Camera Permission required", Toast.LENGTH_SHORT).show()
            }
        }

    private val scanLauncher =
        registerForActivityResult(ScanContract()) { result: ScanIntentResult ->
            run {
                if (result.contents == null) {
                    Toast.makeText(requireContext(), "Cancelled", Toast.LENGTH_SHORT).show()
                } else {
                    setResult(result.contents)
                }
            }
        }

    private fun setResult(string: String) {
        sharedPreferences = requireContext().getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        fetchingData(string)
    }

    private fun showCamera() {
        val options = ScanOptions()
        options.setDesiredBarcodeFormats(
            ScanOptions.QR_CODE,
            ScanOptions.DATA_MATRIX,
            ScanOptions.UPC_A,
            ScanOptions.UPC_E,
            ScanOptions.EAN_8,
            ScanOptions.EAN_13,
            ScanOptions.CODE_39,
            ScanOptions.CODE_93,
            ScanOptions.CODE_128,
            ScanOptions.ITF,
            ScanOptions.PDF_417
        )
        options.setPrompt("SCAN QR CODE or BARCODE")
        options.setCameraId(0)
        options.setBeepEnabled(false)
        options.setBarcodeImageEnabled(true)
        options.setOrientationLocked(false)
        scanLauncher.launch(options)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_bar_code, container, false)

        // Top navigation
        searchBar = view.findViewById(R.id.search_catalog_et)
        searchBar.setOnClickListener {
            startActivity(Intent(requireContext(), SearchActivity::class.java))
        }

        val formView = view.findViewById<LinearLayout>(R.id.form_ll)
        formView.setOnClickListener {
            val addCatalogItemFragment = AddCatalogItemFragment()
            val fragmentManager: FragmentManager? = fragmentManager
            fragmentManager?.beginTransaction()?.replace(R.id.homeFrame, addCatalogItemFragment)?.commit()
        }

        barcodeBtn = view.findViewById(R.id.bar_code_btn)
        barcodeBtn.setOnClickListener {
            checkPermissionCamera(requireContext())
        }

        cameraBtn = view.findViewById(R.id.camera_btn)
        cameraBtn.setOnClickListener {
            startActivity(Intent(requireContext(), CameraActivity::class.java))
        }

        modelBtn = view.findViewById(R.id.model_btn)
        modelBtn.setOnClickListener {
            startActivity(Intent(requireContext(), ModelViewActivity::class.java))
        }

        return view
    }

    private fun checkPermissionCamera(context: Context) {
        if (ContextCompat.checkSelfPermission(context, android.Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
            showCamera()
        } else {
            if (shouldShowRequestPermissionRationale(android.Manifest.permission.CAMERA)) {
                Toast.makeText(context, "Camera Permission required", Toast.LENGTH_SHORT).show()
            } else {
                requestPermissionLauncher.launch(android.Manifest.permission.CAMERA)
            }
        }
    }

    private fun fetchingData(productName: String) {
        val URL = "http://panel.mait.ac.in:8012/catalogue/csv/"
        val requestQueue = Volley.newRequestQueue(requireContext())

        val req = JSONObject()
        try {
            req.put("name", productName.trim())
        } catch (e: JSONException) {
            e.printStackTrace()
            Log.e("JSON Error", "Error creating JSON object: ${e.message}")
            return
        }

        val jsonObjectRequest = JsonObjectRequest(Request.Method.POST, URL, req,
            { response ->
                try {
                    Log.i("responseCSV", response.optString("error").toString())
                    Log.i("responseCSV", response.toString())
                    val intent = Intent(requireContext(), HomeActivity::class.java).apply {
                        putExtra("bar_code", response.toString())
                    }
                    startActivity(intent)
                } catch (e: JSONException) {
                    e.printStackTrace()
                    Log.e("JSON Error", "Error parsing JSON response: ${e.message}")
                }
            },
            { error ->
                error.networkResponse?.let {
                    val statusCode = it.statusCode
                    val data = it.data?.let { data -> String(data) }
                    Log.e("Volley Error", "Status code: $statusCode, Data: $data")
                    Toast.makeText(requireContext(), "$data", Toast.LENGTH_LONG).show()
                } ?: run {
                    Log.e("Volley Error", "Error: ${error.message}")
                }
            })

        requestQueue.add(jsonObjectRequest)
    }


}
