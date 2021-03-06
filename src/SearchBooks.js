import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
    state = {
        searchBooks: []
      }

    searchBooks = (searchTerm) => {
        if (searchTerm !== '') {
            BooksAPI.search(searchTerm).then((result) =>{
                this.setState({
                    searchBooks: result.error ? [] : result
                })
            })
        }else{
            this.setState({
                searchBooks: []
            })
        }
    }

    checkThumbnail = () => {
        const statebooks = this.state.searchBooks
        statebooks.map((book) =>{
            if (book.imageLinks === undefined) {
                book.imageLinks = {
                    smallThumbnail: ''
                }
              }
        })
    }

    render() {
            this.checkThumbnail();
            const mergedBooks = this.state.searchBooks.map((searchBook) => {
            const intersectedBook = this.props.books.find((book) => {
              return book.id === searchBook.id;
            });
            searchBook.shelf = intersectedBook ? intersectedBook.shelf : 'none';
      
                return searchBook;
        });

        return (
            <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
                {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchBooks(event.target.value)}/>

            </div>
            </div>
            {
                (Array.isArray(mergedBooks) && mergedBooks.length)?(
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {
                                mergedBooks.map((book) => 
                                    <Book book={book} key={book.id} updateShelf={this.props.updateShelf}/>
                                )
                            }
                        </ol>
                    </div>
                ):(
                    <div className="search-books-results">
                        Not Found Any Book
                    </div>
                )
            }
            </div>
        );
    }
}

export default SearchBooks;