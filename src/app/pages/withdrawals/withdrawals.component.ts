import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtmService } from 'src/app/core/services/atm.service';
import { ILocalSRepository } from '../../domain/repository/localS.repository';
import { AuthService } from '../../auth/services/auth.service';
import { IAuthRepository } from 'src/app/domain/repository/auth.repository';
import { messagesSwalFire } from 'src/app/core/constants/swalFire';

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.scss']
})
export class WithdrawalsComponent implements OnInit {
  miFormulario!: FormGroup;

  constructor(private fb: FormBuilder, private atmService: AtmService, @Inject('localSRepository') private localStorageService: ILocalSRepository,
    @Inject('authRepository') private authService: IAuthRepository) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm():void {
    this.miFormulario = this.fb.group({
      withdrawalValue: ['', [Validators.required, Validators.min(0)]],
    })
  }

  withdrawal():void {
    const { withdrawalValue } = this.miFormulario.value;
    const withdrawal = this.atmService.withdrawalMoney(withdrawalValue);
    if (!this.atmService.coincidencias()) {
      this.authService.setMessage(messagesSwalFire.withdrawalHighterThanBalance)
    }
  }

  getBalanceAccount():number {
    let dataAccount = this.localStorageService.getLocalStorage('userAccount');
    return dataAccount.accountBalance;
  }

  get withdrawalField() { return this.miFormulario.get('withdrawalValue') }
}
