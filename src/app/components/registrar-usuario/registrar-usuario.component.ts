import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user.service";
import {FormsModule} from '@angular/forms';


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
        this.goToLogin();
      },
      error => console.log(error)
    );
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
  onSubmit(){
    console.log(this.usuario);
    this.guardarUsuario();
  }
}
