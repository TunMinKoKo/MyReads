import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) =>{
      // set the state
      this.setState({
        books:books
      })
    })
  }

  componentDidMount(){
    this.getAllBooks()
  }

  updateShelf = (updatedBook, shelf) => {
    BooksAPI.update(updatedBook, shelf).then(response => {
      updatedBook.shelf = shelf;
      // update the state
      this.setState(prevState => ({
        books: prevState.books
          // remove updated book from array
          .filter(book => book.id !== updatedBook.id)
          // append the updated book
          .concat(updatedBook)
      }));
    });
  };

  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Route exact path="/" render={() => (
            <div className="list-books-content">
              <BooksList books={this.state.books} updateShelf={this.updateShelf}/>
            </div>
            )} />
            <Route exact path="/search" render={() => (
                <SearchBooks books={this.state.books} updateShelf={this.updateShelf} />
            )} />
          </div>
      </div>
    )
  }
}

export default BooksApp
