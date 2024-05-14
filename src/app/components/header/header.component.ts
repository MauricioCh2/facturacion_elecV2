import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChildren} from '@angular/core';
import {CurrentUserService} from "../../services/current-user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  @ViewChildren('elementosAOcultar') elementosAOcultar: ElementRef[];
  private authStatusSubscription: Subscription;

  constructor(private renderer: Renderer2, private currentUserService: CurrentUserService) {}

  ngOnInit() {
    this.authStatusSubscription = this.currentUserService.authStatus$.subscribe((isLoggedIn) => {
      this.ocultarElementos(isLoggedIn);
    });
  }

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }

  ocultarElementos(mostrar: boolean) {
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
