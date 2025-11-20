import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user?: User | null; 
  constructor(private authService:AuthService){

  }

  ngOnInit(){
    this.user = this.authService.getUser();
    // console.log("usuario:",USER);
    // this.authService.user$.subscribe(u => this.user = u );
    // console.log("aqui es donde esta mi usuario",this.user);
  }

  updatePhoto(){

  }

  editarUser(){
    
  }

}
