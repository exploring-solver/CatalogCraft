package com.ivar7284.catalogcraft

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import java.util.Timer
import java.util.TimerTask

class SplashScreen : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.splash_screen)

        val accessToken = getAccessToken()
        val timer = Timer()
        timer.schedule(object : TimerTask() {
            override fun run() {
                if (accessToken == null){
                    startActivity(Intent(applicationContext, LoginRegisterActivity::class.java))
                    finish()
                }else{
                    startActivity(Intent(applicationContext, HomeActivity::class.java))
                    finish()
                }
            }
        }, 500)
    }

    private fun getAccessToken(): String? {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        return sharedPreferences.getString("access_token", null)
    }
}