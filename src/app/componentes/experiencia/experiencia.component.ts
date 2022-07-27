import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/servicios/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  listExperiencia: any[] = [];

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
      nombreEmpresa: ['', Validators.required],
      urlEmpresa: ['', Validators.required],
      imgEmpresa: ['', Validators.required],
      puesto: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      localidadEmpresa: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ulogged = this.loginServ.getUserLogged();
    this.obtenerExperiencia();
  }

  //////Guardo la lista de Experiencia en data////
  obtenerExperiencia() {
    this._apiService.getListExperiencia().subscribe((data) => {
      console.log(data);
      this.listExperiencia = data;
    });
  }

  /////////Listar Experiencia/////

  guardarExperiencia() {
    console.log(this.form);

    const Experiencia: any = {
      nombreEmpresa: this.form.get('nombreEmpresa')?.value,
      urlEmpresa: this.form.get('urlEmpresa')?.value,
      imgEmpresa: this.form.get('imgEmpresa')?.value,
      puesto: this.form.get('puesto')?.value,
      fechaInicio: this.form.get('fechaInicio')?.value,
      fechaFinal: this.form.get('fechaFinal')?.value,
      localidadEmpresa: this.form.get('localidadEmpresa')?.value,
    };

    if (this.id == undefined) {
      ///se agrega una Experiencia
      this._apiService.guardarExperiencia(Experiencia).subscribe((data) => {
        this.toastr.success(
          'Los datos  fueron ingresados con exito!',
          'Datos Registrados'
        );
        this.obtenerExperiencia;
        this.form.reset();
        window.location.reload();
      });
    } else {
      Experiencia.id = this.id;

      ///se edita educacion

      this._apiService
        .editarExperiencia(this.id, Experiencia)
        .subscribe((data) => {
          this.form.reset();
          this.accion = 'Agregar';
          this.id = undefined;
          this.toastr.info('campo actualizado con exito');
          this.obtenerExperiencia();
        });
      window.location.reload();
    }
  }
  /////////////Borrar Experiencia////////
  borrarExperiencia(id: number) {
    this._apiService.borrarExperiencia(id).subscribe(null, (data) => {
      this.id = undefined;
      this.toastr.error(
        'El registro fue eliminado con exito!',
        'Registro eliminado'
      );
      this.obtenerExperiencia();
    });
    //window.location.reload()
  }

  //////////MODALES//////

  abrirFormulario(experiencia: any) {
    this.modal.open(experiencia, {
      size: 'md',
      centered: true,
      scrollable: true,
    });
  }
  //////////////EDITAR/////////////
  editarExperiencia(experiencia: any, abreModal: any) {
    this.accion = 'Editar';
    this.id = experiencia.id;
    this.form.patchValue({
      nombreEmpresa: experiencia.nombreEmpresa,
      urlEmpresa: experiencia.urlEmpresa,
      imgEmpresa: experiencia.imgEmpresa,
      puesto: experiencia.puesto,
      fechaInicio: experiencia.fechaInicio,
      fechaFinal: experiencia.fechaFinal,
      localidadEmpresa: experiencia.localidadEmpresa,
    });

    this.modal.open(abreModal, {
      size: 'xl',
      centered: true,
      scrollable: true,
    });
    this.accion = 'Editar';
    this._apiService
      .editarExperiencia(experiencia, experiencia)
      .subscribe((data) => {
        this.listExperiencia = data;
        this.id = undefined;
        this.toastr.info(
          'Experiencia editado con éxito!',
          'Experiencia Editado!'
        );
        this.obtenerExperiencia();
      });
  }
}
