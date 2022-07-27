import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/servicios/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
})
export class AcercaDeComponent implements OnInit {
  listAbout: any[] = [];

  form: FormGroup;
  accion = 'agregar';
  id: number | undefined;
  ulogged: string = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _apiService: ApiService,
    public modal: NgbModal,
    private loginServ: LoginService
  ) {
    this.form = this.fb.group({
      datosPersonales: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ulogged = this.loginServ.getUserLogged();
    this.obtenerAbout();
  }

  //////Guardo la lista de Persona  en data////
  obtenerAbout() {
    this._apiService.getListAbout().subscribe((data) => {
      console.log(data);
      this.listAbout = data;
    });
  }

  /////////Listar About/////

  guardarAbout() {
    console.log(this.form);

    const About: any = {
      datosPersonales: this.form.get('datosPersonales')?.value,
    };

    if (this.id == undefined) {
      ///se agrega una persona
      this._apiService.guardarAbout(About).subscribe(
        (data) => {
          this.toastr.success(
            'Los datos  fueron ingresados con exito!',
            'Datos Registrados'
          );
          this.obtenerAbout;
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

      this._apiService.editarAbout(this.id, About).subscribe((data) => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('campo actualizado con exito');
        this.obtenerAbout();
      });
      window.location.reload();
    }
  }
  /////////////Borrar Persona////////
  borrarAbout(id: number) {
    this._apiService.borrarAbout(id).subscribe(null, (data) => {
      this.id = undefined;
      this.toastr.error(
        'El registro fue eliminado con exito!',
        'Registro eliminado'
      );
      this.obtenerAbout();
    });
    //window.location.reload()
  }
  /////////Editar Educacion///////

  /* editarEducacion(educacion: any){
 
this.accion = 'Editar';
this.id = educacion.id;

////puedo utilizar tambien setValue////
//////para editar los campos del formulario////

this.form.patchValue({
  tituloEducacion: educacion.tituloEducacion,
  urlDiploma: educacion.urlDiploma,
  imgDiploma: educacion.imgDiploma,
  institucion: educacion.institucion,
  fechaInicio: educacion.fechaInicio,
  fechaFin: educacion.fechaFin,
  localidad: educacion.localidad
})


} */

  //////////MODALES//////

  abrirFormulario(about: any) {
    this.modal.open(about, { size: 'md', centered: true, scrollable: true });
  }
  //////////////EDITAR/////////////
  editarAbout(about: any, abreModal: any) {
    this.accion = 'Editar';
    this.id = about.id;
    this.form.patchValue({
      datosPersonales: about.nombre,
    });

    this.modal.open(abreModal, {
      size: 'xl',
      centered: true,
      scrollable: true,
    });
    this.accion = 'Editar';
    this._apiService.editarPersona(about, about).subscribe((data) => {
      this.listAbout = data;
      this.id = undefined;
      this.toastr.info('Datos editados con éxito!', 'Datos Editados!');
      this.obtenerAbout();
    });
  }
}
