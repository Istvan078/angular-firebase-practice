import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email:any
  password:any

  constructor(private auth:AuthService,
    private router : Router
    ){}

  registerWithEmailAndPassword(){
    this.auth.registerWithEmailAndPassword(this.email,this.password)
    .then(()=>
      this.router.navigate(["/login"])
    )
  }

}
