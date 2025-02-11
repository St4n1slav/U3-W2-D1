import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import { Alert, Spinner } from "react-bootstrap";

class CommentArea extends Component {
  state = {
    reviews: [],
    fetched: false,
  };

  fetchComments = async () => {
    const resp = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2FiNjMwYjc1NzBiNjAwMTU2ZjAzZmIiLCJpYXQiOjE3MzkyODUyNTksImV4cCI6MTc0MDQ5NDg1OX0.2LdPrzxVo8Qa80ss9ELGuo1gJMRScGhwdOb57TxWHWs",
      },
    });

    if (resp.ok) {
      const reviews = await resp.json();
      console.log(reviews);

      //   this.setState({reviews: reviews})
      this.setState({ reviews, fetched: true });
    }
  };

  componentDidMount() {
    console.log("componentDidMount()");
    this.fetchComments();
  }

  render() {
    console.log("RENDER COMMENT AREA", this.state.reviews);
    return (
      <div className="commentArea">
        <h6>CommentArea</h6>
        {this.state.fetched ? (
          this.state.reviews.lenght > 0 ? (
            <CommentList reviews={this.state.reviews} fetchComments={this.fetchComments} />
          ) : (
            <Alert variant="info">Non ci sono ancora recensioni</Alert>
          )
        ) : (
          <Spinner animation="border" variant="info" />
        )}

        <AddComment asin={this.props.asin} fetchComments={this.fetchComments} />
      </div>
    );
  }
}

export default CommentArea;
