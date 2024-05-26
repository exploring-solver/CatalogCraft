import requests
import base64

# Read the image and convert it to base64
with open("lap1.jpg", "rb") as image_file:
    base64_image = base64.b64encode(image_file.read()).decode('utf-8')

# Define the API endpoint and parameters
api_url = "https://detect.roboflow.com/groceries-6pfog/6"
api_key = "0RiNrObWAFHLjETT0Gup"

# Make the POST request
response = requests.post(
    api_url,
    params={"api_key": api_key},
    data=base64_image,
    headers={"Content-Type": "application/x-www-form-urlencoded"}
)

# Print the response
if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")
