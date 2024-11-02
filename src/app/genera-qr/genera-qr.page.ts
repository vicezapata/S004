import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';


@Component({
  selector: 'app-genera-qr',
  templateUrl: './genera-qr.page.html',
  styleUrls: ['./genera-qr.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,QRCodeModule ]
})
export class GeneraQrPage implements OnInit {
  
  ngOnInit() {}

  qrData:string ='Texto de base';  //   Cambiar esto por su texto
  createdCode:string='';

  constructor() { }

  generateQRCode(){
      this.createdCode = this.qrData;
  }


}
