import {Component, OnInit} from '@angular/core';
import {Productos} from "../../../entities/productos";
import {ProductoService} from "../../../services/producto.service";
import {CurrentUserService} from "../../../services/current-user.service";

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit{
  productos : Productos[];

  constructor(private productosService: ProductoService, private currentUser:CurrentUserService) {
  }
  ngOnInit(): void {
    this.productosByProveedor(this.currentUser.getCurrentUser().idUsuario);
  }

  private productosByProveedor(id:String){
    this.productosService.getProductosByProveedorId(id).subscribe(data => {
      // Verifica si data es un array o un objeto único
      if (Array.isArray(data)) {
        this.productos = data;
      } else {
        // Si es un objeto único, lo agregas al array
        this.productos.push(data);
      }
    });
  }

  public getNombre(){
    this.currentUser.getNombre();
  }



}
