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
            document.getElementById('result').innerText = JSON.stringify(response.data, null, 2);
        } catch (error) {
            console.error(error);
            alert('An error occurred while processing the image.');
        }
    };
    reader.readAsDataURL(file);
});
