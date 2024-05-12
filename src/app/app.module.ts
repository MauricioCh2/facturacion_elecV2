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
import { FacturacionComponent } from './components/facturacion/facturacion.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListarProvedoresComponent,
    RegistrarUsuarioComponent,
    LoginComponent,
    FacturacionComponent
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
