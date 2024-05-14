import { Injectable } from '@angular/core';
import {Usuario} from "../entities/usuario";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUser = new Usuario();
  private authStatusSource = new Subject<boolean>();
  authStatus$ = this.authStatusSource.asObservable();

  constructor() {
    this.checkUserSession();
  }

  private checkUserSession() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUser = JSON.parse(user);
        this.authStatusSource.next(true);
      } else {
        this.authStatusSource.next(false);
      }
    }
  }

  public login(user : Usuario) {
    console.log(" INICIE SESSION   como: "+ user.idUsuario);
    this.currentUser = user;
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.authStatusSource.next(true);
  }

  public logout() {
    this.currentUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.authStatusSource.next(false);
  }

  isUserLogged() {
    return this.currentUser !== null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  public getTipo() {
    return this.currentUser.tipo;
  }

}
