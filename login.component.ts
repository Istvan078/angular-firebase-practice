import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
//import { RecaptchaVerifier } from '@angular/fire/auth';
import { RecaptchaVerifier } from 'firebase/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  email:any
  password:any
  user:any
  fbUser:any
  accessToken:any
  fbUid:any
  profilePictureUrl:any

  phoneNumber:any
  reCaptchaVerifier:any



  constructor(private auth: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
    ){}


  loginWithEmailAndPassword(){
    return this.auth.loginWithEmailAndPassword(this.email,this.password)
    .then(()=>
      this.router.navigate(["/home"])
    )
  }

  loginWithFacebook(){
    this.auth.signInWithFacebook().then(
     (userCredential)=>{
        this.fbUid = userCredential.user?.uid
        console.log("fb uid: ",this.fbUid)
        userCredential.user?.getIdToken().then(
        (token:any)=>{ this.accessToken=token
          this.auth.getProfilePicture(this.fbUid).subscribe(
            (response:any)=>this.profilePictureUrl = response.data.url
          )
       console.log("fb aToken: ",this.accessToken)})
       // this.photoURL=userCredential.user?.displayName
       // const credential = FacebookAuthProvider.credentialFromResult(userCredential);
       // this.accessToken = credential?.accessToken
      //  userCredential.user?.getIdToken().then(
      //    (token)=>this.accessToken = token)
     }
   )
   
  
  }

  loginWithGoogle(){
    this.auth.loginWithGoogle().then((user)=>{
    //  this.user=user.user?.displayName
      this.router.navigate(["/home"])
    })
  }
  
  loginWithPhoneNumber(){
   // this.reCaptchaVerifier = new firebase.default.auth.RecaptchaVerifier("reCaptcha",{})
    this.afAuth.signInWithPhoneNumber(this.phoneNumber,this.reCaptchaVerifier)
  }

  loginWithGitHub(
  ){
    this.auth.loginWithGithub()
  }
}


