import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Loader
} from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateId, updateToken } from "../actions/UpdateActions";
import axios from "axios";
import Logo from "../images/logo.png";

class Login extends Component {
  state = {
    email: "",
    psw: "",
    alert: false,
    load: false,
    list: [
      "Email format must conform to the specification.",
      "Password must be at least six characters."
    ]
  };

  vertifyFormat = () => {
    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return pattern.test(this.state.email) && this.state.psw.length >= 6;
  };

  sendLoginRequest = () => {
    if (this.vertifyFormat()) {
      this.setState({
        alert: false,
        load: true
      });
      axios
        .post("/auth/login", {
          email: this.state.email,
          psw: this.state.psw
        })
        .then(res => {
          console.log(res);
          if (res.data.status == true) {
            this.props.updateId(res.data.id);
            this.props.updateToken(res.data.token);
            this.props.history.push("/home");
          } else {
            this.setState({
              list: [
                "Wrong password, try again.",
                "User does not exist, please click sign up."
              ],
              alert: true
            });
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        alert: true
      });
    }
  };

  render() {
    var alert =
      this.state.alert === false ? (
        <div />
      ) : (
        <Message
          error
          header="Could you check something!"
          list={this.state.list}
        />
      );
    var load = this.state.load === false ? <div /> : <Loader />;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh", background: "#f6f6e9" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={Logo} />
            Log-in to your B::kzilla
          </Header>
          <Form size="large" error active>
            <Segment>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={event => {
                  this.setState({
                    email: event.target.value
                  });
                }}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={event => {
                  this.setState({
                    psw: event.target.value
                  });
                }}
              />
              {alert}
              {load}
              <Button
                color="teal"
                fluid
                size="large"
                onClick={this.sendLoginRequest}
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us?
            <NavLink to="/signup">
              <a href="#"> Sign Up</a>
            </NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updateToken: token => {
      dispatch(updateToken(token));
    },
    updateId: id => {
      dispatch(updateId(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
