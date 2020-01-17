import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";
//upload
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

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
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  UploadedFileURL: Observable<string>;
  images: Observable<MyData[]>;
  fileName: string = '';
  fileSize:number;
  //Status check 
  isUploading:boolean;
  isUploaded:boolean;
  userIDDesc : string = 'profile';
  private imageCollection: AngularFirestoreCollection<MyData>;
  
  userID: string;
  items: any = [];
  user: any;
  limit: number = 10;
  start: number = 0;
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
    this.storageLocal.get('session_storage').then((iduser) => {
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
  uploadFile(event: FileList) {
    const file = event.item(0)
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
    console.error('unsupported file type :( ')
    return;
    }
    this.isUploading = true;
    this.isUploaded = false;
    this.fileName = file.name;
    // The storage path
    const path = `SunnyStorage/${new Date().getTime()}_${file.name}`;
    const customMetadata = { app: 'Sunny Images' };
    const fileRef = this.storage.ref(path);
    this.task = this.storage.upload(path, file, { customMetadata });
     // Get file progress percentage
     this.percentage = this.task.percentageChanges();
     this.snapshot = this.task.snapshotChanges().pipe(
        finalize(() => {
          // Get uploaded file storage path
          this.UploadedFileURL = fileRef.getDownloadURL();
          this.UploadedFileURL.subscribe(resp=>{
            this.addImagetoDB({
              name: file.name,
              filepath: resp,
              size: this.fileSize
            });
            this.isUploading = false;
            this.isUploaded = true;
            this.storageLocal.set("Status",this.isUploaded)
          },error=>{
            console.error(error);
          })
        }),
    tap(snap => {
        this.fileSize = snap.totalBytes;
    })
  )
}
addImagetoDB(image: MyData) {
  //Create an ID for document
  this.storageLocal.get('session_storage').then((Data) => {
  this.userID = (Data.map(data => data.id)).toString();
  const id = this.userID + this.userIDDesc;
  this.imageCollection.doc(id).set(image).then(resp => {
    console.log(resp);
  }).catch(error => {
    console.log("error " + error);
  });
});
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
          this.itemTotalProspect.push(item);
          this.totalProspect = this.itemTotalProspect.length;
          if (this.totalProspect == 0) {
            this.text;
          } else if (this.totalProspect >= 1) {
            this.text = '';
          }
        }
        this.storageLocal.set('TotalProspect',this.totalProspect);
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
