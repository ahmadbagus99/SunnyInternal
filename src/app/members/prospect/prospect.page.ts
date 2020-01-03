import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.page.html',
  styleUrls: ['./prospect.page.scss'],
})
export class ProspectPage implements OnInit {
  items: any = [];
  user: any;
  limit: number = 10;
  start: number = 0;
  isLoaded = false;
  selectCategory = 'Populer';
  itemsNew: any = [];
  itemsproduct: any = [];
  itemsProfile: any = [];
  itemsCustomer: any = [];
  itemTotalProspect: any = [];
  totalProspect: number = 0;
  text: string = "You don't have prospect for today!";
  textProduct: string = "You haven't added product";
  textCustomer: string = "Keep follow up your prospect!";
  url: any;
  ProspectTotal : number;
  itemProspectVerify : any = [];
  prospectVerify : number = 0;
  Move : boolean;

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private dataService: DataService,
  ) {
    setTimeout(() => {
      this.isLoaded = true;
    }, 2000);
    this.loadSaved();
  }
  ngOnInit() {
    this.storage.get('TotalProspect').then((data)=>{
      this.ProspectTotal = data;
    })
  }
  ionViewWillEnter() {
    //get ID
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
    });
    this.items = [];
    this.start = 0;
    this.itemsNew = [];
    this.itemsProfile = [];
    this.itemsproduct = [];
    this.itemsCustomer = [];
    this.itemTotalProspect = [];
    this.itemProspectVerify = [];
    this.LoadTotalProspect();
    this.LoadCustomer();
    this.loadProspect();
    this.loadProspectNew();
    this.LoadProfile();
    this.loadProduct();
    this.check();
  }
  addprospect() {
    this.router.navigate(['members/addprospect'])
  }
  SeeAll() {
    this.router.navigate(['members/seeallprospect'])
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
          for (let item of data) {
            this.itemsproduct.push(item);
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
  deleteprospect(id) {
    let body = {
      aksi: 'delete',
      id: id,
    };
    this.postPvdr.postData(body, 'InsertProspect.php').subscribe(_data => {
      this.ionViewWillEnter();
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
        loading.dismiss().then(() => {
          for (let item of data) {
            this.items.push(item);
          }
        })
      });
  }
  loadProspectNew() {
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProspectNew.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.itemsNew.push(item);
        }
      });
  }
  LoadTotalProspect() {
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadTotalProspect.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.itemTotalProspect.push(item);
          this.totalProspect = this.itemTotalProspect.length;
          if (this.totalProspect == 0) {
            this.text;
          } else if (this.totalProspect >= 1) {
            this.text = '';
          }
        }
        this.storage.set('TotalProspect',this.totalProspect);
      });
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
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // this.url = event.target.result;
        this.url = reader.result;
        this.storage.set('Profile', this.url)
      }
    }
  }
  loadSaved() {
    this.storage.get('Profile').then((url) => {
      this.url = url || [];
    });
  }
  movetoMain() {
    if (this.Move == true){
      this.router.navigate(['dashboard/dashboard/main'])
    }else if (this.Move == false){
      this.router.navigate(['members/dashboard'])
    }
  }
  check(){
    this.storage.get('session_storage').then((iduser) => {
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
