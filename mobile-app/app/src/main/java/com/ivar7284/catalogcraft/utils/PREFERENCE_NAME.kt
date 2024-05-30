package com.ivar7284.catalogcraft.utils

import android.content.Context

const val PREFERENCE_NAME = "SharedPreferenceExample"
const val PREFERENCE_LANGUAGE = "Language"

class MyPreference(context: Context) {

    private val preference = context.getSharedPreferences(PREFERENCE_NAME, Context.MODE_PRIVATE)

    fun getLanguage(): String {
        return preference.getString(PREFERENCE_LANGUAGE, "en") ?: "en"
    }

    fun setLanguage(language: String) {
        val editor = preference.edit()
        editor.putString(PREFERENCE_LANGUAGE, language)
        editor.apply()
    }
}
