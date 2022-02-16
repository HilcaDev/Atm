import { Inject, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { messages } from '../constants/swalFire';
import { IdataAccountFriend } from '../interfaces/dataAccount.interface';
import { ILocalSRepository } from '../../domain/repository/localS.repository';
import { arrayUsers } from '../constants/arrayDataAccount';

@Injectable({
  providedIn: 'root'
})
export class AtmService {
  accountBalance!: number;
  currentValueUser: number = 0;
  currentValueFriend: number = 0;
  arrayFriends: IdataAccountFriend[] = [];
  coincidence: boolean = false;

  constructor(@Inject('localSRepository') private localStorageService: ILocalSRepository) { }

  getAccountValue() {
    let dataAccount = this.localStorageService.getLocalStorage('userAccount');
    this.accountBalance = dataAccount.accountBalance;
    return this.accountBalance;
  }

  depositMoney(depositValue: number) {
    this.currentValueUser = this.getAccountValue() + depositValue;
    let dataAccount = this.localStorageService.getLocalStorage('userAccount');
    dataAccount.accountBalance = this.currentValueUser;
    this.localStorageService.setLocalStorage('userAccount', dataAccount);
  }

  setCurrentValueUser(withdrawalValue: number) {
    this.currentValueUser = this.getAccountValue() - withdrawalValue;
    let dataAccount = this.localStorageService.getLocalStorage('userAccount');
    dataAccount.accountBalance = this.currentValueUser;
    this.localStorageService.setLocalStorage('userAccount', dataAccount);
  }

  withdrawalMoney(withdrawalValue: number) {
    if (withdrawalValue > this.getAccountValue()) {
      Swal.fire(messages[0]);
      return false;
    } else {
      this.setCurrentValueUser(withdrawalValue);
      return true;
    }
  }

  creadencialsValidation(person: IdataAccountFriend): boolean {
    let coincidences = arrayUsers.filter(element => (element.username === person.username) || (element.password === person.password) || (element.fullName === person.fullName) || (element.email === person.email));
    if (coincidences.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  transferMoney(value: number, numberAccount: number) {
    if (localStorage.hasOwnProperty("storageArrayFriends")) {
      this.arrayFriends = this.localStorageService.getLocalStorage('storageArrayFriends');
      this.arrayFriends.filter(element => {
        if (element.numberAccount === numberAccount) { // coincide el la cuenta digitada con la almacenada
          this.coincidence = true;
          if (value <= this.getAccountValue()) {
            this.setCurrentValueUser(value);
            this.currentValueFriend = element.accountBalance + value;
            element.accountBalance = this.currentValueFriend;
            this.localStorageService.setLocalStorage('storageArrayFriends', this.arrayFriends);
          } else {
            Swal.fire(messages[0]);
          }
        }
      })
    } else {
      Swal.fire(messages[4]);
    }
  }

  verificationSameAccounts() {
    if (this.coincidence !== true) {
      Swal.fire(messages[4]);
    }
  }
}
