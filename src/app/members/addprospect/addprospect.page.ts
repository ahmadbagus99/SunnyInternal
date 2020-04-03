import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
//pdf package
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { stringify } from 'querystring';
import { setCheckNoChangesMode } from '@angular/core/src/render3/state';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from '@angular/core/src/render3';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-addprospect',
  templateUrl: './addprospect.page.html',
  styleUrls: ['./addprospect.page.scss'],
})

export class AddprospectPage implements OnInit {

  Order : any = [];
  public searchTerm: string = "";
  IdProspect : number;
  isHidden = true;
  selectHidden: boolean;
  savebutton : boolean=true;
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
  NPWP: number = 0;
  category: any;
  progress = 0;
  itemProduct = [];
  itemQunatityProduct = [];
  Nameproduct: any = [];
  jumlahProduk: any;
  hargaProduk: any;
  stock: any = [];
  quantity: string;
  totalPrice: number;
  price: number;
  itemsAccount: any;
  itemsEmailAccount: any;
  emailAccount: any;
  budget: number;
  itemsContact = [];
  alamatCompany: string;
  emailCompany: string;
  nomorCompany: number;
  emailCustomer: string;
  alamatCustomer: string;
  itemsCustomer = [];
  idProduct :number;
  sisaStock : number;
  checking : string='member';
  letterObj = {
    address: ' Arkadia Green Park Estate, Tower F, 6th Floor, Jl. TB Simatupang No.Kav. 88, RT.1/RW.2, Kebagusan, Kec. Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520',
    text: ' For purchasing the item with the criteria as below : '
  }
  showAlert : boolean;
  item : number=0;
  @ViewChild(IonSlides) slides: IonSlides;
  items: any = [];
  limit: number = 10;
  start: number = 0;
  pdfObj = null;
  index : number = 0;
  attributes:Array<number> = [];
  values:Array<string> = [];

  constructor(
    private postPvdr: PostProvider,
    private router: Router,
    private storage: Storage,
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    private alertCtrl: AlertController,
    private dataService: DataService,
    private localNotifications: LocalNotifications
  ) { }

