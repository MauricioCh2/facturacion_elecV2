import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CurrentUserService} from "./current-user.service";
import Swal from "sweetalert2";
import {toolbox} from "../utiles/toolbox";


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private currentUserService: CurrentUserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isUserLogged = this.currentUserService.isUserLogged();
    if (!isUserLogged) {
//

      toolbox.notificacionEstandarConTiempo("La session a finalizado!","Volveras al login en <b></b>segundos",2000);
      this.router.navigate(['/login']);

    }
    const  isUserAproved = this.currentUserService.getCurrentUser().aprobado === 'APR';
    if (!isUserAproved) {
      toolbox.notificacionEstandarConTiempo("Usuario no aprobado!","Volveras al login en <b></b>segundos",2000);
      this.router.navigate(['/login']);
    }
    return isUserLogged;
  }
}
