import { Component, OnInit } from '@angular/core';
import { LexRuntime } from 'aws-sdk'; /* Al instalar 'npm install aws-sdk' da error la compilacion del servidor, solucion en comentario mas abajo */
import { Message } from './messages';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  /*
  El error de la libreria 'aws-sdk' se soluciona con el siguiente link (ultima solucion)
  https://stackoverflow.com/questions/54035140/how-to-configure-aws-sdk-in-angular-7/54035191

  **Solucion**
  Please modify your files as follows:

  // aws-sdk requires global to exist
  (window as any).global = window;
  to /src/polyfills.ts and

  "types": ["node"]
  to compilerOptions block in /src/tsconfig.app.json
  */
  lex: LexRuntime;
  userInput: string = '';
  messages: Message[] = [];
  lexState: string = 'Hola, escribe tu consulta.';

  constructor() { }

  ngOnInit(): void {
    this.messages.push(new Message(this.lexState, "Bot"));
  }

  postLexText() {
    var params = {
      botAlias: "\$LATEST", //chatbot //
      botName: "chatbotx",
      inputText: "Testing",
      userId: "User", //lexusersemi1
    };

    this.lex = new LexRuntime({
      accessKeyId: "AKIATP32HZSCEPG2EY46",
      secretAccessKey: "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",
      region: "us-east-1"
    });

    params.inputText = this.userInput;
    this.lex.postText(params, (err, data) => {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else {
        console.log(data) // successful response
        this.lexState = data.message;
      }
      this.messages.push(new Message(this.userInput, "User"));
      this.userInput = "";
      this.messages.push(new Message(this.lexState, "Bot"));
    }
    );
  }

}
