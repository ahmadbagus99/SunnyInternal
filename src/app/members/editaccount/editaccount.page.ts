import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
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
  selector: 'app-editaccount',
  templateUrl: './editaccount.page.html',
  styleUrls: ['./editaccount.page.scss'],
})
export class EditaccountPage implements OnInit {
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
  Location: string = "Account";

  id: number;
  items2: any;
  user: any;
  nama: string = "";
  web: string = "";
  phone: string = "";
  kelamin: string = "";
  owner: string = "";
  type: string = "";
  email: string ="";
  title: string = "";
  event_date: string = "";
  category: string = "";
  industry: string = "";
  employee: string = "";
  nomor : string;
  alamat : string;
  items : any = [];
  itemsNew : any = [];
  limit : number = 10;
  start : number = 0;
  url : any;
  check : any;
  isLoaded : boolean;

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storageLocal: Storage,
    public alertController: AlertController,
    private actRoute: ActivatedRoute,
    public loadingController : LoadingController,
    private callNumber : CallNumber,
    private storage: AngularFireStorage,
    private database: AngularFirestore
  ){  
    this.storageLocal.get('session_storage').then(data =>{
      var ID = parseInt(data.map( data => data.id));
      this.imageCollection = database.collection<MyData>(ID+this.Location);
    })
  }

  ionViewWillEnter(){
    this.items = [];
    this.start = 0;
    this.itemsNew = [];
    this.loadImageAccount();
  }
  

//fungsi sebagai router pemanggil data yang sudah disii ke dalam product
  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.nama = data.nama;
      this.alamat = data.alamat;
      this.web = data.web;
      this.phone = data.phone;
      this.kelamin = data.kelamin;
      this.owner = data.owner;
      this.email = data.email;
      this.type = data.type;
      this.category = data.category;
      this.title = data.title;
      this.event_date = data.event_date;
      this.industry = data.industry;
      this.employee = data.employee;
      this.nomor = data.no_tlp;
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
            name: this.nama,
            filepath: resp,
            size: this.fileSize
          });
          let body = {
            aksi:'AddImagesAccount',
            id: this.id,
            Images : resp
          };
          loading.dismiss().then(()=>{
            this.loadImageAccount();
          })
          this.postPvdr.Integration(body, 'InsertImages.php').subscribe(data =>{
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

  updateAccount(id, nama, alamat, web, phone, email, owner, type, event_date, category, industry, employee)
  {
    this.router.navigate(['members/addaccount/'
    +id+'/'
    +nama+'/'
    +alamat+'/'
    +web+'/'
    +phone+'/'
    +email+'/'
    +owner+'/'
    +type+'/'
    +event_date+'/'
    +category+'/'
    +industry+'/'
    +employee])
  }

   //fungsi untuk membuat baru akun yang akan diisi
   loadImageAccount(){
    this.storageLocal.get('session_storage').then((IdLogin) => {
      this.user = parseInt((IdLogin.map(data => data.id)));
        let body = {
          aksi: 'getdata',
          limit: this.limit,
          start: this.start,
        };
        this.postPvdr.Integration(body, 'LoadAccount.php?Id='+this.user).subscribe(dataImages => {
        dataImages.forEach(element => {
            if(element.nama == this.nama){
              this.items = element.Images;
              if ( this.items == ''){
                this.isUploaded = false;
              }else{
                this.isUploaded = true;
              }
            }
        });
      })
    })
  }
//fungsi sebagai untuk menampilkan popup untuk menelepon ke nomor yang sudah diisi di user ke dalam akun 
  call(data){
    var num :string= this.nomor;
    console.log('Memanggil..',num)
    this.callNumber.callNumber(num, true)
    .then(res => console.log("Launched Dialer!", res))
    .catch( err => console.log("Dialer Error", err));
  }
}
