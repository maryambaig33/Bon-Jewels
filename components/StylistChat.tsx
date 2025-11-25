import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, User, Gem } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface StylistChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StylistChat: React.FC<StylistChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bonjour. I am Lumière, your personal jewelry concierge. How may I assist you in finding the perfect piece today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(userMessage);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, I seem to be having trouble connecting to the boutique's records." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden border border-gold-200 animate-fade-in-up">
      {/* Header */}
      <div className="bg-stone-900 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gold-500 rounded-full">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-serif font-semibold">Lumière Concierge</h3>
            <p className="text-xs text-stone-400">Powered by Gemini AI</p>
          </div>
        </div>
        <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="h-96 overflow-y-auto p-4 bg-stone-50 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-stone-200' : 'bg-gold-100'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Gem size={14} className="text-gold-600" />}
              </div>
              <div className={`p-3 rounded-lg text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-stone-900 text-white rounded-tr-none' 
                  : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center">
                <Gem size={14} className="text-gold-600" />
              </div>
              <div className="bg-white p-3 rounded-lg rounded-tl-none border border-stone-100 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-stone-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask for a recommendation..."
          className="flex-1 bg-stone-50 border border-stone-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="w-10 h-10 rounded-full bg-gold-500 text-white flex items-center justify-center hover:bg-gold-600 disabled:opacity-50 disabled:hover:bg-gold-500 transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};