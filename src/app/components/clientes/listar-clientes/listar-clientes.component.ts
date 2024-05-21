import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../../entities/cliente";
import {ClienteService} from "../../../services/cliente.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../../services/current-user.service";
import  swal  from 'sweetalert2';
@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrl: './listar-clientes.component.css'
})
export class ListarClientesComponent implements OnInit{
  clientes : Cliente[];
  constructor(private clienteService: ClienteService, private router:Router, private currentUser: CurrentUserService){
  }
  ngOnInit(): void {
    this.clientesByProveedorId(this.currentUser.getCurrentUser().idUsuario);
  }
  public clientesByProveedorId(id: string) {
    this.clienteService.getClientesByProveedorId(id).subscribe(data => {
      // Verifica si data es un array o un objeto único
      if (Array.isArray(data)) {
        this.clientes = data;
      } else {
        // Si es un objeto único, lo agregas al array
        this.clientes.push(data);
      }
    });
  }


}
