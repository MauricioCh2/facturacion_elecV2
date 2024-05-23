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

    const isUserLogged = this.currentUserService.isUserLogged(); //verifica que este logeado
    if (!isUserLogged) {
      toolbox.notificacionEstandarConTiempo("La sesión a finalizado!","Volveras al login en <b></b>segundos",2000);
      this.router.navigate(['/login']);

    }

    const  isUserAproved = this.currentUserService.getCurrentUser().aprobado === 'APR'; //verifica que este aprobado
    if (!isUserAproved) {
      toolbox.notificacionEstandarConTiempo("Usuario no aprobado!","Volveras al login en <b></b>segundos",2000);
      this.router.navigate(['/login']);
      return false;
    }
    const userType = this.currentUserService.getCurrentUser().tipo; //verifica que contenga los permisos
    if (next.data['roles'] && next.data['roles'].indexOf(userType) === -1) {
      // si no es autorizado vuelve al home
      toolbox.notificacionEstandarConTiempo("Ups! no deberias estar aqui","Volveras a tu pagina principal  en <b></b>segundos",2000);

      if(userType === 'ADM') {
        this.router.navigate(['/proveedores']); // si es admin
      }
      if(userType === 'PRO') { //si es provedor
        this.router.navigate(['/facturacion']);
      }
      return false;

    }
    return true;
  }
}
