import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { TokenStorageService } from '../_services/token-storage.service';
import {RegisterComponent} from '../register/register.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: any;
  isLoggedIn = false;
  content: string;


  constructor(private userService: UserService, private dialog: MatDialog, private tokenStorage: TokenStorageService) { }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);


  }
  openReg(){
    const dialogref= this.dialog.open(RegisterComponent);
  }


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    this.name = this.tokenStorage.getUser();
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }


}
