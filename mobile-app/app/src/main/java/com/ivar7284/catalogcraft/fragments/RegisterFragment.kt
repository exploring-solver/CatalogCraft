package com.ivar7284.catalogcraft.fragments

import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import br.com.simplepass.loadingbutton.customViews.CircularProgressButton
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.ivar7284.catalogcraft.HomeActivity
import com.ivar7284.catalogcraft.R
import org.json.JSONException
import org.json.JSONObject

class RegisterFragment : Fragment() {

    private lateinit var name: EditText
    private lateinit var phone: EditText
    private lateinit var email: EditText
    private lateinit var password: EditText
    private lateinit var cpassword: EditText
    private lateinit var loginBtn: TextView
    private lateinit var registerBtn: CircularProgressButton

    private val URL = "http://panel.mait.ac.in:8012/auth/register/"

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_register, container, false)

        name = view.findViewById(R.id.et_rname)
        phone = view.findViewById(R.id.et_rphone)
        email = view.findViewById(R.id.et_rmail)
        password = view.findViewById(R.id.et_rpass)
        cpassword = view.findViewById(R.id.et_rconfirmpass)
        loginBtn = view.findViewById(R.id.rlogin_btn)
        registerBtn = view.findViewById(R.id.rregister_btn)

        registerBtn.setOnClickListener {
            registerBtn.startAnimation()
            registerUser()
        }

        loginBtn.setOnClickListener {
            val loginFrag = LoginFragment()
            val fragmentManager = requireActivity().supportFragmentManager
            val fragmentTransaction = fragmentManager.beginTransaction()
            fragmentTransaction.replace(R.id.loginFrame, loginFrag)
            fragmentTransaction.commit()
        }

        return view
    }

    private fun registerUser() {
        val fname: String = name.text.toString()
        val mob: String = phone.text.toString()
        val mail: String = email.text.toString()
        val pass: String = password.text.toString()
        val cpass: String = cpassword.text.toString()
        val role: String = "SELLER"

        if (pass == cpass) {
            val req = JSONObject()
            req.put("name", fname)
            req.put("email", mail)
            req.put("password", pass)
            req.put("number", mob)
            req.put("role", role)

            val requestQueue = Volley.newRequestQueue(requireContext())
            val jsonObjectRequest = JsonObjectRequest(
                Request.Method.POST, URL, req,
                { response ->
                    try {
                        val message = response.getString("message")
                        Toast.makeText(requireContext(), message, Toast.LENGTH_SHORT).show()
                        autoLogin(mail,pass)
                    } catch (e: JSONException) {
                        e.printStackTrace()
                        Log.e("JSON Error", e.message.toString())
                    }
                },
                { error ->
                    registerBtn.revertAnimation()
                    Log.e("Volley Error", error.message.toString())
                    Toast.makeText(requireContext(), "Registration failed!", Toast.LENGTH_SHORT).show()
                })

            requestQueue.add(jsonObjectRequest)

        } else {
            showRequiredAlert()
        }
    }

    private fun autoLogin(mail:String, pass:String) {
        val requestQueue = Volley.newRequestQueue(requireContext())

        val reqLogin = JSONObject()
        reqLogin.put("email", mail)
        reqLogin.put("password", pass)
        val url = "http://panel.mait.ac.in:8012/auth/login/"
        val jsonObjectRequest = JsonObjectRequest(Request.Method.POST, url, reqLogin,
            { response ->
                try {
                    val token = response.getString("access")
                    saveAccessToken(token)
                    Toast.makeText(requireContext(), "Login successful!", Toast.LENGTH_SHORT).show()
                    val intent = Intent(requireContext(), HomeActivity::class.java)
                    startActivity(intent)
                    requireActivity().finish()
                } catch (e: JSONException) {
                    e.printStackTrace()
                    Log.e("JSON Error", e.message.toString())
                }
            },
            { error ->
                registerBtn.revertAnimation()
                Log.e("Volley Error", error.message.toString())
                Toast.makeText(requireContext(), "Login failed!", Toast.LENGTH_SHORT).show()
            })

        requestQueue.add(jsonObjectRequest)
    }
    private fun saveAccessToken(token: String) {
        val sharedPreferences = requireContext().getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        with(sharedPreferences.edit()) {
            putString("access_token", token)
            apply()
        }
    }

    private fun showRequiredAlert() {
        val builder = AlertDialog.Builder(requireContext())
        builder.setTitle(getString(R.string.password_match_error))
            .setMessage(getString(R.string.confirm_password_do_not_match))
            .setPositiveButton(getString(R.string.ok)) { dialogInterface: DialogInterface, _: Int ->
                dialogInterface.dismiss()
            }
            .show()
    }
}
