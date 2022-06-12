import axios from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'

//Movie.jsx
export const Movie = ({ movie }) => {
  return (
    <div className='movie' style={{ marginLeft: 10 }}>
      <div className='poster'>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie poster" height={250} width={200} />
      </div>
      <h2 style={{ lineBreak: 'strict', width: 200 }}>{movie.original_title}</h2>
    </div>
  )
}

const App = () => {
  const [movies, setMovies] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const loadingRef = useRef(null)
  const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDM4ZWI5NmY3ZDM0N2FiOGMyNDE2NzA0MGJiNjAxZCIsInN1YiI6IjYyN2E2YWNjMDcyOTFjMDA1MGVlOGZjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pAgqoIDTbbYEcAWxg-mUg1crjfRLJz7G4TMHQXvdQSU'

  const fetchMovies = useCallback(async () => {
    if (pageNumber > 0) {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/4/discover/movie?page=${pageNumber}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        setMovies((movies) => [...movies, ...data.results]);
      } catch (error) {
        console.log(error);
      }
    }
  }, [pageNumber]);

  // fetching data
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // observing dom node
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((page) => page + 1);
        }
      },
      { threshold: 0.5 }
    );
    if (loadingRef.current) observer.observe(loadingRef.current);

    return () => {
      if (observer.current) {
        observer.unobserve(observer.current);
      }
    };
  }, [loadingRef]);

  return (
    //App.js
    <>
      <header>
        <h1>Movies</h1>
        <p>{movies.length} movies</p>
      </header>
      <div className="movies" style={{ display: 'flex', maxWidth: '100vw', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {movies.map((movie) => {
          return <Movie movie={movie} key={movie.id} />;
        })}
      </div>
      <div className="loader" ref={loadingRef}>
        <h3>Loading....</h3>
      </div>
    </>
  )
}

export default App