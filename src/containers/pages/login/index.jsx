import React, { Component } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MyButton from "../../../components/atoms/MyButton";
// import firebase from '../../../config/firebase'
import { loginUser } from "../../../config/redux/actions";

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmitForm = async (e) => {
    e.preventDefault();
    let { email, password } = this.state
    const resultLogin = await this.props.handleLoginUser({ email, password }).catch(err => err)
    if (resultLogin) {
      this.setState({
        email: '',
        password: ''
      })
      this.props.history.push('/')
    } else {
      console.log('login failed')
    }
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     var user = userCredential.user;
    //     console.log('Login succcess', user)
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log('Login error', errorCode, errorMessage)
    //   });
  }

  // handleChangeName = () =>{
  //   this.props.changeName()
  // }

  render() {
    return (
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={4} className="mt-5 border border-success rounded py-3">
          <h3>Login here...</h3>
          <hr />
          <Form onSubmit={this.handleSubmitForm}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control name="email" type="email" placeholder="Enter email" onChange={(e) => this.handleChange(e)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
            </Form.Group>
            <MyButton title="Login" variant="primary" isLoading={this.props.isLoading} type="submit"/>
          </Form>
          <br />
          <p>Belum punya akun ? <Link to="/signup">Daftar</Link></p>
        </Col>
        {/* <Col md={12}>
          <h3>Nama : {this.props.username}</h3>
          <button onClick={this.handleChangeName}>Change Name</button>
        </Col> */}
      </Row>
    )
  }
}

// const actionUsername = () => {
//   return (dispatch) => {
//     setTimeout(() => {
//       return dispatch({type: 'CHANGE_USERNAME', value: 'Nikko FEBIKA'})
//     }, 4000);
//   }
// }

const reduxState = (state) => {
  return {
    isLoading: state.isLoading
    // username: state.username
  }
}

const reduxDispatch = (dispatch) => ({
  handleLoginUser: (data) => dispatch(loginUser(data))
  // changeName: () => dispatch(actionUsername())
})
export default connect(reduxState, reduxDispatch)(Login);
