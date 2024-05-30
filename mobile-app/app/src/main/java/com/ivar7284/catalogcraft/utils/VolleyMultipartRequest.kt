package com.ivar7284.catalogcraft.utils

import com.android.volley.AuthFailureError
import com.android.volley.NetworkResponse
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.VolleyError
import com.android.volley.toolbox.HttpHeaderParser
import com.android.volley.toolbox.RequestFuture
import com.android.volley.toolbox.Volley
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.DataOutputStream
import java.io.IOException
import java.io.UnsupportedEncodingException

open class VolleyMultipartRequest(
    method: Int,
    url: String,
    private val mListener: Response.Listener<NetworkResponse>,
    errorListener: Response.ErrorListener
) : Request<NetworkResponse>(method, url, errorListener) {

    private var responseHeaders: Map<String, String>? = null
    private val boundary = "imageRequest${System.currentTimeMillis()}"

    override fun getHeaders(): MutableMap<String, String> {
        val headers = HashMap<String, String>()
        headers["Authorization"] = "Bearer <your_access_token>"
        return headers
    }

    override fun getBodyContentType(): String {
        return "multipart/form-data;boundary=$boundary"
    }

    @Throws(AuthFailureError::class)
    override fun getBody(): ByteArray {
        val bos = ByteArrayOutputStream()
        val dos = DataOutputStream(bos)

        try {
            // populate multipart data
            val params = params
            if (params != null && params.isNotEmpty()) {
                textParse(dos, params, paramsEncoding)
            }

            val data = getByteData()
            if (data != null && data.isNotEmpty()) {
                dataParse(dos, data)
            }

            // close multipart form data after text and file data
            dos.writeBytes(twoHyphens + boundary + twoHyphens + lineEnd)

            return bos.toByteArray()
        } catch (e: IOException) {
            e.printStackTrace()
        }

        return bos.toByteArray()
    }

    override fun parseNetworkResponse(response: NetworkResponse): Response<NetworkResponse> {
        responseHeaders = response.headers
        return Response.success(response, HttpHeaderParser.parseCacheHeaders(response))
    }

    override fun deliverResponse(response: NetworkResponse) {
        mListener.onResponse(response)
    }

    override fun deliverError(error: VolleyError) {
        super.deliverError(error)
    }

    @Throws(IOException::class)
    private fun textParse(dos: DataOutputStream, params: Map<String, String>, encoding: String) {
        try {
            for ((key, value) in params) {
                dos.writeBytes(twoHyphens + boundary + lineEnd)
                dos.writeBytes("Content-Disposition: form-data; name=\"$key\"$lineEnd")
                dos.writeBytes(lineEnd)
                dos.writeBytes(value)
                dos.writeBytes(lineEnd)
            }
        } catch (e: UnsupportedEncodingException) {
            e.printStackTrace()
        }
    }

    @Throws(IOException::class)
    private fun dataParse(dos: DataOutputStream, data: Map<String, DataPart>) {
        for ((key, value) in data) {
            dos.writeBytes(twoHyphens + boundary + lineEnd)
            dos.writeBytes("Content-Disposition: form-data; name=\"$key\"; filename=\"" + value.fileName + "\"$lineEnd")
            dos.writeBytes("Content-Type: " + value.mimeType + lineEnd)
            dos.writeBytes(lineEnd)

            val fileInputStream = ByteArrayInputStream(value.content)
            var bytesRead: Int
            val buffer = ByteArray(1024)
            while (fileInputStream.read(buffer).also { bytesRead = it } != -1) {
                dos.write(buffer, 0, bytesRead)
            }
            dos.writeBytes(lineEnd)
        }
    }

    open fun getByteData(): Map<String, DataPart> {
        return emptyMap()
    }

    class DataPart(var fileName: String, var content: ByteArray, var mimeType: String)

    companion object {
        private const val twoHyphens = "--"
        private const val lineEnd = "\r\n"
    }
}

