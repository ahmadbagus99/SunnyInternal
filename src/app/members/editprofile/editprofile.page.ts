import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
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
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
    task: AngularFireUploadTask;
    percentage: Observable<number>;
    snapshot: Observable<any>;
    UploadedFileURL: Observable<string>;
    images: Observable<MyData[]>;
    fileName: string = '';
    fileSize:number;
    isUploading:boolean;
    isUploaded:boolean;
    userIDDesc : string = 'profile';
    private imageCollection: AngularFirestoreCollection<MyData>;

    fullname: string = "";
    phonenumber: string = "";
    birthday: string = "";
    email: string = "";
    country: string = "";
    userID: string = "";
    items2: any;
    user: any;
    id: number;

  constructor(
    private postPvdr: PostProvider,
    private storageLocal: Storage,
    private actRoute: ActivatedRoute,
    private router: Router,
    public alertCtrl : AlertController,
    private loadingController : LoadingController,
    private storage: AngularFireStorage, 
    private database: AngularFirestore
  ) { 
    this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
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
   // upload function
   async uploadFile(event: FileList) {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      translucent : true,
      cssClass:'custom-loader-class',
      mode: 'md'
    })
    await loading.present();
    const file = event.item(0)
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
      const alert = await this.alertCtrl.create({
        header : 'Upload Failed!',
        message: 'Unsupported file type',
        buttons: ['OK']
      })
      await alert.present();
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
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
    // Get file progress percentage
    loading.dismiss().then(()=>{
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges().pipe(
          finalize(() => {
            
            this.UploadedFileURL = fileRef.getDownloadURL();
            this.UploadedFileURL.subscribe(resp=>{
              this.addImagetoDB({
                name: file.name,
                filepath: resp,
                size: this.fileSize
              });
              this.isUploading = false;
              this.isUploaded = true;
            },error=>{
              console.error(error);
            })
          }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
    }) 
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
//fungsi sebagai mnegupdate profile yang sudah di edit ke server php
  async updateProcess() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
    let body = {
      aksi: 'update',
      id: this.id,
      fullname: this.fullname,
      phonenumber: this.phonenumber,
      birthday: this.birthday,
      email: this.email,
      country: this.country
    };
    this.postPvdr.postData(body, 'InsertProfile.php').subscribe(data => {
      loading.dismiss().then(()=>{
        this.router.navigate(['members/profile']);
      })
    });
  }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.fullname = data.fullname;
      this.phonenumber = data.phonenumber;
      this.birthday = data.birthday;
      this.email = data.email;
      this.country = data.country;
    });
    //fungsi dimana data yang akan di isi langsung ke storge database
    this.storageLocal.get('session_storage').then((iduser) => {
      this.items2 = iduser;
      this.items2 = this.items2.map(user => user.id);
      this.user = parseInt(this.items2)
      this.userID = this.user;
    });
  }
//fungsi sebagai add/edit id user yang baru
  createdProcess() {
    return new Promise(resolve => {
      let body = {
        aksi: 'add',
        fullname: this.fullname,
        phonenumber: this.phonenumber,
        birthday: this.birthday,
        email: this.email,
        country: this.country,
        userID: this.userID
      };
      this.postPvdr.postData(body, 'InsertProfile.php').subscribe(data => {
        console.log('Ok');
      });
    });
  }

}
