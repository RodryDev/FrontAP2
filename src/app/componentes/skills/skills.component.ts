import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/servicios/login.service';



@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  ulogged:string="";



  constructor(
    private config:NgbProgressbarConfig,
    private loginServ:LoginService) {
////para configurar todos los progress///
      config.textType=''

      

   }

  ngOnInit(): void {
    this.ulogged= this.loginServ.getUserLogged();


  }

}
