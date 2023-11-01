import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, RecaptchaVerifier, getAuth } from "@angular/fire/auth";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { initializeApp } from '@angular/fire/app';
import { Environments } from '../environments';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backEndApi = "https://us-central1-ffunctionsgyakorlas.cloudfunctions.net/api/"
  defaultClaims = {superAdmin:false, admin:false, basic:true}
  user:any = {}


  constructor(private afAuth: AngularFireAuth,
    private httpClient: HttpClient
    ) {
    this.checkAuthState().subscribe(
      (user) => {
        if(user)
        this.user = user
        user?.getIdToken().then(
          (token)=>{
            this.user.token = token
            this.getClaims(this.user.uid).subscribe(
              (customClaims)=>{
                if(customClaims)
                this.user.claims = customClaims
                else{this.setCustomClaims(this.user.uid, this.defaultClaims)
                console.log(this.user.claims)}
              }
            )
            
          }
        )
        
      }
    )
   }

   getIsSuperAdmin(){
    if (this.user && this.user.claims) return this.user.claims.superAdmin
    else return false
   }


   getClaims(uid:string){
    let headers = new HttpHeaders().set("Authorization",this.user.token);
    return this.httpClient.get(this.backEndApi + "users/" +uid +"/claims", {headers})
   }

   setCustomClaims(uid:any, claims:any){
    const body = {uid,claims}
    let headers = new HttpHeaders().set("Authorization", this.user.token);
    this.httpClient.post(this.backEndApi+"setCustomClaims",body,{headers})
    .subscribe({
      next:()=>console.log("A claims beállítása sikeres!"),
      error:(e)=>console.log("Hiba a claimsnél: ",e)
   })
   }

   getUsers(){
    if(this.user){
    let headers= new HttpHeaders().set("Authorization",this.user.token)
    return this.httpClient.get(this.backEndApi + "users", {headers})
    }
    return null
  }

  registerWithEmailAndPassword(email:any,password:any){
    return this.afAuth.createUserWithEmailAndPassword(email,password)
  }

  loginWithEmailAndPassword(email:any,password:any){
    return this.afAuth.signInWithEmailAndPassword(email,password)
  }

  loginWithGoogle(){
    return this.afAuth.signInWithPopup(new GoogleAuthProvider())
  }

  signOut(){
    this.afAuth.signOut()
  }

  checkAuthState(){
   return this.afAuth.authState
  }

  // signInWithPhoneNumber(phoneNumber:any){
  //  this.afAuth.signInWithPhoneNumber(phoneNumber,new RecaptchaVerifier(getAuth(initializeApp(Environments.firebaseConfig)),"reCaptcha"))
  // }

  signInWithFacebook(){
    
  return   this.afAuth.signInWithPopup(new FacebookAuthProvider())
  

      //   this.afAuth.signInWithCredential(userCred)
      // .then((result:any)=>{
      //   const credential = FacebookAuthProvider.credentialFromResult(result)
      //   console.log("siker:",credential)
      // })
    }
  getProfilePicture(userId:any){
    const url = `https://graph.facebook.com/v18.0/${userId}/picture`;
    return this.httpClient.get(url);
  }

  loginWithGithub(){
    return this.afAuth.signInWithPopup(new GithubAuthProvider())
  }
    

}
