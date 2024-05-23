import React, { useEffect, useRef } from 'react'

function Translator() {

    const googleTranslateRef = useRef(null);

    useEffect(() => {

        let intervalId;

        const checkGoogleTranslate = () => {
            if (window.google && window.google.translate) {
                clearInterval(intervalId);
                new window.google.translate.TranslateElement({
                    pageLanguage: "en",
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                },
                    googleTranslateRef.current
                )
            }
        };
        intervalId = setInterval(checkGoogleTranslate, 100);

    }, [])
    return (
        <>
            <div className=' xl:right-16 xl:bottom-16 z-[1000]' ref={googleTranslateRef}></div>
        </>
    )
}

export default Translator