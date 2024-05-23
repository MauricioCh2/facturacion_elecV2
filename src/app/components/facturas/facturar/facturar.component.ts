import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../../../services/current-user.service";
import {Usuario} from "../../../entities/usuario";
import {Productos} from "../../../entities/productos";
import {Cliente} from "../../../entities/cliente";
import {ListarClientesComponent} from "../../clientes/listar-clientes/listar-clientes.component";
import {ListaProductosComponent} from "../../productos/lista-productos/lista-productos.component";
import {ClienteService} from "../../../services/cliente.service";
import {ProductoService} from "../../../services/producto.service";
import {Facturas} from "../../../entities/facturas";
import {Detalle} from "../../../entities/detalle";
import {FacturasService} from "../../../services/facturas.service";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import {toolbox} from "../../../utiles/toolbox";

@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.component.html',
  styleUrl: './facturar.component.css'
})
export class FacturarComponent implements OnInit{
  productos: Productos[];
  productoActual : Productos = new Productos();
  clientes: Cliente[];
  clienteActual: Cliente = new Cliente();
  currentUser: Usuario;
  detalles: Detalle[];
  contador : number = 0;
  total: number = 0;
  protected error: string;


  constructor(private currentService: CurrentUserService, private clienteService: ClienteService, private productoService: ProductoService, private facturaService : FacturasService){
    this.detalles = []; //lo inicializa como vector vacio
  }

  ngOnInit(): void {
    this.currentUser = this.currentService.getCurrentUser();
    this.getClientes(this.currentUser.idUsuario);
    this.getProductos(this.currentUser.idUsuario);
  }

  getName(): string {
    return this.currentService.getNombre();
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

  private buscarCliente(texto : string){
    return this.clientes.filter(producto =>
      producto.identificacionC.includes(texto) || producto.nombreC.includes(texto));
  }
  private buscarProducto(texto : string){
    return this.productos.filter(producto =>
      producto.idProducto.includes(texto) || producto.nombre.includes(texto));
  }

  seleccionarCliente(cliente: Cliente) {
    this.clienteActual = cliente;
  }



  seleccionarProducto(producto: Productos) {
    this.productoActual = producto;
  }

  agregarProducto() {
    toolbox.printf(toolbox.colors.BLUE + this.productoActual.nombre);
    //this.productos.push(this.productoActual);
    let detalle : Detalle = new Detalle();
    //despues hacer que esto en el back busque el id no el codigo
    detalle.codigoProducto = this.productoActual.idProducto;
    //cambiar a descripcion producto
    detalle.descripcionDetalle = this.productoActual.descripcion;
    detalle.cantidad = 1;
    //hacer un id detalle y un num Detalle
    detalle.numDetalle = this.contador++;
    //no se si hara falta un precio y valor final
    //por impuestos y eso
    detalle.valorProductos = this.productoActual.precio;
    this.detalles.push(detalle);
    this.calcularTotal();
    this.productoActual = new Productos();  // Limpiar el producto actual
  }

  addDet(detalle: any) {
    detalle.cantidad++;
    this.calcularTotal();
  }

  remDet(detalle: any) {
    if (detalle.cantidad > 0) {
      detalle.cantidad--;
      if(detalle.cantidad == 0){
        this.detalles = this.detalles.filter(d => d.numDetalle !== detalle.numDetalle);
        //vuelve a crear un array sin el detalle que se elimino
      }
      this.calcularTotal();
    }

  }

  onSubmit() {
    if(!this.clienteActual){
      this.error = 'Debe seleccionar un cliente';
    }else if (this.detalles.length === 0){
      this.error = 'Debe agregar al menos un producto';
    }else {
      this.error = '';
      let detallesFactura = '';
      for (let detalle of this.detalles) {
        let producto = this.productos.find(p => p.idProducto === detalle.codigoProducto);
        if (producto) {
          detallesFactura += `<p>Producto: ${producto.nombre}, Cantidad: ${detalle.cantidad}, Precio Unitario: ${producto.precio}</p>`;
        }
      }

      Swal.fire({
        title: "Proceder con la factura? hacer mas estetico",
        html: `
      <h1>Detalles de la factura</h1>
      <p>Proveedor: ${this.currentUser.nombre}</p>
      <p>Cliente: ${this.clienteActual.nombreC}</p>
      ${detallesFactura}
      <p>Total: ${this.total}</p>
    `,
        showCancelButton: true,
        confirmButtonText: "Facturar",
        showLoaderOnConfirm: true,
        preConfirm: async (login) => {},
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          this.generarFactura();
        }
      });


    }


  }
  generarFactura(){
    console.log("estoy en el submit");
    let factura: Facturas = new Facturas();
    factura.identificacionCliente = this.clienteActual.idCliente;
    factura.identificacionUsuario = this.currentUser.idUsuario;
    this.calcularTotal();
    factura.valorFinal = this.total;


    console.log("Factura: "+ factura.toString());
    console.log("Sus detalles: "+ this.detalles.toString());

    this.facturaService.facturar(factura, this.detalles).subscribe(data => {
      toolbox.notificacionEstandar("Factura generada", "La factura ha sido generada correctamente", "success");
      console.log(data);
    });

  }
  calcularTotal() {
    this.total = 0; // Reiniciamos el total
    for (let detalle of this.detalles) {
      // Buscamos el producto en la lista de productos
      let producto = this.productos.find(p => p.idProducto === detalle.codigoProducto);
      if (producto) {
        // Si encontramos el producto, sumamos al total el precio del producto por la cantidad
        this.total += producto.precio * detalle.cantidad;
      }
    }
  }

}
