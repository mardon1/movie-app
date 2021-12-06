import React, { useState, useEffect } from 'react';
import Movie from './components/Movie';

const FEATURED_API =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0384d79635d1f4935f1d3bf7d879758b&page=';

const IMG_API = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?&api_key=0384d79635d1f4935f1d3bf7d879758b&query=';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const getMovie = async () => {
    const response = await fetch(FEATURED_API);
    const movie = await response.json();
    setMovies(movie.results);
  };

  useEffect(() => {
    getMovie();
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
      setSearchTerm('');
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };
  console.log(movies);
  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.map((movie) => {
          return <Movie data={movie} key={movie.id}></Movie>;
        })}
      </div>
    </>
  );
}

export default App;
