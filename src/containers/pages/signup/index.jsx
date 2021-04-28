import React, { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import firebase from '../../../config/firebase'

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
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log('signup succcess', user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('signup error', errorCode, errorMessage)
      });
  }

  render() {
    return (
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={4} className="mt-5 border border-success rounded py-3">
          <h3>Signup here...</h3>
          <hr />
          <Form onSubmit={this.handleSubmitForm}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control name="email" type="email" placeholder="Enter email" onChange={(e) => this.handleChange(e)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
            </Form.Group>
            <Button variant="primary" type="submit">Signup</Button>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default Signup;
