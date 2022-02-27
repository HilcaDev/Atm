import { Inject, Injectable } from '@angular/core';
import { ILocalSRepository } from '../../domain/repository/localS.repository';
import { ITransaction, IUser } from '../../auth/interfaces/auth.interface';
import { arrayInfoUsers } from '../../auth/constants/arrayUsers';

@Injectable({
  providedIn: 'root'
})
export class AtmService {
  currentValueUser: number = 0;
  coincidence!: boolean;

  constructor(@Inject('localSRepository') private localStorageService: ILocalSRepository) { }

  getAccountValue() {
    const user: IUser = this.localStorageService.getLocalStorage('userAccount');
    const userBalance: number = user.accountBalance;
    return userBalance;
  }

  updateArrayInfoUsers(user: IUser): void {
    const arrayInfoUsers: IUser[] = this.localStorageService.getLocalStorage('arrayInfoUsers')
    arrayInfoUsers.find((element, index) => {
      if (element.id === user.id) {
        arrayInfoUsers[index] = user;
        this.localStorageService.setLocalStorage('arrayInfoUsers', arrayInfoUsers);
      }
    })
  }

  depositMoney(depositValue: number) {
   const currentUser = this.localStorageService.getLocalStorage('userAccount');
    this.currentValueUser = this.getAccountValue() + depositValue;
    currentUser.accountBalance = this.currentValueUser;
    this.localStorageService.setLocalStorage('userAccount', currentUser);
    this.updateArrayInfoUsers(currentUser);
  }

  setCurrentValueUser(withdrawalValue: number) {
    this.currentValueUser = this.getAccountValue() - withdrawalValue;
    let dataAccount = this.localStorageService.getLocalStorage('userAccount');
    dataAccount.accountBalance = this.currentValueUser;
    this.localStorageService.setLocalStorage('userAccount', dataAccount);
    this.updateArrayInfoUsers(dataAccount);
  }

  withdrawalMoney(withdrawalValue: number): boolean {
    if (withdrawalValue > this.getAccountValue()) {
      this.coincidence = false;
      return false;
    } else {
      this.setCurrentValueUser(withdrawalValue);
      this.coincidence = true;
      return true;
    }
  }

  createNewUser(person: IUser) {
    const arrayInfoUsers: IUser[] = this.localStorageService.getLocalStorage('arrayInfoUsers')
    const currentUser:IUser = this.localStorageService.getLocalStorage('userAccount');
    const coincidences = arrayInfoUsers.find(element => (element.username === person.username.trim()) || (element.password === person.password.trim()) || (element.fullName === person.fullName.trim()) || (element.email === person.email.trim()) || (element.numberAccountBalance === person.numberAccountBalance));
    if (!coincidences){
      this.coincidence = true;
      currentUser.friends.push(person);
      this.localStorageService.setLocalStorage('userAccount', currentUser);
      arrayInfoUsers.push(person);
      this.localStorageService.setLocalStorage('arrayInfoUsers', arrayInfoUsers);
      this.updateArrayInfoUsers(currentUser);
      return true;
    } else{
      this.coincidence = false;
      return false;
    }
  }

  userToTransfer(transferAccount: number) {
    const arrayInfoUsers: IUser[] = this.localStorageService.getLocalStorage('arrayInfoUsers')
    return arrayInfoUsers.find(user => user.numberAccountBalance === transferAccount);
  }

  transferMoney(dataTransaction: ITransaction) {
    const currentUser:IUser = this.localStorageService.getLocalStorage('userAccount');
    const userToTransfer: IUser | undefined = this.userToTransfer(dataTransaction.transferAccount);
    console.log('usario a Transferir',userToTransfer)
    if (userToTransfer) {
      if(dataTransaction.transferValue <= currentUser.accountBalance){
        currentUser.accountBalance -= dataTransaction.transferValue;
        userToTransfer.accountBalance += dataTransaction.transferValue;
        currentUser.transactions.push(dataTransaction);
        this.localStorageService.setLocalStorage('userAccount', currentUser);
        this.updateArrayInfoUsers(currentUser);
        this.updateArrayInfoUsers(userToTransfer);
        this.coincidence = true;
      } else {
        this.coincidence = false;
      }
      return true;
    } else {
      return false;
    }
  }

  coincidencias(){
    if(this.coincidence){
      return true;
    }else{
      return false;
    }
  }
}




















/*
  transferMoney(value: number, numberAccount: number) {
    if (localStorage.hasOwnProperty("storageArrayFriends")) {
      this.arrayFriends = this.localStorageService.getLocalStorage('storageArrayFriends');
      this.arrayFriends.filter(element => {
        if (element.numberAccount === numberAccount) {
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

  */

