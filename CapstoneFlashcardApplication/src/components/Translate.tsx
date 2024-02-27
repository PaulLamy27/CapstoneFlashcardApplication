import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Translate = () => {

    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputLanguage, setInputLanguage] = useState('English');
    const [outputLanguage, setOutputLanguage] = useState('Korean');
    const [inputLanguageCode, setInputLanguageCode] = useState('en');
    const [outputLanguageCode, setOutputLanguageCode] = useState('ko');
    // const [showMoreOptions, setShowMoreOptions] = useState(false);
    // const [isPopupInputLangaugeScreenVisible, setPopupInputLangaugeScreenVisible] = useState(false);
    // const [isPopupOutputLangaugeScreenVisible, setPopupOutputLangaugeScreenVisible] = useState(false);
    // const [isPopupTranslationScreenVisible, setPopupTranslationScreenVisible] = useState(false);


    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                if (!data) {
                    const apiData = await fetchData();
                    setData(apiData);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (data === null) {
            fetchDataAndSetState();
        } else {
            setLoading(false);
        }
    }, [data]);

    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: 'https://translate-plus.p.rapidapi.com/',
            headers: {
                'X-RapidAPI-Key': '3131821328msh763cc4693711e3fp1c8a59jsn238948f1a12a',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com',
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const translateData = async () => {
        const options = {
            method: 'POST',
            url: 'https://translate-plus.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '3131821328msh763cc4693711e3fp1c8a59jsn238948f1a12a',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
            },
            data: {
                text: inputText,
                source: inputLanguageCode,
                target: outputLanguageCode,
            },
        };

        try {
            const translationOutput = await axios.request(options);
            setOutputText(translationOutput.data.translations.translation);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="w-full mx-auto">
                <input value={inputText} placeholder='Front of Card' className='ml-4 rounded-lg text-center bg-gray-700 hover' onChange={(e) => setInputText(e.target.value)} />
                <input value={outputText} placeholder='Back of Card' className='ml-4 rounded-lg text-center bg-gray-700' onChange={(e) => setInputText(e.target.value)} />
                <button className="border rounded-lg m-5 p-2 bg-[#00df29] hover:bg-[#4DE3B5] text-[#13163b] font-medium" onClick={translateData}>
                    TRANSLATE</button>
            </div>
        </>
    )
}

export default Translate