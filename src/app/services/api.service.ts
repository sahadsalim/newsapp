import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private articleApi="https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key="+environment.api_key;
  private sectionApi="https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key="+environment.api_key;
  userList:any;
  sections:any;
  sectionSelected!:BehaviorSubject<string>;
  readMeLater:any=[]
  constructor(private http: HttpClient) {
    this.sectionSelected=new BehaviorSubject("");
  }
  getUserList(body: any) {
    let users=<string>localStorage.getItem('users');
    this.userList=JSON.parse(users);
    return of(this.userList);
  }
  getArticle(page:number=1){
    return this.http.get(this.articleApi+"&page="+page);
  }
  getSection(){
    return this.http.get(this.sectionApi);
  }
  // showSuccess(msg:string) {

  // }
  // showError(msg:string) {

  // }

}
