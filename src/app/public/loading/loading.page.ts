import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(
    private router: Router
  ) { }
  
  ngOnInit() {
  }

  // Fungsi untuk masuk ke pages HTML register //
  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Fungsi untuk masuk ke pages HTML login untuk login ke apps //
  login() {
    this.router.navigate(['/login']);
  }
}
