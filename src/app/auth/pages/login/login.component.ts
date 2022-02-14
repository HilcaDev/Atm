import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IAuthRepository } from '../../../domain/repository/auth.repository';
import { messages } from '../../../core/constants/swalFire';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  miFormulario!: FormGroup;

  constructor(
    @Inject('authRepository') private authService: IAuthRepository,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.miFormulario = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login() {
    //console.log(this.miFormulario.value);
    const { username, password } = this.miFormulario.value;
    console.log(username, password)

    if (this.authService.validation(username, password)) {
      this.router.navigateByUrl('/pages/myAccount');
    } else {
      Swal.fire(messages[1]);
    }
  }

  get usernameField() { return this.miFormulario.get('username') }

  get passwordField() { return this.miFormulario.get('password') }

}


















   // this.storageService.saveSesion(this.miFormulario.value);


   // this.authService.login(username,password); crear un usuario

   // for (let i = 0; i < this.arrayUsers.length; i++) {
     // if ((this.arrayUsers[i].username === username) && (this.arrayUsers[i].password === password)) {
      //  console.log('acceso accedido');
      //  break;

     // } else {
     //   console.log('acceso denegado');
    //  }









