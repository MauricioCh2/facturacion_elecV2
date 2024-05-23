import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user.service";
import {colorConsole} from "../../utiles/color-console.js";
import Swal from "sweetalert2";
import {toolbox} from "../../utiles/toolbox";

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
    toolbox.printf(toolbox.colors.ORANGE + "Esta logeado alguien? " +this.currentUserService.isUserLogged());

    this.currentUserService.resetCurrent();

    }

  private  login(){
    this.usuarioService.login(this.usuario).subscribe(async dato => {

        if (await this.validateAprob()) { //la promesa tiene que cumplirse antes de iniciar
          this.currentUserService.login(dato); //agrega la sesion
          this.agregarTipo();
          console.log(dato);

          this.goToCorrespondent();
        }


      },
      error => {
        toolbox.printf(toolbox.colors.RED + error);

        // Si hay un error, establece la variable de error
        this.error = 'Usuario o contraseña inválidos.';
      }
    );
  }

  onSubmit(){
    toolbox.printf(colorConsole.RED + "Esta logeado alguien? " +this.currentUserService.isUserLogged());

    this.submitAttempted = true;
    console.log(this.usuario);

    if (this.usuario.idUsuario == null || this.usuario.contrasenia == null) {
      // Si los campos no son válidos, retorna de la función
      return;
    }

    this.login();
  }

  private validateAprob(): Promise<boolean> { //devuelve una promesa de true or false si es aprobado o no
    return new Promise((resolve, reject) => {
      console.log("Estoy en la validacion de entrada");
      console.log(this.usuario);
      this.usuarioService.getUsuarioById(this.usuario.idUsuario).subscribe(usuarioAux => {

        switch (usuarioAux.aprobado){
          case 'APR':
            console.log("El usuario esta aprobado");
            resolve(true);
            break;

          case 'ESP':
            toolbox.notificacionEstandar('Error al ingresar','Espera que un administrador apruebe tu ingreso','error');
            resolve(false);
            break;

          case 'REC':
            toolbox.notificacionEstandar('Error al ingresar','Fuiste rechazado por un administrador','error');
            resolve(false);
            break;
          case 'REV':
            toolbox.notificacionEstandar('Error al ingresar','Te han revocado los permisos','error');
            resolve(false);
            break;
          default:
            toolbox.notificacionEstandar('Error al ingresar','Tipo de usuario no identificado','error');
            resolve(false);
            break;

        }

      });
    });
  }

  private agregarTipo(){
    this.usuarioService.getUsuarioById(this.usuario.idUsuario).subscribe(usuarioAux => {
      this.usuario.tipo = usuarioAux.tipo;
    });
  }
  private goToCorrespondent() {
    console.log("Estoy en goToCorrespondent");
    console.log(this.usuario);
    this.usuarioService.getUsuarioById(this.usuario.idUsuario).subscribe(usuarioAux => {
      if (usuarioAux.tipo == 'ADM') { //podria enviar por qui el id, pero preferi hacer lo de curreent, creo que es mejor
        this.router.navigate(['/proveedores']);
      }
      else if (usuarioAux.tipo == 'PRO') {
        this.router.navigate(['/facturacion']);
      }
      else{
        console.log("No se pudo redirigir a ninguna pagina");
        Swal.fire({
          icon: 'error',
          title: 'Error al ingresar',
          text: 'Tipo de usuario no identificado',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
