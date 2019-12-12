import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";
<<<<<<< HEAD
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
//pdf package
=======
//pdf package module
>>>>>>> 62f305c286fbee980a4244bea54ab7fb9fafdb78
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { stringify } from 'querystring';
import { setCheckNoChangesMode } from '@angular/core/src/render3/state';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-addprospect',
  templateUrl: './addprospect.page.html',
  styleUrls: ['./addprospect.page.scss'],
})

export class AddprospectPage implements OnInit {
  isHidden = true;
<<<<<<< HEAD
  selectHidden: boolean;
  savebutton : boolean;
=======
  selectHidden : boolean;
>>>>>>> 62f305c286fbee980a4244bea54ab7fb9fafdb78
  id: number;
  items2: any;
  user: any;
  namaCustomer: string = "";
  company: string = "";
  no_tlp: number;
  almt_rumah: string = "";
  customerneed: string = "";
  userID: string = "";
  email: string = "";
  category: any;
  progress = 0;
  itemProduct = [];
  itemQunatityProduct = [];
  Nameproduct: any;
  jumlahProduk: any;
  hargaProduk: any;
<<<<<<< HEAD
  stock: number;
=======
  stock: number ;
>>>>>>> 62f305c286fbee980a4244bea54ab7fb9fafdb78
  totalPrice: number;
  price: number;
  itemsAccount: any;
  itemsEmailAccount: any;
  emailAccount: any;
<<<<<<< HEAD
  budget: number;
  itemsContact = [];
  alamatCompany: string;
  emailCompany: string;
  nomorCompany: number;
  emailCustomer: string;
  alamatCustomer: string;
=======
  budget : number;
  itemsContact = [];
  alamatCompany : string;
  emailCompany : string;
  nomorCompany : string;
  emailCustomer : string;
  alamatCustomer : string;
>>>>>>> 62f305c286fbee980a4244bea54ab7fb9fafdb78
  itemsCustomer = [];
  letterObj = {
    address: ' Arkadia Green Park Estate, Tower F, 6th Floor, Jl. TB Simatupang No.Kav. 88, RT.1/RW.2, Kebagusan, Kec. Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520',
    text: ' For purchasing the item with the criteria as below : '
  }

  @ViewChild(IonSlides) slides: IonSlides;
  items: any = [];
  limit: number = 10;
  start: number = 0;

  pdfObj = null;
  constructor(
    private postPvdr: PostProvider,
    private router: Router,
    private actRoute: ActivatedRoute,
    private storage: Storage,
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    private dataService: DataService,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    private alertCtrl: AlertController,
    private localNotifications: LocalNotifications
  ) { }

  ionViewWillEnter() {
    this.items = [];
    this.start = 0;
    this.itemProduct = [];
    this.itemsAccount = [];
    this.itemsContact = [];
    this.loadContact();
    this.loadAcount();
    this.loadProduct();
  }
  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      if (data.id == null) {

      } else {
        this.id = data.id;
        this.namaCustomer = data.nama;
        this.company = data.company;
        this.no_tlp = data.no_tlp;
        this.almt_rumah = data.almt_rumah;
        this.customerneed = data.customerneed;
        this.email = data.email;
      }
    });
    this.storage.get('session_storage').then((iduser) => {
      this.items2 = iduser;
      this.items2 = this.items2.map(user => user.id);
      this.user = parseInt(this.items2)
      this.userID = this.user;
    });
  }

