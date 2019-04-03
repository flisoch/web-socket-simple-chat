package hello;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class ChatController {
    @MessageMapping("/chat/{chatName}")
    @SendTo("/topic/chat/{chatName}")
    public Message chat(@DestinationVariable String chatName, Message message){
        System.out.println("chat: " + chatName);
        System.out.println("user:" + message.getName()+ " message: "+ message.getText());
        return new Message(HtmlUtils.htmlEscape(message.getName()), HtmlUtils.htmlEscape(message.getText()));
    }
}
