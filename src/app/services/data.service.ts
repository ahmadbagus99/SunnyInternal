import { Injectable } from '@angular/core';
import { ShareService } from 'src/app/share/share';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'src/providers/post-providers';

const TOKEN_data = 'data';
const TOKEN_dataacc = 'dataacc';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public itemsContact : any = [];
  public itemsAccount : any = [];
  public itemsProduct : any = [];
  start : number = 0;
  limit : number = 10;
  user : number;

    constructor(
    private storage: Storage,
    public share: ShareService,
    private postPvdr : PostProvider
    ) {
      this.loadContact();
      this.loadAcount();
      this.loadProduct();
     }

     loadContact(){
      this.storage.get('IdLogin').then((IdLogin)=>{
          this.user = IdLogin;
          let body = {
            aksi : 'getdata',
            limit : this.limit,
            start : this.start,
            };
            this.postPvdr.postData(body, 'LoadContact.php?Id='+this.user).subscribe(data =>{
              for(let item of data){
                this.itemsContact.push(item);
            } 
            });
        })
    }
  
    loadAcount(){
      this.storage.get('IdLogin').then((IdLogin)=>{
          this.user = IdLogin;
          let body = {
            aksi : 'getdata',
            limit : this.limit,
            start : this.start,
            };
            this.postPvdr.postData(body, 'LoadAccount.php?Id='+this.user).subscribe(data =>{
              for(let item of data){
                this.itemsAccount.push(item);
            }
          });
        })
    }

    loadProduct(){
      this.storage.get('IdLogin').then((IdLogin)=>{
        this.user = IdLogin;
        let body = {
        aksi : 'getdata',
        limit : this.limit,
        start : this.start,
        };
        this.postPvdr.postData(body, 'LoadProduct.php?Id='+this.user).subscribe(data =>{
          for(let item of data){
            this.itemsProduct.push(item);
        } 
      });
    })
    }

    filterContact(searchTerm) {
      return this.itemsContact.filter(item => {
        return item.nama.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    }

    filterAccount(searchTerm) {
      return this.itemsAccount.filter(item => {
        return item.nama.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    }

    filterProduct(searchTerm) {
      return this.itemsProduct.filter(item => {
        return item.namaProduk.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    }
    
}
