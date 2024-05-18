import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "./services/current-user.service";
import {Usuario} from "./entities/usuario";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'Factura Electronica';


  constructor(private currentUserService: CurrentUserService) {}



}
