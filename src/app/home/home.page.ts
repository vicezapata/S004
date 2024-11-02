import { Component, OnInit } from '@angular/core';
//import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/storage.service';
import { CommonModule } from '@angular/common';

interface Persona {
  nombre:string;
  edad:string;
  carrera:string;
  identificador:string
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule,CommonModule],
})
export class HomePage implements OnInit {

  nombre:string=""
  edad=""
  carrera:any=''

// Variables para leer parametros

par_username:string="";
par_password:number=0;
// Variables para CRUD
  currentId: string="";  // para almacenar el identificador

  personas:Persona[] =[];

  constructor(private router:Router,
              private storageservice:StorageService
  ) {}

   async ngOnInit()  {

    // Recepcion de parametros
    const navigation =this.router.getCurrentNavigation();

    if (navigation?.extras.queryParams) {
      this.par_username=navigation.extras.queryParams['username']
      this.par_password=navigation.extras.queryParams['password']

    }

      await this.storageservice.init();
  }  // fin onInt


  async agregar(){
    const  nuevaPersona ={
      nombre: this.nombre,
      edad: this.edad,
      carrera: this.carrera,
      identificador: Date.now().toString()  // Genera un identificador unico 
    }

    this.personas.push(nuevaPersona);

    let resp = await  this.storageservice.agregar('personas',nuevaPersona )  

    if(resp) {
      //alert('Persona Agregada');
      await this.listar();
    }else {
      alert('No se puede Agregar');
    }

    //Limpiamos los campos despues de Agregar

    this.nombre="";
    this.edad="";
    this.carrera="";

  } // fin agregar


  async listar(){
        this.personas = await this.storageservice.obtenerDatos('personas') || [];

  }  // fin listar



  async eliminar(id:any) {
      await this.storageservice.eliminar('personas',id);
      await this.listar();

  }// fin eliminar

async buscar(id:any){
  let registroEncontrado = await this.storageservice.obtenerDato('personas',id)

  if (registroEncontrado){
    this.nombre = registroEncontrado.nombre;
    this.edad =registroEncontrado.edad;
    this.carrera =registroEncontrado.carrera;
    this.currentId=registroEncontrado.identificador;


  }

} // fin registro


async modificar( ) {
  const personaModificada: Persona ={
      nombre: this.nombre,
      edad: this.edad,
      carrera: this.carrera,
      identificador: this.currentId
  }


  await   this.storageservice.actualizar('personas', personaModificada)
  await this.listar();

   // limpieza

   this.nombre="";
   this.edad="";
   this.carrera="";

} // fin modi

 } 
