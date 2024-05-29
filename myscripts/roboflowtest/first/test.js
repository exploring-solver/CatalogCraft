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
            const productFormContainer = document.getElementById('productFormContainer');
            productFormContainer.innerHTML = ''; // Clear previous results

            if (data.predictions && data.predictions.length > 0) {
                data.predictions.forEach((prediction, index) => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'mb-6';

                    const productNameLabel = document.createElement('label');
                    productNameLabel.htmlFor = `productName${index}`;
                    productNameLabel.className = 'block text-gray-700 font-bold mb-2';
                    productNameLabel.innerText = 'Product Name:';
                    productDiv.appendChild(productNameLabel);

                    const productNameInput = document.createElement('input');
                    productNameInput.type = 'text';
                    productNameInput.id = `productName${index}`;
                    productNameInput.name = `productName${index}`;
                    productNameInput.value = prediction.class;
                    productNameInput.readOnly = true;
                    productNameInput.className = 'w-full p-2 border border-gray-300 rounded';
                    productDiv.appendChild(productNameInput);

                    const mrpLabel = document.createElement('label');
                    mrpLabel.htmlFor = `mrp${index}`;
                    mrpLabel.className = 'block text-gray-700 font-bold mb-2 mt-4';
                    mrpLabel.innerText = 'MRP:';
                    productDiv.appendChild(mrpLabel);

                    const mrpInput = document.createElement('input');
                    mrpInput.type = 'text';
                    mrpInput.id = `mrp${index}`;
                    mrpInput.name = `mrp${index}`;
                    mrpInput.className = 'w-full p-2 border border-gray-300 rounded';
                    productDiv.appendChild(mrpInput);

                    const productImageLabel = document.createElement('label');
                    productImageLabel.htmlFor = `productImage${index}`;
                    productImageLabel.className = 'block text-gray-700 font-bold mb-2 mt-4';
                    productImageLabel.innerText = 'Product Image:';
                    productDiv.appendChild(productImageLabel);

                    const productImage = document.createElement('img');
                    productImage.id = `productImage${index}`;
                    productImage.src = reader.result;
                    productImage.alt = 'Product Image';
                    productImage.className = 'w-full rounded';
                    productImage.style.display = 'block';
                    productDiv.appendChild(productImage);

                    productFormContainer.appendChild(productDiv);
                });
            } else {
                const noProductMessage = document.createElement('p');
                noProductMessage.innerText = 'No products detected.';
                productFormContainer.appendChild(noProductMessage);
            }

            document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        } catch (error) {
            console.error(error);
            alert('An error occurred while processing the image.');
        }
    };
    reader.readAsDataURL(file);
});
