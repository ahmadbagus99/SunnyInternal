import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.page.html',
  styleUrls: ['./editproduct.page.scss'],
})
export class EditproductPage implements OnInit {
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
  normalPrice : number = 0;
  items : any = [];
  itemsNew : any = [];
  limit : number = 10;
  start : number = 0;
  loadproduct: any;
  status : string;
  url :any;

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
    this.loadSaved();
  }
  //fungsi sebagai router pemanggil data yang sudah disii ke dalam product
  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.namaProduk = data.namaProduk;
      this.tipeProduk = data.tipeProduk;
      this.totalProfit = data.totalProfit;
      this.normalPrice = data.normalPrice;
      this.jumlahProduk = data.jumlahProduk;
      this.hargaProduk = data.hargaProduk;
      this.category = data.category; 
      this.deskripsiProduk = data.deskripsiProduk;
      this.nomor = data.no_tlp;
    if (this.jumlahProduk == 0){
      this.status="Product is not Available";
    }else{
      this.status="Product is Available";
    }
    });
  }
  // Fungsi untuk menarik/mendapatkan data untuk data edit Produk server php
  updateProduct(id,namaProduk,tipeProduk,totalProfit,normalPrice,jumlahProduk,hargaProduk,deskripsiProduk){
    this.router.navigate(['members/addproduct/'
    +id+'/'
    +namaProduk+'/'
    +tipeProduk+'/'
    +totalProfit+'/'
    +normalPrice+'/'
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
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // this.url = event.target.result;
        this.url = reader.result;
        this.storage.set(this.namaProduk, this.url)
      }
    }
  }
  loadSaved() {
    this.storage.get(this.namaProduk).then((url) => {
      this.url = url || [];
    });
  }
}
