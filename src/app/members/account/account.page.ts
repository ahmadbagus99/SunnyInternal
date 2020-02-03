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
  text = "No Recent Account";
  textNew = "No Recent Account Added";
  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private dataService: DataService
  ) {
  }
  ngOnInit() {
    this.setFilteredItems();
  }
  ionViewWillEnter() {
    this.storage.get('session_storage').then((ID) => {
      this.user = parseInt(ID.map(data => data.id));
    });
    this.items = [];
    this.start = 0;
    this.itemsNew = [];
    this.loadAccount();
    this.loadAccountNew();
  }
  addaccount() {
    this.router.navigate(['members/addaccount'])
  }
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
    this.postPvdr.Integration(body, 'InsertAccount.php').subscribe(data => {
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
        aksi: 'getAccount',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.Integration(body, 'LoadAccount.php?Id=' + this.user).subscribe(data => {
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
  //fungsi database akun yang baru di buat langsung masuk ke server php
  loadAccountNew() {
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.Integration(body, 'LoadAccountNew.php?Id=' + this.user).subscribe(data => {
        if (data.length == 0){
          this.textNew;
        }else{
          this.textNew = '';
        }
        for (let item of data) {
          this.itemsNew.push(item);
        }
      });
  }

  async Delete(id) {
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
              aksi: 'Account',
              id: id,
            };
            this.postPvdr.Integration(body, 'Delete.php').subscribe(data => {
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


