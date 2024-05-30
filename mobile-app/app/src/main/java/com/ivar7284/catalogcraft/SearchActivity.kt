package com.ivar7284.catalogcraft

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.View
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.fragment.app.FragmentManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.ivar7284.catalogcraft.fragments.BarCodeFragment
import org.json.JSONArray
import org.json.JSONObject

class SearchActivity : AppCompatActivity() {

    private lateinit var searchBar: EditText
    private lateinit var heading: TextView
    private lateinit var requestQueue: RequestQueue
    private lateinit var recyclerView: RecyclerView
    private lateinit var searchAdapter: SearchAdapter
    private var catalogueList: ArrayList<JSONObject> = arrayListOf()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        overridePendingTransition(0, 0)
        setContentView(R.layout.activity_search)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        //camera opening
        val formView = findViewById<LinearLayout>(R.id.form_ll)
        formView.setOnClickListener {
            val intent = Intent(applicationContext, HomeActivity::class.java)
            intent.putExtra("LOAD_FRAGMENT", "BarcodeFragment")
            startActivity(intent)
        }

        recyclerView = findViewById(R.id.search_catalog_rv)
        searchBar = findViewById(R.id.search_catalog_et)
        heading = findViewById(R.id.heading)
        requestQueue = Volley.newRequestQueue(this)

        recyclerView.layoutManager = LinearLayoutManager(this)
        searchAdapter = SearchAdapter(this, arrayListOf())
        recyclerView.adapter = searchAdapter

        searchAdapter.setOnItemClickListener(object : SearchAdapter.OnItemClickListener {
            override fun onItemClick(catalogue: JSONObject) {
                val intent = Intent(applicationContext, HomeActivity::class.java)
                intent.putExtra("catalogue", catalogue.toString())
                startActivity(intent)
            }
        })

        searchBar.setOnFocusChangeListener { _, hasFocus ->
            heading.visibility = if (hasFocus) View.VISIBLE else View.GONE
            recyclerView.visibility = if (hasFocus) View.VISIBLE else View.GONE
        }

        searchBar.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                filter(s.toString())
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })

        fetchData()
    }

    private fun fetchData() {
        val URL = "http://panel.mait.ac.in:8012/catalogue/get-all/"
        val accessToken = getAccessToken()
        if (accessToken.isNullOrEmpty()) {
            Log.e("fetchData", "Access token is null or empty")
            return
        }
        val jsonArrayObject = object : JsonArrayRequest(Request.Method.GET, URL, null,
            { response ->
                Log.i("searchList", response.toString())
                parseData(response)
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
        requestQueue.add(jsonArrayObject)
    }

    private fun parseData(response: JSONArray) {
        catalogueList.clear()
        for (i in 0 until response.length()) {
            val item = response.getJSONObject(i)
            catalogueList.add(item)
        }
        searchAdapter.updateCatalogueList(catalogueList)
    }

    private fun filter(text: String) {
        if (text.isEmpty()) {
            recyclerView.visibility = View.GONE
            return
        }
        recyclerView.visibility = View.VISIBLE
        val filteredList = ArrayList<JSONObject>()
        for (item in catalogueList) {
            if (item.getString("product_name").toLowerCase().contains(text.toLowerCase())) {
                filteredList.add(item)
            }
        }
        searchAdapter.updateCatalogueList(filteredList)
    }

    private fun getAccessToken(): String? {
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        return sharedPreferences.getString("access_token", null)
    }
}
