package com.ivar7284.catalogcraft.fragments

import android.annotation.SuppressLint
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.speech.RecognizerIntent
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ProgressBar
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import br.com.simplepass.loadingbutton.customViews.CircularProgressButton
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.google.android.material.textfield.TextInputEditText
import com.ivar7284.catalogcraft.HomeActivity
import com.ivar7284.catalogcraft.R
import com.ivar7284.catalogcraft.adapters.CategoryAdapter
import com.ivar7284.catalogcraft.dataclasses.Category
import org.json.JSONException
import java.util.Locale

class CategoryFragment : Fragment(), CategoryAdapter.OnItemClickListener {

    private lateinit var categoryMic: View
    private lateinit var categoryName: TextInputEditText
    private lateinit var category_rv: RecyclerView
    private lateinit var nextBtn: CircularProgressButton

    private val REQUEST_CODE_SPEECH_INPUT = 1
    private lateinit var sharedPreferences: SharedPreferences
    private val categories = mutableListOf<Category>()
    private lateinit var categoryAdapter: CategoryAdapter
    private lateinit var progressBar: ProgressBar

    @SuppressLint("MissingInflatedId")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view =  inflater.inflate(R.layout.fragment_category, container, false)

        //next button
        nextBtn = view.findViewById(R.id.next_btn)
        nextBtn.setOnClickListener {
            if (categoryName.text == null){
                showCategoryNameRequiredAlert()
            }else{
                val categoryText = categoryName.text.toString()
                if (categoryText.isEmpty()) {
                    showCategoryNameRequiredAlert()
                } else {
                    val addCatalogItemFragment = AddCatalogItemFragment()
                    val bundle = Bundle()
                    bundle.putString("selected_category", categoryText)
                    addCatalogItemFragment.arguments = bundle

                    requireActivity().supportFragmentManager.beginTransaction()
                        .replace(R.id.homeFrame, addCatalogItemFragment)
                        .addToBackStack(null)
                        .commit()
                }
            }
        }

        sharedPreferences = requireContext().getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)

        category_rv = view.findViewById(R.id.category_rv)
        category_rv.layoutManager = LinearLayoutManager(requireContext())
        categoryAdapter = CategoryAdapter(categories, this)
        category_rv.adapter = categoryAdapter

        progressBar = view.findViewById(R.id.progressBar)

        categoryName = view.findViewById(R.id.categoryName)
        categoryMic = view.findViewById(R.id.mic_category)
        categoryMic.setOnClickListener {
            val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault())
            intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Speak to text")
            try {
                startActivityForResult(intent, REQUEST_CODE_SPEECH_INPUT)
            } catch (e: Exception) {
                Toast.makeText(requireContext(), " " + e.message, Toast.LENGTH_SHORT).show()
            }
        }
        getAllCategories()
        return view
    }

    private fun getAllCategories() {
        val URL = "http://panel.mait.ac.in:8012/catalogue/categories/"
        val requestQueue = Volley.newRequestQueue(requireContext())
        val accessToken = sharedPreferences.getString("access_token", null)
        if (accessToken.isNullOrEmpty()) {
            Log.e("fetchData", "Access token is null or empty")
            return
        }
        progressBar.visibility = View.VISIBLE
        val jsonObjectRequest = object : JsonObjectRequest(Request.Method.GET, URL, null,
            { response ->
                Log.i("categoryList", response.toString())
                try {
                    val jsonArray = response.getJSONArray("categories")
                    for (i in 0 until jsonArray.length()) {
                        val name = jsonArray.getString(i)
                        categories.add(Category(name))
                    }
                    categoryAdapter.notifyDataSetChanged()
                    progressBar.visibility = View.GONE
                } catch (e: JSONException) {
                    e.printStackTrace()
                }
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

    override fun onItemClick(category: Category) {
        categoryName.setText(category.name)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == AppCompatActivity.RESULT_OK && data != null) {
            val res: ArrayList<String> = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
                    as ArrayList<String>
            categoryName.setText(limitCharacterInput(res[0]))
        }
    }

    private fun limitCharacterInput(input: String): String {
        return if (input.length > 50) {
            input.substring(0, 50)
        } else {
            input
        }
    }

    private fun showCategoryNameRequiredAlert() {
        val builder = AlertDialog.Builder(requireContext())
        builder.setTitle(getString(R.string.category_name_required))
            .setMessage(getString(R.string.category_name_is_required_to_proceed))
            .setPositiveButton(getString(R.string.ok)) { dialogInterface: DialogInterface, _: Int ->
                dialogInterface.dismiss()
            }
            .show()
    }
}
