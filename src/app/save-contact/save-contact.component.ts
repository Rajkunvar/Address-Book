import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {Router,NavigationExtras,ActivatedRoute} from '@angular/router';
import { ContactService } from '../../service/contact.service';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-save-contact',
  templateUrl: './save-contact.component.html',
  styleUrls: ['./save-contact.component.css']
})
export class SaveContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted;
  isEdit;
  contactToSave;
  isFav=false;
 
  constructor(public contactService:ContactService,public sharedService:SharedService,private router: Router,private activatedRoute: ActivatedRoute) { }
  
  ngOnInit() { 

    /*this.activatedRoute.queryParams.subscribe(params => {      
      if(params.isEdit)
      this.isEdit=true;
    });*/

    this.contactForm =new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]*")]),
      lastname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]*")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10),Validators.pattern("[0-9]*")]),
      isfavorite:new FormControl(false)
    });
    this.isFav=false;

    if(this.router.url=="/editcontact"){
      this.isEdit=true;
      this.contactToSave = this.sharedService.getContact();      
      this.contactForm.controls.firstname.setValue(this.contactToSave.firstname);
      this.contactForm.controls.lastname.setValue(this.contactToSave.lastname);
      this.contactForm.controls.email.setValue(this.contactToSave.email);
      this.contactForm.controls.mobile.setValue(this.contactToSave.mobile);
      this.contactForm.controls.isfavorite.setValue(this.contactToSave.isfavorite);
      this.isFav = this.contactToSave.isfavorite;
      }else{
        this.isEdit=false;
      }
  }

  get fcontrol() { return this.contactForm.controls; }

  addBtnClick() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }else {
      this.addContact();
      //this.contactForm.reset();
    }
  }

  editBtnClick() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }else {
      this.editContact();
      //this.contactForm.reset();
    }
  }

  addContact(){
    console.log("form data=",this.contactForm.value);
    
    let contactToAdd=this.contactForm.value;

    this.contactService.addContact(contactToAdd).subscribe(
      data=>{
      console.log("data===",data);
      this.router.navigateByUrl('/contactlist');
      },
      err => {
        console.log("##Error while adding contact, Method:addContact");
      }
    );

  }

  editContact(){
    
    let contactToAdd=this.contactForm.value;
    var contactId = this.contactToSave.firstname +"||"+this.contactToSave.lastname;
    this.contactService.updateContact(contactToAdd,contactId).subscribe(
      data=>{      
       this.router.navigateByUrl('/contactlist');
      },
      err => {
        console.log("##Error while adding contact, Method:editContact");
      }
    );

  }

  toggleVisibility(e){
    this.isFav = e.target.checked;  
    this.contactForm.controls.isfavorite.setValue(this.isFav); 
  }

  resetForm(){
    this.contactForm.reset();
  }
  cancelBtnClick(){
    this.router.navigateByUrl('/contactlist');
  }
}


