import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {Router} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";
import  swal  from 'sweetalert2';
@Component({
  selector: 'app-listar-provedores',
  templateUrl: './listar-provedores.component.html',
  styleUrl: './listar-provedores.component.css'
})
export class ListarProvedoresComponent implements OnInit {
  proveedores : Usuario[];


  constructor(private usuarioServicio: UsuarioService, private router:Router){
  }
  ngOnInit(): void {
    this.obtenerProvedores();
  }

  private obtenerProvedores(){
    this.usuarioServicio.getUsuariosList().subscribe(data => {
      this.proveedores = data;
    });
  }

  actualizarUsuario(id: string){
    this.router.navigate(['actualizar-usuario', id]);
  }
//metodo que elimina un usuario
  eliminarUsuario(id: string){
    swal({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar al empleado",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , elimínalo',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result) => {
      if (result.value) {
        this.usuarioServicio.eliminarUsuario(id).subscribe(data => {
          this.obtenerUsuarios();
          swal(
            'Empleado eliminado',
            'El empleado ha sido eliminado con exito',
            'success'
          )
        });
      }
    })
  }

  private obtenerUsuarios(){
    this.usuarioServicio.getUsuariosList().subscribe(data => {
      this.proveedores = data;
    });
  }


  guardarAprobacion(prov: Usuario) {
    this.usuarioServicio.actualizarUsuario(prov.idUsuario,prov).subscribe(dato => {
    },error => console.log(error));
  }
}
