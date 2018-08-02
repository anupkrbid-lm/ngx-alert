import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from './alert.service';

const generateRandomId = () => {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
};

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
      data.id = generateRandomId();
      this.alerts.push(data);
    });
  }

  dismiss(alertId: string) {
    const alertIdIndex = this.alerts.findIndex(alert => alert.id === alertId);
    this.alerts.splice(alertIdIndex, 1);
  }

  ngOnDestroy() {
    this.alertSubscrition.unsubscribe();
  }

}