<<<<<<< HEAD
  pushNotif(seconds: number){
    this.localNotifications.schedule({
      title : `Prospek Baru`,
      text : `Prospek baru telah di buat`,
      trigger: {
        in : seconds,
        unit: ELocalNotificationTriggerUnit.SECOND,
      }
    })
  }

  showNow() {
    if (this.namaCustomer == 'new') {
=======
  showNow(){
    if (this.namaCustomer == 'new'){
>>>>>>> 62f305c286fbee980a4244bea54ab7fb9fafdb78
      this.isHidden = false;
      this.selectHidden = true;
      this.namaCustomer = '';
    }
    this.itemsCustomer = [];
    this.LoadDataCustomer();
<<<<<<< HEAD
  }

  loadContact() {
    this.storage.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadContact.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.itemsContact.push(item);
        }
      });
    })
  }

  LoadDataCustomer() {
    let body = {
      aksi: 'getdata',
      limit: this.limit,
      start: this.start,
    };
    this.postPvdr.postData(body, 'LoadDataCustomer.php?Customer=' + this.namaCustomer).subscribe(data => {
      for (let item of data) {
        this.itemsCustomer.push(item);
        this.storage.set('DataCustomer', this.itemsCustomer).then(() => {
          this.storage.get('DataCustomer').then((data) => {
            var DataCustomer = data;
            var emailCustomer = DataCustomer.map(data => data.email);
            var alamatCustomer = DataCustomer.map(data => data.almt_rumah);
            var nomorCustomer = DataCustomer.map(data => data.no_tlp);
            this.emailCustomer = emailCustomer.toString();
            this.alamatCustomer = alamatCustomer.toString();
            this.no_tlp = parseInt(nomorCustomer);
          })
        })
      }
    });
=======
    console.log(this.itemsCustomer)

  }

  loadContact(){
    this.storage.get('IdLogin').then((IdLogin)=>{
        this.user = IdLogin;
        let body = {
          aksi : 'getdata',
          limit : this.limit,
          start : this.start,
          };
          this.postPvdr.postData(body, 'LoadContact.php?Id='+this.user).subscribe(data =>{
              for(let item of data){
                this.itemsContact.push(item);
            } 
          });
      })
  }

  LoadDataCustomer(){
        let body = {
          aksi : 'getdata',
          limit : this.limit,
          start : this.start,
          };
          this.postPvdr.postData(body, 'LoadDataCustomer.php?Customer='+this.namaCustomer).subscribe(data =>{
              for(let item of data){
                this.itemsCustomer.push(item);
                this.storage.set('DataCustomer',this.itemsCustomer).then(()=>{
                  this.storage.get('DataCustomer').then((data)=>{
                    var DataCustomer = data;
                    var emailCustomer = DataCustomer.map( data => data.email);
                    var alamatCustomer = DataCustomer.map( data => data.almt_rumah);
                    var nomorCustomer = DataCustomer.map( data => data.no_tlp);
                    this.emailCustomer = emailCustomer;
                    this.alamatCustomer = alamatCustomer;
                    this.no_tlp = nomorCustomer;
                  })
                })
            } 
          });
>>>>>>> 62f305c286fbee980a4244bea54ab7fb9fafdb78
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
            this.itemProduct.push(item);
          }
        })
      });
    })
  }

  loadQuantityroduct() {
<<<<<<< HEAD
    let body = {
      aksi: 'getdata',
      limit: this.limit,
      start: this.start,
    };
    this.postPvdr.postData(body, 'LoadQuantityProduct.php?Product=' + this.customerneed).subscribe(data => {
      for (let item of data) {
        this.itemQunatityProduct.push(item);
        this.storage.set('Stock', this.itemQunatityProduct).then(() => {
          this.storage.get('Stock').then((harga) => {
            var harga = harga;
            var hargaProduk = harga.map(data => data.hargaProduk);
            this.hargaProduk = parseInt(hargaProduk);
          })
        })
      }
    });
  }

  loadEmailAccount() {
    let body = {
      aksi: 'getdata',
      limit: this.limit,
      start: this.start,
    };
    this.postPvdr.postData(body, 'LoadEmailAccount.php?Account=' + this.company).subscribe(data => {
      for (let item of data) {
        this.itemsEmailAccount.push(item);
        this.storage.set('DataAccount', this.itemsEmailAccount).then(() => {
          this.storage.get('DataAccount').then((email) => {
            var DataAccount = email;
            var DataAlamat = DataAccount.map(data => data.alamat);
            var DataEmail = DataAccount.map(data => data.email);
            var DataNomor = DataAccount.map(data => data.phone);
            this.alamatCompany = DataAlamat.toString();
            this.emailCompany = DataEmail.toString();
            this.nomorCompany = parseInt(DataNomor);
          })
        })
      }
    });
=======
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadQuantityProduct.php?Product=' + this.customerneed).subscribe(data => {
        for (let item of data) {
          this.itemQunatityProduct.push(item);
          this.storage.set('Stock', this.itemQunatityProduct).then(() => {
            this.storage.get('Stock').then((harga) => {
              var harga = harga;
              var hargaProduk = harga.map( data => data.hargaProduk);
              this.hargaProduk = parseInt(hargaProduk);
            })
          })
        }
      });
  }

  loadEmailAccount() {
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadEmailAccount.php?Account=' + this.company).subscribe(data => {
        for (let item of data) {
          this.itemsEmailAccount.push(item);
          this.storage.set('DataAccount', this.itemsEmailAccount).then(() => {
            this.storage.get('DataAccount').then((email) => {
              var DataAccount = email;
              var DataAlamat = DataAccount.map( data => data.alamat);
              var DataEmail = DataAccount.map( data => data.email);
              var DataNomor = DataAccount.map( data => data.phone);
              this.alamatCompany = DataAlamat;
              this.emailCompany = DataEmail;
              this.nomorCompany = DataNomor;
            })
          })
        }
      });
