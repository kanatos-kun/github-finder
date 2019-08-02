import React, { Component } from "react";
import NavBar from "./components/layout/NavBar";
import "./App.css";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import axios from "axios";
class App extends Component {
  state = { users: [], loading: false };

  //Search Github users
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&
                client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
                client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  //Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  render() {
    const { users, loading } = this.state;
    return (
      <div className="App">
        <NavBar />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
