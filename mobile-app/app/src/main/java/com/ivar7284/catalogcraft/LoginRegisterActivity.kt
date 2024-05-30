package com.ivar7284.catalogcraft

import android.content.Context
import android.content.res.Configuration
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.ivar7284.catalogcraft.fragments.LoginFragment
import com.ivar7284.catalogcraft.utils.MyPreference
import java.util.Locale

class LoginRegisterActivity : AppCompatActivity() {

    lateinit var myPreference: MyPreference
    private lateinit var languageSpinner: Spinner

    val languageList = arrayOf("English", "Hindi", "Marathi", "Tamil", "Gujarati")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_login_register)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        myPreference = MyPreference(this)
        languageSpinner = findViewById(R.id.language_spinner)
        val languageAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, languageList)
        languageAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        languageSpinner.adapter = languageAdapter

        // Retrieve and set the current language
        val currentLanguage = myPreference.getLanguage()?.capitalize(Locale.ROOT) ?: "English"
        val spinnerPosition = languageAdapter.getPosition(currentLanguage)
        if (spinnerPosition >= 0) {
            languageSpinner.setSelection(spinnerPosition)
        }

        languageSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View?, position: Int, id: Long) {
                val selectedLanguage = languageList[position]
                changeAppLanguage(selectedLanguage)
            }

            override fun onNothingSelected(parent: AdapterView<*>) {
                // Do nothing here or handle as per your requirements
            }
        }

        loadFragment()
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

        // Check if the language is already set
        if (myPreference.getLanguage() == languageCode) {
            return
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

    override fun onBackPressed() {
        super.onBackPressed()
        moveTaskToBack(true)
    }

    private fun loadFragment() {
        val fragment = LoginFragment()
        supportFragmentManager.beginTransaction()
            .replace(R.id.loginFrame, fragment)
            .commit()
    }
}
