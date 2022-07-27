import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/servicios/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  listProyectos: any[] = [];

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
      tituloProyecto: ['', Validators.required],
      urlProyecto: ['', Validators.required],
      imgProyecto: ['', Validators.required],
      descripcionProyecto: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ulogged = this.loginServ.getUserLogged();
    this.obtenerProyectos();
  }

  //////Guardo la lista de Proyectos en data////
  obtenerProyectos() {
    this._apiService.getListProyectos().subscribe((data) => {
      console.log(data);
      this.listProyectos = data;
    });
  }

  /////////Listar Proyectos/////

  guardarProyectos() {
    console.log(this.form);

    const Proyectos: any = {
      tituloProyecto: this.form.get('tituloProyecto')?.value,
      urlProyecto: this.form.get('urlProyecto')?.value,
      imgProyecto: this.form.get('imgProyecto')?.value,
      descripcionProyecto: this.form.get('descripcionProyecto')?.value,
    };

    if (this.id == undefined) {
      ///se agrega una Proyectos
      this._apiService.guardarProyectos(Proyectos).subscribe((data) => {
        this.toastr.success(
          'Los datos  fueron ingresados con exito!',
          'Datos Registrados'
        );
        this.obtenerProyectos;
        this.form.reset();
        window.location.reload();
      });
    } else {
      Proyectos.id = this.id;

      ///se edita educacion

      this._apiService.editarProyectos(this.id, Proyectos).subscribe((data) => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('campo actualizado con exito');
        this.obtenerProyectos();
      });
      window.location.reload();
    }
  }

  /////////////Borrar Proyectos////////
  borrarProyectos(id: number) {
    this._apiService.borrarProyectos(id).subscribe(null, (data) => {
      this.id = undefined;
      this.toastr.error(
        'El registro fue eliminado con exito!',
        'Registro eliminado'
      );
      this.obtenerProyectos();
    });
    //window.location.reload()
  }

  //////////MODALES//////

  abrirFormulario(proyectos: any) {
    this.modal.open(proyectos, {
      size: 'md',
      centered: true,
      scrollable: true,
    });
  }
  //////////////EDITAR/////////////
  editarProyectos(proyectos: any, abreModal: any) {
    this.accion = 'Editar';
    this.id = proyectos.id;
    this.form.patchValue({
      tituloProyecto: proyectos.tituloProyecto,
      urlProyecto: proyectos.urlProyecto,
      imgProyecto: proyectos.imgProyecto,
      descripcionProyecto: proyectos.descripcionProyecto,
    });

    this.modal.open(abreModal, {
      size: 'xl',
      centered: true,
      scrollable: true,
    });
    this.accion = 'Editar';
    this._apiService.editarProyectos(proyectos, proyectos).subscribe((data) => {
      this.listProyectos = data;
      this.id = undefined;
      this.toastr.info(
        'Experiencia editado con éxito!',
        'Experiencia Editado!'
      );
      this.obtenerProyectos();
    });
  }
}
