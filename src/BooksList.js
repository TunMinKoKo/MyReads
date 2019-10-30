import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

class BooksList extends Component {
    render() {
        const books = this.props.books
        return (
            <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter((book) => 
                          book.shelf === 'currentlyReading'
                      ).map((book) => 
                        <Book book={book} updateShelf={this.props.updateShelf} key={book.id}/>
                      )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.filter((book) => 
                          book.shelf === 'wantToRead'
                      ).map((book) => 
                        <Book book={book} updateShelf={this.props.updateShelf} key={book.id}/>
                      )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.filter((book) => 
                          book.shelf === 'read'
                      ).map((book) => 
                        <Book book={book} updateShelf={this.props.updateShelf} key={book.id}/>
                      )}
                    </ol>
                  </div>
                </div>
                <div className="open-search">
                <Link to="/search">
                    Add a book
                </Link>
                </div>
              </div>
        )
    }
}

export default BooksList;