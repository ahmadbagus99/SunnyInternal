import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
    isUploading: boolean = false;
    isUploaded: boolean = false;
    items: any = [];
    limit: number = 10;
    start: number = 0;
    user: any;
    Images: string;
   
    constructor(
      private router: Router,
      private postPvdr: PostProvider,
      private storageLocal: Storage,
      public loadingController: LoadingController,
      public alertCtrl : AlertController,
    ) { 
    }
    ionViewWillEnter() {
      this.items = [];
      this.start = 0;
      this.LoadProfile();
    }
    
  editprofile() {
    this.router.navigate(['members/editprofile']);
  }
  EditProfile(id, fullname, phonenumber, birthday, email, country) {
    if(phonenumber==''){
      phonenumber= ' '
    }
    if(country==''){
      country=' '
    }
    this.router.navigate(['members/editprofile/' + id + '/' + fullname + '/' + phonenumber + '/' + birthday + '/' + email + '/' + country]);
  }
  async LoadProfile() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
    this.storageLocal.get('session_storage').then((Data) => {
      this.user = (Data.map(data => data.id)).toString();
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.Integration(body, 'LoadProfile.php?Id=' + this.user).subscribe(data => {
        var img = data.map(element => element.Images);
          //Check Images
          if (img.length != 0){
            this.Images = img;
            this.isUploaded = true;
          }else{
            this.isUploaded = false;
          }
        loading.dismiss().then(() => {
          for (let item of data) {
            this.items.push(item);
          }
        })
      });
    });
  }
}