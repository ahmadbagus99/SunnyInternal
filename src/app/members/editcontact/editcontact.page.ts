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
  selector: 'app-editcontact',
  templateUrl: './editcontact.page.html',
  styleUrls: ['./editcontact.page.scss'],
})
export class EditcontactPage implements OnInit {
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
  Location: string = "Contact";

  id: number;
  items2: any;
  user: any;
  nama: string = "";
  alamat: string = "";
  tgl_lahir: string = "";
  kelamin: string = "";
  no_tlp: string = "";
  almt_rumah: string = "";
  title: string = "";
  perusahaan: string = "";
  almt_perusahaan: string = "";
  Hobi: string = "";
  Makanan_Favorit: string = "";
  Facebook: string = "";
  Twitter: string = "";
  Instagram: string = "";
  NPWP: string = "";
  userID: string = "";
  penghasilan: string = "";
  category: any;
  nomor : string;
  email : string;
  items : any = [];
  itemsNew : any = [];
  limit : number = 10;
  start : number = 0;
  url : any;
  isLoaded : boolean;
  check : any;

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
    this.loadImageContact();
  }
  //fungsi sebagai router pemanggil data yang sudah disii ke dalam kontak
  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.nama = data.nama;
      this.email = data.email;
      this.alamat = data.alamat;
      this.tgl_lahir = data.tgl_lahir;
      this.kelamin = data.kelamin;
      this.no_tlp = data.no_tlp;
      this.almt_rumah = data.almt_rumah;
      this.title = data.title;
      this.category = data.category;
      this.penghasilan = data.penghasilan;
      this.perusahaan = data.perusahaan;
      this.almt_perusahaan = data.almt_perusahaan;
      this.Hobi = data.Hobi,
      this.Makanan_Favorit = data.Makanan_Favorit,
      this.NPWP = data.NPWP,
      this.Facebook = data.Facebook,
      this.Twitter = data.Twitter,
      this.Instagram = data.Instagram
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
            aksi:'AddImagesContact',
            id: this.id,
            Images : resp
          };
          loading.dismiss().then(()=>{
            this.loadImageContact();
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
  loadImageContact(){
    this.storageLocal.get('session_storage').then((IdLogin) => {
      this.user = parseInt((IdLogin.map(data => data.id)));
        let body = {
          aksi: 'getdata',
          limit: this.limit,
          start: this.start,
        };
        this.postPvdr.postData(body, 'LoadContact.php?Id='+this.user).subscribe(dataImages => {
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
  updatecontact(id,nama,email,alamat,tgl_lahir,kelamin,no_tlp,almt_rumah,title,perusahaan,almt_perusahaan,penghasilan,Hobi,Makanan_Favorit,NPWP,Facebook,Twitter,Instagram){
    this.router.navigate(['members/addcontact/'
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
  
  call(data){
    var num :string= this.nomor;
    console.log('Memanggil..',num)
    this.callNumber.callNumber(num, true)
    .then(res => console.log("Launched Dialer!", res))
    .catch( err => console.log("Dialer Error", err));
  }
 
}