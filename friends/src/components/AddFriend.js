import React, {useState} from 'react';
import axios from 'axios';


const Form = props => {
    console.log("Form props:", props);
    const [note, setNote] = useState({
      id: 1,
      name: "",
      age: "",
      email: ""
    });
  
    const handleChanges = e => {
      console.log(note);
    
      setNote({
        ...note,
        [e.target.name]: e.target.value
      });
    };

    const submitForm = (e) => {
        e.preventDefault();

        const newFriend = {
            id: note.id,
          name: note.name,
          age: note.age,
          email: note.email
        };
    
        return axios
          .post(`http://localhost:5000/api,friends`, newFriend)
          .then(response => {
            console.log(response);
            setNote([...note, newFriend]);
          })
          .catch(error => {
            console.log("Sorry no More friends allowed", error);
          });
    };
  
    return (
      <form onSubmit={submitForm}>
        <div className="formdiv">
          <div className="namestuff">
            <label htmlFor="title">Name </label>
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleChanges}
              value={note.name}
            />
          </div>
          
          <div className="namestuff">
            <label htmlFor="age">Age </label>
            <input
              id="height"
              type="text"
              name="age"
              onChange={handleChanges}
              value={note.age}
            />
          </div>

          <div className="namestuff">
            <label htmlFor="email">Email </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleChanges}
              value={note.email}
            />
          </div>

          <button type="submit">Add Friend</button>
        </div>
      </form>
    );
};
  
export default Form;