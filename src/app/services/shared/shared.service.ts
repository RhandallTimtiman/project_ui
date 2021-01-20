import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private user: BehaviorSubject<boolean>

  constructor() {
    this.user = new BehaviorSubject<boolean>(false)
  }

  /**
   * Gets Current User
   *
   * @memberof SharedService
   */
  getUser() {
    return this.user.asObservable()
  }

  /**
   * Sets the Value of User
   *
   * @param {*} value
   * @memberof SharedService
   */
  setUser(value: any) {
    this.user.next(value)
  }
}
