import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'src/providers/post-providers';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {
  userID: string = "";
  namaProduk: string ='';
  tipeProduk: string;
  totalProfit: number;
  jumlahProduk: string ='';
  hargaProduk: string;
  harga : number=0;
  normalPrice: number;
  deskripsiProduk: string;
  id: number;
  isImgLoaded: boolean;
  warning: string;
  isHidden: boolean = true;
  profit :number;

  constructor(
    private storage: Storage,
    private postPvdr: PostProvider,
    private router: Router,
    private actRoute: ActivatedRoute,
    public loadingController: LoadingController,
    public toastCtrl: ToastController
  ) {
  }
  
  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.hargaProduk = data.hargaProduk;
      this.profit = data.totalProfit;
      this.normalPrice = data.normalPrice;
      if ( data.id == null){
      }else{
      this.id = data.id;
      }

      if ( data.namaProduk == " "){
        this.namaProduk ="";
      }else{
        this.namaProduk = data.namaProduk;
      }

      if ( data.tipeProduk == " "){
        this.tipeProduk ="";
      }else{
        this.tipeProduk = data.tipeProduk;
      }
        
      if ( data.jumlahProduk == " "){
        this.jumlahProduk ="";
      }else{
        this.jumlahProduk = data.jumlahProduk;
      }

      if ( data.deskripsiProduk == " "){
        this.deskripsiProduk ="";
      }else{
        this.deskripsiProduk = data.deskripsiProduk
      }
    });
    //getID   
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.userID = ID.map(data => data.id)
    });
  }

  showNow() {
    this.isHidden = false;
    this.warning;
  }
  //Fungsi dimana user harus mengisi semua fill yang ada di UI dan tidak boleh kosong pas di simpan
  Simpan() {
    if (this.namaProduk == '') {
      this.warning = 'Data Tidak Boleh Kosong'
    } else if (this.jumlahProduk == '') {
      this.warning = 'Data Tidak Boleh Kosong'
    } else
      if (this.hargaProduk == '' ) {
        this.warning = 'Data Tidak Boleh Kosong'
    } else {
      return new Promise(resolve => {
        let body = {
          aksi: 'add',
          namaProduk: this.namaProduk,
          tipeProduk: this.tipeProduk,
          totalProfit: this.profit,
          normalPrice : this.normalPrice,
          jumlahProduk: this.jumlahProduk,
          hargaProduk: this.hargaProduk,
          deskripsiProduk: this.deskripsiProduk,
          userID: this.userID
        };
          //Fungsi untuk menarik/mendapatkan data untuk data product dari server php
        this.postPvdr.postData(body, 'InsertProduct.php').subscribe(async data => {
            this.router.navigate(['members/product']);
        });
      });
    }
  }
//fungsi sebagai mnegupdate product yang sudah di edit ke server php
  async update() {
    const loading = await this.loadingController.create({
      message: 'Please Wait..',
      translucent: true
    });
    loading.present();
    return new Promise(resolve => {
      let body = {
        aksi: 'update',
        id: this.id,
        namaProduk: this.namaProduk,
        tipeProduk: this.tipeProduk,
        totalProfit: this.profit,
        normalPrice : this.normalPrice,
        jumlahProduk: this.jumlahProduk,
        hargaProduk: this.hargaProduk,
        deskripsiProduk: this.deskripsiProduk,
      };
      this.postPvdr.postData(body, 'InsertProduct.php').subscribe(data => {
        loading.dismiss().then(() => {
          this.router.navigate(['members/product']);
        })
      });
    });
  }

  profitCalculate(){
    var Profit = this.normalPrice*(this.profit*0.01);
    this.harga = this.normalPrice + Profit;
    this.hargaProduk = this.harga.toString();
  }  

}
