import { useEffect, useState } from 'react';
import './App.css';

const API = "https://api.themoviedb.org/3/discover/movie?api_key=1fc287233f30622fef682d092ea3f4c4";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API);
        const data = await response.json();
        console.log(data.results);
        setMovies(data.results)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        alert('Something went wrong. try again later.')
      }
    }
    fetchMovies();
  }, [])

  const handleSort = (sortby) => {
    switch (sortby) {
      case 'popularity':
        setMovies([...movies].sort((a, b) => b.popularity - a.popularity));
        break;
      case 'release_date':
        setMovies([...movies].sort((a, b) => b.release_date.localeCompare(a.release_date)));
        break;
      case 'vote_average':
        setMovies([...movies].sort((a, b) => b.vote_average - a.vote_average));
        break;
      default:
        movies?.sort((a, b) => b.popularity - a.popularity);
        break;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie App</h1>
      </header>
      <section>
        <select className='App-sort' onChange={(e) => handleSort(e?.target?.value)}>
          <option>Sort by</option>
          <option value="popularity">Popularity</option>
          <option value="release_date">Release date</option>
          <option value="vote_average">Votes</option>
        </select>
      </section>
      {isLoading && <div className="loader">loading movies...</div>}
      {!isLoading && <main>
        <section className='App-movies'>
          {movies.map((movie) =>
            <div className='App-movie-container'>
              <img  className='App-movies-img' src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt={movie?.title} />
              <h2 key={movie.id}>{movie?.title}</h2>
              <h4>{movie?.release_date}</h4>
              <h5>{movie?.vote_average}</h5>
              <p>{movie?.overview}</p>
            </div>
          )}
        </section>
        </main>}
    </div>
  );
}

export default App;
