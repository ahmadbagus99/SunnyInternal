import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage'
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Injectable({
    providedIn: 'root'
})
export class ImagesUpload {
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
    userID: string;
    private imageCollection: AngularFirestoreCollection<MyData>;

    constructor(
        private storageLocal: Storage,
        private storage: AngularFireStorage, 
        private database: AngularFirestore
    ) {
    }
    // upload function
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
    
}