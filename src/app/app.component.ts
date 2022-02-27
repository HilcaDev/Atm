import { Component, Inject, OnInit } from '@angular/core';
import { arrayInfoUsers } from './auth/constants/arrayUsers';
import { ILocalSRepository } from './domain/repository/localS.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(@Inject('localSRepository') private localStorageService: ILocalSRepository) { }

  ngOnInit(): void {
  //  this.localStorageService.setLocalStorage('arrayInfoUsers', arrayInfoUsers);
  }
}
