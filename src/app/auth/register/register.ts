import { Component, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  imports: [FieldsetModule, TranslatePipe, TranslateModule, InputTextModule ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {}
