import { Injectable } from '@angular/core';

import { IonicStorageModule,Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

//Variables auxiliares
  datos:any[]=[];
  dato:any={};


  private storage:Storage | null = null; // Definiendo la propiedad 'storage'

  constructor( private storageInstance: Storage) { 
    this.init(); // inicializo almacenamiento
  }

 // construccion inicilizacion

  async init(){
      // Configurar libreria
      const storage = await this.storageInstance.create();

      if(!this.storage){
        this.storage =await this.storageInstance.create();
      }


  } // fin init


  async agregar(key: string, jsonAgregar:any) {
      this.datos = await this.storage?.get(key) || []; //llave - valor 
      let existe =await this.obtenerDato(key,jsonAgregar.identificador)

      if (existe == undefined) {
          this.datos.push(jsonAgregar)
          await this.storage?.set(key,this.datos);
          return true;
      }
      return false;
  } // Fin Agregar


 async obtenerDato(key:string, identificador:string){
    this.datos =  await this.storage?.get(key) || [];
    this.dato = this.datos.find(valor => valor.identificador == identificador);
    return this.dato;

  } // fin obtener dato

async  obtenerDatos(key:string) {
   if (!this.storage) {
    throw new Error ('Storage no esta inicializado')
   }
   this.datos =await this.storage.get(key) || [];
   return this.datos;


} // fin obtenerDatos


async eliminar(key:string, identificador:string){
  this.datos =await this.storage?.get(key) || [];

  this.datos.forEach( (valor,indice) => {
    if(valor.identificador == identificador){

        this.datos.splice(indice,1)
    }
  });
  await this.storage?.set(key,this.datos)

} // Fin eliminar


async actualizar(key:string, jsonModificado:any) {
  this.datos =await this.storage?.get(key) || [];
  let indice =this.datos.findIndex(valor => valor.identificador == jsonModificado.identificador)

  this.datos[indice] = jsonModificado;
  await this.storage?.set(key,this.datos)

}



} // fin class StorageService
