import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { messages } from 'src/app/core/constants/swalFire';
import { IdataAccountFriend, IdataAccounts } from 'src/app/core/interfaces/dataAccount.interface';
import { AtmService } from 'src/app/core/services/atm.service';
import Swal from 'sweetalert2';
import { ILocalSRepository } from '../../domain/repository/localS.repository';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  miFormulario!: FormGroup;
  newUser!: IdataAccountFriend;
  arrayFriends: IdataAccountFriend[] = [];

  constructor(private fb: FormBuilder, private atmService: AtmService,
    @Inject('localSRepository') private localStorageService: ILocalSRepository) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.miFormulario = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', [Validators.required, Validators.minLength(3)]],
      numberAccount: ['', [Validators.required, Validators.min(0)]],
      accountBalance: ['', [Validators.required, Validators.min(0)]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  createAccountNewUser() {
    this.newUser = this.miFormulario.value;
    if (this.atmService.creadencialsValidation(this.newUser)) {
      Swal.fire(messages[2]);
    } else {
      //console.log('primera verificacion GET', localStorage.getItem('storageArrayFriends'));
      if (((localStorage.getItem('storageArrayFriends') === null) || localStorage.getItem('storageArrayFriends') === undefined) && !localStorage.getItem('storageArrayFriends')) {
        console.log('entra en el if')
        this.arrayFriends.push(this.newUser);
        this.localStorageService.setLocalStorage('storageArrayFriends', this.arrayFriends);
      } else {
        if (localStorage.hasOwnProperty("storageArrayFriends")) {
          this.arrayFriends = this.localStorageService.getLocalStorage('storageArrayFriends');
          let coincidences = this.arrayFriends.filter(element => (element.username === this.newUser.username) || (element.password === this.newUser.password) || (element.fullName === this.newUser.fullName) || (element.email === this.newUser.email) || (element.numberAccount === this.newUser.numberAccount));
          if (coincidences.length > 0) {
            Swal.fire(messages[2]);
          } else {
            this.arrayFriends.push(this.newUser);
            this.localStorageService.setLocalStorage('storageArrayFriends', this.arrayFriends);
          }
        }
      }
    }
  }

  get fullNameField() { return this.miFormulario.get('fullName') };
  get emailField() { return this.miFormulario.get('email') };
  get rolField() { return this.miFormulario.get('rol') };
  get numberAccountField() { return this.miFormulario.get('numberAccount') };
  get accountBalanceField() { return this.miFormulario.get('accountBalance') };
  get usernameField() { return this.miFormulario.get('username') };
  get passwordField() { return this.miFormulario.get('password') };
}
















  //this.arrayFriends.push(this.newUser);
     // if (localStorage.getItem('storageDataFriends') !== undefined && localStorage.getItem('storageDataFriends')) {
       // let storageArrayFriends = this.localStorageService.getLocalStorage('storageDataFriends');
       // storageArrayFriends.push(this.newUser);
       // this.localStorageService.setLocalStorage('storageDataFriends', this.arrayFriends);
       //else {
      // this.localStorageService.setLocalStorage('storageDataFriends', this.arrayFriends);
      //console.log('entra en el else')
    //}



    //CORRECTO
   // console.log('primera verificacion GET',localStorage.getItem('storageArrayFriends'));
      //if (((localStorage.getItem('storageArrayFriends') == null) || localStorage.getItem('storageArrayFriends') == undefined) && !localStorage.getItem('storageArrayFriends')){
      //  console.log('entra en el if')
        //this.arrayFriends.push(this.newUser);
       // this.localStorageService.setLocalStorage('storageArrayFriends', this.arrayFriends);
      //} else {
        //if (localStorage.hasOwnProperty("storageArrayFriends")) {
        //  this.arrayFriends = this.localStorageService.getLocalStorage('storageArrayFriends');
        //  this.arrayFriends.push(this.newUser);
        //  this.localStorageService.setLocalStorage('storageArrayFriends', this.arrayFriends);
      //  }
      //  }
    //  }
