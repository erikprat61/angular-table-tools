import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sort-column',
  templateUrl: './sort-column.component.html',
  styleUrls: ['./sort-column.component.css']
})
export class SortColumnComponent implements OnInit {
  subs: Subscription[] = [];
  index = 0;
  currentState: SortState;
  states = <SortState[]>[
    { order: null, style: 'opacity: .25', isActive: false },
    { order: 'asc', style: '', isActive: true },
    { order: 'desc', style: 'transform: rotate(180deg)', isActive: true }
  ];

  @Input() columnName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentState = this.states[0];
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('sort-by') === this.columnName) {
      if (this.route.snapshot.queryParamMap.get('sort-order') === 'asc') {
        this.currentState = this.states[1];
        this.index = 1;
      } else {
        this.currentState = this.states[2];
        this.index = 2;
      }
    }

    this.subs.push(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          if (this.route.snapshot.queryParamMap.get('sort-by') !== this.columnName) {
            this.currentState = this.states[0];
            this.index = 0;
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  onClick() {
    this.currentState = this.states[++this.index % 3];

    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        ['sort-by']: this.currentState.isActive ? this.columnName : null,
        ['sort-order']: this.currentState.order
      }
    });
  }
}

interface SortState {
  order: string,
  style: string,
  isActive: boolean
}