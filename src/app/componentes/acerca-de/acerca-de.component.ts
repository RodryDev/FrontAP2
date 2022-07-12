import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/servicios/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/servicios/login.service';







@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  listAcercaDe: any[] = [

  ];


  form: FormGroup;
  accion = 'agregar'
  id: number | undefined;
  ulogged: string = "";


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _apiService: ApiService,
    public modal: NgbModal,
    private loginServ: LoginService
  ) {


    this.form = this.fb.group({
      acercaDe: ["", Validators.required],

    })

  }


  ngOnInit(): void {
    this.ulogged = this.loginServ.getUserLogged();
  this.obtenerAcercaDe();
  }

//////Guardo la lista AcercaDe en data////
obtenerAcercaDe(){
  this._apiService.getListAcercaDe().subscribe(data=>{
    console.log(data);
    this.listAcercaDe = data;
  })

}



/////////Listar Acerca De/////

guardarAcercaDe(){
  console.log(this.form);

  const AcercaDe:any = {
    acercaDe:this.form.get("acercaDe")?.value,
    
  }




  if(this.id == undefined){

    ///se agrega un Acerca De
    this._apiService.guardarAcercaDe(AcercaDe).subscribe(data=>{
  
      this.toastr.success('Los datos  fueron ingresados con exito!', 'Datos Registrados');
      this.obtenerAcercaDe;
      this.form.reset();
      
      }
     //,error =>{ 
       //this.toastr.error('Oops... ocurrio un error', 'Error')
        //console.log(error);
     //}
     
     )
     
  
  }else{
  
    AcercaDe.id = this.id;
  
    ///se edita Acerca De
  
    this._apiService.editarAcercaDe(this.id, AcercaDe).subscribe(data =>{
      this.form.reset();
      this.accion = 'Agregar';
      this.id = undefined;
      this.toastr.info('campo actualizado con exito');
      this.obtenerAcercaDe();
  
      
  window.location.reload()
    })
  
    
  }
  
      }



/////////////Borrar AcercaDe////////

borrarAcercaDe(id:number){
  this._apiService.borrarAcercaDe(id).subscribe(data=>{
  this.toastr.error('El registro fue eliminado con exito!', 'Registro eliminado');
  this.obtenerAcercaDe();
  this.form.reset()
  })
  window.location.reload()
  
}

/////////Editar AcercaDe///////

editarAcercaDe(acercaDe: any){
this.accion = 'Editar';
this.id = acercaDe.id;

////puedo utilizar tambien setValue////
//////para editar los campos del formulario////

this.form.patchValue({
  tituloAcercaDe: acercaDe.tituloAcercaDe,
  
})


}



//////////MODALES//////

abrirFormulario(acercaDe: any){
this.modal.open(acercaDe,{size:'md', centered:true, scrollable:true});
}








}
