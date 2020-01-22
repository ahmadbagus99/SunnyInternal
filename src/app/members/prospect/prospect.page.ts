import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
}
@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.page.html',
  styleUrls: ['./prospect.page.scss'],
})
export class ProspectPage implements OnInit {
  images: Observable<MyData[]>;
  isUploading:boolean;
  isUploaded:boolean;
  userIDDesc : string = 'profile';
  private imageCollection: AngularFirestoreCollection<MyData>;
  
  userID: string;
  itemsProspect: any = [];
  user: any;
  limit: number = 10;
  start: number = 0;
  itemsNew: any = [];
  itemsproduct: any = [];
  itemsProfile: any = [];
  itemsCustomer: any = [];
  itemTotalProspect: any = [];
  totalProspect: number = 0;
  textProspect: string = "You don't have prospect for today";
  textProduct: string = "You haven't added product";
  textCustomer: string = "You don't have customer";
  url: any;
  ProspectTotal : number;
  itemProspectVerify : any = [];
  prospectVerify : number = 0;
  Move : boolean;

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storageLocal: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private storage: AngularFireStorage, 
    private database: AngularFirestore
  ) {
      this.isUploading = false;
      this.isUploaded = false;
      this.storageLocal.get('session_storage').then((Data) => {
        this.userID = (Data.map(data => data.id)).toString();
      this.imageCollection = database.collection<MyData>(this.userID+this.userIDDesc);
      this.images = this.imageCollection.valueChanges();
      this.images.subscribe((res: MyData[])=>{
        if ( res.length == 1){
          this.isUploaded = true;
        }
      })
    });
  }
  ngOnInit() {
    this.storageLocal.get('TotalProspect').then((data)=>{
      this.ProspectTotal = data;
    })
  }
  ionViewWillEnter() {
    //get ID
    this.storageLocal.get('session_storage').then((ID) => {
      this.user = parseInt(ID.map(data => data.id));
    });
    this.start = 0;
    this.itemsProfile = [];
    this.itemsproduct = [];
    this.itemsCustomer = [];
    this.itemsProspect = [];
    this.itemProspectVerify = [];
    this.LoadCustomer();
    this.loadProspect();
    this.LoadProfile();
    this.loadProduct();
    this.check();
  }
  addprospect() {
    this.router.navigate(['members/addprospect'])
  }
  SeeAllCustomer(param:string) {
    param = 'Kategori';
    this.router.navigate(['members/seeallprospect',param])
  }
  SeeAllProspect(param:string) {
    param = 'Populer';
    this.router.navigate(['members/seeallprospect',param])
  }
  product() {
    this.router.navigate(['members/product'])
  }
  async loadProduct() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProduct.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
            for ( var i=0; i<4; i++){
              this.itemsproduct[i] = data[i]
            }
          var product = this.itemsproduct.length;
          if (product == 0){
            this.textProduct;
          }else if(product >=1 ){
            this.textProduct = '';
          }
        })
      });
  }
  async LoadProfile() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    });
    this
    await loading.present();
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProfile.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          for (let item of data) {
            this.itemsProfile.push(item);
          }
        })
      });
  }
  updateprospect(id, namaCustomer, emailCustomer, alamatCustomer, no_tlp, company, alamatCompany, emailCompany, nomorCompany, customerneed, stock, hargaProduk, totalPrice, budget, status) {
    this.router.navigate(['members/view-prospect/'
      + id + '/'
      + namaCustomer + '/'
      + emailCustomer + '/'
      + alamatCustomer + '/'
      + no_tlp + '/'
      + company + '/'
      + alamatCompany + '/'
      + emailCompany + '/'
      + nomorCompany + '/'
      + customerneed + '/'
      + stock + '/'
      + hargaProduk + '/'
      + totalPrice + '/'
      + budget + '/'
      + status
    ]);
  }
  updateProduct(id, namaProduk, tipeProduk, totalProfit, normalPrice, jumlahProduk, hargaProduk, deskripsiProduk) {
    if (namaProduk == "") {
      namaProduk = " ";
    }
    if (tipeProduk == "") {
      tipeProduk = " ";
    }
    if (totalProfit == "") {
      totalProfit = " ";
    }
    if (jumlahProduk == "") {
      jumlahProduk = " ";
    }
    if (hargaProduk == "") {
      hargaProduk = " ";
    }
    if (deskripsiProduk == "") {
      deskripsiProduk = " ";
    }
    if (normalPrice == "") {
      normalPrice = " "
    }
    this.router.navigate(['members/editproduct/'
      + id + '/'
      + namaProduk + '/'
      + tipeProduk + '/'
      + totalProfit + '/'
      + normalPrice + '/'
      + jumlahProduk + '/'
      + hargaProduk + '/'
      + deskripsiProduk]);
  }
  async loadProspect() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProspect.php?Id=' + this.user).subscribe(data => {
        if (data.length == 0) {
          this.textProspect;
        } else {
          this.textProspect = '';
        }
        loading.dismiss().then(() => {
          for (let item of data) {
            this.itemsProspect.push(item);
          }
        })
      });
  }
 
  async LoadCustomer() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadCustomer.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          for (let item of data) {
            this.itemsCustomer.push(item);
          }
          var customer = this.itemsCustomer.length;
          if (customer == 0){
            this.textCustomer;
          }else if (customer >= 1){
            this.textCustomer = '';
          }
        })
      });
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
          handler: (_blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            let body = {
              aksi: 'delete',
              id: id,
            };
            this.postPvdr.postData(body, 'InsertProspect.php').subscribe(_data => {
              this.ionViewWillEnter();
            });
          }
        }
      ]
    });
    await alert.present();
  }
  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }
  movetoMain() {
    if (this.Move == true){
      this.router.navigate(['dashboard/dashboard/main'])
    }else if (this.Move == false){
      this.router.navigate(['members/dashboard'])
    }
  }
  check(){
    this.storageLocal.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadTotalProspect.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.itemProspectVerify.push(item);
          this.prospectVerify = this.itemProspectVerify.length;
        }
          if ( this.ProspectTotal == this.prospectVerify){
            this.Move = false;
          }else{
            this.Move = true;
          }
      });
    });
  }
}
