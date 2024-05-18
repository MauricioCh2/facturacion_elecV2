import {Directive, HostListener, Input} from '@angular/core';
import {Router} from "@angular/router";
import {CurrentUserService} from "../services/current-user.service";

@Directive({
  selector: '[appAuthCurrent]'
})
export class AuthCurrentDirective {
  @Input() defaultRoute: string; // Ruta por defecto

  constructor(private router: Router, private authService: CurrentUserService) {}

  @HostListener('click')
  onClick() {
    if (this.authService.isUserLogged()) {// Enruta a la página principal si el usuario está autenticado
      if(this.authService.getCurrentUser().tipo === 'ADM') {
        this.router.navigate(['/proveedores']); // si es admin
      }
      if(this.authService.getCurrentUser().tipo === 'PRO') { //si es provedor
        this.router.navigate(['/facturacion']);
      }
    } else {
      this.router.navigate([this.defaultRoute || '/login']); // Enruta a la página de inicio de sesión si el usuario no está autenticado
    }
  }

}
