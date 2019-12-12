import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';

@Injectable()
export class ShareService{
  items : any = [];
  limit : number = 10;
  start : number = 0;
  user : any;

    url:string="http://localhost:55614/api/APIDemo/";
    url2:string="http://localhost:55614/api/Contact/";
    url3:string="http://bpmonline.asia/CRM_Local/LoadUser.php";
    constructor(
        private http:Http,
        private postPvdr : PostProvider,
        private storage : Storage
        ){

    }
    login(user,password){
        var _url ="http://bpmonline.asia/CRM_Local/LoadUser.php";
        var _body = {"email":user,"password":password};
        var _header=new Headers({'Content-Type':'Application/json'});
        var _option=new RequestOptions({method:RequestMethod.Post,headers:_header});
        return this.http.post(_url,_body,_option).map(res=>res.json());
    }

    getAllUser(){
        return this.http.get(this.url3).map(res=>res.json());
    }

    getAll(){
        return this.http.get(this.url).map(res=>res.json());
    }
    // Contact
    getAllContact(){
        return this.http.get(this.url2).map(res=>res.json());
    }
    Create(web,phone,email,owner,type,npwp,category,industry,employee,idacc){
        var body={
            "web":web,
            "phone":phone,
            "email":email,
            "owner":owner,
            "type":type,
            "npwp":npwp,
            "category":category,
            "industry":industry,
            "employee":employee,
            "idacc":idacc
        };
        var header=new Headers({'Content-Type':'application/json'});
        var option=new RequestOptions({method:RequestMethod.Post,headers:header});
        return this.http.post(this.url,body,option).map(res=>res.json());
    }
    Update(id,web,phone,email,owner,type,npwp,category,industry,employee,idacc){
        var body={
            "id":id,
            "web":web,
            "phone":phone,
            "email":email,
            "owner":owner,
            "type":type,
            "npwp":npwp,
            "category":category,
            "industry":industry,
            "employee":employee,
            "idacc":idacc
        };
        var header=new Headers({'Content-Type':'application/json'});
        var option=new RequestOptions({method:RequestMethod.Post,headers:header});
        return this.http.post(this.url,body,option).map(res=>res.json());
    }
    Read(id){
        return this.http.get(this.url+id).map(res=>res.json());
        }
    Delete(id){
        return this.http.delete(this.url+id).map(res=>res.json());
    }

    
    CreateContact(name,number,email,userID,address){
        var body={
            "name":name,
            "number":number,
            "email":email,
            "userID":userID,
            "address":address
        };
        var header=new Headers({'Content-Type':'application/json'});
        var option=new RequestOptions({method:RequestMethod.Post,headers:header});
        return this.http.post(this.url2,body,option).map(res=>res.json());
    }
    UpdateContact(id,name,number,email,userID,address){
        var body={
            "id":id,
            "name":name,
            "number":number,
            "email":email,
            "userID":userID,
            "address":address
        };
        var header=new Headers({'Content-Type':'application/json'});
        var option=new RequestOptions({method:RequestMethod.Post,headers:header});
        return this.http.post(this.url2,body,option).map(res=>res.json());
    }
    ReadContact(id){
        return this.http.get(this.url2+id).map(res=>res.json());
        }
    DeleteContact(id){
        return this.http.delete(this.url2+id).map(res=>res.json());
    }

    loadProfil(){
        return new Promise(resolve => {
          let body = {
          aksi : 'getdata',
          limit : this.limit,
          start : this.start,
          };
          this.postPvdr.postData(body, 'LoadProfile.php?Id='+this.user).subscribe(data =>{
            this.storage.set('profile', data);
            for(let item of data){
              this.items.push(item);
          } 
          resolve (true);
          });
        });
      }

      ionViewWillEnter(){
        this.items = [];
        this.start = 0;
        this.loadProfil();
      }
    
}