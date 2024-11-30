import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
    const [loading, setLoading] = useState(true); 
    const [data, setData] = useState(null);      
    const [error, setError] = useState(null);    

    useEffect(() => {
        let isMounted = true; 

        const fetchData = async () => {
            setLoading(true);
            setError(null); 

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                if (isMounted) {
                    setData(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'Algo salió mal');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url, options]); 

    return { loading, data, error };
}

export default useFetch;
