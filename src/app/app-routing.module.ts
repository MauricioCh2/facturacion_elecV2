import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListarProvedoresComponent} from "./components/listar-provedores/listar-provedores.component";
import {RegistrarUsuarioComponent} from "./components/registrar-usuario/registrar-usuario.component";
import {LoginComponent} from "./components/login/login.component";
import {FacturacionComponent} from "./components/facturacion/facturacion.component";

const routes: Routes = [
  {path : 'proveedores', component: ListarProvedoresComponent},
  {path : 'login', component: LoginComponent},
  {path : '', redirectTo: 'login', pathMatch: 'full'} ,//si esta vacio retorna a usuarios, CAMBIAR A ALOGIN
  {path : 'registrar-usuario', component: RegistrarUsuarioComponent},
  {path : 'facturación', component: FacturacionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
