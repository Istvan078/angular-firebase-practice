import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users:any


  constructor(private auth:AuthService){
    this.auth.getUsers()?.subscribe({
      next:(users:any)=>this.users=users,
      error:(e)=>console.log(e)
    }
    )
  }

  setClaims(user:any){
     this.auth.setCustomClaims(user.uid,user.claims)
  }

}
