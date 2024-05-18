import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import {CurrentUserService} from "../../services/current-user.service";
import {Subscription} from "rxjs";
import { colorConsole } from '../../utiles/color-console.js';
import {Usuario} from "../../entities/usuario";
import {toolbox} from "../../utiles/toolbox";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
@ViewChildren('elementosAOcultar') elementosAOcultar: QueryList<ElementRef>;
private authStatusSubscription: Subscription;
  currentUser: Usuario;

  constructor(private renderer: Renderer2, protected currentUserService: CurrentUserService) {}

  ngOnInit() {

    this.currentUser = this.currentUserService.getCurrentUser();

    toolbox.printf(toolbox.colors.ORANGE + "Esta logeado alguien? " +this.currentUserService.isUserLogged());
 // colorConsole.printf(colorConsole.RED +"Esta logeado alguien? " +this.currentUserService.isUserLogged());
    this.authStatusSubscription = this.currentUserService.authStatus$.subscribe((isLoggedIn) => {
      this.ocultarElementos(isLoggedIn);
    });
  }

  ngAfterViewInit() {//cuando se inicializa la vista llama ekl metodo
    toolbox.printf(toolbox.colors.ORANGE + "Estoy en after, Esta logeado alguien? " +this.currentUserService.isUserLogged());

    this.ocultarElementos(this.currentUserService.isUserLogged());
  }

  ngOnDestroy() {
    toolbox.printf(toolbox.colors.ORANGE + "Estoy en destroy, Esta logeado alguien? " +this.currentUserService.isUserLogged());

    this.authStatusSubscription.unsubscribe();
  }

  ocultarElementos(mostrar: boolean) {//funcion para mostrar u ocultar elementos
    this.elementosAOcultar.forEach(el => {
      this.renderer.setStyle(el.nativeElement, 'display', mostrar ? 'block' : 'none');
    });
  }
  // ocultarElementos() {
  //   if (!this.authService.isUserLogged()) {
  //     this.elementosAOcultar.forEach(el => {
  //       this.renderer.setStyle(el.nativeElement, 'display', 'none');
  //     });
  //   } else {
  //     this.elementosAOcultar.forEach(el => {
  //       this.renderer.setStyle(el.nativeElement, 'display', 'block');
  //     });
  //   }
  // }
}
