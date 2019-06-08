import React from 'react';
import {Container, Box, Button, Heading, Text, TextField} from 'gestalt';
import {setToken} from "../utils";
import ToastMessage from "./ToastMessage";
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class Signin extends React.Component {

  state = {
    username: "",
    password: "",
    toast: false,
    toastMessage: "",
    loading: false
  }

  handleChange = ({event, value}) => {
    event.persist();
    this.setState({
      [event.target.name]: value
    })
  }

  handleSubmit = async event => {
    event.preventDefault();
    const {username, password} = this.state;

    if(this.isFormEmpty(this.state)) {
      this.showToast("Fill in all fields");
      return;
    }


    // Sign In user
    try {
      this.setState({loading: true});
      const response = await strapi.login(username, password);
      this.setState({loading: false});
      setToken(response.jwt);
      console.log(response);
      this.redirectUser("/");

    } catch (error) {
      this.setState({loading: false});
      this.showToast(error.message);
    }
  }

  redirectUser = path => this.props.history.push(path);

  showToast = toastMessage => {
    this.setState({toast: true, toastMessage: toastMessage});
    setTimeout(() => this.setState({toast: false, toastMessage: ""}), 5000);
  }

  isFormEmpty = ({username, password}) => {
    return !username || !password;
  }

  render() {

    const {toastMessage, toast, loading} = this.state;

    return (
      <Container>
        <Box
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: "#d6a3b1"
          }
        }}
        margin={4}
        padding={4}
        shape="rounded"
        display="flex"
        justifyContent="center"
        >
        

        <form style={{
          display: 'inlineBlock',
          textAlign: "center",
          maxWidth: 450
        }}
        onSubmit={this.handleSubmit}
        >

        {/* Sign In form heading */}
          <Box
            marginBottom={2}
            display="flex"
            direction="column"
            alignItems="center"
          >

            <Heading color="midnight">Welcome Back</Heading>

          </Box>
          {/* Username Input */}
          <TextField
            id="username"
            type="text"
            name="username"
            placeholder="username"
            onChange={this.handleChange}
          />

          {/* Password Input */}
          <TextField
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />

          <Button
          inline
          disabled={loading}
          color="blue"
          text="Submit"
          type="submit">

          </Button>

        </form>

        </Box>
        <ToastMessage show={toast} message={toastMessage}/>
      </Container>
    );
  }
}

export default Signin;