import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'
import { PostProvider } from 'src/providers/post-providers';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage  {
  user: number;
  start: number = 0;
  itemTotalProspect = [];
  limit: number = 10;
  totalProspect: number = 0;

  constructor(
    private authService: AuthenticationService,
    private storage : Storage,
    private postPvdr: PostProvider,
    private router : Router
    ) {}
    ionViewWillEnter() {
      // this.itemTotalProspect = [];
      // this.LoadTotalProspect();
    }
    // LoadTotalProspect() {
    //   //getID
    //   this.storage.get('session_storage').then((iduser) => {
    //     var ID = iduser;
    //     this.user = ID.map(data => data.id)
    //     let body = {
    //       aksi: 'getdata',
    //       limit: this.limit,
    //       start: this.start,
    //     };
    //     this.postPvdr.postData(body, 'LoadTotalProspect.php?Id=' + this.user).subscribe(data => {
    //       for (let item of data) {
    //         this.itemTotalProspect.push(item);
    //         this.totalProspect = this.itemTotalProspect.length;
    //       }
    //       this.storage.set('TotalProspect', this.totalProspect)
    //     });
    //   });
    // }
}