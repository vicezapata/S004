import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ScanQrPage implements OnInit,OnDestroy {

  // Declarar Variables
  scannerResult:string | null =null;
  private Html5Qrcode : Html5QrcodeScanner | null =null;
  isCameraPermissionGranted:boolean =false;


  constructor() { }

  ngOnInit() {
  }
  
  requestCameraPermission(){
    // Verificar si ya sea ha concedido permisos

    alert('Entre...');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia({video:true})
        .then((stream) => {
          this.isCameraPermissionGranted=true;
          this.startScanner();
        })

        .catch((error) => {
          alert("No se pudieron conceder permisos a la camara");
        });
    } else {
      alert("Navegador no soporta la camara"); 
    }   // Fin if
  }  // Fin ruestCameraPermission

  startScanner() {
  const config ={
    fps:10,
    qrbox:250,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
  };
  
  this.Html5Qrcode =new Html5QrcodeScanner("reader",config,false );

  this.Html5Qrcode.render((result) =>{
    this.scannerResult =result;
    console.log("Resultado del escanner",result);
  },

  (error) =>{
    console.warn("Error al escanear",error);
    }
  )
}           //Fin startScanner

ngOnDestroy(){
  if(this.Html5Qrcode){
    this.Html5Qrcode.clear();
  }


}//Fin Destroy


}