>>>>>>> 62f305c286fbee980a4244bea54ab7fb9fafdb78
  }

  async SaveProspect() {
    const alert = await this.alertCtrl.create({
      subHeader: 'Apa kamu sudah yakin ?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          handler: (blah) => {
            console.log('cancel')
          }
        }, {
          text: 'Ya',
          handler: () => {
            this.createPdf();
            return new Promise(resolve => {
              let body = {
                aksi: 'add',
                namaCustomer: this.namaCustomer,
                emailCustomer: this.emailCustomer,
                alamatCustomer: this.alamatCustomer,
                no_tlp: this.no_tlp,
                company: this.company,
                alamatCompany: this.alamatCompany,
                emailCompany: this.emailCompany,
                nomorCompany: this.nomorCompany,
                customerneed: this.customerneed,
                stock: this.stock,
                hargaProduk: this.hargaProduk,
                totalPrice: this.totalPrice,
                budget: this.budget,
                userID: this.userID
              };
              this.postPvdr.postData(body, 'InsertProspect.php').subscribe(data => {
                console.log(data)
                this.savebutton = true;
              });
            });
          }
        }
      ]
    })
<<<<<<< HEAD
    this.pushNotif(5);
    await alert.present();
=======
    loading.present();
    if (this.namaCustomer == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Nama tidak boleh kosong',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.company == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Company tidak boleh kosong',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.no_tlp == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'No telepon tidak boleh kosong',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.almt_rumah == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Alamat rumah mohon di isi',
          duration: 2000
        })
        toast.present();
      })
    } else if (this.customerneed == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Field Customerneed mohon di isi',
          duration: 2000
        })
        toast.present();
      })
    } else {
      return new Promise(resolve => {
        let body = {
          aksi: 'add',
          nama: this.namaCustomer,
          company: this.company,
          no_tlp: this.no_tlp,
          almt_rumah: this.almt_rumah,
          customerneed: this.customerneed,
          userID: this.userID,
          email: this.email,
        };
        this.postPvdr.postData(body, 'InsertProspect.php').subscribe(data => {
          console.log(data)
          loading.dismiss().then(() => {
            // this.router.navigate(['members/prospect']);
          })
        });
      });
    }

