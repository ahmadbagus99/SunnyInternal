import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular'
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
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
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
    
    items: any = [];
    limit: number = 10;
    start: number = 0;
    user: any;
    userID: string;
   
    constructor(
      private router: Router,
      private postPvdr: PostProvider,
      private storageLocal: Storage,
      public loadingController: LoadingController,
      public alertCtrl : AlertController,
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
    ionViewWillEnter() {
      this.items = [];
      this.start = 0;
      this.LoadProfile();
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
  editprofile() {
    this.router.navigate(['members/editprofile']);
  }
  EditProfile(id, fullname, phonenumber, birthday, email, country) {
    this.router.navigate(['members/editprofile/' + id + '/' + fullname + '/' + phonenumber + '/' + birthday + '/' + email + '/' + country]);
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
    this.storageLocal.get('session_storage').then((Data) => {
      this.user = (Data.map(data => data.id)).toString();
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.Integration(body, 'LoadProfile.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          for (let item of data) {
            this.items.push(item);
          }
        })
      });
    });
  }
}