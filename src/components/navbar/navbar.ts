import { Component, DestroyRef, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../app/auth/auth-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { Router } from 'express';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [TranslateModule, TranslatePipe, RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  token!: string;
  user: any;
  destroyRef = inject(DestroyRef);
  language !:string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.checkUser();
    this.language = localStorage.getItem("lang") || "en";
    this.changeLanguage(this.language);
  }

  checkUser() {
    if (isPlatformBrowser(this.platformId)) {
      this.token = sessionStorage.getItem('token') ?? '';

      const userData = sessionStorage.getItem('user');
      try {
        this.user = userData ? JSON.parse(userData) : null;
      } catch (e) {
        console.error('Invalid user JSON:', e);
        this.user = null;
      }
    } else {
      this.token = '';
      this.user = null;
    }
  }

  logout() {
    this.authService
      .logoutUSer(this.token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log('good');
          console.log(res);

          if (res.is_success) {
            this.token = '';
            this.user = null;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
          }

          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.log('error');
          console.error(err);

          // Even if API fails, clear local storage to log out locally
          // sessionStorage.removeItem('token');
          // sessionStorage.removeItem('user');
          // this.token = '';
          // this.user = null;
          // this.router.navigate(['/login']);
        },
      });
  }

  changeLanguage(lang: string) {
    localStorage.setItem('lang',lang)
    this.translateService.use(lang);
  }
}
