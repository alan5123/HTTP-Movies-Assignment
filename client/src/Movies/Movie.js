import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const routeToEditForm = e => {
    e.preventDefault();
    history.push(`/update-movie/${match.params.id}`);
  };

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };
const deletemovie = e => {
  e.preventDefault()

  axios.delete(`http://localhost:5000/api/movies/${e}`)
  .then(res => {
    props.getMovieList(res.data);
    history.push("/movie-list")

  })
}
  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick = {routeToEditForm}>Edit</button>
      <button onClick = {deletemovie}>Delete</button>
    </div>
    
  );
}

export default Movie;
