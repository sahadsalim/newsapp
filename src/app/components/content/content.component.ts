import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscriber, Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import {PageEvent} from '@angular/material/paginator';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  articles: any;
  sections: any;
  num_article: any;
  article_subscriber!: Subscription;
  section_subscriber!: Subscription;
  sectionSelected: string = '';
  pageIndex = 0;
  pageSize = 10;
  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {}
  getArticles() {
    this.article_subscriber = this.api.getArticle(this.pageIndex).subscribe(
      (data: any) => {
        this.articles = this.sectionSelected
          ? data.results.filter(
              (dataval: any) => dataval.section === this.sectionSelected
            )
          : data.results;
        this.num_article = data.num_results;
      },
      (error: any) => {}
    );
  }
  ngAfterContentInit(): void {
    this.section_subscriber = this.api.sectionSelected.subscribe(
      (section: string) => {
        this.sectionSelected = section;
        this.getArticles();
      }
    );
  }
  ngOnDestroy(): void {
    this.article_subscriber.unsubscribe();
    this.section_subscriber.unsubscribe();
  }
  clearSelectedSection() {
    this.api.sectionSelected.next('');
  }
  addToReadLater(article: any) {
    const newReadLater = this.api.readMeLater.filter(
      (art: any) => art.title !== article.title
    );
    newReadLater.push(article);
    this.api.readMeLater = newReadLater;
  }
  handlePageEvent(event: PageEvent) {
    console.log(event);

    this.num_article = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getArticles();
  }
}
