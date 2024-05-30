package com.ivar7284.catalogcraft.fragments

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import com.ivar7284.catalogcraft.R
import com.ivar7284.catalogcraft.SearchActivity

class TemplatesFragment : Fragment() {

    private lateinit var yesBtn : Button
    private lateinit var noBtn : Button

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_templates, container, false)

        yesBtn = view.findViewById(R.id.yes_btn)
        noBtn = view.findViewById(R.id.no_btn)

        yesBtn.setOnClickListener {
            startActivity(Intent(requireContext(), SearchActivity::class.java))
        }

        noBtn.setOnClickListener {
            val categoryFrag = CategoryFragment()
            val fragmentManager = requireActivity().supportFragmentManager
            val fragmentTransaction = fragmentManager.beginTransaction()
            fragmentTransaction.replace(R.id.homeFrame, categoryFrag)
            fragmentTransaction.commit()
        }


        return view
    }
}