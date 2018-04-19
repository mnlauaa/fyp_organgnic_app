import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Content, AlertController  } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  @ViewChild(Content) content: Content;

  msgList = [];
  editorMsg = '';
  showEmojiPicker = false;
  user_info: any;
  other_id: any;
  my_id: any;
 
  
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private socket: Socket, 
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public api: ApiService
  ) {
    this.user_info = navParams.get('user_info');
    this.other_id = navParams.get('other_id');
    this.my_id = navParams.get('my_id');

    this.getMessages().subscribe(message => {
      this.changeDate(message);
      this.msgList.push(message);
      setTimeout(() => {
        this.content.scrollToBottom(300);
      }, 100);
    });

    this.api.startQueue([
      this.api.getChatById(this.other_id)
    ]).then(data=>{
      this.socket.emit('read', this.my_id, this.other_id);
      data[0].map(m=>m.datetime = moment(m.datetime).format('HH:mm'));
      console.log(data[0])
      console.log(this.other_id)
      this.msgList = data[0];
    })
  }

  changeDate(message){
    message.datetime = moment(message.datetime).format('HH:mm');
  }

  sendMsg() {
    let data = {
      from: this.my_id,
      to: this.other_id,
      msg: this.editorMsg
    }
    this.socket.emit('private message', data, (message)=>{
      this.changeDate(message);
      this.msgList.push(message);
      this.editorMsg = ''
      setTimeout(() => {
        this.content.scrollToBottom(300);
      }, 100);
    });
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on(this.other_id + '-to-' + this.my_id, (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  ionViewDidEnter() {
    this.socket.emit('new-user', this.my_id);
    this.content.scrollToBottom(100);
  }

  ionViewWillLeave() {
    this.socket.emit('leave', this.my_id);
  }
  
  openMenu(){
    let alert = this.alertCtrl.create({
      title: 'Send a Coupon',
      message: 'You can send a coupon for your client',
      inputs: [
        {
          name: 'coupon',
          placeholder: 'Input the cupon amount',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            this.api.startQueue([
              this.api.postCoupon(this.other_id, data.coupon)
            ]).then(data=>{
              console.log(data)
            }), err=>{
              console.log(err)
            }
          }
        }
      ]
    });
    alert.present();
  }
}
