import { Component } from "react";
import { Button, Form } from "react-bootstrap";

class AddComment extends Component {
  state = {
    review: {
      comment: "",
      rate: "1",
      elementId: this.props.asin,
    },
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SUBMIT");

    const resp = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
      method: "POST",
      body: JSON.stringify(this.state.review),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2FiNjMwYjc1NzBiNjAwMTU2ZjAzZmIiLCJpYXQiOjE3MzkyODUyNTksImV4cCI6MTc0MDQ5NDg1OX0.2LdPrzxVo8Qa80ss9ELGuo1gJMRScGhwdOb57TxWHWs",
      },
    });

    if (resp.ok) {
      alert("hai creato una nuova risorsa");
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Label>Commento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Scrivi la recensione"
            value={this.state.review.comment}
            onChange={(e) => this.setState({ review: { ...this.state.review, comment: e.target.value } })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="rate">
          <Form.Label>Voto</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={this.state.review.rate}
            onChange={(e) => this.setState({ review: { ...this.state.review, rate: e.target.value } })}
            required
          >
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="success">
          Invia Recensione
        </Button>
      </Form>
    );
  }
}
export default AddComment;
