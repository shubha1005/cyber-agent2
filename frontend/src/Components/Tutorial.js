import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Tutorials = () => {
    const [videos, setVideos] = useState([]);
    const [userInput, setUserInput] = useState(''); // User's input in the search bar
    const [loading, setLoading] = useState(false);
    const API_KEY = 'AIzaSyBROMwdPa2dutxXOR1ovsvX2NWTeQ3YWKk'; // Replace with your YouTube API Key

    // Function to fetch videos based on query
    const fetchVideos = (query) => {
        setLoading(true);
        const enforcedQuery = `${query} cybersecurity`; // Append "cybersecurity" to every search
        const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${enforcedQuery}&type=video&maxResults=10&key=${API_KEY}`;

        axios
            .get(URL)
            .then((response) => {
                const videoItems = response.data.items.map((item) => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                }));
                setVideos(videoItems);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching YouTube videos:', error);
                setLoading(false);
            });
    };

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();

        // Validate user input: disallow unrelated searches
        const allowedKeywords = ['cybersecurity', 'hacking', 'phishing', 'cryptography', 'owasp', 'network security' , 'malware','owasp top 10' , 'information gathering','how to become hacker','whie-hat hacker','black-hat hacker','penetration testing','information scanning', 'roadmap for cyber-security','roadmap for cyber security','soc analyst','read team in ethical hacking','blue team in ethical hacking','system hacking','sql injection','os command injection','bruteforce attack','what is metasploit','what is nessus','what is burpsuite'];
        const isValid = allowedKeywords.some((keyword) =>
            userInput.toLowerCase().includes(keyword)
        );

        if (isValid) {
            fetchVideos(userInput);
        } else {
            alert('Please enter cybersecurity-related terms only!');
        }
    };

    useEffect(() => {
        // Fetch default videos on component load
        fetchVideos('Cybersecurity');
    }, []);

    return (
        <div style={{ padding: '20px' }} >
            <h2>TUTORIALS</h2>

            {/* Search Bar */}
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Search for CyberSecurity tutorials..."
                    style={{
                        padding: '10px',
                        width: '400px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        marginRight: '5px',
                        marginLeft : '30%',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 15px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width : '140px',
                    }}
                >
                    Search
                </button>
            </form>

            {/* Videos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    videos.map((video) => (
                        <div
                            key={video.id}
                            style={{
                                border: '1px solid #ccc',
                                padding: '10px',
                                borderRadius: '5px',
                            }}
                            className="tutorials-header"
                        >
                            <h3>{video.title}</h3>
                            <div
                                style={{
                                    position: 'relative',
                                    paddingBottom: '56.25%',
                                    height: 0,
                                }}
                            >
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Tutorials;