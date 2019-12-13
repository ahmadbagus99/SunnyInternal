import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'
import { PostProvider } from 'src/providers/post-providers';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userID : number;
  start: number = 0;
  itemTotalProspect = [];
  limit: number = 10;
  totalProspect: number = 0;

  constructor(
    private authService: AuthenticationService,
    private storage : Storage,
    private postPvdr: PostProvider,
    ) {}
 
  ngOnInit() {
  }
}