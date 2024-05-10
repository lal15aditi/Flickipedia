import getData from "../api";
import { useState, useEffect } from 'react';


function useFetch(endPoint) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try{
                setLoading(true);
                setData(await getData(endPoint));
            }
            catch(error){
                setError(error.message);
            }
            finally{
                setLoading(false);
            }
        }
        fetchData();

    }, [endPoint]);

    return [ data, loading, error ];
}

export default useFetch;