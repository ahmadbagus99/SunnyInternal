
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'src/providers/post-providers';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.page.html',
  styleUrls: ['./editproduct.page.scss'],
})
export class EditproductPage implements OnInit {

  items2: any;
  user: any;
  userID: string = "";
  namaProduk: string = "";
  tipeProduk: string = "";
  statusProduk: string = "";
  jumlahProduk: string = "";
  hargaProduk: string = "";
  deskripsiProduk: string = "";
  id: number;
  isImgLoaded: boolean;

  constructor(
    private storageLocal: Storage,
    private postPvdr: PostProvider,
    private router: Router,
    private actRoute: ActivatedRoute,
    public loadingController: LoadingController,
    public toastCtrl: ToastController
  ) {
  }
  
  ngOnInit() {
    
    this.actRoute.params.subscribe((data: any) => {
      
      if ( data.id == null){
      
      }else{
      this.id = data.id;
      this.namaProduk = data.namaProduk;
      this.tipeProduk = data.tipeProduk;
      this.statusProduk = data.statusProduk;
      this.jumlahProduk = data.jumlahProduk;
      this.hargaProduk = data.hargaProduk;
      this.deskripsiProduk = data.deskripsiProduk
      }
    });
    //fungsi dimana data yang akan di isi langsung ke storge database  
    this.storageLocal.get('session_storage').then((iduser) => {
      this.items2 = iduser;
      this.items2 = this.items2.map(user => user.id);
      this.user = parseInt(this.items2)
      this.userID = this.user;
    });
  }

  //Fungsi dimana user harus mengisi semua fill yang ada di UI dan tidak boleh kosong pas di simpan
  async Simpan() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    });
    loading.present();
    if (this.namaProduk == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Nama Produk harus di isi',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.tipeProduk == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Tipe Produk harus di isi',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.statusProduk == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Status Produk tidak boleh Kosong',
          duration: 2000,
        })
        toast.present();
      })
    } else if (this.jumlahProduk == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Jumlah Produk harus di isi',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.hargaProduk == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Harga harus di isi',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.deskripsiProduk == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Deskripsi harus di isi',
          duration: 2000
        })
        toast.present();
      })
    } else {
      return new Promise(resolve => {
        let body = {
          aksi: 'add',
          namaProduk: this.namaProduk,
          tipeProduk: this.tipeProduk,
          statusProduk: this.statusProduk,
          jumlahProduk: this.jumlahProduk,
          hargaProduk: this.hargaProduk,
          deskripsiProduk: this.deskripsiProduk,
          userID: this.userID
        };
          //Fungsi untuk menarik/mendapatkan data untuk data product dari server php
        this.postPvdr.postData(body, 'InsertProduct.php').subscribe(async data => {
          loading.dismiss().then(() => {
            this.router.navigate(['members/product']);
          })
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
        statusProduk: this.statusProduk,
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

}
