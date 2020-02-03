import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";

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
  public searchTerm: string = "";
  selectCategory = 'Populer';
  text = "No Recent Product";
  textNew = "No Recent Product Added";

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public alertController: AlertController,
    private dataService: DataService,
    public loadingController: LoadingController,
  ) {
  }
  ngOnInit() {
    this.setFilteredItems();
  }
  ionViewWillEnter() {
    //get ID
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
    });
    this.items = [];
    this.start = 0;
    this.itemsNew = [];
    this.loadProduct();
    this.loadProductNew();
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
  async loadProduct() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.Integration(body, 'LoadProduct.php?Id=' + this.user).subscribe(data => {
        if(data.length == 0){
          this.text;
        }else{
          this.text = '';
        }
        loading.dismiss().then(() => {
          this.isLoaded = true;
          for (let item of data) {
            this.items.push(item);
          }
        })
      });
  }
  loadProductNew() {
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.Integration(body, 'LoadProductNew.php?Id=' + this.user).subscribe(data => {
        if(data.length == 0){
          this.textNew;
        }else{
          this.textNew = '';
        }
        for (let item of data) {
          this.itemsNew.push(item);
        }
      });
  }
  delete(id) {
    let body = {
      aksi: 'delete',
      id: id,
    };
    this.postPvdr.Integration(body, 'Delete.php').subscribe(data => {
      this.ionViewWillEnter();
    });
  }
  async Delete(id) {
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
            this.postPvdr.Integration(body, 'InsertProduct.php').subscribe(data => {
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
    this.router.navigate(['members/dashboard']);
  }
}
