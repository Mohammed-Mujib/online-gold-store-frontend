import { Component, DestroyRef, inject, NgModule, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { LoginService } from './login-service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Route, Router, RouterLink, RouterModule } from '@angular/router';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FieldsetModule,
    TranslatePipe,
    TranslateModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [MessageService],
})
export class Login implements OnInit {
  userForm!: FormGroup;
  destroyRef = inject(DestroyRef);

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initFrom();
  }

  loginUser(data: any) {
    this.loginService
      .loginUser(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          // if (res.status == 'success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User registered successfully',
          });
          this.router.navigate(['home']);
          console.log(res);

          sessionStorage.setItem("token",res.data.token);
          sessionStorage.setItem('user', JSON.stringify(res.data.user));


          // }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error?.message || 'Registration failed',
          });
        },
      });
  }

  initFrom() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    const isvalid = this.userForm.valid;
    let rowData = this.userForm.getRawValue();
    if (!isvalid) {
      return;
    }
    // if (!this.checkPassword()) {
    //   return;
    // }
    // console.log(rowData);

    this.loginUser(rowData);
  }
}
