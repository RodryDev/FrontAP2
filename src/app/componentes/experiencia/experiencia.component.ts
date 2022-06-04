import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  listEducacion:any[] = [
    
  ];
  
  form:FormGroup;
  
    constructor(private fb:FormBuilder,
      private toastr: ToastrService,
      private _apiService: ApiService ) {
  
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
      this.obtenerTitulo();
    }
  
  obtenerTitulo(){
  this._apiService.getListPersona().subscribe(data=>{
    console.log(data);
    this.listEducacion = data;
  }, error =>{ 
    console.log(error);
  })
  
  }
  
  
    agregarEducacion(){
      console.log(this.form);
  
      const Educacion:any = {
        tituloEducacion:this.form.get("tituloEducacion")?.value,
        urlDiploma:this.form.get("urlDiploma")?.value,
        imgDiploma:this.form.get("imgDiploma")?.value,
        institucion:this.form.get("institucion")?.value,
        fechaEducacion:this.form.get("fechaEducacion")?.value,
        localidad:this.form.get("localidad")?.value,
      }
  
    this.listEducacion.push(Educacion);
    this.toastr.success('Los datos  fueron ingresados con exito!', 'Datos Registrados');
    this.form.reset();
    }
  borrarEducacion(id:number){
  this._apiService.borrarEducacion(id).subscribe(data=>{
    this.toastr.error('El registro fue eliminado con exito!', 'Registro eliminado');
  this.obtenerTitulo();
  },error =>{
    console.log(error);
  })
  
}


}
  
