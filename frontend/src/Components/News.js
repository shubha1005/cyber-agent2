import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const News = () => {
    const [news, setNews] = useState([]);
    const API_KEY = '866a8cdb24664f768d5e6fccaa3c9565';
    const Query = 'CyberSecurity India'
    const URL = `https://newsapi.org/v2/everything?q=${Query}&apiKey=${API_KEY}`;

    useEffect(() => {
        axios
            .get(URL)
            .then((response) => setNews(response.data.articles))
            .catch((error) => console.error('Error fetching news:', error));
    }, [URL]);

    return (
        <div style={{ padding: '20px' }} >
            <h2 >CYBERSECURITY</h2>
            {news.length > 0 ? (
                news.map((article, index) => (
                    <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }} className='news-header'>
                        <h3>{article.title}</h3>
                        <p>{article.description || 'No description available.'}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" style={{color:'white'}}>
                            Read More
                        </a>
                    </div>
                ))
            ) : (
                <p>Loading news...</p>
            )}
        </div>
    );
};

export default News;