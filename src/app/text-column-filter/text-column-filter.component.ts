import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-column-filter[columnName]',
  templateUrl: './text-column-filter.component.html',
  styleUrls: ['./text-column-filter.component.css']
})
export class TextColumnFilterComponent implements OnInit {
  iconOpacity = '';
  fg = new FormGroup({
    'type': new FormControl(''),
    'value': new FormControl('')
  });

  @Input() columnName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.fg.patchValue({
      type: this.route.snapshot.queryParamMap.get(`${this.columnName}-filter-type`),
      value: this.route.snapshot.queryParamMap.get(`${this.columnName}-filter-value`)
    });

    this.setOpacity();
  }

  onSubmit() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        [`${this.columnName}-filter-type`]: this.fg.get('type')?.value,
        [`${this.columnName}-filter-value`]: this.fg.get('value')?.value
      }
    });

    this.setOpacity();
  }

  onClear() {
    this.fg.reset();
    this.onSubmit();
  }

  private setOpacity() {
    this.iconOpacity =
      this.fg.value['type'] === null
        && this.fg.value['value'] === null
        ? '.25' : '';
  }
}