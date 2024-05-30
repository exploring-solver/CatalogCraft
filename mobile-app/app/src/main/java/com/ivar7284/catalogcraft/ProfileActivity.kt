package com.ivar7284.catalogcraft

import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Bundle
import android.util.Log
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.ImageButton
import android.widget.Spinner
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.os.ConfigurationCompat
import br.com.simplepass.loadingbutton.customViews.CircularProgressButton
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.ivar7284.catalogcraft.utils.MyPreference
import java.util.Locale

class ProfileActivity : AppCompatActivity() {

    lateinit var myPreference: MyPreference
    private lateinit var languageSpinner: Spinner

    val languageList = arrayOf("English", "Hindi", "Marathi", "Tamil", "Gujarati")

    private lateinit var backBtn: ImageButton
    private lateinit var logoutBtn: CircularProgressButton

    private val URL = "http://panel.mait.ac.in:8012/auth/user-details/"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        myPreference = MyPreference(this)
        languageSpinner = findViewById(R.id.language_spinner)
        val languageAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, languageList)
        languageAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        languageSpinner.adapter = languageAdapter

        val currentLanguage = myPreference.getLanguage()
        val spinnerPosition = languageAdapter.getPosition(currentLanguage.capitalize(Locale.ROOT))
        languageSpinner.setSelection(spinnerPosition)

        findViewById<Button>(R.id.changeBtn).setOnClickListener {
            val selectedLanguage = languageSpinner.selectedItem.toString()
            changeAppLanguage(selectedLanguage)
        }

        // Logout button
        logoutBtn = findViewById(R.id.logoutBtn)
        logoutBtn.setOnClickListener {
            logoutBtn.startAnimation()
            deleteAccessToken()
            logoutBtn.revertAnimation()
            startActivity(Intent(applicationContext, LoginRegisterActivity::class.java))
            finish()
        }

        // Back button
        backBtn = findViewById(R.id.ib_backBtn)
        backBtn.setOnClickListener {
            finish()
        }

        val accessToken = getAccessToken()

        if (accessToken.isNullOrEmpty()) {
            Log.e("fetchData", "Access token is null or empty")
            return
        }

        val requestQueue = Volley.newRequestQueue(this)
        val jsonObjectRequest = object : JsonObjectRequest(
            Request.Method.GET, URL, null,
            { response ->
                val name = response.getString("name")
                val email = response.getString("email")
                val phone = response.getString("number")

                findViewById<TextView>(R.id.PName).text = getString(R.string.name) + ": $name"
                findViewById<TextView>(R.id.Pemail).text = getString(R.string.email) + ": $email"
                findViewById<TextView>(R.id.Pphone).text = getString(R.string.mobile_no, phone)
            },
            { error ->
                Log.i("error fetching", error.message.toString())
            }) {
            override fun getHeaders(): MutableMap<String, String> {
                val headers = HashMap<String, String>()
                headers["Authorization"] = "Bearer $accessToken"
                return headers
            }
        }
        requestQueue.add(jsonObjectRequest)
    }

    private fun changeAppLanguage(language: String) {
        val languageCode = when (language) {
            "English" -> "en"
            "Hindi" -> "hi"
            "Marathi" -> "mr"
            "Tamil" -> "ta"
            "Gujarati" -> "gu"
            else -> "en"
        }

        myPreference.setLanguage(languageCode)

        // Update the app's locale
        val locale = Locale(languageCode)
        Locale.setDefault(locale)
        val config = Configuration(resources.configuration)
        config.setLocale(locale)
        resources.updateConfiguration(config, resources.displayMetrics)

        // Recreate the activity to apply the new language
        recreate()
    }

    private fun deleteAccessToken() {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.remove("access_token")
        editor.apply()
    }

    private fun getAccessToken(): String? {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        return sharedPreferences.getString("access_token", null)
    }
}
