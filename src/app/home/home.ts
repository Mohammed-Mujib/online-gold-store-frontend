import { Component } from '@angular/core';
import {TranslateDirective, TranslateModule,TranslatePipe,TranslateService} from '@ngx-translate/core'

@Component({
  selector: 'app-home',
  imports: [TranslateModule, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
