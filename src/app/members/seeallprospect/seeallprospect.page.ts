import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";
import { NativePageTransitions, NativeTransitionOptions  } from '@ionic-native/native-page-transitions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-seeallprospect',
  templateUrl: './seeallprospect.page.html',
  styleUrls: ['./seeallprospect.page.scss'],
})
export class SeeallprospectPage implements OnInit {
  itemsCustomer : any = [];
  items : any = [];
  itemsNew : any = [];
  limit : number = 10;
  start : number = 0;
  isLoaded = false;
  user : number;
  data : any = [];
  id : string;
  public searchTerm: string = ""; 
  selectCategory ='On Progress';
  
    constructor(
      private router : Router,
      private postPvdr : PostProvider,
      private storage : Storage,
      public alertController : AlertController,
      public loadingController : LoadingController,
      private dataService: DataService,
      private nativePageTransitions: NativePageTransitions,
      private callNumber : CallNumber
    ) { 
      setTimeout(() => {
        this.isLoaded = true;
      }, 2000);
    }
  
    ngOnInit() {
      
    }

    addprospect(){
      let options: NativeTransitionOptions = {
        direction: 'up',
        duration: 600
       };
      this.nativePageTransitions.curl(options);
      this.router.navigate(['members/addprospect'])
    }

    ionViewWillEnter(){
      this.items = [];
      this.start = 0;
      this.itemsNew = [];
      this.itemsCustomer = [];
      this.LoadCustomer();
      this.loadProspect();
      this.loadProspectNew();
    }

    deleteProspect(id){
      let body = {
        aksi : 'delete',
        id : id,
        };
        this.postPvdr.postData(body, 'InsertProspect.php').subscribe(data =>{
          this.ionViewWillEnter();
        });
    }

    updateprospect(id,namaCustomer,emailCustomer,alamatCustomer,no_tlp,company,alamatCompany,emailCompany,nomorCompany,customerneed,stock,hargaProduk,totalPrice,budget,status){
      this.router.navigate(['members/view-prospect/'
      +id+'/'
      +namaCustomer+'/'
      +emailCustomer+'/'
      +alamatCustomer+'/'
      +no_tlp+'/'
      +company+'/'
      +alamatCompany+'/'
      +emailCompany+'/'
      +nomorCompany+'/'
      +customerneed+'/'
      +stock+'/'
      +hargaProduk+'/'
      +totalPrice+'/'
      +budget+'/'
      +status
    ]);
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
      this.storage.get('IdLogin').then((IdLogin)=>{
          this.user = IdLogin;
          let body = {
            aksi : 'getdata',
            limit : this.limit,
            start : this.start,
            };
            this.postPvdr.postData(body, 'LoadProspect.php?Id='+this.user).subscribe(data =>{
              loading.dismiss().then(()=>{
                for(let item of data){
                  this.items.push(item);
              } 
              })
            });
        })
    }

    async LoadCustomer(){
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
            this.postPvdr.postData(body, 'LoadCustomer.php?Id='+this.user).subscribe(data =>{
              loading.dismiss().then(()=>{
                for(let item of data){
                  this.itemsCustomer.push(item);
              } 
              })
            });
        })
    }

    loadProspectNew(){
      this.storage.get('IdLogin').then((IdLogin)=>{
          this.user = IdLogin;
          let body = {
            aksi : 'getdata',
            limit : this.limit,
            start : this.start,
            };
            this.postPvdr.postData(body, 'LoadProspectNew.php?Id='+this.user).subscribe(data =>{
              for(let item of data){
                this.itemsNew.push(item);
            } 
            });
        })
    }

    arrayOne(n: number): any[] {
      return Array(n);
    }

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
                this.postPvdr.postData(body, 'InsertProspect.php').subscribe(data =>{
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
    Moveto(){
      this.router.navigate(['members/prospect']);
    }

  }
