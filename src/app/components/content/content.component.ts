import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
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
  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {}
  goTo(url: string) {}
  getArticles() {
    this.article_subscriber = this.api.getArticle().subscribe(
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
}
