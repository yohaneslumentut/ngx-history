import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HistoryService implements OnDestroy {

  private isProcessing = false;

  private clickBack = false;
  private clickForward = false;

  private previousPath: string;
  private currentIndex = 1;

  public paths: string[];
  public canGoBack = false;
  public canGoForward = false;

  constructor(
    private location: Location,
    private router: Router
  ) {
    this.paths = [];
    this.location.onUrlChange((path: string) => {
      if (this.previousPath !== path) {
        this.previousPath = path;
        if (this.isProcessing) {
          this.urlManuallyChanged();
        } else {
          this.urlChangedByRouter(path);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.paths = undefined;
  }

  private urlManuallyChanged(): void {
    const { currentIndex, paths } = this;
    this.canGoBack = currentIndex === 0 ? false : true;
    this.canGoForward = currentIndex === paths.length - 1 ? false : true;
    this.isProcessing = this.clickBack = this.clickForward = false;
  }

  private urlChangedByRouter(path: string): void {
    const { currentIndex, paths } = this;
    if (currentIndex !== paths.length) {
      this.paths = paths.slice(0, currentIndex + 1);
    }
    this.paths.push(path);
    this.currentIndex = this.paths.length;
    this.canGoForward = false;
    this.canGoBack = true;
  }

  get currentPath(): string {
    return this.location.path();
  }

  private navigateByIndex(index: number): void {
    this.isProcessing = true;
    this.currentIndex = index;
    const path = this.paths[index];
    this.router.navigateByUrl(path);
  }

  goBack(): void {
    this.clickBack = true;
    const { currentIndex, paths } = this;
    const index = currentIndex === paths.length ? currentIndex - 2 : currentIndex - 1;
    this.navigateByIndex(index);
  }

  goForward(): void {
    this.clickForward = true;
    const index = this.currentIndex + 1;
    this.navigateByIndex(index);
  }

  init(path?: string): void {
    const initialRoute = path || this.paths[0];
    this.router.navigateByUrl(initialRoute).then(() => {
      this.paths = [initialRoute];
      this.isProcessing = false;
      this.clickBack = false;
      this.clickForward = false;
      this.canGoForward = false;
      this.canGoBack = false;
    });
  }

  reset() {
    this.init();
  }
}
