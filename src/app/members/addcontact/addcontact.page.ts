import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { async } from 'q';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.page.html',
  styleUrls: ['./addcontact.page.scss'],
})

export class AddcontactPage implements OnInit {
  id: number;
  items2: any;
  user: any;
  nama: string = "";
  alamat: string = "";
  tgl_lahir: string = "";
  kelamin: string = "";
  no_tlp: string = "";
  almt_rumah: string = "";
  title: string = "";
  perusahaan: string = "";
  almt_perusahaan: string = "";
  Hobi: string = "";
  Makanan_Favorit: string = "";
  Facebook: string = "";
  Twitter: string = "";
  Instagram: string = "";
  NPWP: string = "";
  userID: string = "";
  penghasilan: string = "";
  category: any;
  email : string;

  @ViewChild(IonSlides) slides: IonSlides;
  items: any = [];
  limit: number = 10;
  start: number = 0;

  constructor(
    private postPvdr: PostProvider,
    private router: Router,
    private actRoute: ActivatedRoute,
    private storage: Storage,
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
  ) { }

  ionViewWillEnter() {
    this.items = [];
    this.start = 0;
    this.loadAcount();
  }
  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      if (data.id == null) {
     
      } else {
        this.id = data.id;
        this.nama = data.nama;
        this.email = data.email;
        this.alamat = data.alamat;
        this.tgl_lahir = data.tgl_lahir;
        this.kelamin = data.kelamin;
        this.no_tlp = data.no_tlp;
        this.almt_rumah = data.almt_rumah;
        this.title = data.title;
        this.category = data.category;
        this.penghasilan = data.penghasilan;
        this.perusahaan = data.perusahaan;
        this.almt_perusahaan = data.almt_perusahaan;
        this.penghasilan = data.penghasilan,
          this.Hobi = data.Hobi,
          this.Makanan_Favorit = data.Makanan_Favorit,
          this.NPWP = data.NPWP,
          this.Facebook = data.Facebook,
          this.Twitter = data.Twitter,
          this.Instagram = data.Instagram
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
  }
  route() {

  }
   //Fungsi dimana user harus mengisi semua fill yang ada di UI dan tidak boleh kosong pas di simpan  
  async createdProcess() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    })
    loading.present();
    if (this.nama == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Nama diperlukan!',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.alamat == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Alamat tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })

    } else if (this.tgl_lahir == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Tanggal Lahir tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.kelamin == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Kelamin tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.no_tlp == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Nomor Telepon tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.almt_rumah == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Alamat Rumah tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.title == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Title tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.perusahaan == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Perusahaan tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.almt_perusahaan == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Alamat Perusahaan tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.penghasilan == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Penghasilan tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.Hobi == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Hobi tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.Makanan_Favorit == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Makanan Favorit tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.NPWP == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'NPWP harus diisi!',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.Facebook == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Facebook tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.Twitter == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Twitter tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })
    } else if (this.Instagram == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Instagram tidak boleh kosong',
          duration: 2000
        });
        toast.present();
      })
    } else {
      return new Promise(resolve => {
        let body = {
          aksi: 'add',
          nama: this.nama,
          email: this.email,
          alamat: this.alamat,
          tgl_lahir: this.tgl_lahir,
          kelamin: this.kelamin,
          no_tlp: this.no_tlp,
          almt_rumah: this.almt_rumah,
          title: this.title,
          perusahaan: this.perusahaan,
          almt_perusahaan: this.almt_perusahaan,
          penghasilan: this.penghasilan,
          Hobi: this.Hobi,
          Makanan_Favorit: this.Makanan_Favorit,
          NPWP: this.NPWP,
          Facebook: this.Facebook,
          Twitter: this.Twitter,
          Instagram: this.Instagram,
          userID: this.userID
        };

        //Fungsi untuk menarik/mendapatkan data untuk data add contact dari server php
        this.postPvdr.postData(body, 'InsertContact.php').subscribe(data => {
          loading.dismiss().then(() => {
            this.router.navigate(['members/contact']);
          })
        });
      });
    }
  }

  async updateProcess() {
    const loading = await this.loadingController.create({
      message: "Sedang Memproses",
      translucent: true
    })
    loading.present();
    return new Promise(resolve => {
      let body = {
        aksi: 'update',
        id: this.id,
        nama: this.nama,
        email: this.email,
        alamat: this.alamat,
        tgl_lahir: this.tgl_lahir,
        kelamin: this.kelamin,
        no_tlp: this.no_tlp,
        almt_rumah: this.almt_rumah,
        title: this.title,
        perusahaan: this.perusahaan,
        category: this.category,
        almt_perusahaan: this.almt_perusahaan,
        penghasilan: this.penghasilan,
        Hobi: this.Hobi,
        Makanan_Favorit: this.Makanan_Favorit,
        NPWP: this.NPWP,
        Facebook: this.Facebook,
        Twitter: this.Twitter,
        Instagram: this.Instagram
      };
      this.postPvdr.postData(body, 'InsertContact.php').subscribe(data => {
        loading.dismiss().then(() => {
          this.router.navigate(['members/contact']);
        })
      });
    });
  }
    //fungsi untuk memajukan next page yang akan di isi di contact
  next() {
    this.slides.slideNext();
  }
   //fungsi untuk memundurkan prev page yang akan di isi di contact
  prev() {
    this.slides.slidePrev();
  }
  async loadAcount() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
    this.storage.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadAccount.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          for (let item of data) {
            this.items.push(item);
          }
        })
      });
    })
  }

}
