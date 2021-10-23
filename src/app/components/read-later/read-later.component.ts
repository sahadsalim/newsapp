import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-read-later',
  templateUrl: './read-later.component.html',
  styleUrls: ['./read-later.component.css']
})
export class ReadLaterComponent implements OnInit {

  constructor(private router: Router, public api: ApiService) {}

  ngOnInit(): void {
  }
  remove(item:any){
    this.api.readMeLater=this.api.readMeLater.filter((val:any)=>val.title===item.title);
  }
}
