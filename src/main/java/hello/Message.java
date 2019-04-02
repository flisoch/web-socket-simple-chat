package hello;

public class Message {
    private String text;
    private String username;

    public Message(String username, String text) {
        this.username = username;
        this.text = text;
    }
    public Message(){
    }

    public String getName() {
        return username;
    }

    public void setName(String name) {
        this.username = name;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
