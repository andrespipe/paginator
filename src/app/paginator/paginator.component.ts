import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'afm-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() pagesLength = 0;
  @Input() pageSize = 5;

  @Output() pageChange = new EventEmitter<number>();
  @Output() indexChange = new EventEmitter<number>();

  _currentIndex = 0;
  get currentIndex(): number {
    return this._currentIndex;
  }

  set currentIndex(value: number) {
    this._currentIndex = value;
    this.reportIndex();
  }

  _currentPage = 0;
  get currentPage(): number{
    return this._currentPage;
  }

  set currentPage(value: number) {
    if (value > this.pagesLength - this.pageSize) {
      value = this.pagesLength - this.pageSize;
    }

    if (value < 0) {
      value = 0;
    }

    this._currentPage = value;
    this.reportChange();
  }

  _pages: Array<any>;

  get pages() {
    return this._pages;
  }

  constructor() { }

  ngOnInit() {
    this.initPages();
  }

  initPages() {
    if (!this.pages || this.pages.length < this.pagesLength) {
      this._pages = new Array(this.pagesLength);
    }
  }

  reportIndex() {
    this.indexChange.emit(this.currentIndex);
  }

  reportChange() {
    this.pageChange.emit(this.currentIndex);
  }

  setIndex(index: number) {
    this.currentIndex = index;
  }

  next() {
    if (this.currentIndex < this.pagesLength - 1) {
      this.currentIndex ++;
      this.pageRight();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex --;
      this.pageLeft();
    }
  }

  nextPage() {
    if (this.currentPage < this.pagesLength - this.pageSize) {
      this.currentPage ++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage --;
    }
  }

  pageRight() {
    const { currentIndex, isCurrentVisible } = this;
    if (isCurrentVisible) {
      this.nextPage();
    } else {
      this.currentPage = currentIndex;
    }
  }

  pageLeft() {
    const { currentIndex, pageSize, isCurrentVisible } = this;
    if (isCurrentVisible) {
      this.prevPage();
    } else {
      this.currentPage = currentIndex - (pageSize - 1);
    }
  }

  get isCurrentVisible() {
    const { currentPage, currentIndex, pageSize } = this;
    return currentIndex >= currentPage && currentIndex < (currentPage + pageSize);
  }
}
