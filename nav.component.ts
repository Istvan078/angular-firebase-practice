import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  user:any
  constructor(private auth: AuthService){
    this.auth.checkAuthState().subscribe(
      (user)=> this.user = user
    )
  }

  signOut(){
    this.auth.signOut()
  }
  
  getIsSuperAdmin():boolean{
    return this.auth.getIsSuperAdmin()
  }
}
