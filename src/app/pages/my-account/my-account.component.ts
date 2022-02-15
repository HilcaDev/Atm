import { Component, OnInit, Inject } from '@angular/core';
import { IdataAccounts } from 'src/app/core/interfaces/dataAccount.interface';
import { AtmService } from '../../core/services/atm.service';
import { ILocalSRepository } from '../../domain/repository/localS.repository';
import { IdataAccountFriend } from '../../core/interfaces/dataAccount.interface';
import Swal from 'sweetalert2';
import { messages } from 'src/app/core/constants/swalFire';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {

  title = "Información Personal"
  myUser!: IdataAccounts;
  arrayFriends: IdataAccountFriend[] = [];
  lenghtArrayFriends:number = 0;
  date = new Date();


  constructor(private AtmService: AtmService,
    @Inject('localSRepository') private localStorageService: ILocalSRepository) { }

  ngOnInit(): void {
    this.myAccount();
    this.getNumberAccountsFriends();
  }

  myAccount() {
    let dataAccount = this.localStorageService.getLocalStorage('userAccount');
    this.myUser = dataAccount;
  }

  getNumberAccountsFriends() {
    if (localStorage.hasOwnProperty("storageArrayFriends")) {
      this.arrayFriends = this.localStorageService.getLocalStorage('storageArrayFriends');
       this.lenghtArrayFriends = this.arrayFriends.length;
    } else {
      this.lenghtArrayFriends = 0;
    }
  }
}
