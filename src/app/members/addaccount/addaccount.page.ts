import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.page.html',
  styleUrls: ['./addaccount.page.scss'],
})
export class AddaccountPage implements OnInit {
  nama: string = "";
  web: string = "";
  phone: string = "";
  email: string = "";
  owner: string = "";
  alamat: string;
  type: string = "";
  event_date: string = "";
  category: string = "";
  industry: string = "";
  employee: string = "";
  id: number;
  items2: any;
  user: any;
  userID: string = "";
  image : any;

  constructor(
    private postPvdr: PostProvider,
    private router: Router,
    private actRoute: ActivatedRoute,
    private storage: Storage,
    public loadingController: LoadingController,
    public toastCtrl: ToastController
  ) {
  }

  //Fungsi dimana user harus mengisi semua fill yang ada di UI dan tidak boleh kosong pas di simpan
  async AddAccount() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    })
    loading.present();
    if (this.nama == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Nama tidak boleh kosong',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.web == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Website tidak boleh kosong',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.phone == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Nomor Telepon tidak boleh kosong',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.email == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Email tidak boleh kosong',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.owner == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Owner harus di isi',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.type == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Type perusahaan harus di isi',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.event_date == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Event Date harus di isi',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.category == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Category harus di isi',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.industry == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Industry tidak boleh kosong',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.employee == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Silahkan isi Jumlah Employee',
          duration: 2000
        })
        toast.present();
      })
    } else {
      return new Promise(resolve => {
        let body = {
          aksi: 'add',
          nama: this.nama,
          alamat : this.alamat,
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
          loading.dismiss().then(() => {
            this.router.navigate(['members/account']);
          })
        });
      });
    }

  }

  ngOnInit(){
    
    this.actRoute.params.subscribe((data: any) => {
      if (data.id == null) {
      } else {
        this.id = data.id;
        this.nama = data.nama;
        this.alamat = data.alamat;
        this.web = data.web;
        this.phone = data.phone;
        this.email = data.email;
        this.owner = data.owner;
        this.type = data.type;
        this.event_date = data.event_date;
        this.category = data.category;
        this.industry = data.industry;
        this.employee = data.employee
        console.log(data);
      }
    });
    //fungsi dimana data yang akan di isi langsung ke storge database
    this.storage.get('session_storage').then((iduser) => {
      this.items2 = iduser;
      this.items2 = this.items2.map(user => user.id);
      this.user = parseInt(this.items2)
      console.log(this.items2)
      this.userID = this.user;
    });
    // this.loadSaved();
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
        alamat : this.alamat,
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

  // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url

  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       var image = event.target.result;
  //       this.image = image+this.nama;
  //       console.log(this.image)
  //       this.storage.set('images', this.image)
  //     }
  //   }
  // }

  // loadSaved() {
  //   this.storage.get('images').then((url) => {
  //     this.image = url || [];
  //   });
  // }

}
