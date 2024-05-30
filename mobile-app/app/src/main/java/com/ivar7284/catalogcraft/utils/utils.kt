package com.ivar7284.catalogcraft.utils

import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.net.Uri
import android.provider.Settings
import android.widget.Toast
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.ivar7284.catalogcraft.R

fun appSettingOpen(context: Context){
    Toast.makeText(
        context,
        context.getString(R.string.go_to_setting_and_enable_all_permission),
        Toast.LENGTH_LONG
    ).show()

    val settingIntent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
    settingIntent.data = Uri.parse("package:${context.packageName}")
    context.startActivity(settingIntent)
}

fun warningPermissionDialog(context: Context,listener : DialogInterface.OnClickListener){
    MaterialAlertDialogBuilder(context)
        .setMessage(context.getString(R.string.all_permission_are_required_for_this_app))
        .setCancelable(false)
        .setPositiveButton(context.getString(R.string.ok),listener)
        .create()
        .show()
}