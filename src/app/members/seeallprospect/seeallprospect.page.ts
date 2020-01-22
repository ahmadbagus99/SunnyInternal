import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions  } from '@ionic-native/native-page-transitions/ngx';
import { DataService } from "src/app/services/data.service";

@Component({
  selector: 'app-seeallprospect',
  templateUrl: './seeallprospect.page.html',
  styleUrls: ['./seeallprospect.page.scss'],
})
export class SeeallprospectPage implements OnInit {
  itemsCustomer : any = [];
  items : any = [];
  itemsProspect : any = [];
  itemsNew : any = [];
  limit : number = 10;
  start : number = 0;
  isLoaded = false;
  user : number;
  data : any = [];
  id : string;
  public searchTerm: string = ""; 
  selectCategory :string;
  
    constructor(
      private router : Router,
      private postPvdr : PostProvider,
      private storage : Storage,
      public alertController : AlertController,
      public loadingController : LoadingController,
      private actRoute : ActivatedRoute,
      private nativePageTransitions: NativePageTransitions,
      private dataService: DataService
    ) { 
      setTimeout(() => {
        this.isLoaded = true;
      }, 2000);
    }
  
    ngOnInit() {
      this.actRoute.params.subscribe((data)=>{
        var Data = data.param;
        this.selectCategory = Data;
      })
      this.setFilteredItemsProspect();
      this.setFilteredItemsCustomer();
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

    setFilteredItemsProspect(){
      this.itemsProspect = this.dataService.filterProspect(this.searchTerm);
    }
    setFilteredItemsCustomer(){
      this.itemsCustomer = this.dataService.filterCustomer(this.searchTerm);
    }

    addprospect(){
      let options: NativeTransitionOptions = {
        direction: 'up',
        duration: 600
       };
      this.nativePageTransitions.curl(options);
      this.router.navigate(['members/addprospect'])
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
      this.storage.get('session_storage').then((data)=>{
         var ID = data;
         this.user = parseInt(ID.map( data => data.id));
          let body = {
            aksi : 'getdata',
            limit : this.limit,
            start : this.start,
            };
            this.postPvdr.postData(body, 'LoadProspect.php?Id='+this.user).subscribe(data =>{
              loading.dismiss().then(()=>{
                for(let item of data){
                  this.itemsProspect.push(item);
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
      this.storage.get('session_storage').then((data)=>{
        var ID = data;
        this.user = parseInt(ID.map( data => data.id));
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
      this.storage.get('session_storage').then((data)=>{
        var ID = data;
        this.user = parseInt(ID.map( data => data.id));
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
    arrayOne(n: number): any[] {
      return Array(n);
    }

  }
