import { Component } from '@angular/core';
import {Productos} from "../../../entities/productos";
import {ProductoService} from "../../../services/producto.service";
import {CurrentUserService} from "../../../services/current-user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {toolbox} from "../../../utiles/toolbox";
import {PrecioColonesPipe} from "../../../entities/precio-colones-pipe";
import {Actividad} from "../../../entities/actividad";
@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrl: './add-producto.component.css'
})
export class AddProductoComponent {
  producto: Productos = new Productos();
  precioColones = new PrecioColonesPipe();
  protected error: string;
  actividadActual : Actividad = new Actividad();
  productos: Productos[] = [];




  constructor(private productoService : ProductoService, private router:Router, protected current  : CurrentUserService) {
    this.producto.proveedorP = current.getID();
    this.getProductos(this.current.getID());
  }

  private buscarProductoPorNombre(texto : string){
    return this.productos.find(producto =>
      producto.codigo.includes(texto));
  }
  private existeProducto(texto : string): boolean {
    const producto = this.productos.find(producto => producto.codigo.toUpperCase().includes(texto.toUpperCase()));
    return !!producto;
  }

  guardarProducto(){
    if(this.existeProducto(this.producto.codigo)){
      this.error = 'Error el codigo de este producto ya fue ingresado por el proveedor' ;
    }else{

    this.productoService.registrarProductoPorId(this.producto).subscribe(
      dato => {

        console.log(dato);
        Swal.fire({
          title: 'Producto agregado',
          text: `Producto  ${this.producto.nombre} ha sido agregado con éxito`,
          icon: 'success',
        }).then((result) => {
            if (result.value) {
              this.goToList();
            }
          }
        );

      },
      error=> {console.log(error)

        Swal.fire({
          title: 'Error',
          text: `El producto  ${this.producto.nombre} no se ha podido agregar`,
          icon: 'error',
        }).then((result) => {
          if (result.value) {
            // this.router.navigate(['/clientes']);
          }
        } );
      }
    );
    }

  }
  formatPrecio() {
    if (this.producto.precio !== null) {
      const precioString = this.producto.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.producto.precio = parseFloat(precioString.replace(/,/g, ''));
    }
  }

  onSubmit(){
    toolbox.printf(toolbox.colors.BLUE + "Mi producto: " + this.producto);
    this.guardarProducto();
  }
  goToList(){
    this.router.navigate(['/productos']);
  }

  getNombre() {
    return this.current.getNombre();
  }

  seleccionarActividad(act: any) {
    this.actividadActual = act;
    this.producto.idActividad = act.idActividad;
  }

  private getProductos(idUsuario) {
    this.productoService.getProductosByProveedorId(idUsuario).subscribe(data => {
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

