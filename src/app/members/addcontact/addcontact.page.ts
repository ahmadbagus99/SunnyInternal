import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.page.html',
  styleUrls: ['./addcontact.page.scss'],
})

export class AddcontactPage implements OnInit {
  id: number;
  items2: any;
  user: any;
  nama: string='';
  alamat: string;
  tgl_lahir: Date = new Date();
  kelamin: string;
  no_tlp: string='';
  almt_rumah: string;
  title: string;
  perusahaan: string;
  almt_perusahaan: string;
  Hobi: string;
  Makanan_Favorit: string;
  Facebook: string;
  Twitter: string;
  Instagram: string;
  NPWP: string;
  userID: number;
  penghasilan: string;
  email : string='';
  category: any;
  warning: string;
  isHidden: boolean = true;
  itemsPerusahaan : any = [];
  selectHidden: boolean;

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
  showNow() {
    this.isHidden = false;
    this.warning;
  }
  Show() {
    if (this.title == 'More') {
      this.isHidden = false;
      this.selectHidden = true;
      this.title = '';
    }
  }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      if (data.id == null) {
      } else {
        this.id = data.id;
        if ( data.nama == " "){
          this.nama = "";
        }else{
          this.nama = data.nama;
        }
        if (data.email == " "){
          this.email = "";
        }else{
          this.email = data.email;
        }
        if (data.alamat == " "){
          this.alamat = "";
        }else{
          this.alamat = data.alamat;
        }
        if (data.kelamin == " "){
          this.kelamin = "";
        }else{
          this.kelamin = data.kelamin;
        }
        if (data.no_tlp == " "){
          this.no_tlp = "";
        }else{
          this.no_tlp = data.no_tlp;
        }
        if (data.almt_rumah == " "){
          this.almt_rumah = "";
        }else{
          this.almt_rumah = data.almt_rumah;
        }
        if (data.title == " "){
          this.title = "";
        }else{
          this.title = data.title;
        }
        if (data.penghasilan == " "){
          this.penghasilan = "";
        }else{
          this.penghasilan = data.penghasilan;
        }
        if (data.perusahaan == " "){
          this.perusahaan = "";
        }else{
          this.perusahaan = data.perusahaan;
        }
        if (data.almt_perusahaan == " "){
          this.almt_perusahaan = "";
        }else{
          this.almt_perusahaan = data.almt_perusahaan;
        }
        if (data.Hobi == " "){
          this.Hobi = "";
        }else{
          this.Hobi = data.Hobi;
        }
        if (data.Makanan_Favorit == " "){
          this.Makanan_Favorit = "";
        }else{
          this.Makanan_Favorit = data.Makanan_Favorit;
        }
        if (data.Facebook == " "){
          this.Facebook = "";
        }else{
          this.Facebook = data.Facebook;
        }
        if (data.Twitter == " "){
          this.Twitter = "";
        }else{
          this.Twitter = data.Twitter;
        }
        if (data.Instagram == " "){
          this.Instagram = "";
        }else{
          this.Instagram = data.Instagram
        }
        this.NPWP = data.NPWP;
        this.tgl_lahir = data.tgl_lahir;
      } 
    });
   
    //getID   
   this.storage.get('session_storage').then((iduser) => {
        var ID = iduser;
        this.userID = parseInt(ID.map(data => data.id))
      });
  }
  loadCompanyAddress() {
    let body = {
      aksi: 'getdata',
      limit: this.limit,
      start: this.start,
    };
    this.postPvdr.postData(body, 'LoadEmailAccount.php?Account=' + this.perusahaan).subscribe(data => {
      for (let item of data) {
        this.itemsPerusahaan.push(item);
      }
    });
  }

   //Fungsi dimana user harus mengisi semua fill yang ada di UI dan tidak boleh kosong pas di simpan  
   createdProcess() {
    if (this.nama == '') {
      this.warning = 'Data Cannot Be Empty'
    } else if (this.email == '') {
      this.warning = 'Data Cannot Be Empty'
    } else if (this.no_tlp == '') {
        this.warning = 'Data Cannot Be Empty'
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
          console.log(data)
            this.router.navigate(['members/contact']);
      });
      });
    }
  }

  async updateProcess() {
    const loading = await this.loadingController.create({
      message: "Processing",
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
          this.clearDataStorage();
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
  clearDataStorage(){
    this.storage.remove('Data');
  }

}
