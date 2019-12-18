import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'src/providers/post-providers';

@Component({
  selector: 'app-addactivities',
  templateUrl: './addactivities.page.html',
  styleUrls: ['./addactivities.page.scss'],
})
export class AddactivitiesPage implements OnInit {
  user: number;
  limit: number = 10;
  start: number = 0;
  items: any;
  company : string;
  event = {
    title: '',
    desc: '',
    company: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();
  Data = [];
  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',

    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private storage: Storage,
    private postPvdr: PostProvider
  ) { }

  ngOnInit() {
    this.resetEvent();
    this.storage.get('Activity').then((item) => {
      this.eventSource = item;
      if (this.eventSource == null) {
        this.eventSource = [];
        console.log(this.eventSource)
      } else {
        this.eventSource = item;
        console.log(this.eventSource)
      }
    })
  }

  ionViewWillEnter() {
    this.items = [];
    this.start = 0;
    this.loadAccount();
  }

  loadAccount() {
    this.storage.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadAccount.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.items.push(item);
        }
      });
    })
  }
  // Fungsi untuk menambahkan aktivitas pada page activity.//
  addactivities() {
    this.router.navigate(['members/addactivities'])
  }

  //slot untuk meubah atau mengulang event yang di buat 
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      company: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  // membuat format acara/add acara yang tepat dan membuat ulang tujuan sourcenya
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      company : this.company,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    this.resetEvent();
    this.storage.set('Activity', this.eventSource);
    console.log('sukses menyimpan ')
    this.router.navigate(['members/activities'])
  }
  //fungsi untuk memajukan calender dari bulan ke bulan lain
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
  //fungsi untuk memundurkan calender dari bulan ke bulan lain
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // fungsi untuk mengubah mode kelender, day, week, dan month
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // terfokus kepada date today 
  today() {
    this.calendar.currentDate = new Date();
  }

  // Rentang tanggal yang akan dipilih dan karenanya judul yang akan berubah
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Acara kalender telah diklik dalam 1 funcation
  async onEventSelected(event) {
    // menggunakan angular date dan pipe untuk konversinya
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  // Slot waktu diklik 
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }


}
