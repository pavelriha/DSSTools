import { Injectable } from '@angular/core';

export class Bookmark {
  name: string;
  repo: string;
  dt?: number[];
  actors?: number[];
  milestones?: number[];
  reasons?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarks: Bookmark[];

  constructor() { 

    this.bookmarks = JSON.parse(localStorage.getItem('bookmarks_v1'))??[];

  }


  // getBookmars(): Bookmark[] {
  //   return this.bookmarks;
  // }

  addBookmark(bm: Bookmark) {
    this.bookmarks.push(bm);
    this.save();
  }

  delBookmark(index: number) {
    console.log('del bookmark', index);
    this.bookmarks.splice(index, 1);
    this.save();
  }

  save() {
    localStorage.setItem('bookmarks_v1', JSON.stringify(this.bookmarks) );
  }
}
