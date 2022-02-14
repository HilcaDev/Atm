import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { localSProvider } from '../domain/providers/localS.provider';
import { AtmService } from './services/atm.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [localSProvider]
})
export class AtmModule { }
