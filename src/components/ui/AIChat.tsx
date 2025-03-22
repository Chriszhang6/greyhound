'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, Loader2, HelpCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Define message type
interface Message {
  role: 'user' | 'assistant';
  content: string;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Create user message
    const userMessage: Message = { role: 'user', content: input };
    
    // Update message state and clear input
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    
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
          content: 'Sorry, I\'m unable to answer your question at the moment. Please try again later.' 
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
                <h3 className="font-medium text-white">Greyhound Assistant</h3>
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
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
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
                      <span className="font-medium flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                        Greyhound Assistant
                      </span>
                    )}
                  </div>
                  
                  <div
                    className={`inline-block max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                      message.role === 'user'
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                    }`}
                  >
                    {message.role === 'user' ? (
                      message.content
                    ) : (
                      <div className="prose prose-sm max-w-none text-gray-800 markdown-content text-sm">
                        <ReactMarkdown
                          components={{
                            // Customize styling for markdown elements
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                            li: ({node, ...props}) => <li className="mb-1" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                            em: ({node, ...props}) => <em className="italic" {...props} />,
                            h1: ({node, ...props}) => <h1 className="text-base font-bold mb-2" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-sm font-bold mb-2" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-xs font-bold mb-1" {...props} />,
                            a: ({node, ...props}) => <a className="text-gray-600 underline" {...props} />
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mb-4 text-left">
                  <div className="flex items-center text-xs text-gray-500 mb-1 ml-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                    <span className="font-medium text-gray-700">Greyhound Assistant</span>
                  </div>
                  <div className="inline-block rounded-lg px-3 py-2 bg-white border border-gray-200 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sample questions */}
            {messages.length <= 2 && (
              <div className="bg-gray-100 p-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2 flex items-center">
                  <HelpCircle size={14} className="mr-1" />
                  <span>Try asking:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((question, index) => (
                    <button 
                      key={index}
                      onClick={() => askSampleQuestion(question)}
                      className="text-xs bg-white text-gray-600 px-2 py-1 rounded-full border border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input Area */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about greyhounds..."
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