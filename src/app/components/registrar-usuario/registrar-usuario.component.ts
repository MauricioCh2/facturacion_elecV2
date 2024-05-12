import { Component } from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {
  usuario : Usuario = new Usuario();
  constructor(private usuarioService : UsuarioService, private router:Router) {
    this.usuario.aprobado = false;
    this.usuario.tipo = 'PRO';
  }
  ngOnInit(): void {

  }
  guardarUsuario(){
    this.usuarioService.registrarUsuario(this.usuario).subscribe(dato =>{
        console.log(dato);
        this.goToListaUsuarios();
      },
      error => console.log(error));
  }
  goToListaUsuarios(){
    this.router.navigate(['/proveedores']);
  }
  onSubmit(){
    console.log(this.usuario);
    this.guardarUsuario();
  }
}
