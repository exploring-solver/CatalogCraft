package com.ivar7284.catalogcraft

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.viewpager2.widget.ViewPager2
import com.bumptech.glide.Glide
import com.ivar7284.catalogcraft.adapters.ImagePagerAdapter
import org.json.JSONObject

class MainCatalogItemActivity : AppCompatActivity() {

    private lateinit var backBtn: ImageButton
    private lateinit var viewPager: ViewPager2
    private val BaseUrl: String = "http://panel.mait.ac.in:8012"

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main_catalog_item)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val productDataString = intent.getStringExtra("productData")
        val productData = JSONObject(productDataString)
        Log.i("intent data", productData.toString())

        // Extract necessary details from productData
        val productName = productData.optString("product_name").uppercase()
        val mrp = productData.optString("mrp")
        val category = productData.optString("category")
        val csin = productData.optString("csin")
        val description = productData.optString("description")
        val color = productData.optString("color")
        val quantity = productData.optString("quantity")
        val images = listOf(
            productData.optString("product_image_1"),
            productData.optString("product_image_2"),
            productData.optString("product_image_3"),
            productData.optString("product_image_4"),
            productData.optString("product_image_5")
        )

        // Set details to corresponding views
        findViewById<TextView>(R.id.pName_tv).text = productName
        findViewById<TextView>(R.id.subheading).text = "Description: $description"
        findViewById<TextView>(R.id.mrp_tv).text = "Rs. $mrp"
        val descriptionTextView = findViewById<TextView>(R.id.description_tv)
        val details = "Category: $category\n" +
                "CSIN: $csin\n" +
                "Color: $color\n" +
                "Quantity: $quantity" +
                "Category: $category"
        descriptionTextView.text = details

        // Load product image using Glide
        viewPager = findViewById(R.id.viewPager)
        val adapter = ImagePagerAdapter(this, images)
        viewPager.adapter = adapter

        //back button
        backBtn = findViewById(R.id.ib_backBtn_mainCatalog)
        backBtn.setOnClickListener {
            finish()
        }
    }
}