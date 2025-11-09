import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { Send, CheckCircle2 } from "lucide-react";

export function ChatDialog({ roommate, open, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "them",
      text: "Hi! Thanks for reaching out. I'm looking for a roommate for fall quarter.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: "2",
      sender: "me",
      text: "Great! I saw your profile and we seem to have similar preferences. Are you still looking?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    },
    {
      id: "3",
      sender: "them",
      text: "Yes, definitely! I'm interested in Campus Village or Arroyo Vista. What about you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: "me",
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (!roommate) return null;

  const initials = roommate.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[700px] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={roommate.image} alt={roommate.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-base">{roommate.name}</DialogTitle>
                {roommate.verified && (
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <DialogDescription className="text-xs">
                {roommate.major} • {roommate.year}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-6 py-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[70%] ${
                    message.sender === "me" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {message.sender === "them" && (
                    <Avatar className="h-8 w-8 mt-auto">
                      <AvatarImage src={roommate.image} alt={roommate.name} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.sender === "me"
                          ? "bg-blue-600 text-white rounded-br-sm"
                          : "bg-gray-100 text-gray-900 rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                    </div>
                    <p
                      className={`text-xs text-gray-500 mt-1 px-2 ${
                        message.sender === "me" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="flex gap-2 items-end">
            <Textarea
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="min-h-[44px] max-h-[120px] resize-none"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              size="icon"
              className="h-11 w-11 shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
