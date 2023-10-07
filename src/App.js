import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://dummy-react-app-e1574-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      const loadedData = [];

      for (const key in data) {
        loadedData.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }
      setMovies(loadedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const movieDataHandler = async (movie) => {
    const response = await fetch(
      "https://dummy-react-app-e1574-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log("inside app js file", data);
  };

  const deleteHandler = async (id) => {
    const url = `https://dummy-react-app-e1574-default-rtdb.firebaseio.com/movies/${id}.json`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Delete request failed");
      }

      console.log("Movie deleted successfully");
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onSubmitData={movieDataHandler} />
      </section>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && (
          <MoviesList movies={movies} onDelete={deleteHandler} />
        )}
        {!isLoading && movies.length === 0 && !error && <p>No Movies Found</p>}
        {isLoading && !error && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
