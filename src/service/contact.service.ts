import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({ providedIn: "root" })

export class ContactService {

  url = "http://127.0.0.1:4000/contacts";
  constructor(private httpClient: HttpClient) {
  }

  public getContactList() {
    return this.httpClient.get<any[]>(this.url);
  }

  public addContact(contact) {
    return this.httpClient.post(this.url, contact)
  }
  
  public updateContact(contact,contactId) {
    return this.httpClient.put(this.url+ "/" + contactId, contact)
  }
  
  public deleteContact(contactId) {
    return this.httpClient.delete(this.url+ "/" + contactId);
  }

}
