import { Component, Inject, OnInit } from '@angular/core';
import { IAuthRepository } from 'src/app/domain/repository/auth.repository';
import { Router } from '@angular/router';
import { IUser } from '../../auth/interfaces/auth.interface';
import { IdataAccounts } from 'src/app/core/interfaces/dataAccount.interface';
import { arrayUsers } from '../../core/constants/arrayDataAccount';
import { AtmService } from '../../core/services/atm.service';
import { ILocalSRepository } from '../../domain/repository/localS.repository';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  usuario!: IUser;
  userAccount!: IdataAccounts;

  constructor(@Inject('authRepository') private authService: IAuthRepository,
    @Inject('localSRepository') private localStorageService: ILocalSRepository,
    private router: Router,
    private atmService: AtmService) { }

  ngOnInit(): void {
    this.getOrSetUserInformation();
  }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

  getOrSetUserInformation() {
    let getUserInformation = this.localStorageService.getLocalStorage('userInformation')
    this.usuario = getUserInformation;
    arrayUsers.some(ItemArrayUser => {
      if (ItemArrayUser.username === this.usuario.username && ItemArrayUser.password === this.usuario.password) {
        this.userAccount = ItemArrayUser;
        if (localStorage.getItem('userAccount') !== undefined && localStorage.getItem('userAccount')) {
          this.localStorageService.getLocalStorage('userAccount');
          //console.log('entra en el if')
        } else {
          this.localStorageService.setLocalStorage('userAccount', this.userAccount);
         // console.log('entra en el else')
        }
      }
    })
  }
}
























  // si hay una variable en el localstorage, useraccount, si existe ya inicio sesion, obtener ese array
  // si no existe , la guardo



//prueba() {
  //let x = this.atmService.getLocalStorage('userInformation');
  //this.usuario = x;
  ///arrayUsers.some(obj => {
    //if(obj.username === this.usuario.username && obj.password === this.usuario.password){
      //this.userAccount = obj;
      //localStorage.setItem("userAccount", JSON.stringify(this.userAccount)); -> Sobreescribia
      //this.atmService.setLocalStorage('userAccount',this.userAccount)
      //console.log('objeto',this.userAccount)
    //}
  //})
//}



//let getUserInformation = this.atmService.getLocalStorage('userInformation');
//this.usuario = getUserInformation;
//arrayUsers.some(ItemArrayUser => {
 // if(ItemArrayUser.username === this.usuario.username && ItemArrayUser.password === this.usuario.password){
     //this.userAccount = ItemArrayUser;
    // if (!this.atmService.getLocalStorage('userAccount')){
     // this.atmService.setLocalStorage('userAccount',this.userAccount);
  //  }else{
    //  this.atmService.getLocalStorage('userAccount')
  //  }
   // console.log('comprobacion Get',this.atmService.getLocalStorage('userAccount'))
   // console.log('comprobacion Set',this.atmService.setLocalStorage('userAccount',this.userAccount))




//COMO LO TENIA
//let x = JSON.parse(localStorage.getItem('userInformation') || '{}');
//this.usuario = x;
//console.log('usuario',this.usuario)



 //return this.usuario.username;
   // if (x === undefined) {
     // return;
   // } else {
     // console.log(x.name)
     // return x.name;
   // }


    //this.usuario = localStorage.getItem("userInformation") || {};
   // if (localStorage.getItem("userInformation") === null){
   //   this.usuario = {};
    //}else{
      // JSON.parse(this.usuario);


     // getOrSetUserInformation() {
        //let getUserInformation = this.atmService.getLocalStorage('userInformation');
      //  let getUserInformation = this.localStorageService.getLocalStorage('userInformation')
       // this.usuario = getUserInformation;
        //arrayUsers.some(ItemArrayUser => {
        //  if(ItemArrayUser.username === this.usuario.username && ItemArrayUser.password === this.usuario.password){
           //  this.userAccount = ItemArrayUser;
             //console.log('user account', this.userAccount);
          //  if(localStorage.getItem('userAccount') !== undefined && localStorage.getItem('userAccount')){
              //this.atmService.getLocalStorage('userAccount')
            //  this.localStorageService.getLocalStorage('userAccount');
              //console.log('entra en el if')
           // }else{
             // this.atmService.setLocalStorage('userAccount',this.userAccount);
            // this.localStorageService.setLocalStorage('userAccount',this.userAccount);
              //console.log('entra en el else')