>>>>>>> 62f305c286fbee980a4244bea54ab7fb9fafdb78
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
        nama: this.namaCustomer,
        company: this.company,
        no_tlp: this.no_tlp,
        almt_rumah: this.almt_rumah,
        customerneed: this.customerneed,
        email: this.email,
      };
      this.postPvdr.postData(body, 'InsertProspect.php').subscribe(data => {
        console.log(data)
        loading.dismiss().then(() => {
          this.router.navigate(['members/seeallprospect']);
        })
      });
    });
  }

  hitung() {
    this.storage.get('Stock').then((stock) => {
      this.jumlahProduk = stock;
      this.jumlahProduk = this.jumlahProduk.map(user => user.jumlahProduk);
      var hasilStok = parseInt(this.jumlahProduk);
      var SisaStok = hasilStok - this.stock;
    })
    this.price = parseInt(this.hargaProduk)
    var totalHarga = this.price * this.stock;
    this.totalPrice = totalHarga;
  }

  TakeEmail() {
    // this.storage.set('EmailAccount', this.company)
    this.loadEmailAccount();
    this.itemsEmailAccount = [];
  }

  next() {
    this.stock = 0;
    this.slides.slideNext();
    this.itemQunatityProduct = [];
    this.slides.lockSwipes(false);
    this.progress = this.progress + 0.5;
    this.storage.set('NamaProduk', this.customerneed);
    this.loadQuantityroduct()
  }

  nextSlide3() {
    this.slides.lockSwipes(false);
    this.progress = this.progress + 0.5;
    this.slides.slideNext();
<<<<<<< HEAD
    // console.log(this.emailCustomer)
    // console.log(this.alamatCustomer)
    // console.log(this.no_tlp)
    // console.log(this.alamatCompany)
    // console.log(this.emailCompany)
    // console.log(this.nomorCompany)
=======
    // this.createPdf();
    console.log('Isystem Asia')
    console.log('To', this.company)
    console.log('Email', this.emailAccount)
    console.log('Produk yang dipilih', this.customerneed)
    console.log('Harga Per satuan', this.hargaProduk)
    console.log('Quantity', this.stock)
    console.log('Harga Total', this.totalPrice)
>>>>>>> 62f305c286fbee980a4244bea54ab7fb9fafdb78
  }

  prev() {
    this.slides.lockSwipes(false);
    this.progress = this.progress - 0.5;
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
            this.itemsAccount.push(item);
          }
        })
      });
    })
  }

  createPdf() {
    var docDefinition = {
      content: [
        { text: 'Quotation', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },

        { text: 'Isystem Asia', style: 'subheader1' },
        { text: this.letterObj.address },

        { text: 'To', style: 'subheader' },
        this.company,
        this.emailCompany,
        this.alamatCompany,
        this.nomorCompany,

        { text: 'Customer Info', style: 'subheader' },
        this.namaCustomer,
        this.company,
        this.emailCustomer,
        this.alamatCustomer,
        this.no_tlp,

        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
        {
          table:
          {
            widths: ['*', '*', '*', '*'],
            body: [
              [{ text: 'Item Name' }, { text: 'Price' }, { text: 'Quantity' }, { text: 'Total Price' }],
              [{ text: this.customerneed }, { text: this.hargaProduk }, { text: this.stock }, { text: this.totalPrice }],
            ]
          }
        },
<<<<<<< HEAD
        { text: 'Thank you for your bussiness!', style: 'subheader', alignment: 'right' },
=======
        { text: 'Thank you for your bussiness!', style: 'subheader' , alignment: 'right'  },
>>>>>>> 62f305c286fbee980a4244bea54ab7fb9fafdb78
        { text: new Date().toString(), alignment: 'right' },
        // {
        //   ul: [
        //     'Nama Produk = ' + this.customerneed,
        //     'Harga Produk = ' + this.hargaProduk,
        //     'Quantity = ' + this.stock,
        //     'Harga Total = ' + this.totalPrice
        //   ]
        // }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        subheader1: {
          fontSize: 10,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
  async cancel() {
    const alert = await this.alertCtrl.create({
<<<<<<< HEAD
      header: 'Apa kamu yakin membatalkan proses ini ?',
      buttons: [
=======
      header : 'Apa kamu yakin?',
      subHeader: 'Untuk membatalkan proses ini?',
      buttons : [
>>>>>>> 62f305c286fbee980a4244bea54ab7fb9fafdb78
        {
          text: 'Batal',
          role: 'cancel',
          handler: (blah) => {
            console.log('cancel')
          }
        },
        {
          text: 'Ya',
          handler: () => {
            this.router.navigate(['members/prospect'])
          }
        }
      ]
    })
    await alert.present();
  }
}
