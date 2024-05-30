package com.ivar7284.catalogcraft.utils

import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    @Multipart
    @POST("catalogue/create/")
    suspend fun uploadData(
        @Part("product_name") productName: RequestBody,
        @Part("mrp") mrp: RequestBody,
        @Part("csin") csin: RequestBody,
        @Part("description") description: RequestBody,
        @Part("selling_price") sellingPrice: RequestBody,
        @Part("ean") ean: RequestBody,
        @Part("hsn_code") hsnCode: RequestBody,
        @Part("gst_percentage") gst: RequestBody,
        @Part("seller_sku") sellerSku: RequestBody,
        @Part("quantity") quantity: RequestBody,
        @Part("additional_description") additionalDescription: RequestBody?,
        @Part("category") category: RequestBody,
        @Part("brand") brand: RequestBody?,
        @Part("color") color: RequestBody?,
        @Part("size") size: RequestBody?,
        @Part("selling_offer") sellingOffer: RequestBody?,
        @Part("add_offer") additionalOffer: RequestBody?,
        @Part product_image_1: MultipartBody.Part?,
        @Part product_image_2: MultipartBody.Part?,
        @Part product_image_3: MultipartBody.Part?,
        @Part product_image_4: MultipartBody.Part?,
        @Part product_image_5: MultipartBody.Part?,
        @Part product_image_6: MultipartBody.Part?
    ): Response<ResponseBody>
}
