import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AtmService } from 'src/app/core/services/atm.service';
import { ILocalSRepository } from 'src/app/domain/repository/localS.repository';
import { IAuthRepository } from 'src/app/domain/repository/auth.repository';
import { messagesSwalFire } from '../../core/constants/swalFire';

@Component({
  selector: 'app-tranfer-money',
  templateUrl: './tranfer-money.component.html',
  styleUrls: ['./tranfer-money.component.scss']
})
export class TranferMoneyComponent {
  miFormulario!: FormGroup;

  constructor(private fb: FormBuilder, private atmService: AtmService, @Inject('localSRepository') private localStorageService: ILocalSRepository,
    @Inject('authRepository') private authService: IAuthRepository) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.miFormulario = this.fb.group({
      transferValue: ['', [Validators.required, Validators.min(0)]],
      transferAccount: ['', [Validators.required, Validators.min(0)]]
    })
  }

  transferMoney(): void {
    if (this.atmService.transferMoney(this.miFormulario.value)) {
      if (!this.atmService.coincidencias()) {
        this.authService.setMessage(messagesSwalFire.transferHighterThanBalance);
      } else {
        this.authService.setMessage(messagesSwalFire.successfulTransaction);
      }
    } else {
      this.authService.setMessage(messagesSwalFire.numberAccountNotExist);
    }
  }

  get transferValueField(): AbstractControl | null { return this.miFormulario.get('transferValue') };
  get transferAccountField(): AbstractControl | null { return this.miFormulario.get('transferAccount') };
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
