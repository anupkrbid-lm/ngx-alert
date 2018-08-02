import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  message = 'Danger Alert';
  type = 'danger';
  alerts: any[] = [];
  alertSubscrition: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertSubscrition = this.alertService.trigger.subscribe((data: any) => {
      console.log(data);
      this.alerts.push(data);
    });
  }

  dismiss() {
    // this.store.dispatch(new AlertActions.AlertHide());
  }

  ngOnDestroy() {
    this.alertSubscrition.unsubscribe();
  }

}
