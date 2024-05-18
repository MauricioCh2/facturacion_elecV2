import {Directive, HostListener, Input} from '@angular/core';
import {Router} from "@angular/router";
import {CurrentUserService} from "../services/current-user.service";

@Directive({
  selector: '[appAuthCurrent]'
})
export class AuthCurrentDirective {
  @Input() defaultRoute: string; // Ruta a la que se enrutará si el usuario no está autenticado

  constructor(private router: Router, private authService: CurrentUserService) {}

  @HostListener('click')
  onClick() {
    if (this.authService.isUserLogged()) {
      if(this.authService.getCurrentUser().tipo === 'ADM') {
        this.router.navigate(['/proveedores']); // Enruta a la página principal si el usuario está autenticado
      }
      if(this.authService.getCurrentUser().tipo === 'PRO') {
        this.router.navigate(['/facturacion']); // Enruta a la página principal si el usuario está autenticado
      }
    } else {
      this.router.navigate([this.defaultRoute || '/login']); // Enruta a la página de inicio de sesión si el usuario no está autenticado
    }
  }

}
