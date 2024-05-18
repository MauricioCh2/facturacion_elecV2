import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CurrentUserService} from "./current-user.service";
import Swal from "sweetalert2";


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
      let timerInterval;
      Swal.fire({
        title: "La session a finalizado!",
        html: "Volveras al login en <b></b> milisegundos.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 11111111);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      })
      this.router.navigate(['/login']);

    }
    return isUserLogged;
  }
}
