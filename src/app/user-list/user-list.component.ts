import { Component, OnInit } from '@angular/core';
import {UsersService} from "../users.service";
import {User} from "../shared/user";
import {MatListOption} from "@angular/material/list";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  usersList:User[] = [];
  username:string;
  name:string;
  role:string;

  tmpVal = 0;

  selectedList:User[];

  constructor(public usersService:UsersService) { }

  ngOnInit(): void {

   this.usersList = this.usersService.getUsersList();
   this.tmpVal = this.usersService.getTmpVal();
   // setTimeout(()=>{this.username="rrrrrrrrrrrrr"},5000);
  }

  search(query:string) {
    this.usersList = this.usersService.findUser(query);
  }



  sort(direction: string) {
    console.log(direction);
    this.usersList = this.usersService.sortUsers(direction);
  }

  addUser() {
    console.log(this.username);
    console.log(this.role);
    //this.usersList = this.usersService.addUser(this.username, this.name, this.role);
    this.usersService.addUser(
    {
      id: Math.floor((Math.random()*6)+10),
      name: this.name,
      username: this.username,
      email: "",
      role: (this.role == "0"?"Admin":"User"),
      phone: "",
      website: ""

    })
    this.usersList = this.usersService.getUsersList();
  }

  deleteUsers() {
    this.usersService.deleteUsers(this.selectedList);
    this.usersList = this.usersService.getUsersList();
  }

  selectedItem(selected: MatListOption[]) {


    this.selectedList=[];
    selected.forEach(el=>{this.selectedList.push(el.value)});
    console.log(this.selectedList);
  }
}
