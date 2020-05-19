import React from "react";
// import moment from "moment";
import Loader from "react-loader-spinner";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Form from './AddFriend';

class FriendsList extends React.Component {
  state = {
    friendsList: [],
    fetchingData: false
  };

  componentWillMount() {
      this.setState({
          fetchingData: true
      })
    //   console.log('will mount', this.state.fetchingData)
  }
  

  componentDidMount() {
      setTimeout(() => {
        this.getData();
        this.setState({
            fetchingData: false
        })
      }, 1000)
    // console.log('did mount', this.state.fetchingData)
  }

  getData = () => {
    // make a GET request to fetch the data
    // pass the token with the request on the Authorization request header

    axiosWithAuth()
      .get("/api/friends")
      .then(res => {
        // console.log(res)
        this.setState({
          friendsList: res.data
        });
      })
      .catch(err => console.log(err.response));
  };

  formatData = () => {
    const formattedData = [];
    // console.log(this.state.friendsList);
    this.state.friendsList.map((friend) => {
        formattedData.push({
            key: friend.id,
            name: friend.name,
            age: friend.age,
            email: friend.email
        });
    });
    return formattedData;
  };


  render() {
    const friendsList = this.formatData();
    // console.log('return console log', friendsList);
    // console.log('return fetchingdata', this.state.fetchingData)
    return (
    <div className='friends-container'>
        <h1>How much I Love or Loathe my friends list!</h1>
        <Form friend={this.state} />
        <div className='loader' >
            {this.state.fetchingData && (
            <div className="key spinner">
                <Loader type="Puff" color="#204963" height="60" width="60" />
                <p>Loading Data</p>
            </div>
            )}
        </div>

        {friendsList.map(f => (
            <div className='friend-card'>
                <h6>1 = love, 10 = loathe: This friend is a {f.key} </h6>
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