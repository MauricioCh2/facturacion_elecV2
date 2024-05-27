import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../../entities/cliente";
import {UsuarioService} from "../../../services/usuario.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../../services/current-user.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrl: './add-cliente.component.css'
})
export class AddClienteComponent implements OnInit{
  cliente = new Cliente();
  protected error: string;
  constructor(private usuarioService: UsuarioService, private router:Router, private currentUser: CurrentUserService){
  }
  ngOnInit(): void {
  }

onSubmit(){
  const userId = this.currentUser.getCurrentUser().idUsuario;
  this.unformatCedula();
    this.usuarioService.addCliente(userId, this.cliente).subscribe(
      data =>{
        Swal.fire({
          title: 'Cliente agregado',
          text: `Cliente ${this.cliente.nombreC} ha sido agregado con éxito`,
          icon: 'success',
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/clientes']);
          }
        }
      );
      },
    error => {
      // console.log(error);
      // // Si hay un error, establece la variable de error
      //   this.error = 'No se logro agregar el cliente !!!.';
      Swal.fire({
        title: 'Error',
        text: `Cliente ${this.cliente.nombreC} no se ha podido agregar`,
        icon: 'error',
      }).then((result) => {
        if (result.value) {
          // this.router.navigate(['/clientes']);
        }
      } );
    }
  );

}
  formatCedula(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 1) {
      value = value.slice(0, 1) + '-' + value.slice(1);
    }
    if (value.length > 6) {
      value = value.slice(0,6) + '-' + value.slice(6, 9);
    }
    this.cliente.identificacionC = value;
  }
  unformatCedula() {
    this.cliente.identificacionC = this.cliente.identificacionC.replace(/-/g, '');
  }

}
