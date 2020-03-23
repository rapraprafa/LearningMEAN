import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  first_name: string;
  last_name: string;
  phone: string;

  constructor(private contactService: ContactService) { }

  addContact(){
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.contactService.addContact(newContact)
    .subscribe(res => {
      var obj = {
        _id: res["_id"],
        first_name: res["first_name"],
        last_name: res["last_name"],
        phone: res["phone"],
        _v: res["_v"] //just for testing if it will still be successful even if not on model
      }
      if(this.first_name!="" && this.last_name!="" && this.phone!=""){
        this.contacts.push(obj);
      }
      this.contactService.getContacts()
      .subscribe(contacts => this.contacts = contacts)
    });
    this.first_name = "";
    this.last_name = "";
    this.phone = "";
  }

  deleteContact(id:any){
    this.contactService.deleteContact(id)
    .subscribe(data => {
      if(data["n"]==1){
        for(var i=0; i < this.contacts.length; i++){
          if(this.contacts[i]._id == id){
            this.contacts.splice(i,1);
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.contactService.getContacts()
    .subscribe(contacts => this.contacts = contacts)
  }

}
