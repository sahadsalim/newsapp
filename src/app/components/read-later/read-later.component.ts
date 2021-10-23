import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-read-later',
  templateUrl: './read-later.component.html',
  styleUrls: ['./read-later.component.css'],
})
export class ReadLaterComponent implements OnInit {
  constructor(private router: Router, public api: ApiService) {}
  num_article!: number;
  pageSize: number = 10;
  pageIndex: number = 1;
  numberOfPages!: number;
  viewList: any;
  ngOnInit(): void {
    this.num_article = this.api.readMeLater.length;
    this.numberOfPages = Math.ceil(this.num_article / this.pageSize);
    this.getData();
  }
  getData() {
    const trimStart = (this.pageIndex - 1) * this.pageSize;
    const trimEnd = trimStart + this.pageSize;
    this.viewList = this.api.readMeLater.slice(trimStart, trimEnd);
  }
  remove(item: any) {
    this.api.readMeLater = this.api.readMeLater.filter((val: any) => val.title !== item.title);
    this.api.showSuccess('removed from the list successfully');
    this.getData();
  }
  handlePageEvent(event: PageEvent) {
    this.num_article = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.getData();
  }
}
