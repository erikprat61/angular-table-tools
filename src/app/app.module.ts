import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SortColumnComponent } from './sort-column/sort-column.component';
import { TextColumnFilterComponent } from './text-column-filter/text-column-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    SortColumnComponent,
    TextColumnFilterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
