import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/servicios/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/servicios/login.service';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],


  
})
export class EducacionComponent implements OnInit {

  listEducacion:any[] = [
    
  ];
  
  form:FormGroup;
  accion='agregar'
  id: number | undefined;
  ulogged:string="";


    constructor(
      private fb:FormBuilder,
      private toastr: ToastrService,
      private _apiService: ApiService, 
      public modal: NgbModal,
      private loginServ:LoginService) 
  {
  
      this.form = this.fb.group({ 
        tituloEducacion:["",Validators.required],
        urlDiploma:["",Validators.required],
        imgDiploma:["",Validators.required],
        institucion:["",Validators.required],
        fechaEducacion:["",Validators.required],
        localidad:["",Validators.required],
      })
  }
  
    ngOnInit(): void {
      this.ulogged= this.loginServ.getUserLogged();
      this.obtenerEducacion();
    }
  
    //////Guardo la lista de Educacion en data////
  obtenerEducacion(){
  this._apiService.getListEducacion().subscribe(data=>{
    console.log(data);
    this.listEducacion = data;
  })
  
  }
  
  /////////ListarEducacion/////

    guardarEducacion(){
      console.log(this.form);
  
      const Educacion:any = {
        tituloEducacion:this.form.get("tituloEducacion")?.value,
        urlDiploma:this.form.get("urlDiploma")?.value,
        imgDiploma:this.form.get("imgDiploma")?.value,
        institucion:this.form.get("institucion")?.value,
        fechaEducacion:this.form.get("fechaEducacion")?.value,
        localidad:this.form.get("localidad")?.value,
      }
      

if(this.id == undefined){

  ///se agrega una educacion
  this._apiService.guardarEducacion(Educacion).subscribe(data=>{

    this.toastr.success('Los datos  fueron ingresados con exito!', 'Datos Registrados');
    this.obtenerEducacion;
    this.form.reset();
    window.location.reload()
    }
   //,error =>{ 
     //this.toastr.error('Oops... ocurrio un error', 'Error')
      //console.log(error);
   //}
   
   )
   

}else{

  Educacion.id = this.id;

  ///se edita educacion

  this._apiService.editarEducacion(this.id, Educacion).subscribe(data =>{
    this.form.reset();
    this.accion = 'Agregar';
    this.id = undefined;
    this.toastr.info('campo actualizado con exito');
    this.obtenerEducacion();

    

  })

  window.location.reload()
}

    }





  /////////////Borrar Educacion////////

  borrarEducacion(id:number){
  this._apiService.borrarEducacion(id).subscribe(data=>{
  this.toastr.error('El registro fue eliminado con exito!', 'Registro eliminado');
  this.obtenerEducacion();
  this.form.reset()
  })
  window.location.reload()
  
}

/////////Editar Educacion///////

editarEducacion(educacion: any){
 
this.accion = 'Editar';
this.id = educacion.id;

////puedo utilizar tambien setValue////
//////para editar los campos del formulario////

this.form.patchValue({
  tituloEducacion: educacion.tituloEducacion,
  urlDiploma: educacion.urlDiploma,
  imgDiploma: educacion.imgDiplo,
  institucion: educacion.institucion,
  fechaEducacion: educacion.fechaEducacion,
  localidad: educacion.localidad

  
})


}



//////////MODALES//////

abrirFormulario(educacion: any){
this.modal.open(educacion,{size:'md', centered:true, scrollable:true});

}


////////Modal no funciona////

abrirFormularioYEditar(educacion: any){
  this.modal.open(educacion,{size:'md', centered:true, scrollable:true});

this.editarEducacion(educacion)

  }



}
  
  