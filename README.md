# Angular Table Tools
This solution provides a method to incorporate Angular Material table column sorting and filtering using custom forms. It leverages the URL parameter string to maintain the filter state effectively. Each filter in the application simply updates the URL parameters. The table actively listens for changes in the route and automatically runs a search again its data whenever a change in the route is detected.
![image](https://github.com/erikprat61/angular-table-tools/assets/1373059/c3d23429-bcf6-4bc0-b533-b6ca23212d18)

You can even pass the url string directly to the API you're using to populate this table:
``` typescript
ngOnInit(): void {
  this.routeUpdatesSubscription = this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.books$ = this.apiService.search(this.router.url.split('?')[1] ?? '');
    });
}
```
*app.component.ts - line: 20*

This will remove the need for doing any translation from the url parameters to an object. Though, if you want it'd be just as easy to translate it to a GraphQL query.
