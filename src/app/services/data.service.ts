import { Injectable } from '@angular/core';
import { ShareService } from 'src/app/share/share';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'src/providers/post-providers';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public itemsContact : any = [];
  public itemsAccount : any = [];
  public itemsProduct : any = [];
  public itemsProspect : any = [];
  public itemsCustomer : any = [];
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
      this.loadProspect();
      this.LoadCustomer();
     }

     loadContact(){
      this.storage.get('session_storage').then((data)=>{
        this.user = parseInt(data.map(data => data.id));
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
      this.storage.get('session_storage').then((data)=>{
        this.user = parseInt(data.map(data => data.id));
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
      this.storage.get('session_storage').then((data)=>{
        this.user = parseInt(data.map(data => data.id));
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
     loadProspect(){
      this.storage.get('session_storage').then((data)=>{
        this.user = parseInt(data.map(data => data.id));
          let body = {
            aksi : 'getdata',
            limit : this.limit,
            start : this.start,
            };
            this.postPvdr.postData(body, 'LoadProspect.php?Id='+this.user).subscribe(data =>{
                for(let item of data){
                  this.itemsProspect.push(item);
              }
            });
        })
    }

    LoadCustomer(){
      this.storage.get('session_storage').then((data)=>{
        this.user = parseInt(data.map(data => data.id));
          let body = {
            aksi : 'getdata',
            limit : this.limit,
            start : this.start,
            };
            this.postPvdr.postData(body, 'LoadCustomer.php?Id='+this.user).subscribe(data =>{
                for(let item of data){
                  this.itemsCustomer.push(item);
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

    filterProspect(searchTerm){
      return this.itemsProspect.filter(item => {
        return item.namaCustomer.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      })
    }
    
    filterCustomer(searchTerm){
      return this.itemsCustomer.filter(item => {
        return item.namaCustomer.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      })
    }
    
}
