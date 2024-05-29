const axios = require("axios");
const fs = require("fs");

const image = fs.readFileSync("lap1.jpg", {
    encoding: "base64"
});

axios({
    method: "POST",
    url: "https://detect.roboflow.com/groceries-6pfog/6",
    params: {
        api_key: ""
    },
    data: image,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
.then(function(response) {
    console.log(response.data);
})
.catch(function(error) {
    console.log(error.message);
});