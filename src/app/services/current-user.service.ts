import { Injectable } from '@angular/core';
import {Usuario} from "../entities/usuario";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private isLogged = false;
  private currentUser = new Usuario();

  private authStatusSource = new Subject<boolean>();
  authStatus$ = this.authStatusSource.asObservable();


  constructor() { }

  public login(user : Usuario) {
    console.log(" INICIE SESSION   como: "+ user.idUsuario);
    this.isLogged = true;
    this.currentUser = user;
    this.authStatusSource.next(true);
    this.authStatusSource.next(false);
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

public isAdmin() {
    return this.currentUser.tipo == 'ADM';
  }

}
