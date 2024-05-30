package com.ivar7284.catalogcraft.adapter

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.google.android.material.imageview.ShapeableImageView
import com.ivar7284.catalogcraft.R
import org.json.JSONArray
import org.json.JSONObject

class CatalogItemListAdapter(private var catalogArray: JSONArray) :
    RecyclerView.Adapter<CatalogItemListAdapter.MyViewHolder>() {

        private  val URL = "http://panel.mait.ac.in:8012"

    interface OnItemClickListener {
        fun onItemClick(position: Int)
    }

    private var mListener: OnItemClickListener? = null

    fun setOnItemClickListener(listener: OnItemClickListener) {
        mListener = listener
    }

    class MyViewHolder(itemView: View) :
        RecyclerView.ViewHolder(itemView) {
        val product_image_1: ShapeableImageView = itemView.findViewById(R.id.productImageView)
        val product_name: TextView = itemView.findViewById(R.id.productNameTextView)
        val mrp: TextView = itemView.findViewById(R.id.productPriceTextView)
        val upc: TextView = itemView.findViewById(R.id.upcTextView)
        val category: TextView = itemView.findViewById(R.id.categoryNameTextView)

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val itemView =
            LayoutInflater.from(parent.context)
                .inflate(R.layout.catalog_item_list_view, parent, false)
        return MyViewHolder(itemView)
    }

    override fun getItemCount(): Int {
        return catalogArray.length()
    }

    fun getItem(position: Int): JSONObject {
        return catalogArray.getJSONObject(position)
    }

    fun updateData(newArray: JSONArray) {
        catalogArray = newArray
        notifyDataSetChanged()
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val currentItem = catalogArray.getJSONObject(position)

        Log.i("details", currentItem.toString())

        // Retrieving data from JSONObject
        val productName = currentItem.optString("product_name")
        val mrp = "Rs. " + currentItem.optString("mrp")
        val seller = "UPC: " + currentItem.optString("upc")
        val productImage1 = URL + currentItem.optString("product_image_1")
        val category = "Category: " + currentItem.optString("category")

        Log.d("AdapterForCatalogList", "Product Image URLs:")
        Log.d("AdapterForCatalogList", "product_image_1: $productImage1")

        if (productImage1.isNotEmpty()) {
            Glide.with(holder.itemView.context)
                .load(productImage1)
                .thumbnail(0.1f)
                .into(holder.product_image_1)
        }

        Log.d("AdapterForCatalogList", "Image loaded successfully")

        holder.product_name.text = productName
        holder.mrp.text = mrp
        holder.upc.text = if (seller.isNotEmpty()) seller else "Unknown Store"
        holder.category.text = category
        holder.itemView.setOnClickListener {
            mListener?.onItemClick(position)
        }
    }
}
