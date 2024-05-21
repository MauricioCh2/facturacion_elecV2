import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../../../services/current-user.service";
import {Usuario} from "../../../entities/usuario";
import {Productos} from "../../../entities/productos";
import {Cliente} from "../../../entities/cliente";
import {ListarClientesComponent} from "../../clientes/listar-clientes/listar-clientes.component";
import {ListaProductosComponent} from "../../productos/lista-productos/lista-productos.component";
import {ClienteService} from "../../../services/cliente.service";
import {ProductoService} from "../../../services/producto.service";

@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.component.html',
  styleUrl: './facturar.component.css'
})
export class FacturarComponent implements OnInit{
  productos: Productos[];
  clientes: Cliente[];
  currentUser: Usuario;

  constructor(private currentService: CurrentUserService, private clienteService: ClienteService, private productoService: ProductoService ){

  }

  ngOnInit(): void {
    this.currentUser = this.currentService.getCurrentUser();
    this.getClientes(this.currentUser.idUsuario);
    this.getProductos(this.currentUser.idUsuario);
  }

  getName(): string {
    return this.currentUser.nombre;
  }

  public getClientes(id: string) {
    this.clienteService.getClientesByProveedorId(id).subscribe(data => {
      // Verifica si data es un array o un objeto único
      if (Array.isArray(data)) {
        this.clientes = data;
      } else {
        // Si es un objeto único, lo agregas al array
        this.clientes.push(data);
      }
    });
  }
  private getProductos(id:String){
    this.productoService.getProductosByProveedorId(id).subscribe(data => {
      // Verifica si data es un array o un objeto único
      if (Array.isArray(data)) {
        this.productos = data;
      } else {
        // Si es un objeto único, lo agregas al array
        this.productos.push(data);
      }
    });
  }

}
