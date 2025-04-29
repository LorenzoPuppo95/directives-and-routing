import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SuperBtnDirective } from './directives/super-btn/super-btn.directive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'directives-and-routing';
}
