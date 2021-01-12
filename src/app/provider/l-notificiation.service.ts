import {Injectable} from '@angular/core';
import {ELocalNotificationTriggerUnit, LocalNotifications} from "@ionic-native/local-notifications/ngx";

@Injectable({
  providedIn: 'root'
})
export class LNotificiationService {

  isGranted = false;

  constructor(private localNotifications: LocalNotifications) {
  }

// Local Notifications
  registerNotifications() {
    this.localNotifications.hasPermission().then((granted) => {
      if (!granted) {
        this.localNotifications.requestPermission().then((granted) => {
          if (granted) {
            this.isGranted = true;
          } else {
            this.isGranted = false;
            console.log("permission not granted");
          }
        })
      } else {
        this.isGranted = true;
      }
    })
  }

  scheduleDueNotification() {
    if (this.isGranted) {
      this.localNotifications.schedule({
        id: 102,
        title: 'A little Reminder',
        text: 'Water your plants today',
        trigger: {every: {hour: 17, minute: 30}},
      });
    }
  }

  scheduleOverdueNotification() {
    if (this.isGranted) {
      this.localNotifications.schedule({
        id: 101,
        title: 'Don\'t let your friends down!',
        text: 'You have forgotten to water your plants',
        // every Minute + sound off only for testing purpose
        trigger: {every: ELocalNotificationTriggerUnit.MINUTE},
        sound: null,
        vibrate: true
      });
    }
  }

  clearNotifications() {
    this.localNotifications.clearAll();
  }
}
