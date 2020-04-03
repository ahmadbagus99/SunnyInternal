import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.page.html',
  styleUrls: ['./prospect.page.scss'],
})

export class ProspectPage {
  isUploaded:boolean = false;
  itemsProspect: any = [];
  user: any;
  limit: number = 10;
  start: number = 0;
  itemsproduct: any = [];
  itemsProfile: any = [];
  itemsCustomer: any = [];
  totalProspect: number = 0;
  textProspect: string = "You don't have prospect for today";
  textProduct: string = "You haven't added product";
  textCustomer: string = "You don't have customer";
  ProspectTotal : number;
  Move : boolean;
  Images : string;

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storageLocal: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) {
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
    this.LoadCustomer();
    this.loadProspect();
    this.LoadProfile();
    this.loadProduct();
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
      this.postPvdr.Integration(body, 'LoadProduct.php?Id=' + this.user).subscribe(data => {
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
      this.postPvdr.Integration(body, 'LoadProspect.php?Id=' + this.user).subscribe(data => {
        this.storageLocal.set('TotalProspect', data.length);
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
        //Check Something new
        this.storageLocal.get('TotalProspect').then((nProspectbefore)=>{
          this.ProspectTotal = nProspectbefore;
              if ( this.ProspectTotal == data.length){
                this.Move = false;
                console.log('Tidak ada perubahan');
              }else{
                this.Move = true;
                console.log('ada perubahan');
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
      this.postPvdr.Integration(body, 'LoadCustomer.php?Id=' + this.user).subscribe(data => {
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
            this.postPvdr.Integration(body, 'InsertProspect.php').subscribe(_data => {
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

}
