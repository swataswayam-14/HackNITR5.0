import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AnalysisReport() {
  const [keywords, setKeywords] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [videoLink, setVideoLink] = useState('');
  const [isDataFetched, setIsDataFetched] = useState(false); // New state to track data fetching
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
        setIsLoading(true)
      //const encodedUrl = encodeURIComponent(videoLink);
      const response = await fetch(`http://34.31.207.187:8080/speechAndKeywords?query=${videoLink}`);
      const data = await response.json();
      setKeywords(data.keywords.keywords);
      setRecommendations(data.keywords.recommendations);
      console.log(data);
      setIsDataFetched(true); // Data fetched successfully
    } catch (error) {
      console.error(error);
    }finally{
        setIsLoading(false)
    }
  };

  return (
    <div className='container'>
    <input
      type='text'
      onChange={(e) => setVideoLink(e.target.value)}
      value={videoLink}
      placeholder='paste your video link here...'
    />
    <button onClick={fetchData}>Click to see the analysis results</button>
    {isLoading && <p className='loading'>Analysing...</p>}
    {isDataFetched && (
      <div className='results'>
        <h2 className='title'>Analysis Results</h2>
        {keywords?.length > 0 && ( // Optional chaining operator
          <p className='keywords'>
            <b>Keywords:</b> {keywords?.join(', ') || 'No keywords found'}
          </p>
        )}
        {recommendations?.length > 0 && ( // Optional chaining operator
          <div className='recommendations'>
          <h4 className='title'>Recommendations:</h4>
          <ul>
            {recommendations?.map((recommendation, index) => (
              <li className='recommendation' key={index}>
                <a href={recommendation} target="_blank" rel="noreferrer">
                  {recommendation}
                </a>
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
    )}
  </div>
  
  );
}

export default AnalysisReport;
