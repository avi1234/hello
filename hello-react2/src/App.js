import { useEffect, useState } from 'react';

import MovieCard from './MovieCard';

import './App.css';

// 8c58d742
const API_URL = 'http://www.omdbapi.com?apikey=8c58d742';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json()
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies" 
                    value={searchTerm}
                    onChange={(e) => setsearchTerm(e.target.value)} 
                />
                <button onClick={() => searchMovies(searchTerm)}>Search</button>
            </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;