import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';

@Injectable({
  
  providedIn: 'root'
})
export class FcmService {

  constructor(private router : Router) { }

  initPush(){
    if(Capacitor.getPlatform() !== 'web'){
      this.registerPush();
    }
  }

  private registerPush(){
    PushNotifications.requestPermissions().then((permission) =>{
      if (permission.receive === 'granted') {
        PushNotifications.register();
      }else{
      
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
    }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });
 
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );
 
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification));
        if (data) {
          this.router.navigateByUrl(`/cuidados`);
        }
      }
    );
  }

}
