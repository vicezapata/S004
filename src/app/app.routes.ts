import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    //path: 'home',
    //loadComponent: () => import('./home/home.page').then((m) => m.HomePage),

  path: 'login',
  //loadComponent: () => import('./home/home.page').then((m) => m.HomePage),

   loadComponent: () => import('./login/login.page').then( m => m.LoginPage),

  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    //path: 'login',
    //loadComponent: () => import('./login/login.page').then( m => m.LoginPage)

    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage)


  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage)
    ,children:[
      {
        path: 'localizacion',
        loadComponent: () => import('./localizacion/localizacion.page').then( m => m.LocalizacionPage)
      },

      {
        path: 'genera-qr',
        loadComponent: () => import('./genera-qr/genera-qr.page').then( m => m.GeneraQrPage)
      },


      {
        path: 'scan-qr',
        loadComponent: () => import('./scan-qr/scan-qr.page').then( m => m.ScanQrPage)
      },


    ]
  },
 
];
