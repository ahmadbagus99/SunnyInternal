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
  ImageItems : any = [];
  
  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storageLocal : Storage,
    public alertController: AlertController,
    private actRoute: ActivatedRoute,
    public loadingController : LoadingController,
    private storage: AngularFireStorage,
    private database: AngularFirestore
  ) {
    this.storageLocal.get('session_storage').then(data =>{
      var ID = parseInt(data.map( data => data.id));
      this.imageCollection = database.collection<MyData>(ID+this.Location);
    })
  }
  ionViewWillEnter(){
    this.items = [];
    this.start = 0;
    this.itemsNew = [];
    this.loadImageProduct();
  }
  
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
  async uploadFile(event: FileList) {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      translucent : true,
      cssClass:'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
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
            name: this.namaProduk,
            filepath: resp,
            size: this.fileSize
          });
          let body = {
            aksi:'AddImagesProduct',
            id: this.id,
            Images : resp
          };
          loading.dismiss().then(()=>{
            this.loadImageProduct();
          })
          this.postPvdr.postData(body, 'InsertImages.php').subscribe(data =>{
            console.log(data)
          })
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
    this.actRoute.params.subscribe((data: any) => {
      var ID = data.id;
      const id = ID;
      this.imageCollection.doc(id).set(image).then(resp => {
      }).catch(error => {
        console.log("error " + error);
      });
    });
  }
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
  loadImageProduct(){
    this.storageLocal.get('session_storage').then((IdLogin) => {
      this.user = parseInt((IdLogin.map(data => data.id)));
        let body = {
          aksi: 'getdata',
          limit: this.limit,
          start: this.start,
        };
      this.postPvdr.postData(body, 'LoadProduct.php?Id=' + this.user).subscribe(dataImages => {
        dataImages.forEach(element => {
            if(element.namaProduk == this.namaProduk){
              this.items = element.Images;
            }
        });
      })
    })
  }
}
