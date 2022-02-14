import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtmService } from '../../core/services/atm.service';
import { IdataAccounts } from '../../core/interfaces/dataAccount.interface';
import { ILocalSRepository } from 'src/app/domain/repository/localS.repository';

@Component({
  selector: 'app-deposit-money',
  templateUrl: './deposit-money.component.html',
  styleUrls: ['./deposit-money.component.scss']
})
export class DepositMoneyComponent implements OnInit {

  myUser!:IdataAccounts;
  miFormulario!: FormGroup;

  constructor(
    @Inject('localSRepository') private localStorageService:ILocalSRepository,
    private fb: FormBuilder, private atmService:AtmService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.miFormulario = this.fb.group({
      depositValue: ['', [Validators.required,Validators.min(0)]],
    })
  }

  deposit(){
    const { depositValue } = this.miFormulario.value;
    this.atmService.depositMoney(depositValue);
  }

  getBalanceAccount(){
    let dataAccount = this.localStorageService.getLocalStorage('userAccount')
    this.myUser = dataAccount;
    return this.myUser.accountBalance;
  }

  get depositField() { return this.miFormulario.get('depositValue') }
}
