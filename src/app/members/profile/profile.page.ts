import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    
    items: any = [];
    limit: number = 10;
    start: number = 0;
    items2: any;
    user: any;
    userID: string;
    file = File;
    profile: any = [];

    id: string;
    fullname: string;
    phonenumber: string;
    birthday: string;
    email: string;
    country: string;

    constructor(
      private router: Router,
      private postPvdr: PostProvider,
      private storageLocal: Storage,
      public loadingController: LoadingController,
    ) { 
    
    }

  editprofile() {
    this.router.navigate(['members/editprofile']);
  }
  ngOnInit() {

  }

  EditProfile(id, fullname, phonenumber, birthday, email, country) {
    this.router.navigate(['members/editprofile/' + id + '/' + fullname + '/' + phonenumber + '/' + birthday + '/' + email + '/' + country]);
  }

  ionViewWillEnter() {
    this.items = [];
    this.start = 0;
    this.LoadProfile();
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
    this.storageLocal.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProfile.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          for (let item of data) {
            this.items.push(item);
          }
        })
      });
    });
  }

  changeListener($event): void {
    this.file = $event.target.files[0];
    console.log(this.file);
    this.storageLocal.set('images', this.file);
  }


}
