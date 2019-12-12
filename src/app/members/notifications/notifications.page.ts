import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
userID :any
items : any = [];
limit: number = 10;
  start: number = 0;

  constructor(
    private storage : Storage,
    private postPvdr: PostProvider,
    private loadingController : LoadingController
  ) {}

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  ionViewWillEnter() {
    this.items = [];
    this.loadProspect();
    console.log(this.items)
  }
  ngOnInit() {
    this.storage.get('session_storage').then((userId) => {
      var ID = userId;
      var UserID = ID.map(user => user.id);
      this.userID = parseInt(UserID)
    });
  }

  async loadProspect(){
    const loading = await this.loadingController.create({
      message : "",
      spinner: 'crescent',
      translucent : true,
      cssClass:'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
        let body = {
          aksi : 'getdata',
          limit : this.limit,
          start : this.start,
          };
          this.postPvdr.postData(body, 'LoadProspect.php?Id='+this.userID).subscribe(data =>{
            loading.dismiss().then(()=>{
              for(let item of data){
                this.items.push(item);
            } 
            })
          });
  }
}