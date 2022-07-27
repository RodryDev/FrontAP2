import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/servicios/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/servicios/login.service';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  listHabilidades: any[] = [];

  form: FormGroup;
  accion = 'agregar';
  id: number | undefined;
  ulogged: string = '';

  constructor(
    private config: NgbProgressbarConfig,
    private loginServ: LoginService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _apiService: ApiService,
    public modal: NgbModal
  ) {
    ////para configurar todos los progress///
    config.textType = '';

    this.form = this.fb.group({
      porcentaje: ['', Validators.required],
      tituloHabilidad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ulogged = this.loginServ.getUserLogged();
    this.obtenerHabilidad();
  }

  //////Guardo la lista de Habilidad en data////
  obtenerHabilidad() {
    this._apiService.getListHabilidad().subscribe((data) => {
      console.log(data);
      this.listHabilidades = data;
    });
  }

  /////////Listar Habilidad/////

  guardarHabilidad() {
    console.log(this.form);

    const Habilidad: any = {
      porcentaje: this.form.get('porcentaje')?.value,
      tituloHabilidad: this.form.get('tituloHabilidad')?.value,
    };

    if (this.id == undefined) {
      ///se agrega una Habilidad
      this._apiService.guardarHabilidad(Habilidad).subscribe((data) => {
        this.toastr.success(
          'Los datos  fueron ingresados con exito!',
          'Datos Registrados'
        );
        this.obtenerHabilidad;
        this.form.reset();
        window.location.reload();
      });
    } else {
      Habilidad.id = this.id;

      ///se edita Habilidad

      this._apiService.editarHabilidad(this.id, Habilidad).subscribe((data) => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('campo actualizado con exito');
        this.obtenerHabilidad();
      });
      window.location.reload();
    }
  }
  /////////////Borrar Habilidad////////
  borrarHabilidad(id: number) {
    this._apiService.borrarHabilidad(id).subscribe(null, (data) => {
      this.id = undefined;
      this.toastr.error(
        'El registro fue eliminado con exito!',
        'Registro eliminado'
      );
      this.obtenerHabilidad();
    });
    //window.location.reload()
  }

  //////////MODALES//////

  abrirFormulario(habilidad: any) {
    this.modal.open(habilidad, {
      size: 'md',
      centered: true,
      scrollable: true,
    });
  }
  //////////////EDITAR/////////////
  editarHabilidad(habilidad: any, abreModal: any) {
    this.accion = 'Editar';
    this.id = habilidad.id;
    this.form.patchValue({
      porcentaje: habilidad.porcentaje,
      tituloHabilidad: habilidad.tituloHabilidad,
    });

    this.modal.open(abreModal, {
      size: 'xl',
      centered: true,
      scrollable: true,
    });
    this.accion = 'Editar';
    this._apiService.editarHabilidad(habilidad, habilidad).subscribe((data) => {
      this.listHabilidades = data;
      this.id = undefined;
      this.toastr.info('Habilidad editado con éxito!', 'Experiencia Editado!');
      this.obtenerHabilidad();
    });
  }
}
