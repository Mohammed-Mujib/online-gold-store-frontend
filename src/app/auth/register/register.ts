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
import { RegisterService } from './register-service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Route, Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FieldsetModule,
    TranslatePipe,
    TranslateModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  providers: [MessageService],
})
export class Register implements OnInit {
  userForm!: FormGroup;
  destroyRef = inject(DestroyRef);

  constructor(
    private registerService: RegisterService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.initFrom();
  }

  registerNewUser(data: any) {
    this.registerService
      .registerUser(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.status == 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User registered successfully',
            });
            this.router.navigate(['auth/register']);
          }
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
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    const isvalid = this.userForm.valid;
    let rowData = this.userForm.getRawValue();
    if (!isvalid) {
      return;
    }
    if (!this.checkPassword()) {
      return;
    }
    console.log(rowData);

    this.registerNewUser(rowData);
  }

  checkPassword(): boolean {
    return (
      this.userForm.get('password')?.value === this.userForm.get('password_confirmation')?.value
    );
  }
}
