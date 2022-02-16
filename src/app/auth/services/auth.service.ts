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
      return true;

    } else {
      return false;
    }
  }

  verifyAuthentication(): boolean {
    return (!localStorage.getItem('userInformation'))?false:true;
  }

  logout() {
    localStorage.clear()
  }
}
