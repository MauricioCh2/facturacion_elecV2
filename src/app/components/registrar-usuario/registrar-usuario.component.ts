import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user.service";
import {toolbox} from "../../utiles/toolbox";



@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent implements  OnInit{
  usuario : Usuario = new Usuario();
  editMode : boolean = false;


  constructor(private usuarioService : UsuarioService, private router:Router, protected current : CurrentUserService) {
  }
  ngOnInit(): void {
  if(this.current.isUserLogged()){
    console.log(" \x1b[31m"+ " Hay alguien logeado me pongo en edit mode " +"\x1b[0m");
    this.editMode = true;
    this.usuarioService.getUsuarioById(this.current.getCurrentUser().idUsuario).subscribe(dato =>{
      this.usuario = dato;
    },error => console.log(error));
  }else{
    console.log(" \x1b[31m"+ " No hay  alguien logeado me pongo en register mode " +"\x1b[0m");

    this.editMode = false;
    this.usuario = new Usuario();
  }
  }
guardarUsuario() {//esto es lo que pasa cuando se oprime el boton  de guardar o actuializr

    this.usuario.aprobado = 'ESP';
    this.usuario.tipo = 'PRO';
    const operacion = this.editMode
      ? this.usuarioService.actualizarUsuario(this.usuario.idUsuario, this.usuario)
      : this.usuarioService.registrarUsuario(this.usuario);
    operacion.subscribe(//sea cual sea la opcion imprime  la salida y redirije a la lista
      dato => {
        console.log(dato);
        if(this.editMode === false) {
        toolbox.notificacionEstandar("Exito", ("El usuario: "+this.usuario.nombre + "a sido guardado correctamente"), "success");
        }else{
          toolbox.notificacionEstandar("Exito", ("El usuario: "+this.usuario.nombre + "a sido actualizado correctamente"), "success");
        }
        this.goToLogin();
      },
      error => {
        console.error(error); // Muestra el error en la consola para depuración
        const mensajeError = error?.error || "Ha ocurrido un error desconocido"; // Obtén el mensaje de error del objeto error

        toolbox.notificacionEstandar("Error", `Ha habido un error: ${mensajeError}`, "error");

      }
    );
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
  onSubmit(){
    console.log(this.usuario);
    this.guardarUsuario();
  }
  getIdPattern() {
    switch (this.usuario.tipoCedula) {
      case 'FIS':
        return '^\\d{1}-\\d{4}-\\d{4}$';
      case 'EXT':
        return '^1\\d{11}$|^1\\d{10}$';
      case 'JUR':
        return '^\\d+$';
      default:
        return '';
    }
  }


  getIdMinLength() {
    switch (this.usuario.tipoCedula) {
      case 'FIS':
        return "9";
      case 'EXT':
        return "10";
      case 'JUR':
        return "10";
      default:
        return 0;
    }
  }

  getIdMaxLength() {
    switch (this.usuario.tipoCedula) {
      case 'FIS':
        return "9";
      case 'EXT':
        return "11";
      case 'JUR':
        return "10";
      default:
        return 0;
    }
  }



  permitirSoloNumeros(evento: any) {
    const valorIngresado = evento.target.value;
    const valorFiltrado = valorIngresado.replace(/[^0-9]/g, '');
    evento.target.value = valorFiltrado;
    this.usuario.idUsuario = valorFiltrado;
  }
}
