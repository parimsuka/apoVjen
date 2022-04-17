import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService, Message } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  tripID: string;
  messages: Observable<Message[]>;
  newMsg = '';

  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.tripID = param['tripID'];

      console.log(this.tripID);
    });

    this.messages = this.chatService.getChatMessages(this.tripID);
  }

  sendMessage() {
    this.chatService.addChatMessage(this.newMsg, this.tripID).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    })
  }

}
