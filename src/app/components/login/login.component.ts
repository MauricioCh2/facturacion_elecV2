import { Component } from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario : Usuario = new Usuario();
  submitAttempted = false;


  protected error: string;
  constructor(private usuarioService : UsuarioService, private router:Router) {
  }

  login(){
    this.usuarioService.login(this.usuario).subscribe(dato =>{
        console.log(dato);
        this.goToCorrespondent();
      },
      error => {
        console.log(error);
        // Si hay un error, establece la variable de error
        this.error = 'Usuario o contraseña inválidos.';
      }
    );
  }

  onSubmit(){
    this.submitAttempted = true;
    console.log(this.usuario);

    if (this.usuario.idUsuario == null || this.usuario.contrasenia == null) {
      // Si los campos no son válidos, retorna de la función
      return;
    }

    this.login();
  }

  private goToCorrespondent() {
    console.log("Estoy en goToCorrespondent");
    console.log(this.usuario);
    this.usuarioService.getUsuarioById(this.usuario.idUsuario).subscribe(usuarioAux => {
      if (usuarioAux.tipo == 'ADM') {
        this.router.navigate(['/proveedores']);
      } else {
        this.router.navigate(['/facturación']);
      }
    });
  }
}
