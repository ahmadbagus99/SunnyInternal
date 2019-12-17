import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {

  id: number;
  items2: any;
  user: any;
  namaProduk: string = "";
  tipeProduk: string = "";
  totalProfit: string = "";
  jumlahProduk: any = "";
  hargaProduk: string = "";
  deskripsiProduk: string = "";
  category: any;
  nomor : string;

  items : any = [];
  itemsNew : any = [];
  limit : number = 10;
  start : number = 0;
  loadproduct: any;

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public alertController: AlertController,
    private actRoute: ActivatedRoute,
    public loadingController : LoadingController,
    private callNumber : CallNumber
  ) {
  }
  ionViewWillEnter(){
    this.items = [];
    this.start = 0;
    this.itemsNew = [];
    this.loadProduct();
  }
  //fungsi sebagai router pemanggil data yang sudah disii ke dalam product
  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.namaProduk = data.namaProduk;
      this.tipeProduk = data.tipeProduk;
      this.totalProfit = data.totalProfit;
      this.jumlahProduk = data.jumlahProduk;
      this.hargaProduk = data.hargaProduk;
      this.category = data.category; 
      this.deskripsiProduk = data.deskripsiProduk;
      this.nomor = data.no_tlp;
      console.log(this.totalProfit)
    });
  }
  // Fungsi untuk menarik/mendapatkan data untuk data edit Produk server php
  updateProduct(id,namaProduk,tipeProduk,totalProfit,jumlahProduk,hargaProduk,deskripsiProduk){
    this.router.navigate(['members/editproduct/'
    +id+'/'
    +namaProduk+'/'
    +tipeProduk+'/'
    +totalProfit+'/'
    +jumlahProduk+'/'
    +hargaProduk+'/'
    +deskripsiProduk]);
  }

  //fungsi untuk membuat baru produk yang akan diisi
  async loadProduct(){
    const loading = await this.loadingController.create({
      message : "",
      spinner: 'crescent',
      translucent : true,
      cssClass:'custom-loader-class',
      mode: 'md'
    })
    await loading.present();
    this.storage.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProduct.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          for (let item of data) {
            this.items.push(item);
          }
        })
      });
    })
  }


}
