import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.page.html',
  styleUrls: ['./addaccount.page.scss'],
})
export class AddaccountPage implements OnInit {
  nama: string = '';
  web: string;
  phone: string = '';
  email: string = '';
  owner: string;
  alamat: string;
  type: string;
  event_date: Date;
  category: string;
  industry: string;
  employee: string;
  id: number;
  userID: string;
  image: any;
  warning: string;
  isHidden: boolean = true;

  constructor(
    private postPvdr: PostProvider,
    private router: Router,
    private actRoute: ActivatedRoute,
    private storage: Storage,
    public loadingController: LoadingController,
    public toastCtrl: ToastController
  ) {
  }
  showNow() {
    this.isHidden = false;
    this.warning;
  }
  //Fungsi dimana user harus mengisi semua fill yang ada di UI dan tidak boleh kosong pas di simpan
  AddAccount() {
    if (this.nama == '') {
      this.warning = 'Data Cannot Be Empty'
    } else if (this.phone == '') {
      this.warning = 'Data Cannot Be Empty'
    } else
      if (this.email == '') {
        this.warning = 'Data Cannot Be Empty'
    } else {
        return new Promise(resolve => { 
          let body = {
            aksi: 'add',
            nama: this.nama,
            alamat: this.alamat,
            web: this.web,
            phone: this.phone,
            email: this.email,
            owner: this.owner,
            type: this.type,
            event_date: this.event_date,
            category: this.category,
            industry: this.industry,
            employee: this.employee,
            userID: this.userID
          };
          this.postPvdr.postData(body, 'InsertAccount.php').subscribe(data => {
            this.router.navigate(['members/account']);
          });
        });
      }
  }
  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      if (data.id == null) {
      } else {
        this.id = data.id;
        if (data.nama == " ") {
          this.nama = "";
        } else {
          this.nama = data.nama;
        }
        if (data.alamat == " ") {
          this.alamat = "";
        } else {
          this.alamat = data.alamat;
        }
        if (data.web == " ") {
          this.web = "";
        } else {
          this.web = data.web;
        }
        if (data.phone == " ") {
          this.phone = "";
        } else {
          this.phone = data.phone;
        }
        if (data.email == " ") {
          this.email = "";
        } else {
          this.email = data.email;
        }
        if (data.owner == " ") {
          this.owner = "";
        } else {
          this.owner = data.owner;
        }
        if (data.type == " ") {
          this.type = "";
        } else {
          this.type = data.type;
        }
        if (data.category == " ") {
          this.category = "";
        } else {
          this.category = data.category;
        }
        if (data.industry == " ") {
          this.industry = "";
        } else {
          this.industry = data.industry;
        }
        if (data.employee == " ") {
          this.employee = "";
        } else {
          this.employee = data.employee
        }
        this.event_date = data.event_date;
        console.log(data);
      }
    });
    //getID   
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.userID = ID.map(data => data.id)
    });
  }

  async updateAccount() {
    const loading = await this.loadingController.create({
      message: "Please Wait...",
      translucent: true
    })

    loading.present();
    return new Promise(resolve => {
      let body = {
        aksi: 'update',
        id: this.id,
        nama: this.nama,
        alamat: this.alamat,
        web: this.web,
        phone: this.phone,
        email: this.email,
        owner: this.owner,
        type: this.type,
        event_date: this.event_date,
        category: this.category,
        industry: this.industry,
        employee: this.employee
      };
      this.postPvdr.postData(body, 'InsertAccount.php').subscribe(data => {
        loading.dismiss().then(() => {
          this.router.navigate(['members/account']);
          console.log('Ok');
        })
      });
    });
  }
  //fungsi untuk merfresh data yang masuk ke page akivity
  doRefresh(event){
    setTimeout(() => {
      // this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }
  // ionViewWillEnter() {
    
  // }
}
