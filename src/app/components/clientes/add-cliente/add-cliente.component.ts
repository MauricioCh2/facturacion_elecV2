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
    this.usuarioService.addCliente(userId, this.cliente).subscribe(
      data =>{
        Swal({
          title: 'Cliente agregado',
          text: `Cliente ${this.cliente.nombreC} ha sido agregado con éxito`,
          type: 'success',
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
      Swal({
        title: 'Error',
        text: `Cliente ${this.cliente.nombreC} no se ha podido agregar`,
        type: 'error',
      }).then((result) => {
        if (result.value) {
          // this.router.navigate(['/clientes']);
        }
      } );
    }
  );

}
}
