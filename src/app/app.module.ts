import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { SaveContactComponent } from './save-contact/save-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from '../service/contact.service';
import { AppRoutingModule } from './/app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    AddressBookComponent,
    SaveContactComponent,
    
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule ,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
