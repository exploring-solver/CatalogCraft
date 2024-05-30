import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = '';
const genAI = new GoogleGenerativeAI(API_KEY);

async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Tell me the data for this";

  const fileInputEl = document.querySelector("#imageUpload");
  const imageParts = await Promise.all(
    [...fileInputEl.files].map(fileToGenerativePart)
  );

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = await response.text();

  // Assuming the response text is in JSON format and contains 'productName' and 'productDescription'
  const data = JSON.parse(text);
  document.getElementById('productName').value = data.productName || '';
  document.getElementById('productDescription').value = data.productDescription || '';
}

document.getElementById('submitButton').addEventListener('click', run);
