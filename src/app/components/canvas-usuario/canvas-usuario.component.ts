import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user.service";
import  swal  from 'sweetalert2'; //permite alertas
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Usuario} from "../../entities/usuario";

@Component({
  selector: 'app-canvas-usuario',
  templateUrl: './canvas-usuario.component.html',
  styleUrl: './canvas-usuario.component.css'
})
export class CanvasUsuarioComponent implements  OnInit{

  //Router para redireciones, NgbModal para poder cerrar el offCanva cuando se desloguee
  currentUser: Usuario = null;
  constructor(private router:Router, private currentUserService: CurrentUserService, private modalService: NgbModal, private userService : UsuarioService) { }


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
    this.router.navigate(['/registrar-usuario']);
  }

  ngOnInit(): void {
    if (this.currentUserService.isUserLogged()){
      this.userService.getUsuarioById(this.currentUserService.getCurrentUser().idUsuario).subscribe(dato =>{
        this.currentUser = dato;
      },error => console.log(error));
    }

  }


}
