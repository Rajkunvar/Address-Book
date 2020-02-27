import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../../service/contact.service';
import { SharedService } from '../../service/shared.service';
import { Contact } from 'models/Contact.model';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() contactsListUpdated: EventEmitter<any> = new EventEmitter<any>();
  contactList = [];
  contact: Contact;
  constructor(public contactService: ContactService, public sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.displayContacts();
  }

  displayContacts() {
    this.contactService.getContactList().subscribe(response => {
      this.contactList = response;
      if (this.contactList) {
        this.contactsListUpdated.emit(this.contactList.length);
      }
    },error=>{
      console.log("##Error while getting contacts, Error=>",error);
    })
  }

  editContact(i) {
    let selectedContact = JSON.stringify(this.contactList[i]);
    /*let navigationExtras: NavigationExtras = {
     queryParams: {isEdit:"true"}
   };*/
    this.contact = this.contactList[i];
    this.sharedService.setContact(this.contact);
    this.router.navigate(['/editcontact']);
  }

  deleteContact(i) {
    let id =this.contactList[i].firstname+"||"+this.contactList[i].lastname;
    this.contactService.deleteContact(id).subscribe(response => {
      if (response == "200") {
        this.ngOnInit();
      }
      else {
        console.log("##Error while deleting contact,method:deleteContact");
      }
    },error=>{
      console.log("##Error while deleting contact, Error=>",error);
    })
  }
}
