import { Component } from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user.service";
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-canvas-usuario',
  templateUrl: './canvas-usuario.component.html',
  styleUrl: './canvas-usuario.component.css'
})
export class CanvasUsuarioComponent {

  constructor(private router:Router, private currentUserService: CurrentUserService){
  }

  logout(){
    swal({
      title: '¿Estas seguro?',
      text: "Confirma si deseas cerrar sesion",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , elimínalo',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result) => {
      if (result.value) {
        this.currentUserService.logout();
        this.router.navigate(['/login']);
          swal(
            'Salio correctamente',
            'success'
          )

      }
    })

  }

  actualizarUsuario() {
    this.router.navigate(['actualizar-usuario', this.currentUserService.getCurrentUser().idUsuario]);
  }
}
