# ngx-history

`ngx-history` is a small and simple service for [Angular](http://angular.io) which provides `canGoBack` and `canGoForward` detection easier.

`ngx-history` is licensed under [MIT](https://opensource.org/licenses/MIT).

## Installation

`ngx-history` can be installed easily using either `yarn` or `npm` commands in the scope of an angular project.

```bash
yarn add ngx-history --save
# or
npm install ngx-history --save
```

The `NgxHistoryModule` needs to be import in your `root` Angular module (eg `AppModule`).

``` typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { NgxHistoryModule } from 'ngx-history';


@NgModule({
    declarations: [],
    imports: [
      BrowserModule,
      NgxHistoryModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
```

Once the module has been imported, you can easily use dependency injection to get an instance of `HistoryService`.

``` typescript
import { Component } from '@angular/core';
import { HistoryService } from 'ngx-history';

@Component({
  selector: 'my-app',
  templateUrl: 'app.html'
})
export class AppComponent {

  constructor(
    public history: HistoryService
  ) { }
}
```

```html
  ...
  <div id="nav-btns">
    <button [disabled]="!history.canGoBack"
      (click)="history.goBack()">
      Back
    </button>
    <button [disabled]="!history.canGoForward"
      (click)="history.goForward()">
      Forward
    </button>
  </div>
```

## Properties
  * `canGoBack: boolean` - Whether the page can go back
  * `canGoForward: boolean` - Whether the page can go forward
  * `paths: string[]` - Array of navigation history paths

## Methods
  * `goBack()` - Navigate back
  * `goForward()` - Navigate forward
  * `reset(path?: string)` - Reset navigation history
