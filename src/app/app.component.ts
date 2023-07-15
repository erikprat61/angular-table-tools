import { Component } from '@angular/core';
import { ApiMockService, Book } from './api-mock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books: Book[] = [];

  constructor(private apiService: ApiMockService) {}

  ngOnInit() {
    this.books = this.apiService.getBooks();
  }
}
