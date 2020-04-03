import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";

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
  public searchTerm: string = ""; 
  selectCategory ='Populer';
  textNew = "No Recent Contact Added";
  text = "No Recent Contact";
    constructor(
      private router : Router,
      private postPvdr : PostProvider,
      private storage : Storage,
      public alertController : AlertController,
      public loadingController : LoadingController,
      public dataService : DataService
    ) { 
    }
    ngOnInit() {
      this.setFilteredItems();
    }
    ionViewWillEnter(){
      this.storage.get('session_storage').then((ID) => {
        this.user = parseInt(ID.map(data => data.id));
      });
      this.items = [];
      this.start = 0;
      this.itemsNew = [];
      this.loadContact();
      this.loadContactNew();
    }
    addcontact(){
      this.router.navigate(['members/addcontact'])
    }
    deleteContact(id){
      let body = {
        aksi : 'delete',
        id : id,
        };
        this.postPvdr.Integration(body, 'InsertContact.php').subscribe(data =>{
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
      if(NPWP==""){
        NPWP=0
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
        this.postPvdr.Integration(body, 'LoadContact.php?Id='+this.user).subscribe(data =>{
          if(data.length == 0){
            this.text;
          }else{
            this.text = '';
          }
          loading.dismiss().then(()=>{
            this.isLoaded = true;
              for(let item of data){
                this.items.push(item);
            } 
          })
        });
    }

    loadContactNew(){
      let body = {
        aksi : 'getdata',
        limit : this.limit,
        start : this.start,
      };
      this.postPvdr.Integration(body, 'LoadContactNew.php?Id='+this.user).subscribe(data =>{
        if (data.length == 0){
          this.textNew;
        }else{
          this.textNew = '';
        }
        for(let item of data){
          this.itemsNew.push(item);
        } 
      });
    }

    arrayOne(n: number): any[] {
      return Array(n);
    }

    async Delete(id) {
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
                aksi : 'Contact',
                id : id,
                };
                this.postPvdr.Integration(body, 'Delete.php').subscribe(data =>{
                  this.ionViewWillEnter();
                });
            }
          }
        ]
      });
      await alert.present();
    }

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
        this.router.navigate(['members/dashboard']);
    }
  }


