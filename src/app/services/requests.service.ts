import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }
  createRequest(request) {
    const cleanEmail = request.receiver_email.replace('.', ',');
    return this.angularFireDatabase.object('requests/' + cleanEmail + '/' + request.sender).set(request);
  }
  setRequestStatus(request, status) {
    const cleanEmail = request.receiver_email.replace('.', ',');
    return this.angularFireDatabase.object('requests/' + cleanEmail + '/' + request.sender + '/status').set(status);
  }
  getRequestsForEmail(email) {
    const cleanEmail = email.replace('.', ',');
    return this.angularFireDatabase.list('requests/' + cleanEmail);
  }
}
