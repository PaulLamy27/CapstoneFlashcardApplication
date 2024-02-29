import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Translate: React.FC = () => {

    const [inputText, setInputText] = useState('');
    const [isTranslateAvailable, setIsTranslateAvailable] = useState(false);
    const [outputText, setOutputText] = useState('');
    const [languageList, setLanguageList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputLanguage, setInputLanguage] = useState('English');
    const [outputLanguage, setOutputLanguage] = useState('Slovene');
    const [inputLanguageCode, setInputLanguageCode] = useState('en');
    const [outputLanguageCode, setOutputLanguageCode] = useState('sl');
    const [data, setData] = useState(null);
    // const [showMoreOptions, setShowMoreOptions] = useState(false);
    // const [isPopupInputLangaugeScreenVisible, setPopupInputLangaugeScreenVisible] = useState(false);
    // const [isPopupOutputLangaugeScreenVisible, setPopupOutputLangaugeScreenVisible] = useState(false);
    // const [isPopupTranslationScreenVisible, setPopupTranslationScreenVisible] = useState(false);


    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: 'https://translate-plus.p.rapidapi.com/',
            headers: {
                'X-RapidAPI-Key': '7a95d19361mshbdbf1bc86a88d5bp1f6589jsn386944c7fa2b',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com',
            },
        };

        try {
            axios.request(options)
                .then((res) => {
                    if (res) {
                        console.log("res.data: ", res.data);
                        const supportedLanguages = res.data.supported_languages;
                        setLanguageList(supportedLanguages);
                        console.log("languageList is empty here: ", languageList);
                    }
                    else {
                        console.error("No res");
                    }
                })
        } catch (error) {
            console.log();
        }
    }

    // useEffect will run when the component mounts first AND when the value of languageList changes
    useEffect(() => {
        if (languageList.length <= 0) {
            fetchData();
        } else {
            setLoading(false);
        }

        console.log("useEffect ran; languageList: ", languageList);
    }, [languageList])

    // useEffect(() => {
    //     const fetchDataAndSetState = async () => {
    //         try {
    //             if (!languageList) {
    //                 const apiData = await fetchData();
    //                 console.log(apiData);
    //                 setLoading(false);
    //             }
    //             setLoading(false);
    //         } catch (error) {
    //             console.error(error);
    //             setLoading(false);
    //         }
    //     };

    //     if (!languageList) {
    //         fetchDataAndSetState();
    //     } else {
    //         setLoading(false);
    //     }
    // }, []);

    // const fetchData = async () => {
    //     const options = {
    //         method: 'GET',
    //         url: 'https://translate-plus.p.rapidapi.com/',
    //         headers: {
    //             'X-RapidAPI-Key': '3131821328msh763cc4693711e3fp1c8a59jsn238948f1a12a',
    //             'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com',
    //         },
    //     };

    //     try {
    //         const response = await axios.request(options);
    //         console.log("Options: ", response.data);
    //         return response.data;
    //     } catch (error) {
    //         console.error(error);
    //         return null;
    //     }
    // };

    const translateData = async () => {
        const options = {
            method: 'POST',
            url: 'https://translate-plus.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '7a95d19361mshbdbf1bc86a88d5bp1f6589jsn386944c7fa2b',
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

    const handleIsLanguageToggle = () => {
        setIsTranslateAvailable(!isTranslateAvailable);
        console.log("But when the application crashes: languageList is populated: ", languageList);
    }

    return (
        <>
            <div>
                <div className='flex'>
                    <label className="inline-flex items-center cursor-pointer" >
                        <input type="checkbox" value="" className="sr-only peer" onClick={handleIsLanguageToggle} />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3763c4]"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
                    </label>
                    <h1 className='text-white font-semibold'>Is this deck for studying a language?</h1>
                </div>
            </div>
            {
                isTranslateAvailable && (<div className="w-full mx-auto">
                    <select className='mx-3'>
                        <option value="" disabled selected>Input language</option>
                        {Object.entries(languageList).map(([language, code]) => (
                            <option key={code}>{language}</option>
                        ))};
                    </select>
                    <select className='mx-3'>
                        <option value="" disabled selected>Output language</option>
                        {Object.entries(languageList).map(([language, code]) => (
                            <option key={code}>{language}</option>
                        ))};
                    </select>
                    <button className="border rounded-lg m-5 p-2 bg-[#00df29] hover:bg-[#4DE3B5] text-[#13163b] font-medium" onClick={translateData}>
                        TRANSLATE</button>
                </div>)
            }

        </>
    )
}

export default Translate