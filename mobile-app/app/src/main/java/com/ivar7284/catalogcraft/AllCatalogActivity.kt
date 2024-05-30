package com.ivar7284.catalogcraft

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.ProgressBar
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.ivar7284.catalogcraft.adapter.CatalogItemListAdapter
import org.json.JSONArray

class AllCatalogActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var catalogListAdapter: CatalogItemListAdapter
    private lateinit var sharedPreferences: SharedPreferences

    private lateinit var heading: TextView
    private lateinit var yourCatalogBtn: Button
    private lateinit var progressBar: ProgressBar

    val URL = "http://panel.mait.ac.in:8012/catalogue/get-all/"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        overridePendingTransition(0,0)
        setContentView(R.layout.activity_all_catalog)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        recyclerView = findViewById(R.id.itemList_rv)
        recyclerView.layoutManager = LinearLayoutManager(applicationContext)
        catalogListAdapter = CatalogItemListAdapter(JSONArray())
        catalogListAdapter.setOnItemClickListener(object : CatalogItemListAdapter.OnItemClickListener {
            override fun onItemClick(position: Int) {
                val clickedItem = catalogListAdapter.getItem(position)

                val intent = Intent(applicationContext, MainCatalogItemActivity::class.java)
                intent.putExtra("productData", clickedItem.toString())
                startActivity(intent)
            }
        })
        recyclerView.adapter = catalogListAdapter

        sharedPreferences = applicationContext.getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        heading = findViewById(R.id.heading)
        progressBar = findViewById(R.id.progressBar)

        yourCatalogBtn = findViewById(R.id.allCatalog)
        yourCatalogBtn.setOnClickListener {
            startActivity(Intent(applicationContext, HomeActivity::class.java))
            finish()
        }

        fetchData()

    }

    private fun fetchData() {
        val accessToken = sharedPreferences.getString("access_token", null)
        if (accessToken.isNullOrEmpty()) {
            Log.e("fetchData", "Access token is null or empty")
            return
        }
        progressBar.visibility = View.VISIBLE
        val requestQueue = Volley.newRequestQueue(applicationContext)
        val jsonArrayRequest = object : JsonArrayRequest(
            Request.Method.GET, URL, null,
            { response ->
                Log.i("listingCatalog", response.toString())
                val itemCount = response.length()
                Log.i("ItemCount", "Number of items in the response: $itemCount")
                val final : String = getString(R.string.your_catalog_item_list) + getString(R.string.total) + itemCount + getString(R.string.items)
                heading.text = final
                catalogListAdapter.updateData(response)
                progressBar.visibility = View.GONE
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
        requestQueue.add(jsonArrayRequest)
    }

    override fun onBackPressed() {
        super.onBackPressed()
        moveTaskToBack(false)
    }

}