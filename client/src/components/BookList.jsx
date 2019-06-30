import React, { Component } from "react";
import {
  Button,
  Card,
  Image,
  Item,
  Label,
  Icon,
  Input
} from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

const paragraph = (
  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
);

class BookList extends Component {
  state = {
    books: []
  };
  componentDidMount() {
    axios
      .get("/api/getbooks")
      .then(res => {
        console.log(res.data);
        this.setState({
          books: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    var cardWidth = document.body.clientWidth - 170;
    const bookList = this.state.books.length ? (
      this.state.books.map(book => {
        return (
          <Item key={book.BookID}>
            <Item.Image src={book.BookPhoto} size="small" />
            <Item.Content>
              <Item.Header as="a">{book.BookName}</Item.Header>
              <Item.Meta style={{ margin: "20px 0 20px 0" }}>
                <div style={{ margin: "0 0 10px 0" }}>
                  <span className="cinema">
                    Origin Price: ${book.BookCostPrice}
                  </span>
                </div>
                <div style={{ margin: "0 0 10px 0" }}>
                  <span className="cinema">
                    Sale Price: ${book.BookSalePrice}
                  </span>
                </div>
                <div style={{ margin: "0 0 10px 0" }}>
                  <span className="cinema">ISBN: {book.BookISBN}</span>
                </div>
              </Item.Meta>
              <Item.Description
                style={{ margin: "20px 0 0 0", height: "75px" }}
              >
                {book.BookContent}
              </Item.Description>
              <Item.Extra style={{ margin: "0 0 0 0" }}>
                <Link to={"/books/" + book.BookID}>
                  <Button primary floated="right">
                    More infos
                    <Icon name="right chevron" />
                  </Button>
                </Link>
                <Label>{book.BookCategory}</Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        );
      })
    ) : (
      <div>No books yet</div>
    );
    return (
      <div>
        <Card
          style={{ width: cardWidth, display: "flex", margin: "10px 0 10px 0" }}
        >
          <Card.Content>
            <Card.Header as="h1" style={{ margin: "5px 0 30px 0" }}>
              My Published Books
            </Card.Header>
            <Card.Group
              style={{ justifyContent: "center", margin: "0 0 20px 0" }}
            >
              <Item.Group divided style={{ width: cardWidth - 200 }}>
                {bookList}
              </Item.Group>
            </Card.Group>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default BookList;
