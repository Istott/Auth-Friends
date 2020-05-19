import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Loader from "react-loader-spinner";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
      fetchingData: false
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    // make a POST request to the login endpoint
    // _if_ the creds match what's in the database, the server will return a JSON web token
    // set the token to localStorage (sessions)
    // navigate the user to the "/protected" route
    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then(res => {
        console.log(res);
        setTimeout(() => {
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
        }, 2000)
        this.setState({
            fetchingData: true
        })
        console.log('will mount', this.state.fetchingData)
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
        <div className='loader' >
            {this.state.fetchingData && (
            <div className="key spinner">
                <Loader type="Puff" color="#204963" height="60" width="60" />
                <p>Loading Data</p>
            </div>
            )}
        </div>
      </div>
    );
  }
}

export default Login;
