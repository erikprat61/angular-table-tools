import { Component } from '@angular/core';
import { ApiMockService, Book } from './api-mock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books$ = new Observable<Book[]>;
  displayedColumns: string[] = ['isbn', 'title', 'author', 'publishDate'];

  constructor(private apiService: ApiMockService) {}

  ngOnInit() {
    this.books$ = this.apiService.getBooks();
  }
}
