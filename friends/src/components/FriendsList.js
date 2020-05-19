import React from "react";
// import moment from "moment";
import Loader from "react-loader-spinner";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class FriendsList extends React.Component {
  state = {
    friendsList: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // make a GET request to fetch the data
    // pass the token with the request on the Authorization request header

    axiosWithAuth()
      .get("/api/friends")
      .then(res => {
        console.log(res)
        this.setState({
          friendsList: res.data
        });
      })
      .catch(err => console.log(err.response));
  };

  formatData = () => {
    const formattedData = [];
    console.log(this.state.friendsList);
    this.state.friendsList.map((friend) => {
        formattedData.push({
            name: friend.name,
            age: friend.age,
            email: friend.email
        });
    });
    return formattedData;
  };

  render() {
    const friendsList = this.formatData();
    console.log('return consolelog', friendsList);
    return (
    <div className='friends-container'>
        {this.props.fetchingData && (
          <div className="key spinner">
            <Loader type="Puff" color="#204963" height="60" width="60" />
            <p>Loading Data</p>
          </div>
        )}
        {friendsList.map(f => (
            <div className='friend-card'>
                <h1>Name: {f.name} </h1>
                <h2>age:{f.age} </h2>
                <h3>email: {f.email} </h3>
            </div>
        ))}

    </div>
    )
  }
}

export default FriendsList;