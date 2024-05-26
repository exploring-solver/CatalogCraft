import React, { useState, useEffect } from 'react';

const VoiceForm = () => {
    const [isListening, setIsListening] = useState(false);
    const [wordsArray, setWordsArray] = useState([]);
    const [formData, setFormData] = useState({
        product_name: '',
        description: '',
        mrp: '',
        selling_price: '',
        csin: '',
        gst_percentage: '',
        quantity: '',
        category: '',
        ean: '',
        seller_sku: '',
        color: '',
        brand: '',
        size: '',
        product_image_1: null,
        product_image_2: null,
        product_image_3: null,
        product_image_4: null,
        product_image_5: null,
    });

    let recognition;

    useEffect(() => {
        if (window.webkitSpeechRecognition) {
            recognition = new window.webkitSpeechRecognition(); // For Chrome
            recognition.continuous = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const current = event.resultIndex;
                const transcript = event.results[current][0].transcript;
                const words = transcript.split(',').map(word => word.trim());
                setWordsArray(prevWords => [...prevWords, ...words.filter(Boolean)]);
            };

            recognition.onend = () => {
                sendSpeechToServer(wordsArray);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };
        } else {
            alert('Speech recognition not supported in this browser. Please use Chrome.');
        }
    }, [wordsArray]);

    const BASE_URL = 'http://panel.mait.ac.in:3012';

    const sendSpeechToServer = (words) => {
        const prompt = "I am giving you these details of a form arrange the data in an array and separate them by a comma, " + words.join(', ');
        fetch(`${BASE_URL}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        })
            .then(response => response.json())
            .then(data => {
                const responseWordsArray = JSON.parse(data.text);
                console.log('Words array:', responseWordsArray);
                changeInputValues(responseWordsArray);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleVoiceButtonClick = () => {
        if (!isListening) {
            recognition.start();
            setIsListening(true);
        } else {
            recognition.stop();
            setIsListening(false);
        }
    };

    const changeInputValues = (values) => {
        const updatedFormData = { ...formData };
        const keys = Object.keys(updatedFormData);

        for (let i = 0; i < keys.length && i < values.length; i++) {
            updatedFormData[keys[i]] = values[i];
        }

        setFormData(updatedFormData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="container">
            <h2>Product Form</h2>
            <form>
                {Object.keys(formData).map((key) => (
                    <div className="form-group" key={key}>
                        <label htmlFor={key}>{key.replace(/_/g, ' ').toUpperCase()}:</label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleInputChange}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleVoiceButtonClick}>
                    {isListening ? 'Stop Voice Input' : 'Start Voice Input'}
                </button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default VoiceForm;
