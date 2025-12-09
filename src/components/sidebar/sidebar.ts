import { Component } from '@angular/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  imports: [TranslatePipe, TranslateModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {}
