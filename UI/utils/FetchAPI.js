const fetchData = async (url, method, body = null) => {
    try {
        const requestOptions = {
            method,
            headers: { "Content-Type": "application/json" },
            body: body ? JSON.stringify(body) : null
        };

        const response = await fetch(url, requestOptions);
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.log("Error:", data.error);
            return { error: data.error };
        }
    } catch (error) {
        console.log("Error:", error);
        return { error: error.message };
    }
};

export default fetchData;