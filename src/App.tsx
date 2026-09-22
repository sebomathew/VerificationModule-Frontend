import { useState, useEffect } from 'react';

function App() {
    // This creates a state variable to hold the data we get from the API
    const [apiData, setApiData] = useState<string>("Connecting to API...");

    // useEffect runs automatically when the component loads
    useEffect(() => {
        fetch('https://localhost:7144/api/Verification/all')
            .then(response => {
                if (!response.ok) throw new Error("Network response Was Not Ok");
                return response.json(); // Tell React to read the response as JSON data
            })
            .then(data => {
                // Format the JSON data nicely with spacing so it's readable
                setApiData(JSON.stringify(data, null, 2));
            })
            .catch(error => setApiData("Failed to connect:" + error.massage));
    }, []);

    return (
        <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
            <h1>Verification Module</h1>
            <p>Employee data from C# API:</p>
            {/* We use a <pre> tag here to keep the formatting of the JSON spacing */}
            <pre style={{ padding: "15px", background: "#1e1e1e", color: "#d4d4d4", borderRadius: "8px", overflowX: "auto" }}>
                {apiData}
            </pre>
        </div>
    );
}

export default App;