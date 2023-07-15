import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiMockService, Book } from './api-mock.service';
import { Observable, Subscription, filter } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  books$ = new Observable<Book[]>;
  routeUpdatesSubscription = new Subscription;
  displayedColumns: string[] = ['isbn', 'title', 'author', 'publishDate'];

  constructor(private apiService: ApiMockService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.routeUpdatesSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.apiService.search(this.router.url.split('?')[1] ?? '');
      });
  }

  ngOnDestroy(): void {
    this.routeUpdatesSubscription.unsubscribe();
  }
}
