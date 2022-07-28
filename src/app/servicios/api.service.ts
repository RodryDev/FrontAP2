import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService  {

  /////Url root///
  
  private urlRoot = 'https://portfolio-rodrigo.herokuapp.com/api/'
  
 
////Metodos Persona//////////////////////////////////////////

////Constructor inicia metodo http////
    constructor(private http: HttpClient) { }

  
  ///Listar Persona////

  getListPersona():Observable <any>{
  
    return this.http.get(this.urlRoot + 'persona/listar');
  }
  /////Borrar Persona///

  borrarPersona(id:number):Observable <any>{
  return this.http.delete(this.urlRoot + 'persona/borrar/' + id);
  }
  
  ////Guardar Persona/////////

  guardarPersona(persona:any):Observable <any>{
  return this.http.post(this.urlRoot + 'persona/nueva',persona);
}
  
  
////Editar Persona///

 editarPersona(id:number, persona: any):Observable <any>{
  return this.http.put(this.urlRoot + 'persona/editar/' + id, persona);

}

////Buscar Persona/////


buscarPersona(id:number):Observable <any>{
  return this.http.get(this.urlRoot + 'persona/'+ id);
}

  
///////////Metodos Educacion//////////////////////////////////


///Listar Educacion////

getListEducacion():Observable <any>{
  
  return this.http.get(this.urlRoot + 'educacion/listar');
}
/////Borrar Educacion///

borrarEducacion(id:number):Observable <any>{
return this.http.delete(this.urlRoot + 'educacion/borrar/' + id);
}

////Guardar Educacion////

guardarEducacion(educacion:any):Observable <any>{
return this.http.post(this.urlRoot + 'educacion/nueva',educacion);
}


////Editar Educacion///

editarEducacion(id:number, educacion: any):Observable <any>{
return this.http.put(this.urlRoot + 'educacion/editar/' + id, educacion);

}

////Buscar Educacion/////


buscarEducacion(id:number):Observable <any>{
return this.http.get(this.urlRoot + 'educacion/'+ id);
}



///////////Metodos Experiencia//////////////////////////////////


///Listar Experiencia////

getListExperiencia():Observable <any>{
  
  return this.http.get(this.urlRoot + 'experiencia/listar');
}
/////Borrar Experiencia///

borrarExperiencia(id:number):Observable <any>{
return this.http.delete(this.urlRoot + 'experiencia/borrar/' + id);
}

////Guardar Experiencia////

guardarExperiencia(experiencia:any):Observable <any>{
return this.http.post(this.urlRoot + 'experiencia/nueva',experiencia);
}


////Editar Experiencia///

editarExperiencia(id:number, experiencia: any):Observable <any>{
return this.http.put(this.urlRoot + 'experiencia/editar/' + id, experiencia);

}






////Buscar Experiencia////


buscarExperiencia(id:number):Observable <any>{
return this.http.get(this.urlRoot + 'experiencia/'+ id);
}



///////////Metodos Proyectos//////////////////////////////////

///Listar Proyectos////

getListProyectos():Observable <any>{
  
  return this.http.get(this.urlRoot + 'proyectos/listar');
}
/////Borrar Proyectos///

borrarProyectos(id:number):Observable <any>{
return this.http.delete(this.urlRoot + 'proyectos/borrar/' + id);
}

////Guardar Proyectos////

guardarProyectos(proyecto:any):Observable <any>{
return this.http.post(this.urlRoot + 'proyectos/nueva',proyecto);
}


////Editar Proyectos///

editarProyectos(id:number, proyecto: any):Observable <any>{
return this.http.put(this.urlRoot + 'proyectos/editar/' + id, proyecto);

}

////Buscar Proyectos/////


buscarProyectos(id:number):Observable <any>{
return this.http.get(this.urlRoot + 'proyectos/'+ id);
}






///////////Metodos Skills (HABILIDAD)//////////////////////////////////

///Listar Habilidad////

getListHabilidad():Observable <any>{
  
  return this.http.get(this.urlRoot + 'habilidad/listar');
}
/////Borrar Habilidad///

borrarHabilidad(id:number):Observable <any>{
return this.http.delete(this.urlRoot + 'habilidad/borrar/' + id);
}

////Guardar Habilidad////

guardarHabilidad(habilidad:any):Observable <any>{
return this.http.post(this.urlRoot + 'habilidad/nueva',habilidad);
}


////Editar Habilidad///

editarHabilidad(id:number, habilidad: any):Observable <any>{
return this.http.put(this.urlRoot + 'habilidad/editar/' + id, habilidad);

}

////Buscar Habilidad/////


buscarHabilidad(id:number):Observable <any>{
return this.http.get(this.urlRoot + 'habilidad/'+ id);
}





////////////////METODOS ACERCA DE////////////////////


///Listar ACERCA DE////

getListAbout():Observable <any>{
  
  return this.http.get(this.urlRoot + 'acercaDe/listar');
}
/////Borrar ACERCA DE///

borrarAbout(id:number):Observable <any>{
return this.http.delete(this.urlRoot + 'acercaDe/borrar/' + id);
}

////Guardar ACERCA DE////

guardarAbout(acercaDe:any):Observable <any>{
return this.http.post(this.urlRoot + 'acercaDe/nueva',acercaDe);
}


////Editar ACERCA DE///

editarAbout(id:number, acercaDe: any):Observable <any>{
return this.http.put(this.urlRoot + 'acercaDe/editar/' + id, acercaDe);

}






  }
  

