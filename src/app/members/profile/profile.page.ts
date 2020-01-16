import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
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
    // Upload Task 
    task: AngularFireUploadTask;

    // Progress in percentage
    percentage: Observable<number>;

    // Snapshot of uploading file
    snapshot: Observable<any>;

    // Uploaded File URL
    UploadedFileURL: Observable<string>;

    //Uploaded Image List
    images: Observable<MyData[]>;

    //File details  
    fileName: string = '';
    fileSize:number;

    //Status check 
    isUploading:boolean;
    isUploaded:boolean;

    userIDDesc : string = 'profile';
    private imageCollection: AngularFirestoreCollection<MyData>;
    
    items: any = [];
    limit: number = 10;
    start: number = 0;
    items2: any;
    user: any;
    userID: string;
    file = File;
    profile: any = [];
    id: string;
    fullname: string;
    phonenumber: string;
    birthday: string;
    email: string;
    country: string;

    constructor(
      private router: Router,
      private postPvdr: PostProvider,
      private storageLocal: Storage,
      public loadingController: LoadingController,
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
      });
    }
    async LoadImages(){
      const loading =  await this.loadingController.create({
        spinner: 'crescent',
        translucent : true,
        cssClass:'custom-loader-class',
        mode: 'md'
      });
      await loading.present();
    }

    // upload start function
    uploadFile(event: FileList) {
      

      // The File object
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

      // Totally optional metadata
      const customMetadata = { app: 'Sunny Images' };

      //File reference
      const fileRef = this.storage.ref(path);

      // The main task
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
    // const id = this.database.createId();
    this.storageLocal.get('session_storage').then((Data) => {
      this.userID = (Data.map(data => data.id)).toString();
    const id = this.userID + this.userIDDesc;
    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  });
  }
  //end function

  editprofile() {
    this.router.navigate(['members/editprofile']);
  }

  EditProfile(id, fullname, phonenumber, birthday, email, country) {
    this.router.navigate(['members/editprofile/' + id + '/' + fullname + '/' + phonenumber + '/' + birthday + '/' + email + '/' + country]);
  }

  ionViewWillEnter() {
    this.items = [];
    this.start = 0;
    this.LoadProfile();
    this.CheckLoadImages();
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
    this.storageLocal.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProfile.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          for (let item of data) {
            this.items.push(item);
          }
        })
      });
    });
  }
  CheckLoadImages(){
    this.storageLocal.get("Status").then((data)=>{
      this.isUploaded = data;
    })
  }
}