'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, Loader2, HelpCircle, ChevronDown, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Define message type
interface Message {
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m the Greyhound Assistant. How can I help you today? Feel free to ask about greyhound care, adoption, or characteristics.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageAreaRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  useEffect(() => {
    const messageArea = messageAreaRef.current;
    if (!messageArea) return;
    
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = messageArea;
      if (scrollHeight - scrollTop - clientHeight > 30) {
        setUserHasScrolled(true);
      } else {
        setUserHasScrolled(false);
      }
    };
    
    messageArea.addEventListener('scroll', handleScroll);
    return () => messageArea.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (!userHasScrolled || messages[messages.length - 1]?.role === 'user') {
      scrollToBottom();
    }
  }, [messages, userHasScrolled]);
  
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Create user message
    const userMessage: Message = { role: 'user', content: input };
    
    // Update message state and clear input
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    setUserHasScrolled(false);
    
    try {
      // Call our API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });
      
      if (!response.ok) {
        throw new Error('API call failed');
      }
      
      const data = await response.json();
      
      // Add AI response to message list
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: data.response }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          role: 'assistant', 
          content: 'Sorry, I\'m unable to answer your question at the moment. Please try again later.',
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Sample questions to help users get started
  const sampleQuestions = [
    "How long do greyhounds live?",
    "Are greyhounds good with children?",
    "What makes greyhounds unique as pets?",
    "How much exercise do greyhounds need?"
  ];

  const askSampleQuestion = (question: string) => {
    setInput(question);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-[400px] h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Chat Title */}
            <div className="bg-gray-900 text-white p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <h3 className="font-semibold text-[var(--white-solid)] text-lg">Greyhound Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Message Area */}
            <div 
              ref={messageAreaRef}
              className="flex-1 p-4 overflow-y-auto bg-gray-50 relative"
            >
              {/* 问候消息 */}
              {messages.length === 0 && (
                <div className="mb-4 text-center p-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm inline-block">
                    <p className="text-gray-700">Hello! I'm the Greyhound Assistant. How can I help you today? Feel free to ask about greyhound care, adoption, or characteristics.</p>
                  </div>
                  
                  {/* 建议问题 */}
                  <div className="mt-6">
                    <p className="text-gray-500 mb-2 text-xs font-medium">Try asking:</p>
                    <div className="space-y-2">
                      <div onClick={() => setInput("How long do greyhounds live?")} className="cursor-pointer bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                        How long do greyhounds live?
                      </div>
                      <div onClick={() => setInput("Are greyhounds good with children?")} className="cursor-pointer bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                        Are greyhounds good with children?
                      </div>
                      <div onClick={() => setInput("What makes greyhounds unique as pets?")} className="cursor-pointer bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                        What makes greyhounds unique as pets?
                      </div>
                      <div onClick={() => setInput("How much exercise do greyhounds need?")} className="cursor-pointer bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                        How much exercise do greyhounds need?
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 消息列表 */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                >
                  {/* 发送者标识 */}
                  <div className={`flex items-center text-xs text-gray-500 mb-1 ${message.role === 'user' ? 'justify-end mr-1' : 'ml-1'}`}>
                    {message.role === 'user' ? (
                      <span className="font-medium">You</span>
                    ) : (
                      <span className={`font-medium flex items-center ${isLoading && index === messages.length - 1 ? 'text-green-600 animate-pulse' : ''}`}>
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                        Greyhound Assistant
                      </span>
                    )}
                  </div>
                  
                  {/* 消息内容 */}
                  <div
                    className={`inline-block max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                      message.role === 'user'
                        ? 'bg-gray-900 text-white'
                        : message.isError 
                          ? 'bg-red-50 text-gray-800 border border-red-200' 
                          : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                    }`}
                  >
                    {message.isError && (
                      <div className="flex items-center text-red-500 text-xs mb-1">
                        <AlertTriangle size={12} className="mr-1" />
                        Error
                      </div>
                    )}
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="mb-4 text-left">
                  <div className="flex items-center text-xs text-gray-500 mb-1 ml-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                    <span className="font-medium text-green-600 animate-pulse">Greyhound Assistant</span>
                  </div>
                  <div className="inline-block max-w-[75%] rounded-lg px-3 py-2 text-sm bg-white text-gray-800 border border-gray-200 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 滚动到底部的标记 */}
              <div ref={messagesEndRef} />
              
              {/* 回到底部按钮 */}
              {userHasScrolled && messages.length > 2 && (
                <button 
                  onClick={scrollToBottom}
                  className="absolute bottom-4 right-4 bg-gray-900 rounded-full p-2 text-white shadow-lg opacity-80 hover:opacity-100"
                >
                  <ChevronDown size={16} />
                </button>
              )}
            </div>
            
            {/* Input Area */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about greyhounds... (Enter to send, Shift+Enter for new line)"
                  className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className={`p-3 rounded-r-md ${
                    !input.trim() || isLoading
                      ? 'bg-gray-300 text-gray-500'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } transition-colors duration-200`}
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 