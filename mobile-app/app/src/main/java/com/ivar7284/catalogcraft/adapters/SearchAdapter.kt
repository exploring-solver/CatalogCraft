package com.ivar7284.catalogcraft

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import org.json.JSONObject

class SearchAdapter(
    private val context: Context,
    private var catalogueList: ArrayList<JSONObject>
) : RecyclerView.Adapter<SearchAdapter.SearchViewHolder>() {

    interface OnItemClickListener {
        fun onItemClick(catalogue: JSONObject)
    }

    private var listener: OnItemClickListener? = null

    fun setOnItemClickListener(listener: OnItemClickListener) {
        this.listener = listener
    }

    class SearchViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val productName: TextView = itemView.findViewById(R.id.product_name)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SearchViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.search_list, parent, false)
        return SearchViewHolder(view)
    }

    override fun onBindViewHolder(holder: SearchViewHolder, position: Int) {
        val catalogue = catalogueList[position]
        holder.productName.text = catalogue.getString("product_name")
        holder.itemView.setOnClickListener {
            listener?.onItemClick(catalogue)
        }
    }

    override fun getItemCount(): Int {
        return Math.min(catalogueList.size, 5)
    }

    fun updateCatalogueList(newCatalogueList: ArrayList<JSONObject>) {
        catalogueList = newCatalogueList
        notifyDataSetChanged()
    }
}
