import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user.service";
import {colorConsole} from "../../color-console";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements  OnInit{

  usuario : Usuario = new Usuario();
  submitAttempted = false;


  protected error: string;
  constructor(private usuarioService : UsuarioService, private router:Router, private currentUserService: CurrentUserService){
  }

  ngOnInit(): void {
    console.log( colorConsole.RED + "Esta logeado alguien? " +this.currentUserService.isUserLogged());

    this.currentUserService.resetCurrent();

    }

  login(){
    this.usuarioService.login(this.usuario).subscribe(dato =>{

      this.currentUserService.login(dato);
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
    console.log( colorConsole.RED + "Esta logeado alguien? " +this.currentUserService.isUserLogged());

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
      if (usuarioAux.tipo == 'ADM') { //podria enviar por qui el id, pero preferi hacer lo de curreent, creo que es mejor
        this.router.navigate(['/proveedores']);
      } else {
        this.router.navigate(['/facturacion']);
      }
    });
  }
}
