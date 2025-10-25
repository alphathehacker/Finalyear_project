import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! I\'m your admission assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'What are my chances for IIT Delhi?',
    'Show me colleges in Bangalore',
    'How to calculate cutoff ranks?',
    'What documents do I need?'
  ];

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

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: getBotResponse(message?.trim()),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage) => {
    const responses = {
      'what are my chances for iit delhi?': 'Based on your JEE Main rank of 2,450, you have a good chance for IIT Delhi in branches like Civil Engineering or Chemical Engineering. Would you like me to show you detailed cutoff analysis?',
      'show me colleges in bangalore': 'Here are some top engineering colleges in Bangalore that match your profile:\n• RV College of Engineering\n• BMS College of Engineering\n• PES University\n• MS Ramaiah Institute of Technology\n\nWould you like detailed information about any of these?',
      'how to calculate cutoff ranks?': 'Cutoff ranks are calculated based on:\n1. Previous year admission data\n2. Number of seats available\n3. Category-wise reservations\n4. Difficulty level of the exam\n\nOur prediction engine uses 5+ years of historical data for accurate predictions.',
      'what documents do i need?': 'For counseling, you\'ll typically need:\n• Rank card/Score card\n• 10th & 12th mark sheets\n• Category certificate (if applicable)\n• Income certificate\n• Domicile certificate\n• Passport size photos\n• Aadhar card\n\nKeep both originals and photocopies ready!'
    };

    return responses?.[userMessage?.toLowerCase()] || 
           'I understand you\'re asking about college admissions. Let me connect you with more specific information. You can also use our prediction engine for personalized recommendations!';
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
      {/* Chat Window */}
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
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                  }`}
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

          {/* Quick Questions */}
          {messages?.length === 1 && (
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="space-y-1">
                {quickQuestions?.slice(0, 2)?.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="w-full text-left text-xs p-2 bg-muted hover:bg-muted/80 rounded text-foreground transition-smooth"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

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