import "./AddMovies.module.css";

import { useState } from "react";

const AddMovie = (props) => {
  const [title, setTitle] = useState("");
  const [opening, setOpening] = useState("");
  const [date, setDate] = useState("");

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const openingHandler = (event) => {
    setOpening(event.target.value);
  };

  const dateHandler = (event) => {
    setDate(event.target.value);
  };

  const formHanlder = (event) => {
    event.preventDefault();

    let MoviesData = {
      title: title,
      openingText: opening,
      releaseDate: date,
    };

    props.onSubmitData(MoviesData);
    setDate("");
    setOpening("");
    setTitle("");
  };

  return (
    <>
      <form onSubmit={formHanlder}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={titleHandler} />
        <label htmlFor="opening">Opening Text</label>
        <input
          id="opening"
          type="text"
          value={opening}
          onChange={openingHandler}
        />
        <label htmlFor="releaseDate">Release Date</label>
        <input
          id="releaseDate"
          type="date"
          value={date}
          onChange={dateHandler}
        />
        <button type="submit">Add Movies</button>
      </form>
    </>
  );
};

export default AddMovie;
