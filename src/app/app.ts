import { Component, signal } from '@angular/core';
import { Userlogin } from "./userlogin/userlogin";
import { RouterOutlet } from '@angular/router'
@Component({
  selector: 'app-root',
  imports: [ RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('finalProject');
}
