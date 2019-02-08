import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "./../../ducks/reducer";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }
  componentDidMount = () => {
    const { id } = this.props;
    if (id) {
      // user info exists on redux, so boot to other page
      this.props.history.push("/private");
    } else {
      // user info not on redux, so double check sessions
      axios
        .get("/api/user")
        .then(res => {
          // user info on sessions, so boot to other page
          this.props.updateUser(res.data);
          this.props.history.push("/private");
        })
        .catch(err => {
          // user info not on sessions, so don't move
        });
    }
  };
  handleChange = (prop, val) => {
    this.setState({
      [prop]: val
    });
  };
  register = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/register", { username, password })
      .then(res => {
        this.props.updateUser(res.data);
        this.props.history.push("/private");
      })
      .catch(err => {
        console.log(err);
      });
  };
  login = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/login", { username, password })
      .then(res => {
        this.props.updateUser(res.data);
        this.props.history.push("/private");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { username, password } = this.state;
    return (
      <div className="Login">
        <input
          value={username}
          onChange={e => this.handleChange("username", e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={e => this.handleChange("password", e.target.value)}
        />
        <button onClick={this.login}>Login</button>
        <button onClick={this.register}>Register</button>
      </div>
    );
  }
}
//State aka data
const mapS2P = reduxState => {
  return {
    id: reduxState.id
  };
};
//Methods aka actions
const dispatch = {
  updateUser
};
export default connect(
  mapS2P,
  dispatch
)(Login);
