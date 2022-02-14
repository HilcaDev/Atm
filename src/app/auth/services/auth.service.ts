import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { arrayUsers } from 'src/app/auth/constants/arrayUsers';
import { IAuthRepository } from 'src/app/domain/repository/auth.repository';
import { IUser } from '../interfaces/auth.interface';

@Injectable()
export class AuthService implements IAuthRepository {

  private _user: IUser | undefined;

  constructor(private router: Router) { }

  validation(username: string, password: string): boolean {
    let coincidencias = arrayUsers.filter(element => element.username === username && element.password == password);
    if (coincidencias.length > 0) {
      this._user = {
        username: username,
        password: password
      }
      localStorage.setItem("userInformation", JSON.stringify(this._user));
      //console.log('user', this._user)
      return true;

    } else {
      return false;
    }
  }

  verifyAuthentication(): boolean {
    return (!localStorage.getItem('userInformation'))?false:true;
  }

  logout() {
    //localStorage.removeItem('userInformation');
    localStorage.clear()
  }
}


































   //CRAER USUARIO
   // const usuario = {
  //    username:username,
   //   password:password
   // }

 //   this.arrayUsuarios.push(usuario);
  //  console.log(this.arrayUsuarios)


    //if(userInfo === null){
      //this.router.navigateByUrl('/auth/login');
     // return false;
    //}else{
     // return true
    //}


      //prueba(){
  // let x = JSON.parse(localStorage.getItem('userInformation') || '{}');
  // console.log(x);
  // return x
  //}

 // verificar autenticacion
  //if (!localStorage.getItem('userInformation')) {
    //return false;
  //} else {
    //return true;
  //}
