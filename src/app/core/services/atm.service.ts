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
  currentValue: number = 0;
  arrayFriends: IdataAccountFriend[] = [];
  coincidence:boolean = false;

  constructor(@Inject('localSRepository') private localStorageService: ILocalSRepository) { }

  getAccountValue() {
    let dataAccount = this.localStorageService.getLocalStorage('userAccount');
    this.accountBalance = dataAccount.accountBalance;
    return this.accountBalance;
  }

  depositMoney(depositValue: number) {
    this.currentValue = this.getAccountValue() + depositValue;
    let dataAccount = this.localStorageService.getLocalStorage('userAccount');
    dataAccount.accountBalance = this.currentValue;
    this.localStorageService.setLocalStorage('userAccount', dataAccount);
  }

  withdrawalMoney(withdrawalValue: number) {
    if (withdrawalValue > this.getAccountValue()) {
      Swal.fire(messages[0]);
    } else {
      this.currentValue = this.getAccountValue() - withdrawalValue;
      let dataAccount = this.localStorageService.getLocalStorage('userAccount');
      dataAccount.accountBalance = this.currentValue;
      this.localStorageService.setLocalStorage('userAccount', dataAccount);
      console.log('valor actual despues de retirar', dataAccount.accountBalance);
    }
  }

  creadencialsValidation(person: IdataAccountFriend): boolean {
    let coincidences = arrayUsers.filter(element => (element.username === person.username) || (element.password == person.password) || (element.fullName == person.fullName) || (element.email == person.email));
    if (coincidences.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  transferMoney(value: number, numberAccount: number) {
    if (localStorage.hasOwnProperty("storageArrayFriends")) {
      this.arrayFriends = this.localStorageService.getLocalStorage('storageArrayFriends');
      this.arrayFriends.some(element => {
        if (element.numberAccount === numberAccount) { // coincide el la cuenta digitada con la almacenada
          this.coincidence = true;
          this.withdrawalMoney(value); // actualiza el valor de la cuenta del usuario
          this.currentValue = element.accountBalance + value;
          element.accountBalance = this.currentValue;
          this.localStorageService.setLocalStorage('storageArrayFriends', this.arrayFriends);
        }
      })
    } else {
      Swal.fire(messages[3]);
    }
  }

  verificationSameAccounts(){
    if(this.coincidence !== true){
      Swal.fire(messages[4]);
    }
  }
}






























  //private _userAccount: IdataAccounts | undefined;

  // let keys = Object.keys(localStorage)
    //console.log(keys);
    // this.userAccount.accountBalance = this.currentValue;
    //console.log('valorActual',this.currentValue)
  //}


  //getLocalStorage(name: string) {
    //return JSON.parse(localStorage.getItem(name) || '{}');
 // }

  //setLocalStorage(name: string, value: any):void {
   // return localStorage.setItem(name, JSON.stringify(value));
  //}



  //getAccountValue() {
    //let dataAccount = this.localStorageService.getLocalStorage('userAccount');
//    this.accountBalance = dataAccount.accountBalance;
    //return this.accountBalance;
 // }

  //depositMoney(depositValue: number) {
  //  this.currentValue = this.getAccountValue() + depositValue;
//    let dataAccount = this.localStorageService.getLocalStorage('userAccount');
  //  dataAccount.accountBalance = this.currentValue;
    //this.setLocalStorage('userAccount', dataAccount);
  //  this.localStorageService.setLocalStorage('userAccount', dataAccount);
  //}

 // withdrawalMoney(withdrawalValue: number) {
   // if(withdrawalValue > this.getAccountValue()){
  //    Swal.fire(messages[0]);
   // }else{
   //   this.currentValue = this.getAccountValue() - withdrawalValue;
      //let dataAccount = this.getLocalStorage('userAccount');
   //   let dataAccount = this.localStorageService.getLocalStorage('userAccount');
   //   dataAccount.accountBalance = this.currentValue;
     // this.setLocalStorage('userAccount', dataAccount);
   //   this.localStorageService.setLocalStorage('userAccount', dataAccount);
   //   console.log('valor actual despues de retirar', dataAccount.accountBalance);


   //transferMoney(value: number, numberAccount: number) {
   // if (localStorage.hasOwnProperty("storageArrayFriends")) {
     // this.arrayFriends = this.localStorageService.getLocalStorage('storageArrayFriends');
     // this.arrayFriends.some(element => {
      //  if (element.numberAccount === numberAccount) { // coincide el la cuenta digitada con la almacenada
      //    this.withdrawalMoney(value); // actualiza el valor de la cuenta del usuario
        ////  this.currentValue = element.accountBalance + value;
        //  element.accountBalance = this.currentValue;
       //   this.localStorageService.setLocalStorage('storageArrayFriends', this.arrayFriends);
       // } else {
        //  console.log('entra en el else')
       //   Swal.fire(messages[4]);
       // }
     // })
   // } else {
     // Swal.fire(messages[3]);
