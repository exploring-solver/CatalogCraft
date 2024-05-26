// api.js
import axios from 'axios';

export const detectObjects = async (imageBase64) => {
    try {
        const response = await axios({
            method: "POST",
            url: "https://detect.roboflow.com/groceries-6pfog/6",
            params: {
                api_key: "0RiNrObWAFHLjETT0Gup"
            },
            data: {
                image: imageBase64
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const loadImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
