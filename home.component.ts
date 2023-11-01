import { Component, OnInit, OnChanges } from '@angular/core';
import { getFunctions,httpsCallable } from '@angular/fire/functions';
import { Firestore } from '@angular/fire/firestore';
import { Environments } from 'src/app/environments';
import { AngularFireModule } from "@angular/fire/compat";

import { initializeApp } from '@angular/fire/app';
import { BaseService } from 'src/app/services/base.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
 export class HomeComponent implements OnInit, OnChanges{

  text:any
  app:any
  functions:any
  fireStoreDatas:any
  errorMessage:any

  constructor(private base: BaseService,
    private auth: AuthService
    ){
    
    }
  ngOnInit() {
    this.functions= getFunctions(this.app)
  // this.functions=getFunctions(this.app)
  }
  ngOnChanges(){
    this.app =  AngularFireModule.initializeApp(Environments.firebaseConfig)
    
  }
  
  

  submitRequest(){
    const submitRequest = httpsCallable(this.functions,"addRequest")
    submitRequest({
      text: this.text 
    }).then((result)=>{
    console.log("siker",result)
    }).catch((e)=>this.errorMessage=e)
  }

  getFireStoreData(){
    this.base.getFirestoreData()

  }


}