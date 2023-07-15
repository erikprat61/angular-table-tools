import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiMockService {

  constructor(private http: HttpClient) { }

  search(queryParams: string): Observable<Book[]> {
    return this.http.get<Book[]>(`https://abcbookstore.com/api/books?${queryParams}`);
  }

  getBooks(isbn?: string, title?: string, author?: string, publishDate?: string): Observable<Book[]> {
    let books = [
      {
        isbn: '1234567890',
        title: 'The Book',
        author: 'Author',
        publishDate: '2023-01-01'
      },
      {
        isbn: '9876543210',
        title: 'Another Book',
        author: 'Another Author',
        publishDate: '2022-12-31'
      },
      {
        isbn: '0123456789',
        title: 'The Third Book',
        author: 'The Third Author',
        publishDate: '2021-11-30'
      },
      {
        isbn: '9012345678',
        title: 'The Fourth Book',
        author: 'The Fourth Author',
        publishDate: '2020-10-31'
      },
      {
        isbn: '8012345679',
        title: 'The Fifth Book',
        author: 'The Fifth Author',
        publishDate: '2019-09-30'
      },
      {
        isbn: '7012345679',
        title: 'The Sixth Book',
        author: 'The Sixth Author',
        publishDate: '2018-08-31'
      },
      {
        isbn: '6012345679',
        title: 'The Seventh Book',
        author: 'The Seventh Author',
        publishDate: '2017-07-31'
      },
      {
        isbn: '5012345679',
        title: 'The Eighth Book',
        author: 'The Eighth Author',
        publishDate: '2016-06-30'
      },
      {
        isbn: '4012345679',
        title: 'The Ninth Book',
        author: 'The Ninth Author',
        publishDate: '2015-05-31'
      }
    ];

    if (isbn) {
      books = books.filter((book) => book.isbn === isbn);
    }
    if (title) {
      books = books.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (author) {
      books = books.filter((book) => book.author.toLowerCase().includes(author.toLowerCase()));
    }
    if (publishDate) {
      books = books.filter((book) => book.publishDate === publishDate);
    }
    return of(books);
  }
}

export interface Book {
  isbn: string;
  title: string;
  author: string;
  publishDate: string;
}