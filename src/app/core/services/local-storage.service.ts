import { Injectable } from '@angular/core';
import { ILocalSRepository } from '../../domain/repository/localS.repository';

@Injectable()
export class LocalStorageService implements ILocalSRepository {
  constructor() { }

  setLocalStorage(name: string, value: any) {
    return localStorage.setItem(name, JSON.stringify(value));
  }
  getLocalStorage(name: string) {
    return JSON.parse(localStorage.getItem(name) || '{}');
  }
}
