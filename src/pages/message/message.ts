import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service';
import * as moment from 'moment';
import { ChatRoomPage } from '../chat-room/chat-room'

@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  title = 'Message'
  message_list: any;
  user_info: any;
  // nickname = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiService,
  ) {
    this.user_info = navParams.get('user_info');
  }

  ionViewWillEnter(){
    this.api.startQueue([
      this.api.getMyChat()
    ]).then(data=>{
      data[0].map(m=>{
        m.datetime = moment(m.datetime).calendar(null,{
          sameDay: 'HH:mm',
          lastDay: 'D/M/YYYY',
          lastWeek: 'D/M/YYYY',
          sameElse: 'D/M/YYYY'
        })
        if(m.sender_name == this.user_info.display_name){
          m.display_name = m.receiver_name;
          m.image_url = m.receiver_image
        } else {
          m.display_name = m.sender_name;
          m.image_url = m.sender_image
        }
      });
      this.message_list = data[0]
      console.log(data[0])
    }), err=>{
      console.log(err)
    }
  }


  joinChat(m) {
    let other_id, my_id
    if(m.sender_name == this.user_info.display_name){
      other_id = m.receiver_id;
      my_id = m.sender_id;
    } else {
      other_id = m.sender_id;
      my_id = m.receiver_id;
    }
    this.navCtrl.push(ChatRoomPage, {
      user_info: this.user_info,
      other_id: other_id,
      my_id: my_id
    });
  }

}