  ionViewWillEnter() {
    this.items = [];
    this.start = 0;
    this.itemProduct = [];
    this.itemsContact = [];
    this.loadContact();
    this.loadProduct();
  }
  ngOnInit() {
    this.storage.get('session_storage').then((iduser) => {
      this.items2 = iduser;
      this.items2 = this.items2.map(user => user.id);
      this.user = parseInt(this.items2)
      this.userID = this.user;
    });
  }
  nextSlide1() {
    this.stock = 0;
    this.slides.slideNext();
    this.itemQunatityProduct = [];
    this.slides.lockSwipes(false);
    this.progress = this.progress + 0.5;
    this.storage.set('NamaProduk', this.customerneed);
    this.loadQuantityroduct()
  }
  async nextSlide3() {
    this.savebutton = false;
    this.slides.lockSwipes(false);
    this.progress = this.progress + 0.5;
    
    this.Nameproduct.forEach(product => {
      let body = {
        Product: product,
        Qty: 0
      }
      this.Order.push(body);
    });

    for (let i=0; i<this.values.length; i++){
      this.Order[i].Qty = this.values[i]
    }
   
    this.storage.get('Stock').then((data)=>{
      var Data = data;
      var id = Data.map( data => data.id);
      this.idProduct = parseInt(id);
    })
    if (this.budget > this.totalPrice){
      this.slides.slideNext();
      this.showAlert = true;
    }else{
      this.showAlert = false;
      const alert = await this.alertCtrl.create({
        subHeader: 'Budget not fulfilled',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: (blah) => {
              console.log('cancel');
            }
          }, {
            text: 'Yes',
            handler: () => {
              this.slides.slideNext();
            }
          }
        ]
      })
      await alert.present();
    }
  }
  BackSlide3() {
    this.Add(name)
    this.values = [];
    this.slides.lockSwipes(false);
    this.progress = this.progress - 0.5;
    this.slides.slidePrev();
    this.item = 0;
  }
  BackSlide4() {
    this.savebutton = true;
    this.slides.lockSwipes(false);
    this.progress = this.progress - 0.5;
    this.slides.slidePrev();
  }
  pushNotif(seconds: number){
    this.localNotifications.schedule({
      title : `New Prospect`,
      text : `You Created New Prospect!`,
      sound: null,
      trigger: {
        in : seconds,
        unit: ELocalNotificationTriggerUnit.SECOND,
      }
    })
  }
  async Add(NamaProduk){
    this.item = this.attributes.length;
    const toast = await this.toastCtrl.create({
      message: this.item.toString()+' Item Added',
      color: 'success',
      buttons: [
         {
          text: 'Done',
          handler: () => {
            this.slides.slideNext();
            this.progress = this.progress + 0.5;
          }
        }
      ]
    });
    toast.present();
  }
  showOnceToast(id,NamaProduk){
    this.addInput();
    this.toastCtrl.dismiss().then((obj)=>{
    }).catch(()=>{
    }).finally(()=>{
      this.Add(NamaProduk);
      this.Nameproduct.push(NamaProduk);
      const index = this.itemProduct.findIndex( data => data.namaProduk == NamaProduk)
      this.itemProduct[index].status = 'true'
      this.loadQuantityroduct();
    });
  }
  Delete(NamaProduk){
    const index = this.itemProduct.findIndex( data => data.namaProduk == NamaProduk)
    this.itemProduct[index].status = ''
    const indexProduct = this.itemQunatityProduct.findIndex ( data => data.namaProduk == NamaProduk)
    this.itemQunatityProduct.splice(indexProduct, 1)
    this.itemProduct[index].status = null
    this.Nameproduct.splice(index, 1)
    this.attributes.splice(index, 1)
    this.values.splice(index, 1)
  }
  showNow() {
    if (this.namaCustomer == 'new') {
      this.checking = 'new';
      this.isHidden = false;
      this.selectHidden = true;
      this.namaCustomer = '';
      this.itemsAccount = [];
      this.loadAcount();
    }
    this.itemsCustomer = [];
    this.LoadDataCustomer();
  }

  loadContact() {
    this.storage.get('session_storage').then((IdLogin) => {
      var ID = IdLogin;
      this.user = parseInt(ID.map(data => data.id))
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.Integration(body, 'LoadContact.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.itemsContact.push(item);
          this.storage.set('Data', this.itemsContact)
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
    this.postPvdr.Integration(body, 'LoadDataCustomer.php?Customer=' + this.namaCustomer).subscribe(data => {
      for (let item of data) {
        this.itemsCustomer.push(item);
        this.storage.set('DataCustomer', this.itemsCustomer).then(() => {
          this.storage.get('DataCustomer').then((data) => {
            var DataCustomer = data;
            var emailCustomer = DataCustomer.map(data => data.email);
            var alamatCustomer = DataCustomer.map(data => data.almt_rumah);
            var nomorCustomer = DataCustomer.map(data => data.no_tlp);
            var perusahaanCustomer = DataCustomer.map(data => data.perusahaan);
            this.company = perusahaanCustomer.toString();
            this.emailCustomer = emailCustomer.toString();
            this.alamatCustomer = alamatCustomer.toString();
            this.no_tlp = parseInt(nomorCustomer);
          })
        })
      }
    });
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
    this.storage.get('session_storage').then((IdLogin) => {
      var ID = IdLogin;
      this.user = parseInt(ID.map(data => data.id))
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.Integration(body, 'LoadProduct.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          for (let item of data) {
            this.itemProduct.push(item);
          }
        })
      });
    })
  }
  setFilteredItems() {
    this.itemProduct = this.dataService.filterProduct(this.searchTerm);
  }

  loadQuantityroduct() {
    let body = {
      aksi: 'getdata',
      limit: this.limit,
      start: this.start,
    };
    this.Nameproduct.forEach((product)=>{
      this.customerneed = product;
    })
    this.postPvdr.Integration(body, 'LoadQuantityProduct.php?Product=' + this.customerneed).subscribe(data => {
      for (let item of data) {
        this.itemQunatityProduct.push(item);
        this.storage.set('Stock', this.itemQunatityProduct).then(() => {
          this.storage.get('Stock').then((data) => {
            var DataProduct = data;
            var hargaProduk = DataProduct.map(data => data.hargaProduk);
            var idProduct = DataProduct.map(data => data.id)
            this.idProduct = idProduct.toString();
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
    this.postPvdr.Integration(body, 'LoadEmailAccount.php?Account=' + this.company).subscribe(data => {
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
  }

  SaveContact(){
    return new Promise(resolve => {
      let body = {
        aksi: 'Contact',
        nama: this.namaCustomer,
        email: this.emailCustomer,
        alamat: this.alamatCustomer,
        no_tlp: this.no_tlp,
        almt_rumah: this.almt_rumah,
        perusahaan: this.company,
        NPWP: this.NPWP,
        almt_perusahaan: this.alamatCompany,
        userID: this.userID
      };
      //Fungsi untuk menarik/mendapatkan data untuk data add contact dari server php
      this.postPvdr.Integration(body, 'Insert.php').subscribe(data => {
    });
    });
  }

  async SaveProspect() {
    const alert = await this.alertCtrl.create({
      subHeader: 'Are you Sure ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('cancel')
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.createPdf();
            this.removeStorage();
            if (this.checking == 'new') {
              this.SaveContact();
            }else if(this.checking == 'member'){
              console.log('Tidak Menyimpan')
            }
            this.UpdateQuantity();
            return new Promise(resolve => {
              let body = {
                aksi: 'Prospect',
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
              this.postPvdr.Integration(body, 'Insert.php').subscribe(data => {
                this.IdProspect = data.id;
                this.InsertDataOrder();
                this.router.navigate(['members/prospect']);
                // this.savebutton = true;
              });
            });
          }
        }
      ]
    })
    this.pushNotif(5);
    await alert.present();
  }
      InsertDataOrder(){
      this.Order.forEach(dataOrder => {
        let body = {
          aksi : 'DataOrder',
          Product: dataOrder.Product,
          Qty: dataOrder.Qty,
          idProspect: this.userID
        }
        this.postPvdr.Integration(body,'Insert.php').subscribe(data =>{
        });
      });
  }

  async updateProcess() {
    const loading = await this.loadingController.create({
      message: "Process",
      translucent: true
    })
    loading.present();
    return new Promise(resolve => {
      let body = {
        aksi: 'Prospect',
        id: this.id,
        nama: this.namaCustomer,
        company: this.company,
        no_tlp: this.no_tlp,
        almt_rumah: this.almt_rumah,
        customerneed: this.customerneed,
        email: this.email,
      };
      this.postPvdr.Integration(body, 'Update.php').subscribe(data => {
        loading.dismiss().then(() => {
          this.router.navigate(['members/seeallprospect']);
        })
      });
    });
  }

  hitung(){
    var GetPrice = this.itemQunatityProduct.map( data => data.hargaProduk);
    var Price = GetPrice.map((x)=>{
     return parseInt(x,10);
   })
    var Qty = this.values.map((y)=>{
      return parseInt(y,10);
    })
    var Sum = Price.map((num,idx)=>{
      return num * Qty[idx];
    })
    this.totalPrice = Sum.reduce(function(a,b){
      return a + b 
    },0
    )
  }
  valChange(value:string, index:number):void{
    this.values[index] = value;
  }
  addInput():void{
      this.attributes.push(this.attributes.length);
      this.values.push('');
  }
  TakeEmail() {
    this.loadEmailAccount();
    this.itemsEmailAccount = [];
  }
  UpdateQuantity(){
    return new Promise(resolve => {
      let body = {
        aksi: 'UpdateQtyProduct',
        jumlahProduk: this.sisaStock,
      };
      this.postPvdr.Integration(body, 'Update.php?Id='+this.idProduct).subscribe(data => {
      });
    });
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
      this.postPvdr.Integration(body, 'LoadAccount.php?Id=' + this.user).subscribe(data => {
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
        { text: 'Thank you for your bussiness!', style: 'subheader', alignment: 'right' },
        { text: new Date().toString(), alignment: 'right' },
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
      subHeader:'Previous data will be lost, Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('cancel')
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.router.navigate(['members/prospect'])
            this.removeStorage();
          }
        }
      ]
    })
    await alert.present();
  }
  removeStorage(){
    this.storage.remove('Amount');
    this.storage.remove('Data');
    this.storage.remove('DataAccount');
    this.storage.remove('DataCustomer');
    this.storage.remove('IDPRODUK');
    this.storage.remove('NamaProduk');
    this.storage.remove('Stock');
  }
}
