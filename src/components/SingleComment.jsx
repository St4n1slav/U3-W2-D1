import { Component } from "react";
import { Button, ListGroupItem } from "react-bootstrap";

class SingleComment extends Component {
  handleDelete = (id) => {
    fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.review._id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2FiNjMwYjc1NzBiNjAwMTU2ZjAzZmIiLCJpYXQiOjE3MzkyODUyNTksImV4cCI6MTc0MDQ5NDg1OX0.2LdPrzxVo8Qa80ss9ELGuo1gJMRScGhwdOb57TxWHWs",
      },
    }).then((resp) => {
      if (resp.ok) {
        this.props.fetchComments();
      }
    });
  };

  render() {
    return (
      <ListGroupItem className="d-flex justify-content-between">
        <span>{this.props.review.comment}</span> <span>{this.props.review.rate}</span>
        <Button
          variant="danger"
          onClick={() => {
            this.handleDelete();
          }}
        >
          🗑️
        </Button>
      </ListGroupItem>
    );
  }
}

export default SingleComment;
