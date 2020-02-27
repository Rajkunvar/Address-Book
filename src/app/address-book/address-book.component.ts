import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {

  constructor(private router: Router) { }
  totalcontacts;
  ngOnInit() {
    
  }

  addBtnClick(){     
  this.router.navigate(['/addcontact']);   
}
oncontactsListUpdated(totalCnts){
 
this.totalcontacts=totalCnts;
 console.log("###########totalcontacts",this.totalcontacts);
}

}
