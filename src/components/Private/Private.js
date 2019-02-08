import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateUser, clearUser } from "./../../ducks/reducer";

class Private extends Component {
  componentDidMount = () => {
    const { id } = this.props;
    if (!id) {
      // user info not on redux, so double check sessions
      axios
        .get("/api/user")
        .then(res => {
          // user info on sessions, so don't move
          // add user info to redux
          this.props.updateUser(res.data);
        })
        .catch(err => {
          // user info not on sessions, so boot to the other page
          this.props.history.push("/");
        });
    }
  }
  logout = () => {
    axios
      .post("/auth/logout")
      .then(res => {
        this.props.clearUser();
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { id, username, profile_pic, balance } = this.props;
    return (
      <div className="Private">
        {/* image will not show up yet */}
        <img src={profile_pic} alt="profile" />
        <h1>Welcome {username}</h1>
        <p>Account Number: {id}</p>
        <p>Current Balance: {balance}</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

const mapS2P = reduxState => {
  const { id, username, profile_pic, balance } = reduxState;
  return {
    id,
    username,
    profile_pic,
    balance
  };
};
const dispatch = {
  updateUser,
  clearUser
};
export default connect(
  mapS2P,
  dispatch
)(Private);
