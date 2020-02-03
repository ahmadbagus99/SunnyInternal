import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  items : any = [];
  limit : number = 10;
  start : number = 0;
  items2 : any;
  user : any;
  userID: string;
  loading: any;

  constructor(
    private postPvdr : PostProvider,
    private storage : Storage,
    private router : Router,
    public loadingController : LoadingController
    ) { }

  async ionViewWillEnter(){
      this.items = [];
      this.start = 0;
      this.LoadUser();
      console.log(this.items)
  }
  edit(id, email, password){
    this.router.navigate(['members/edituser/'+id+'/'+email+'/'+password]);
  }

  async LoadUser(){
    const loading = await this.loadingController.create({
        message : "",
        spinner: 'crescent',
        translucent : true,
        cssClass:'custom-loader-class',
        mode: 'md'
    });
    await loading.present();
    this.storage.get('session_storage').then((Data)=>{
      this.user = Data.map( data => data.id);
      let body = {
      aksi : 'getdata',
      limit : this.limit,
      start : this.start,
      };
      this.postPvdr.Integration(body, 'ReadUser.php?Id='+this.user).subscribe(data =>{
        loading.dismiss().then(()=>{
          for(let item of data){
            this.items.push(item);
        } 
        })
        
      });
    });
  }

  // async loading(){
  //   const loading = await this.loadingController.create({
  //     message : "Please Wait..",
  //     duration : 2000,
  //   });
  //   await loading.present();
  // }
  doRefresh(event){
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }
}
