document.getElementById('uploadButton').addEventListener('click', async () => {
    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length === 0) {
        alert('Please select an image.');
        return;
    }

    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

        try {
            const response = await axios({
                method: 'POST',
                url: 'https://detect.roboflow.com/groceries-6pfog/6',
                params: {
                    api_key: '0RiNrObWAFHLjETT0Gup'
                },
                data: base64String,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const data = response.data;
            if (data.predictions && data.predictions.length > 0) {
                const prediction = data.predictions[0];
                document.getElementById('productName').value = prediction.class;
                document.getElementById('mrp').value = "100"; // Example MRP, you can set as needed
                const productImage = document.getElementById('productImage');
                productImage.src = reader.result;
                productImage.style.display = 'block';
            }

            // document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        } catch (error) {
            console.error(error);
            alert('An error occurred while processing the image.');
        }
    };
    reader.readAsDataURL(file);
});
