import { useEffect, useState } from 'react'
import axios from 'axios';


const Translate = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);


    const translateData = async () => {
        const options = {
            method: 'POST',
            url: 'https://translate-plus.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'ab9aa390d2mshf07eec838b1e688p18ff1bjsn23b289766dbd',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com',
            },
            data: {
                text: "Hello world!",
                source: "en",
                target: "es",
            },
        };
    }

    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: 'https://translate-plus.p.rapidapi.com/',
            headers: {
                'X-RapidAPI-Key': 'ab9aa390d2mshf07eec838b1e688p18ff1bjsn23b289766dbd',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com',
            },
        };

        try {
            console.log(options);
            const response = await axios.request(options);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    useEffect(() => {
        console.log(loading);
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

    return (
        <>
            <div>Translate</div>
            <button onClick={translateData}>CLICK TO SEND</button>
        </>
    )
}

export default Translate