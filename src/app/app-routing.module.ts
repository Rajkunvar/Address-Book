import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent} from './contact-list/contact-list.component';
import { SaveContactComponent} from './save-contact/save-contact.component';
import {AddressBookComponent} from './address-book/address-book.component'
const routes: Routes = [
  { path: 'contactlist', component: AddressBookComponent},
  { path: 'addcontact', component: SaveContactComponent },
  { path: 'editcontact', component: SaveContactComponent },
  { path: '',
    redirectTo: '/contactlist',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
