import { Component, DestroyRef, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  TranslateDirective,
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { HomeService } from './home-service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../auth/auth-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { log } from 'console';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [TranslateModule, CommonModule ,Navbar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home  {
  // token!: string;
  // user: any;
  // destroyRef = inject(DestroyRef);

  // constructor(
  //   private homeService: HomeService,
  //   @Inject(PLATFORM_ID) private platformId: Object,
  //   private authService: AuthService,
  //   private router: Router
  // ) {}

  // ngOnInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.token = sessionStorage.getItem('token') ?? '';

  //     const userData = sessionStorage.getItem('user');
  //     try {
  //       this.user = userData ? JSON.parse(userData) : null;
  //     } catch (e) {
  //       console.error('Invalid user JSON:', e);
  //       this.user = null;
  //     }
  //   } else {
  //     this.token = '';
  //     this.user = null;
  //   }
  // }

  // logout() {
  //   this.authService
  //     .logoutUSer(this.token)
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe({
  //       next: (res) => {
  //         console.log('good');
  //         console.log(res);

  //         if (res.is_success) {
  //           this.token = '';
  //           this.user = null;
  //           sessionStorage.removeItem('token');
  //           sessionStorage.removeItem('user');
  //         }

  //         this.router.navigate(['/auth/login']);
  //       },
  //       error: (err) => {
  //         console.log('error');
  //         console.error(err);

  //         // Even if API fails, clear local storage to log out locally
  //         // sessionStorage.removeItem('token');
  //         // sessionStorage.removeItem('user');
  //         // this.token = '';
  //         // this.user = null;
  //         // this.router.navigate(['/login']);
  //       },
  //     });
  // }
}
