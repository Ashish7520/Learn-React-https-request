import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  async function fetchHandler() {
    const response = await fetch("https://swapi.dev/api/films/");

    const data = await response.json();
    console.log(data);
    const transformedData = data.results.map((MoviesData) => {
      return {
        id: MoviesData.episode_id,
        title: MoviesData.title,
        releaseDate: MoviesData.release_date,
        openingText: MoviesData.opening_crawl,
      };
    });
    setMovies(transformedData);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
