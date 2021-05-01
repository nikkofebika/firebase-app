import React, { Component } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyButton from '../../../components/atoms/MyButton'
import { connect } from "react-redux";
import { registerNewUser } from "../../../config/redux/actions";

class Signup extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    let { email, password } = this.state
    this.props.handleRegisterNewUser({email,password})
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     var user = userCredential.user;
    //     console.log('signup succcess', user)
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log('signup error', errorCode, errorMessage)
    //   });
  }

  render() {
    return (
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={4} className="mt-5 border border-success rounded py-3">
          <h3>Signup here...</h3>
          <hr />
          <Form onSubmit={this.handleSubmitForm}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control name="email" type="email" required placeholder="Enter email" onChange={(e) => this.handleChange(e)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control name="password" type="password" required placeholder="Password" onChange={(e) => this.handleChange(e)} />
            </Form.Group>
            {/* <Button variant="primary" type="submit">Signup</Button> */}
            <MyButton title="Signup" variant="primary" isLoading={this.props.isLoading} type="submit"/>
          </Form>
          <br/>
          <p>Sudah punya akun ? <Link to="/login">Login</Link></p>
        </Col>
      </Row>
    )
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading
})
const reduxDispatch = (dispatch) => ({
  handleRegisterNewUser: (data) => dispatch(registerNewUser(data))
})
export default connect(reduxState, reduxDispatch)(Signup);
