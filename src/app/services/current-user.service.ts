import { Injectable } from '@angular/core';
import {Usuario} from "../entities/usuario";
import {Observable, Subject} from "rxjs";
import {UsuarioService} from "./usuario.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUser = null;
  private authStatusSource = new Subject<boolean>();
  authStatus$ = this.authStatusSource.asObservable();

  constructor(private userService : UsuarioService) {
    this.checkUserSession();
  }

  private checkUserSession() { //verifica la sesion del usuario, si hay y si esta vacio
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        const parsedUser = JSON.parse(user);
        // Verifica si el usuario tiene un nombre válido
        if (parsedUser.nombre && parsedUser.nombre.trim().length > 0) {
          this.userService.getUsuarioById(parsedUser.idUsuario);
          this.currentUser = parsedUser;
          this.authStatusSource.next(true);
          this.userService.getUsuarioById(parsedUser.idUsuario).subscribe(usuario => {
            this.currentUser.tipo = usuario.tipo;
          });
        } else {
          // El usuario no tiene un nombre válido, manejar este caso
          console.error('El usuario en el almacenamiento local no tiene un nombre válido');
          this.logout(); // Puedes optar por cerrar la sesión o hacer algo más
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

  public getNombre(){
    this.currentUser.nombre;
  }
}
