import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";
import { NativePageTransitions, NativeTransitionOptions  } from '@ionic-native/native-page-transitions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  items : any = [];
  itemsNew : any = [];
  limit : number = 10;
  start : number = 0;
  isLoaded = false;
  user : number;
  data : any = [];
  id : string;
  public searchTerm: string = ""; 
  selectCategory ='Populer';
  fruits = ["Banana", "Orange", "Apple", "Mango"];
  
    constructor(
      private router : Router,
      private postPvdr : PostProvider,
      private storage : Storage,
      public alertController : AlertController,
      public loadingController : LoadingController,
      private dataService: DataService,
      private nativePageTransitions: NativePageTransitions,
    ) { 
      setTimeout(() => {
        this.isLoaded = true;
      }, 2000);
    }
  
    ngOnInit() {
      this.setFilteredItems();
    }

     // Fungsi untuk menambahkan item pada page contact.//
    addcontact(){
      let options: NativeTransitionOptions = {
        direction: 'up',
        duration: 600
       };
      this.nativePageTransitions.curl(options);
      this.router.navigate(['members/addcontact'])
    }

    ionViewWillEnter(){
      this.items = [];
      this.start = 0;
      this.itemsNew = [];
      this.loadContact();
      this.loadContactNew();
    }

    //fungsi button/slide dimana kita bisa langsung hapus kontak di page kontak
    deleteContact(id){
      let body = {
        aksi : 'delete',
        id : id,
        };
        this.postPvdr.postData(body, 'InsertContact.php').subscribe(data =>{
          this.ionViewWillEnter();
        });
    }

    updatecontact(id,nama,email,alamat,tgl_lahir,kelamin,no_tlp,almt_rumah,title,perusahaan,almt_perusahaan,penghasilan,Hobi,Makanan_Favorit,NPWP,Facebook,Twitter,Instagram){
      if(nama==""){
        nama=" "
      }
      if(email==""){
        email=" "
      }
      if(alamat==""){
        alamat=" "
      }
      if(kelamin==""){
        kelamin=" "
      }
      if(no_tlp==""){
        no_tlp=" "
      }
      if(almt_rumah==""){
        almt_rumah=" "
      }
      if(title==""){
        title=" "
      }
      if(perusahaan==""){
        perusahaan=" "
      }
      if(penghasilan==""){
        penghasilan=" "
      }
      if(Hobi==""){
        Hobi=" "
      }
      if(Makanan_Favorit==""){
        Makanan_Favorit=" "
      }
      if(Facebook==""){
        Facebook=" "
      }
      if(Twitter==""){
        Twitter=" "
      }
      if(Instagram==""){
        Instagram=" "
      }
      if(almt_perusahaan==""){
        almt_perusahaan=" "
      }
      this.router.navigate(['members/editcontact/'
      +id+'/'
      +nama+'/'
      +email+'/'
      +alamat+'/'
      +tgl_lahir+'/'
      +kelamin+'/'
      +no_tlp+'/'
      +almt_rumah+'/'
      +title+'/'
      +perusahaan+'/'
      +almt_perusahaan+'/'
      +penghasilan+'/'
      +Hobi+'/'
      +Makanan_Favorit+'/'
      +NPWP+'/'
      +Facebook+'/'
      +Twitter+'/'
      +Instagram]);
    }

    async loadContact(){
      const loading = await this.loadingController.create({
        message : "",
        spinner: 'crescent',
        translucent : true,
        cssClass:'custom-loader-class',
        mode: 'md'
      });
      await loading.present();
      this.storage.get('IdLogin').then((IdLogin)=>{
          this.user = IdLogin;
          let body = {
            aksi : 'getdata',
            limit : this.limit,
            start : this.start,
            };
            this.postPvdr.postData(body, 'LoadContact.php?Id='+this.user).subscribe(data =>{
              loading.dismiss().then(()=>{
                for(let item of data){
                  this.items.push(item);
              } 
              })
            });
        })
    }

    //fungsi database kontak yang baru di buat langsung masuk ke server php
    loadContactNew(){
      this.storage.get('IdLogin').then((IdLogin)=>{
          this.user = IdLogin;
          let body = {
            aksi : 'getdata',
            limit : this.limit,
            start : this.start,
            };
            this.postPvdr.postData(body, 'LoadContactNew.php?Id='+this.user).subscribe(data =>{
              for(let item of data){
                this.itemsNew.push(item);
            } 
            });
        })
    }

    arrayOne(n: number): any[] {
      return Array(n);
    }
  //fungsi sebagai button mengahapus akun dan membuat tampilan text.//
    async presentAlertMultipleButtons(id) {
      const alert = await this.alertController.create({
        header: 'Are you sure?',
        subHeader: '',
        message: '',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Yes',
            handler: () => {
              let body = {
                aksi : 'delete',
                id : id,
                };
                this.postPvdr.postData(body, 'InsertContact.php').subscribe(data =>{
                  this.ionViewWillEnter();
                });
            }
          }
        ]
      });
      await alert.present();
    }
 //fungsi untuk mrefresh item yang masuk.//
    doRefresh(event){
      setTimeout(() => {
        this.ionViewWillEnter();
        event.target.complete();
      }, 500);
    }

    setFilteredItems() {
      this.items = this.dataService.filterContact(this.searchTerm);
    }
    movetoMain(){
      this.router.navigate(['members/main'])
    }
  }


