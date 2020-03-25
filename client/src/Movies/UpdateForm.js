import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
    title: '',
    director:'',
    metascore: ''
}

const UpdateForm = props => {
    const { id } = useParams();
    const push = useHistory();
    const [item, setItem] = useState(initialItem);
  
    const changeHandler = ev => {
      ev.persist();
      let value = ev.target.value;
      if (ev.target.name === "price") {
        value = parseInt(value, 10);
      }
  
      setItem({
        ...item,
        [ev.target.name]: value
      });
    };

    useEffect(() => {
        const itemToUpdate = props.movie.find(e => `${e.id}` === id);
        if (itemToUpdate) {
          setItem(itemToUpdate);
        }
      }, [props.movie, id]);
    
      const handleSubmit = e => {
        e.preventDefault();
        
        axios
          .put(`http://localhost:5000/api/movies/${id}`, item)
          .then(res => {
       
            props.getMovieList(res.data);
            push(`/movie-list/${id}`);
          })
          .catch(err => console.log(err));
      };
    
      return (
        <div>
          <h2>Update Item</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              onChange={changeHandler}
              placeholder="title"
              value={item.title}
            />
            <div/>
    
            <input
              type="text"
              name="director"
              onChange={changeHandler}
              placeholder="director"
              value={item.director}
            />
            <div/>
    
            <input
              type="number"
              name="metascore"
              onChange={changeHandler}
              placeholder="metascore"
              value={item.metascore}
            />
            <div/>
    
  
            <button className="md-button form-button">Update</button>
          </form>
        </div>
      );
    };
    
    export default UpdateForm;
    