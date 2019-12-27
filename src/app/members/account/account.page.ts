import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  items: any = [];
  itemsNew: any = [];
  limit: number = 10;
  start: number = 0;
  isLoaded = false;
  user: number;
  public searchTerm: string = "";
  selectCategory = 'Populer';

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private dataService: DataService,
  ) {
  }
  ngOnInit() {
    this.setFilteredItems();
  }
  // Fungsi untuk menambahkan item pada page account.//
  addaccount() {
    this.router.navigate(['members/addaccount'])
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
    this.loadAccount();
    this.loadAccountNew();
  }
  // Fungsi untuk menarik/mendapatkan data untuk data edit account dari server php//
  updateAccount(id, nama, alamat, web, phone, email, owner, type, event_date, category, industry, employee) {
    if (nama == "") {
      nama = " ";
    }
    if (alamat == "") {
      alamat = " ";
    }
    if (web == "") {
      web = " ";
    }
    if (phone == "") {
      phone = " ";
    }
    if (email == "") {
      email = " ";
    }
    if (owner == "") {
      owner = " ";
    }
    if (type == "") {
      type = " ";
    }
    if (category == "") {
      category = " ";
    }
    if (industry == "") {
      industry = " ";
    }
    if (employee == "") {
      employee = " "
    }
    this.router.navigate(['members/editaccount/'
      + id + '/'
      + nama + '/'
      + alamat + '/'
      + web + '/'
      + phone + '/'
      + email + '/'
      + owner + '/'
      + type + '/'
      + event_date + '/'
      + category + '/'
      + industry + '/'
      + employee])
  }
  // Fungsi untuk menghapus item pada page account.//
  deleteAccount(id) {
    let body = {
      aksi: 'delete',
      id: id,
    };
    this.postPvdr.postData(body, 'InsertAccount.php').subscribe(data => {
      this.ionViewWillEnter();
    });
  }
  async loadAccount() {
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
      this.postPvdr.postData(body, 'LoadAccount.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          this.isLoaded = true;
          for (let item of data) {
            this.items.push(item);
          }
        })
      });
  }
  //fungsi database akun yang baru di buat langsung masuk ke server php
  loadAccountNew() {
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadAccountNew.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.itemsNew.push(item);
        }
      });
  }

  //fungsi sebagai button mengahapus akun dan membuat tampilan text.//
  async presentAlertMultipleButtons(id) {
    const alert = await this.alertController.create({
      header: 'Are You Sure?',
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
            this.postPvdr.postData(body, 'InsertAccount.php').subscribe(data => {
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

  //fungsi untuk mrefresh item yang masuk.//
  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  setFilteredItems() {
    this.items = this.dataService.filterAccount(this.searchTerm);
  }
  movetoMain(){
    this.router.navigate(['members/dashboard']);
  }
}


