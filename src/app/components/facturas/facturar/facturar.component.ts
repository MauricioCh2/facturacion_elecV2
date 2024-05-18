import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../../../services/current-user.service";
import {Usuario} from "../../../entities/usuario";

@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.component.html',
  styleUrl: './facturar.component.css'
})
export class FacturarComponent implements OnInit{
  currentUser: Usuario;
  constructor(private currentService: CurrentUserService){

  }

  ngOnInit(): void {
    this.currentUser = this.currentService.getCurrentUser();
  }

  getName(): string {
    return this.currentUser.nombre;
  }

}
