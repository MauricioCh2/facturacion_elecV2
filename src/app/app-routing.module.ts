import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListarProvedoresComponent} from "./components/listar-provedores/listar-provedores.component";
import {RegistrarUsuarioComponent} from "./components/registrar-usuario/registrar-usuario.component";
import {LoginComponent} from "./components/login/login.component";
import {FacturacionComponent} from "./components/facturacion/facturacion.component";
import {AcercaDeComponent} from "./components/acerca-de/acerca-de.component";
import {AddClienteComponent} from "./components/clientes/add-cliente/add-cliente.component";
import {ListarClientesComponent} from "./components/clientes/listar-clientes/listar-clientes.component";
import {AddProductoComponent} from "./components/productos/add-producto/add-producto.component";
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path : '', redirectTo: 'login', pathMatch: 'full'} ,//si esta vacio retorna a usuarios, CAMBIAR A ALOGIN
  {path : 'login', component: LoginComponent},
  {path : 'acerca-de', component: AcercaDeComponent},
  {path : 'registrar-usuario', component: RegistrarUsuarioComponent,  },
  {path : 'proveedores', component: ListarProvedoresComponent, canActivate: [AuthGuardService] },
  {path : 'facturacion', component: FacturacionComponent, canActivate: [AuthGuardService] },

  {path : 'add-cliente', component: AddClienteComponent, canActivate: [AuthGuardService] },
  {path : 'clientes', component: ListarClientesComponent, canActivate: [AuthGuardService] },
  {path : 'add-producto', component: AddProductoComponent, canActivate: [AuthGuardService] },
  {path : 'productos', component: ListarProvedoresComponent, canActivate: [AuthGuardService] },
  {path : 'facturas', component: FacturacionComponent, canActivate: [AuthGuardService] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
