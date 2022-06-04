import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service'; 
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form:FormGroup;
//variables que van a hacer 1 a 1 con los inputs del login
email:String = "";
password:String = "";


loginerror:String = "";










  constructor(private loginServ:LoginService,private router:Router,private rout:ActivatedRoute, private formBuilder:FormBuilder ) { 


    this.form=this.formBuilder.group(
      {
        email:['',[Validators.required]],
        password:['',[Validators.required, Validators.minLength(8)]],
      }
    )

  }


login(){
  console.log(this.email);
  console.log(this.password);

 

  const user = {email: this.email, password: this.password};


  this.loginServ.login(user).subscribe( data => {
   console.log(data);
    if(data==null) this.loginerror = "Error!!";
    
    
    else {
      this.loginerror = "";
      this.loginServ .setToken(data.id);

      //me redirecciona a la pagina productos
      this.router.navigate(['header'])
    }

  });

  
}



  ngOnInit(): void {
  }

  get Username()
  {
    return this.form.get('email');
  }
  get Password()
  {
    return this.form.get('password')
  }


}
