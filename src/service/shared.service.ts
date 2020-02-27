import {Injectable} from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from 'models/Contact.model';
@Injectable({providedIn:"root"})
export class SharedService {
 
 constructor(public contactService:ContactService) { }
  contact:Contact;
  contactList:Contact[];

  setContact(contact:Contact){
    this.contact=contact;
  }
  getContact(){
    return this.contact;
  }
  
}
