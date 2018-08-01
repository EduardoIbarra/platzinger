import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';
import {RequestsService} from './services/requests.service';
import {User} from './interfaces/user';
import {DialogService} from 'ng2-bootstrap-modal';
import {RequestComponent} from './modals/request/request.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'platzinger';
  user: User;
  requests: any[] = [];
  mailsShown: any[] = [];
  constructor(public router: Router, private authenticationService: AuthenticationService, private userService: UserService, private requestService: RequestsService, private dialogService: DialogService) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe( (data: User) => {
        this.user = data;
        this.requestService.getRequestsForEmail(this.user.email).valueChanges().subscribe((requests: any) => {
          this.requests = requests;
          this.requests = this.requests.filter( (r) => {
            return r.status !== 'accepted' && r.status !== 'rejected';
          });
          this.requests.forEach((r) => {
            if (this.mailsShown.indexOf(r.sender) === -1) {
              this.mailsShown.push((r.sender));
              this.dialogService.addDialog(RequestComponent, {scope: this, currentRequest: r});
            }
          });
        }, (error) => {
          console.log(error);
        });
      });
    });
  }
}
