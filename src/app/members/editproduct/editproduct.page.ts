import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
//Firebase
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
  selector: 'app-editproduct',
  templateUrl: './editproduct.page.html',
  styleUrls: ['./editproduct.page.scss'],
})
export class EditproductPage implements OnInit {
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  UploadedFileURL: Observable<string>;
  images: Observable<MyData[]>;
  fileName: string = '';
  fileSize: number;

 //Status check 
 isUploading: boolean;
 isUploaded: boolean;
 private imageCollection: AngularFirestoreCollection<MyData>;
 isImgLoaded: boolean;

  id: number;
  user: any;
  Location: string = "Product";
  namaProduk: string = "";
  tipeProduk: string = "";
  totalProfit: string = "";
  jumlahProduk: any = "";
  hargaProduk: string = "";
  deskripsiProduk: string = "";
  category: any;
  nomor : string;
  normalPrice : number = 0;
  items : any = [];
  itemsNew : any = [];
  limit : number = 10;
  start : number = 0;
  status : string;
  
  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storageLocal : Storage,
    public alertController: AlertController,
    private actRoute: ActivatedRoute,
    public loadingController : LoadingController,
    private storage: AngularFireStorage,
    private database: AngularFirestore,
  ) {
    this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
    this.actRoute.params.subscribe((data: any) => {
      var ID = data.id;
      this.imageCollection = database.collection<MyData>(this.Location+ID);
      this.images = this.imageCollection.valueChanges();
      this.isImgLoaded = false;
    })
  }
  ionViewWillEnter(){
    this.items = [];
    this.start = 0;
    this.itemsNew = [];
    this.loadProduct();
  }
  //fungsi sebagai router pemanggil data yang sudah disii ke dalam product
  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.namaProduk = data.namaProduk;
      this.tipeProduk = data.tipeProduk;
      this.totalProfit = data.totalProfit;
      this.normalPrice = data.normalPrice;
      this.jumlahProduk = data.jumlahProduk;
      this.hargaProduk = data.hargaProduk;
      this.category = data.category; 
      this.deskripsiProduk = data.deskripsiProduk;
      this.nomor = data.no_tlp;
    if (this.jumlahProduk == 0){
      this.status="Product is not Available";
    }else{
      this.status="Product is Available";
    }
    });
  }
  uploadFile(event: FileList) {
    const file = event.item(0)
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }
    this.isUploading = true;
    this.isUploaded = false;
 
    this.fileName = file.name;
    const path = `SunnyStorage/${new Date().getTime()}_${file.name}`;
    const customMetadata = { app: 'Sunny Images' };
    const fileRef = this.storage.ref(path);
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
 
        this.UploadedFileURL.subscribe(resp => {
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
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
    const id = this.database.createId();
      //Set document id with value in database
      this.imageCollection.doc(id).set(image).then(resp => {
        console.log(resp);
      }).catch(error => {
        console.log("error " + error);
      });
  }
  //End Function
   // Fungsi untuk menarik/mendapatkan data untuk data edit Produk server php
  updateProduct(id,namaProduk,tipeProduk,totalProfit,normalPrice,jumlahProduk,hargaProduk,deskripsiProduk){
    this.router.navigate(['members/addproduct/'
    +id+'/'
    +namaProduk+'/'
    +tipeProduk+'/'
    +totalProfit+'/'
    +normalPrice+'/'
    +jumlahProduk+'/'
    +hargaProduk+'/'
    +deskripsiProduk]);
  }

  // fungsi untuk membuat baru produk yang akan diisi
  async loadProduct(){
    const loading = await this.loadingController.create({
      message : "",
      spinner: 'crescent',
      translucent : true,
      cssClass:'custom-loader-class',
      mode: 'md'
    })
    await loading.present();
    this.storageLocal.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProduct.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          for (let item of data) {
            this.items.push(item);
          }
        })
      });
    })
  }
  
}
