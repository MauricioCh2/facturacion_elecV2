import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {Router} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";
import  swal  from 'sweetalert2';
import {CurrentUserService} from "../../services/current-user.service";
import {toolbox} from "../../utiles/toolbox";
@Component({
  selector: 'app-listar-provedores',
  templateUrl: './listar-provedores.component.html',
  styleUrl: './listar-provedores.component.css'
})
export class ListarProvedoresComponent implements OnInit {
  proveedores : Usuario[];

//
  constructor(protected current: CurrentUserService , private usuarioServicio: UsuarioService, private router:Router){
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
    swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar al empleado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , elimínalo',
      cancelButtonText: 'No, cancelar',

      buttonsStyling: true
    }).then((result) => {
      if (result.value) {
        this.usuarioServicio.eliminarUsuario(id).subscribe(data => {
          this.obtenerUsuarios();
          swal.fire(
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
      toolbox.notificacionEstandarConTiempo('Exito', 'el cambio a surgido con exito ', 1000);
    },error => console.log(error));
  }
}
