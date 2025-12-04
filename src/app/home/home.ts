import { Component, OnInit } from '@angular/core';
import {TranslateDirective, TranslateModule,TranslatePipe,TranslateService} from '@ngx-translate/core'
import { HomeService } from './home-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [TranslateModule, TranslatePipe, RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  token!: string;
  user: any;
  constructor(private homeService: HomeService) {}
  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? '';
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
  }
}
