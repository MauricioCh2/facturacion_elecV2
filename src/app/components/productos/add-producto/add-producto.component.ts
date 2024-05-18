import { Component } from '@angular/core';
import {Productos} from "../../../entities/productos";
import {ProductoService} from "../../../services/producto.service";
import {CurrentUserService} from "../../../services/current-user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrl: './add-producto.component.css'
})
export class AddProductoComponent {
  producto: Productos;
  protected error: string;

  constructor(private productoService : ProductoService, private router:Router, private current  : CurrentUserService) {
  }

  guardarProducto(){
    this.productoService.registrarProductoPorId(this.producto).subscribe(
      dato => {
        console.log(dato);
        Swal.fire({
          title: 'Cliente agregado',
          text: `Cliente ${this.producto.nombre} ha sido agregado con éxito`,
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
        text: `Cliente ${this.producto.nombre} no se ha podido agregar`,
        icon: 'error',
      }).then((result) => {
        if (result.value) {
          // this.router.navigate(['/clientes']);
        }
      } );
    }
    );
  }

  onSubmit(){
    this.guardarProducto();
  }
  goToList(){
    this.router.navigate(['/productos']);
  }

  getNombre() {
    return this.current.getNombre();
  }
}
