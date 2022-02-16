import { Component, Inject, OnInit } from '@angular/core';
import { IAuthRepository } from 'src/app/domain/repository/auth.repository';
import { Router } from '@angular/router';
import { IUser } from '../../auth/interfaces/auth.interface';
import { IdataAccounts } from 'src/app/core/interfaces/dataAccount.interface';
import { arrayUsers } from '../../core/constants/arrayDataAccount';
import { AtmService } from '../../core/services/atm.service';
import { ILocalSRepository } from '../../domain/repository/localS.repository';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  usuario!: IUser;
  userAccount!: IdataAccounts;

  constructor(@Inject('authRepository') private authService: IAuthRepository,
    @Inject('localSRepository') private localStorageService: ILocalSRepository,
    private router: Router,
    private atmService: AtmService) { }

  ngOnInit(): void {
    this.getOrSetUserInformation();
  }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

  getOrSetUserInformation() {
    let getUserInformation = this.localStorageService.getLocalStorage('userInformation')
    this.usuario = getUserInformation;
    arrayUsers.some(ItemArrayUser => {
      if (ItemArrayUser.username === this.usuario.username && ItemArrayUser.password === this.usuario.password) {
        this.userAccount = ItemArrayUser;
        if (localStorage.getItem('userAccount') !== undefined && localStorage.getItem('userAccount')) {
          this.localStorageService.getLocalStorage('userAccount');
        } else {
          this.localStorageService.setLocalStorage('userAccount', this.userAccount);
        }
      }
    })
  }
}
