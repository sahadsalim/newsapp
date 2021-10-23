import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, public api: ApiService) {}
  @ViewChild('sidenav') sidenav!:MatSidenav;
  showFiller = false;
  userName!:string;
  ngOnInit(): void {
    const cuser=sessionStorage.getItem('currentUser');
    this.userName=JSON.parse(<string>cuser).username;
    this.api.getSection().subscribe(
      (data: any) => {
        this.api.sections=data.results;
      },
      (error: any) => {
        this.api.showError(error);

      }
    )
  }
  selectSection(name:string){
    this.api.sectionSelected.next(name);
    this.sidenav.toggle();
    this.api.getArticle()
  }

}
