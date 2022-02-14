import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtmService } from 'src/app/core/services/atm.service';
import { ILocalSRepository } from 'src/app/domain/repository/localS.repository';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { IdataAccountFriend } from '../../core/interfaces/dataAccount.interface';

@Component({
  selector: 'app-tranfer-money',
  templateUrl: './tranfer-money.component.html',
  styleUrls: ['./tranfer-money.component.scss']
})
export class TranferMoneyComponent {

  miFormulario!: FormGroup;
  arrayFriends: IdataAccountFriend[] = [];
  currentValue: number = 0;

  constructor(private fb: FormBuilder, private atmService: AtmService,
    @Inject('localSRepository') private localStorageService: ILocalSRepository) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.miFormulario = this.fb.group({
      transferValue: ['', [Validators.required, Validators.min(0)]],
      transferAccount: ['', [Validators.required, Validators.min(0)]]
    })
  }

  transferMoney() {
    const { transferValue, transferAccount } = this.miFormulario.value;
    this.atmService.transferMoney(transferValue, transferAccount);
    this.atmService.verificationSameAccounts();
  }

  get transferValueField() { return this.miFormulario.get('transferValue') };
  get transferAccountField() { return this.miFormulario.get('transferAccount') };
}
























/* if (localStorage.hasOwnProperty("storageArrayFriends")) {
     this.arrayFriends = this.localStorageService.getLocalStorage('storageArrayFriends');
     this.arrayFriends.forEach(element => {
       if (element.numberAccount === transferAccount) { // coincide el la cuenta digitada con la almacenada
         this.accountBalanceFriend = element.accountBalance;
         return this.accountBalanceFriend;
       } else {
         return;
       }
     })
   }*/
