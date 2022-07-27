import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/servicios/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  ulogged: string = '';
  reloadOnSearch = false;
  listPersona: any[] = [];

  form: FormGroup;
  accion = 'agregar';
  id: number | undefined;
  ulogged2: string = '';

  constructor(
    private loginServ: LoginService,
    public modal: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _apiService: ApiService
  ) {
    this.form = this.fb.group({
      //nombreUsuario:["",Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      //urlPersona:["",Validators.required],
      //imgPersona:["",Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      fechaNac: ['', Validators.required],
      //quienSoy:["",Validators.required],
    });
  }

  ngOnInit(): void {
    this.ulogged = this.loginServ.getUserLogged();
    this.obtenerPersona();
  }

  //////Guardo la lista de Persona  en data////
  obtenerPersona() {
    this._apiService.getListPersona().subscribe((data) => {
      console.log(data);
      this.listPersona = data;
    });
  }

  /////////Listar Persona/////

  guardarPersona() {
    console.log(this.form);

    const About: any = {
      //nombreUsuario:this.form.get("nombreUsuario")?.value,
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      email: this.form.get('email')?.value,
      //urlPersona:this.form.get("urlPersona")?.value,
      //imgPersona:this.form.get("imgPersona")?.value,
      ciudad: this.form.get('ciudad')?.value,
      provincia: this.form.get('provincia')?.value,
      fechaNac: this.form.get('fechaNac')?.value,
      //quienSoy:this.form.get("quienSoy")?.value,
    };

    if (this.id == undefined) {
      ///se agrega una persona
      this._apiService.guardarPersona(About).subscribe(
        (data) => {
          this.toastr.success(
            'Los datos  fueron ingresados con exito!',
            'Datos Registrados'
          );
          this.obtenerPersona;
          this.form.reset();
          window.location.reload();
        }
        //,error =>{
        //this.toastr.error('Oops... ocurrio un error', 'Error')
        //console.log(error);
        //}
      );
    } else {
      About.id = this.id;

      ///se editar persona

      this._apiService.editarPersona(this.id, About).subscribe((data) => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('campo actualizado con exito');
        this.obtenerPersona();
      });
      window.location.reload();
    }
  }

  /////////////Borrar Persona////////
  borrarPersona(id: number) {
    this._apiService.borrarPersona(id).subscribe(null, (data) => {
      this.id = undefined;
      this.toastr.error(
        'El registro fue eliminado con exito!',
        'Registro eliminado'
      );
      this.obtenerPersona();
    });
    //window.location.reload()
  }

  /////Modales////

  abrirForm(persona: any) {
    this.modal.open(persona, { size: 'md', centered: true, scrollable: true });
  }
  //////////////EDITAR/////////////
  editarPersona(persona: any, abreModal: any) {
    this.accion = 'Editar';
    this.id = persona.id;
    this.form.patchValue({
      //nombreUsuario: persona.nombreUsuario,
      nombre: persona.nombre,
      apellido: persona.apellido,
      email: persona.email,
      //urlPersona: persona.urlPersona,
      //imgPersona: persona.imgPersona,
      ciudad: persona.ciudad,
      provincia: persona.provincia,
      fechaNac: persona.fechaNac,
      //quienSoy: persona.quienSoy,
    });

    this.modal.open(abreModal, {
      size: 'xl',
      centered: true,
      scrollable: true,
    });
    this.accion = 'Editar';
    this._apiService.editarPersona(persona, persona).subscribe((data) => {
      this.listPersona = data;
      this.id = undefined;
      this.toastr.info('Datos editados con éxito!', 'Datos Editados!');
      this.obtenerPersona();
    });
  }

  abrirFormulario(modalLogin: any) {
    this.modal.open(modalLogin, {
      size: 'md',
      centered: true,
      scrollable: true,
    });
  }

  salir(): void {
    this.loginServ.deleteToken();
    this.ulogged = '';
    window.location.reload();
  }
}
