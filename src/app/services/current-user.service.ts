import { Injectable } from '@angular/core';
import {Usuario} from "../entities/usuario";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private isLogged = false;
  private currentUser = new Usuario();

  constructor() { }

  public login(user : Usuario) {
    console.log(" INICIE SESSION   como: "+ user.idUsuario);
    this.isLogged = true;
    this.currentUser = user;
  }

  public logout() {
    this.isLogged = false;
    this.currentUser = null;
  }

  isUserLogged() {
    return this.isLogged;
  }
  getCurrentUser() {
    return this.currentUser;
  }

}
