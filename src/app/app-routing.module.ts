import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListarProvedoresComponent} from "./components/listar-provedores/listar-provedores.component";
import {RegistrarUsuarioComponent} from "./components/registrar-usuario/registrar-usuario.component";
import {LoginComponent} from "./components/login/login.component";
import {AcercaDeComponent} from "./components/acerca-de/acerca-de.component";
import {AddClienteComponent} from "./components/clientes/add-cliente/add-cliente.component";
import {ListarClientesComponent} from "./components/clientes/listar-clientes/listar-clientes.component";
import {AddProductoComponent} from "./components/productos/add-producto/add-producto.component";
import { AuthGuardService } from './services/auth-guard.service';
import {ListaFacturasComponent} from "./components/facturas/lista-facturas/lista-facturas.component";
import {FacturarComponent} from "./components/facturas/facturar/facturar.component";
import {ListaProductosComponent} from "./components/productos/lista-productos/lista-productos.component";

const routes: Routes = [
  {path : '', redirectTo: 'login', pathMatch: 'full'} ,//si esta vacio retorna a usuarios, CAMBIAR A ALOGIN
  {path : 'login', component: LoginComponent},
  {path : 'acerca-de', component: AcercaDeComponent},
  {path : 'registrar-usuario', component: RegistrarUsuarioComponent,  },
  {path : 'proveedores', component: ListarProvedoresComponent, canActivate: [AuthGuardService] },//el can activate hace queno se pueda entrar si no cumple el requerimiento (en este caso estar logeado )

  {path : 'add-cliente', component: AddClienteComponent, canActivate: [AuthGuardService] },
  {path : 'clientes', component: ListarClientesComponent, canActivate: [AuthGuardService] },

  {path : 'add-producto', component: AddProductoComponent, canActivate: [AuthGuardService] },
  {path : 'productos', component: ListaProductosComponent, canActivate: [AuthGuardService] },

  {path : 'facturacion', component: FacturarComponent, canActivate: [AuthGuardService] },
  {path : 'facturas', component: ListaFacturasComponent, canActivate: [AuthGuardService] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
