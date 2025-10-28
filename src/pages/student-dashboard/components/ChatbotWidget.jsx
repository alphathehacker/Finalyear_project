import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

// Replace with your real ChatBees API key and collection name
const CHATBEES_API_KEY = "MDMtMDAwMDAwMDAtMDAwMDAxLTRmMWJmNzA3LWQyNDQtYjgzOC0yM2I2LTc1ZmZmN2E1ODU3Mw==";
const ACCOUNT_ID = "X0LZQYK7";
const COLLECTION_NAME = "YOUR_COLLECTION_NAME"; // Use collection name you set or omit if not required

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hi! I'm your admission assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const fetchBotResponse = async (question) => {
    try {
      const res = await fetch('https://api.chatbees.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CHATBEES_API_KEY}`
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: question }],
          account_id: ACCOUNT_ID,
          collection: COLLECTION_NAME // Optional, include if you have a collection
        })
      });
      const data = await res.json();
      return data?.choices?.[0]?.message?.content || "Sorry, couldn't generate answer.";
    } catch (e) {
      return "Sorry, I couldn't reach ChatBees API.";
    }
  };

  const handleSendMessage = async (message = inputMessage) => {
    if (!message?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: message?.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    const botMsgContent = await fetchBotResponse(message?.trim());

    const botResponse = {
      id: Date.now() + 1,
      type: 'bot',
      message: botMsgContent,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-100">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <Icon name={isOpen ? "X" : "MessageCircle"} size={24} />
        </Button>
      </div>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-card border border-border rounded-xl shadow-modal z-100 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} color="white" />
              </div>
              <div>
                <h4 className="font-heading font-medium text-sm text-foreground">
                  Admission Assistant
                </h4>
                <p className="text-xs text-success">Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="Minimize2" size={16} />
            </Button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'}`}
                >
                  <p className="whitespace-pre-line">{message?.message}</p>
                  <p className={`text-xs mt-1 opacity-70`}>
                    {message?.timestamp?.toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e?.target?.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage?.trim() || isTyping}
                size="icon"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
