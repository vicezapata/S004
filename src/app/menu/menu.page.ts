import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';

import {home,helpCircleSharp,informationCircleOutline,gitNetworkOutline} from 'ionicons/icons'

import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class MenuPage implements OnInit {

  usuario:any;
  constructor(private router:Router) {
    addIcons({home, 
            'help-circle-sharp':helpCircleSharp,
            'information-circle-outline':informationCircleOutline,
            'git-network-outline':gitNetworkOutline
          })

   }

  ngOnInit() {
    // para recibir parametros
    const navigation=this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state){
      this.usuario =navigation.extras.state['nombre'];
  }else{
      alert('No se pudo establecer el state de Navigation')
  }

} // del ngOnInit
}
