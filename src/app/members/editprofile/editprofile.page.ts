import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  fullname: string = "";
  phonenumber: string = "";
  birthday: string = "";
  email: string = "";
  country: string = "";
  userID: string = "";
  items2: any;
  user: any;
  id: number;

  constructor(
    private postPvdr: PostProvider,
    private storage: Storage,
    private actRoute: ActivatedRoute,
    private router: Router,
    private loadingController : LoadingController
  ) { }
//fungsi sebagai mnegupdate profile yang sudah di edit ke server php
  async updateProcess() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
    let body = {
      aksi: 'update',
      id: this.id,
      fullname: this.fullname,
      phonenumber: this.phonenumber,
      birthday: this.birthday,
      email: this.email,
      country: this.country
    };
    this.postPvdr.postData(body, 'InsertProfile.php').subscribe(data => {
      loading.dismiss().then(()=>{
        this.router.navigate(['members/profile']);
      })
    });
  }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.fullname = data.fullname;
      this.phonenumber = data.phonenumber;
      this.birthday = data.birthday;
      this.email = data.email;
      this.country = data.country;
    });
    //fungsi dimana data yang akan di isi langsung ke storge database
    this.storage.get('session_storage').then((iduser) => {
      this.items2 = iduser;
      this.items2 = this.items2.map(user => user.id);
      this.user = parseInt(this.items2)
      this.userID = this.user;
    });
  }
//fungsi sebagai add/edit id user yang baru
  createdProcess() {
    return new Promise(resolve => {
      let body = {
        aksi: 'add',
        fullname: this.fullname,
        phonenumber: this.phonenumber,
        birthday: this.birthday,
        email: this.email,
        country: this.country,
        userID: this.userID
      };
      this.postPvdr.postData(body, 'InsertProfile.php').subscribe(data => {
        console.log('Ok');
      });
    });
  }

}
