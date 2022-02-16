import { Component, OnInit, Inject } from '@angular/core';
import { IdataAccounts } from '../../core/interfaces/dataAccount.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtmService } from 'src/app/core/services/atm.service';
import { ILocalSRepository } from '../../domain/repository/localS.repository';

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.scss']
})
export class WithdrawalsComponent implements OnInit {
  myUser!: IdataAccounts;
  miFormulario!: FormGroup;

  constructor(private fb: FormBuilder, private atmService: AtmService, @Inject('localSRepository') private localStorageService: ILocalSRepository) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.miFormulario = this.fb.group({
      withdrawalValue: ['', [Validators.required, Validators.min(0)]],
    })
  }

  withdrawal() {
    const { withdrawalValue } = this.miFormulario.value;
    this.atmService.withdrawalMoney(withdrawalValue);
  }

  getBalanceAccount() {
    let dataAccount = this.localStorageService.getLocalStorage('userAccount');
    this.myUser = dataAccount;
    return this.myUser.accountBalance;
  }

  get withdrawalField() { return this.miFormulario.get('withdrawalValue') }
}
