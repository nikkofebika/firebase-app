import React, { Component } from "react";
import { Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import MyButton from '../../../components/atoms/MyButton'
import { getData, postData, updateData, deleteData } from "../../../config/redux/actions";

const uid = JSON.parse(localStorage.getItem('userData')).uid;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      date: '',
      noteId: '',
      buttonText: 'Simpan',
      formType: 'post'
    }
  }

  componentDidMount() {
    this.props.handleGetData(uid)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmitForm = async (e) => {
    e.preventDefault();
    const { title, content } = this.state
    const dataToPost = {
      title: title,
      content: content,
      date: new Date(),
      userId: uid
    }

    if (this.state.formType === 'post') {
      const res = await this.props.handlePostData(dataToPost).catch(err => console.log(err))
      if (res) {
        this.setState({
          title: '',
          content: '',
          date: '',
        })
      }
    } else {
      dataToPost.noteId = this.state.noteId;
      this.props.updateData(dataToPost);
      this.setState({
        title: '',
        content: '',
        date: '',
        noteId: '',
        buttonText: 'Simpan',
        formType: 'post'
      })
    }
  }

  handleDeleteData = (noteId) => {
    this.props.deleteData(uid,noteId)
  }

  handleUpdateData = (note) => {
    this.setState({
      title: note.data.title,
      content: note.data.content,
      noteId: note.id,
      buttonText: "Update",
      formType: "update",
    })
  }

  handleCancel = () => {
    this.setState({
      title: '',
      content: '',
      buttonText: "Simpan",
      formType: "post",
    })
  }


  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmitForm}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" onChange={(e) => this.handleChange(e)} type="text" value={this.state.title} required placeholder="Title" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Content</Form.Label>
                <Form.Control name="content" onChange={(e) => this.handleChange(e)} as="textarea" rows={3} value={this.state.content} required placeholder="Content" />
              </Form.Group>
              {
                this.state.buttonText === "Update" && <MyButton title="Cancel" type="button" variant="warning" className="mr-2" onClick={this.handleCancel} />
              }
              <MyButton title={this.state.buttonText} type="submit" isLoading={this.props.isLoading} />
            </Form>
            <hr />
            {
              this.props.datas.length > 0 ? (
                <ListGroup>
                  {
                    this.props.datas.map(note => {
                      return (
                        <ListGroup.Item key={note.id}>
                          <h4>{note.data.title}</h4>
                          <p>Created : {note.data.date}</p>
                          <p>{note.data.content}</p>
                          <div>
                            <MyButton title="Edit" type="button" variant="info" className="mr-1" onClick={() => this.handleUpdateData(note)} />
                            <MyButton title="Hapus" type="button" variant="danger" onClick={()=>this.handleDeleteData(note.id)} />
                          </div>
                        </ListGroup.Item>
                      )
                    })
                  }
                </ListGroup>
              ) : null
            }
          </Col>
        </Row>
      </Container>
    )
  }
}

const reduxState = (state) => {
  return {
    popupProps: state.popup,
    dataUser: state.dataUser,
    isLoading: state.isLoading,
    datas: state.datas,
  }
}

const reduxDispatch = (dispatch) => ({
  handlePostData: (data) => dispatch(postData(data)),
  handleGetData: (data) => dispatch(getData(data)),
  updateData: (data) => dispatch(updateData(data)),
  deleteData: (uid,noteId) => dispatch(deleteData(uid,noteId)),
})

export default connect(reduxState, reduxDispatch)(Dashboard);
