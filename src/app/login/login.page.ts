import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
//import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { IonicModule,AnimationController,Animation } from '@ionic/angular';
import { NavigationExtras, Router,RouterModule } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class LoginPage  {
   loginForm!: FormGroup;

  @ViewChild('logo', {read:ElementRef}) logo?:ElementRef<HTMLImageElement>;
  @ViewChild('text', {read:ElementRef}) text?:ElementRef<HTMLImageElement>;


private logoAnimation!:Animation; 
private textAnimation!:Animation; 



  constructor(private fb:FormBuilder, 
              private router:Router, 
              private animationCtrl:AnimationController,
              private retornoService:UserService
            ) { 
  this.loginForm=this.fb.group({

      username: [
        '',
        [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
        Validators.pattern('^[a-zA-Z0-9]*$')
        ]
      ],
      
        password: [
        '',
        [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$')
        ]
      ]
  }); 


  }// Fin constructor

  onLogin() {
    if(this.loginForm.valid){
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      
// -----     Navegar a Home y pasamos los parametros
   //  this.router.navigate(['home'],  {queryParams:{username,password}} ); 

   // previamente validamos en el sercio usuario y clave 



      var respuesta: boolean=this.retornoService.validaServicio(username,password)

      if (respuesta){
        // para pasar parametros
        let navigationExtras:NavigationExtras={
          state:{
            nombre:username
          }
        }
        this.router.navigate(['menu'],navigationExtras );
      }else {
        alert('Usuario o Password incorrecta')
      }
      

    }

  } // Final onLogin


  ngAfterViewInit() {
    if(this.logo?.nativeElement && this.text?.nativeElement) {
      this.logoAnimation =this.animationCtrl.create()
      .addElement(this.logo.nativeElement)
      .duration(5000)
      .fromTo('opacity','0','1');

      this.textAnimation =this.animationCtrl.create()
      .addElement(this.text.nativeElement)
      .duration(1000)
      .fromTo('transform','translateY(20px)', 'translateY(0)');

      this.logoAnimation.play()
      this.textAnimation.play()


    } // final If
      else{
        console.error('Los elementos no fueron encontrados')
      }


  } // final After


} // Final 
