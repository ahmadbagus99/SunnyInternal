// Import 

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { MainPage } from '../main/main.page';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  items: any = [];
  itemsNew: any = [];
  limit: number = 10;
  start: number = 0;
  isLoaded = false;
  user: any;
  userID: string;
  data: any = [];
  public searchTerm: string = "";
  selectCategory = 'Populer';

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storageLocal: Storage,
    public alertController: AlertController,
    private dataService: DataService,
    public loadingController: LoadingController,
    private nativePageTransitions: NativePageTransitions,
    private callNumber: CallNumber,
    public mainPage : MainPage
  ) {
    setTimeout(() => {
      this.isLoaded = true;
    }, 2000);
  }


  ngOnInit() {
    this.setFilteredItems();
  }

  // Fungsi untuk menarik/mendapatkan data untuk data add product dari server php

  updateProduct(id, namaProduk, tipeProduk, totalProfit, normalPrice, jumlahProduk, hargaProduk, deskripsiProduk) {
    if (namaProduk == "") {
      namaProduk = " ";
    }
    if (tipeProduk == "") {
      tipeProduk = " ";
    }
    if (totalProfit == "") {
      totalProfit = " ";
    }
    if (jumlahProduk == "") {
      jumlahProduk = " ";
    }
    if (hargaProduk == "") {
      hargaProduk = " ";
    }
    if (deskripsiProduk == "") {
      deskripsiProduk = " ";
    }
    if (normalPrice == "") {
      normalPrice = " "
    }
    this.router.navigate(['members/editproduct/'
      + id + '/'
      + namaProduk + '/'
      + tipeProduk + '/'
      + totalProfit + '/'
      + normalPrice + '/'
      + jumlahProduk + '/'
      + hargaProduk + '/'
      + deskripsiProduk]);
  }

  // Fungsi untuk menambahkan item pada page product.
  addproduct() {
    this.router.navigate(['members/addproduct'])
  }
  ionViewWillEnter() {
    this.items = [];
    this.start = 0;
    this.itemsNew = [];
    this.loadProduct();
    this.loadProductNew();
  }

  async loadProduct() {
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
      this.postPvdr.postData(body, 'LoadProduct.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          for (let item of data) {
            this.items.push(item);
          }
        })
      });
    })
  }

  loadProductNew() {
    this.storageLocal.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProductNew.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.itemsNew.push(item);
        }
      });
    })
  }

  delete(id) {
    let body = {
      aksi: 'delete',
      id: id,
    };
    this.postPvdr.postData(body, 'InsertProduct.php').subscribe(data => {
      this.ionViewWillEnter();
    });
  }

  async presentAlertMultipleButtons(id) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      subHeader: '',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            let body = {
              aksi: 'delete',
              id: id,
            };
            this.postPvdr.postData(body, 'InsertProduct.php').subscribe(data => {
              this.ionViewWillEnter();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }
  setFilteredItems() {
    this.items = this.dataService.filterProduct(this.searchTerm);
  }
  movetoMain(){
    this.mainPage.ionViewWillEnter().then(()=>{
      this.router.navigate(['members/dashboard']);
    })
  }

}
