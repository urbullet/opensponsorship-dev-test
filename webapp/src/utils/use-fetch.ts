import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (method: any, url: string, body: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: method,
                    url: url,
                    data: body
                });
                const data = await response?.data;

                setApiData(data);
                setIsLoading(false);
            } catch (error: any) {
                setApiError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, method, body]);

    return { isLoading, apiData, apiError };
};

export default useFetch;
