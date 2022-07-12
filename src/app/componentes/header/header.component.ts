import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ulogged:string="";
  reloadOnSearch=false;



  constructor(
    private loginServ:LoginService,
    public modal: NgbModal
  ) { }

  ngOnInit(): void {

    this.ulogged= this.loginServ.getUserLogged();


    
  }



/////Modales////

abrirFormulario(modalLogin: any){
  this.modal.open(modalLogin,{size:'md', centered:true, scrollable:true});
  }

  salir():void{
    this.loginServ.deleteToken();
    this.ulogged="";
    window.location.reload();

  }


}
