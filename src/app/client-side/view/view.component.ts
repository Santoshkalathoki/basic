import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../service/client-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
user: any;
  usersDetail: Array<any> = new Array<any>();
  constructor( private clientService: ClientServiceService) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(){
    this.clientService.getAll(this.user).subscribe(
      (response: any) =>{
        this.usersDetail = response?.bookings;
        console.log(response);
      }, (error:any) =>{
        console.error('error is:', error)
      }
    )
  }

}
