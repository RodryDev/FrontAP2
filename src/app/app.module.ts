import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './componentes/header/header.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';


import { SkillsComponent } from './componentes/skills/skills.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { FooterComponent } from './componentes/footer/footer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './componentes/home/home.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EducacionComponent,
   
    
    SkillsComponent,
    ProyectosComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ExperienciaComponent,
    AcercaDeComponent
    
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgbModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
    
    
    
   
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
