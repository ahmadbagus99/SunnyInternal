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
  ionViewWillEnter() {
    this.itemTotalProspect = [];
    this.LoadTotalProspect();
    
  }

  LoadTotalProspect() {
    this.storage.get('session_storage').then((iduser) => {
      var userID = iduser;
      var newID = userID.map(user => user.id);
      this.userID = parseInt(newID)
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadTotalProspect.php?Id='+this.userID).subscribe(data => {
        for (let item of data) {
          this.itemTotalProspect.push(item);
          this.totalProspect = this.itemTotalProspect.length;
        }
      });
    })
  }
 //fungsi sebagai buttin keluar applikasi/keluar akun
  logout() {
    this.authService.logout();
  }
}