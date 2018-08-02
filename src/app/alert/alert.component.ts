import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, group, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';

import { Subscription } from 'rxjs';

import { AlertService } from './alert.service';

const generateRandomId = () => {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
};

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('alertAnimaiton', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('1s ease-out', keyframes([
            style({ opacity: 0, transform: 'translateX(75px)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(-35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 })
          ]))
        ]), { optional: true }),
        query(':leave', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(-35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateX(75px)', offset: 1 })
          ]))
        ]), { optional: true })
      ])
    ])
  ]
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
      data.hide = setTimeout(() => {
        clearTimeout(data.hide);
        this.dismiss(data.id);
      }, 3000);
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
