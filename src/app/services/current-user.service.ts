import { Injectable } from '@angular/core';
import {Usuario} from "../entities/usuario";
import {Observable, Subject} from "rxjs";
import {UsuarioService} from "./usuario.service";
import {toolbox} from "../utiles/toolbox";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUser = null;
  private authStatusSource = new Subject<boolean>();
  authStatus$ = this.authStatusSource.asObservable();

  constructor(private userService : UsuarioService, private router: Router) {
    this.checkUserSession();
  }

  private checkUserSession() { //verifica que el usuario este logueado y activo
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.nombre && parsedUser.nombre.trim().length > 0) {
          this.userService.getUsuarioById(parsedUser.idUsuario).subscribe(usuario => {
            if (usuario.aprobado !== 'APR') {
              toolbox.printf(toolbox.colors.RED + 'El usuario ya no está aprobado');
              // El usuario ya no está aprobado, manejar este caso
              console.error('El usuario ya no está aprobado');
              toolbox.notificacionEstandarConTiempo("Usuario no aprobado!","Volveras al login en <b></b>segundos",2000);
              this.router.navigate(['/login']);
              this.logout();


            } else {
              this.currentUser = parsedUser;
              this.authStatusSource.next(true);
              this.currentUser.tipo = usuario.tipo;
              this.currentUser.tipo = usuario.nombre;
            }
          });
        } else {
          console.error('El usuario en el almacenamiento local no tiene un nombre válido');
          this.logout();
        }
      } else {
        this.authStatusSource.next(false);
      }
    }
  }

  public login(user: Usuario) {
    console.log(" INICIE SESSION   como: " + user.idUsuario);
    this.currentUser = user;
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.authStatusSource.next(true); // Emitir evento de autenticación
  }

  public logout() {
    this.currentUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.authStatusSource.next(false); // Emitir evento de cierre de sesión
  }

  isUserLogged() {
    return this.currentUser !== null;
  }

  getCurrentUser() {
    return this.currentUser;
  }
  getCurrentUserComplete() {
    return this.userService.getUsuarioById(this.currentUser.idUsuario) ;
  }
  public getTipo() {
    if (!this.currentUser) {
      return "";
    }
    return this.currentUser.tipo;
  }
  public resetCurrent(){
    this.currentUser = null;
    this.logout();
  }

  public getNombre(): string{
    return this.currentUser.nombre;
  }
}
