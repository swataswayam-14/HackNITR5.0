import React, { useState, useEffect } from 'react';

const YourComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/getdetails');
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Hardcoded timestamps
    const timestamps = Array.from({ length: 100 }, (_, index) => ({
        range: `(${index * 180}-${(index + 1) * 180})`,
        yesNo: data[index]?.yesNo || '',
        emotionState: data[index]?.emotionState || '',
    }));

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Yes/No</th>
                        <th>Emotion State</th>
                    </tr>
                </thead>
                <tbody>
                    {timestamps.map((timestamp, index) => (
                        <tr key={index}>
                            <td>{timestamp.range}</td>
                            <td>{data[index]?.yesNo || ''}</td>
                            <td>{data[index]?.emotionState || ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default YourComponent;