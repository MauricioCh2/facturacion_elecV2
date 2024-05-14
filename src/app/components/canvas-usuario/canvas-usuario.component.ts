import { Component } from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user.service";
import  swal  from 'sweetalert2'; //permite alertas
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-canvas-usuario',
  templateUrl: './canvas-usuario.component.html',
  styleUrl: './canvas-usuario.component.css'
})
export class CanvasUsuarioComponent {

  //Router para redireciones, NgbModal para poder cerrar el offCanva cuando se desloguee
  constructor(private router:Router, private currentUserService: CurrentUserService, private modalService: NgbModal) { }


  logout(){

    swal({//popup para decirle al usuario si realmentre queire salir con la libreria sweetalert
      title: '¿Estas seguro?',
      text: "Confirma si deseas cerrar sesion",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , cerrar sesion',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result) => {
      if (result.value) {
        this.currentUserService.logout();
        this.modalService.dismissAll(); // cierra todos los modales/offcanvas abiertos
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
