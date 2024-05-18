import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user.service";
import  swal  from 'sweetalert2'; //permite alertas
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Usuario} from "../../entities/usuario";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-canvas-usuario',
  templateUrl: './canvas-usuario.component.html',
  styleUrl: './canvas-usuario.component.css'
})
export class CanvasUsuarioComponent implements  OnInit, OnDestroy{

  //Router para redireciones, NgbModal para poder cerrar el offCanva cuando se desloguee
  @Input() currentUser: Usuario;
  private offcanvasRef: NgbModalRef; // Referencia al offcanvas abierto

  constructor(
    private router: Router,
    private currentUserService: CurrentUserService,
    private modalService: NgbModal,
    private userService: UsuarioService
  ) {}

  ngOnDestroy(): void {

    if (this.offcanvasRef) {
      this.offcanvasRef.close(); // Cerrar el offcanvas cuando se destruya el componente
    }
    }

  ngOnInit(): void {
    //this.offcanvasRef = this.modalService.open(CanvasUsuarioComponent, { ariaLabelledBy: 'offcanvas-basic-title' });
    //
    if (this.currentUserService.isUserLogged()){
      console.log("estoy en el canva y si salgo logeado");
      this.userService.getUsuarioById(this.currentUserService.getCurrentUser().idUsuario).subscribe(dato =>{
        this.currentUser = dato;
      },error => console.log(error));
    }

  }


  logout(){

    swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas cerrar sesion",
      icon: 'warning', // Cambiar 'type' por 'icon'
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , cerrar sesion',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then(() => {
      this.currentUserService.logout();
      this.modalService.dismissAll(); // cierra todos los modales/offcanvas abiertos
      this.router.navigate(['/login']);
      swal.fire(
        'Salio correctamente',
        '',
        'success'
      )
    })

  }

  actualizarUsuario() {
    this.router.navigate(['/registrar-usuario']);
  }




}
