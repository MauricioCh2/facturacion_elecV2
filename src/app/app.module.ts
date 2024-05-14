import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './components/header/header.component';
import { ListarProvedoresComponent } from './components/listar-provedores/listar-provedores.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { CanvasUsuarioComponent } from './components/canvas-usuario/canvas-usuario.component';
import { ListarClientesComponent } from './components/clientes/listar-clientes/listar-clientes.component';
import { AddClienteComponent } from './components/clientes/add-cliente/add-cliente.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { AddProductoComponent } from './components/productos/add-producto/add-producto.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import {CurrentUserService} from "./services/current-user.service";
import { AuthCurrentDirective } from './directivas/auth-current.directive';
import { FacturarComponent } from './components/facturas/facturar/facturar.component';
import { ListaFacturasComponent } from './components/facturas/lista-facturas/lista-facturas.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListarProvedoresComponent,
    RegistrarUsuarioComponent,
    LoginComponent,
    CanvasUsuarioComponent,
    ListarClientesComponent,
    AddClienteComponent,
    ListaProductosComponent,
    AddProductoComponent,
    AcercaDeComponent,
    AuthCurrentDirective,
    FacturarComponent,
    ListaFacturasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
