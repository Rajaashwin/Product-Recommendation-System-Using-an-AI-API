'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Send, Image as ImageIcon, MessageSquare } from 'lucide-react';

const API_BASE_URL = 'https://web-production-d4489.up.railway.app';

export default function VizzyChatDemo() {
  const [mode, setMode] = useState<'chat' | 'image'>('chat');
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const botMessage = data.response || 'Unable to process your message.';
      setMessages((prev) => [...prev, { role: 'assistant', content: botMessage }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async () => {
    if (!input.trim()) return;

    const prompt = input;
    setInput('');
    setLoading(true);
    setGeneratedImage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/generate-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.image_url) {
        setGeneratedImage(data.image_url);
      } else {
        setGeneratedImage('error');
      }
    } catch (error) {
      setGeneratedImage('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Vizzy Chat
          </h1>
          <p className="text-slate-400">AI-powered chat and image generation</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="chat" className="w-full" onValueChange={(v) => setMode(v as 'chat' | 'image')}>
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Generate Image
            </TabsTrigger>
          </TabsList>

          {/* Chat Mode */}
          <TabsContent value="chat" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700 p-4 h-96 overflow-y-auto">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-500">
                    <p>Start a conversation...</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-700 text-slate-100'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 px-4 py-2 rounded-lg flex items-center gap-2 text-slate-100">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Thinking...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </Card>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ask me something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                disabled={loading}
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
              />
              <Button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Image Generation Mode */}
          <TabsContent value="image" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700 p-8">
              {generatedImage === null ? (
                <div className="h-96 flex items-center justify-center text-slate-500">
                  <p>Enter a prompt and generate an image</p>
                </div>
              ) : generatedImage === 'error' ? (
                <div className="h-96 flex items-center justify-center text-red-400">
                  <p>Failed to generate image. Please try again.</p>
                </div>
              ) : (
                <div className="relative w-full h-96 rounded-lg overflow-hidden bg-slate-900">
                  <img
                    src={generatedImage}
                    alt="Generated"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </Card>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Describe an image..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && generateImage()}
                disabled={loading}
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
              />
              <Button
                onClick={generateImage}
                disabled={loading || !input.trim()}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ImageIcon className="w-4 h-4" />
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="bg-slate-800 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-teal-400 mb-2">About Vizzy Chat</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Vizzy Chat is a full-stack AI application featuring dual-mode chat and image generation capabilities. 
            It leverages OpenRouter for intelligent conversations and HuggingFace for high-quality image synthesis. 
            Built with React, Vite, and FastAPI, it demonstrates modern full-stack development with production-ready deployment.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-teal-400 font-semibold text-sm">Tech Stack</p>
              <p className="text-slate-400 text-xs">React, Vite, FastAPI, Python, OpenRouter, HuggingFace</p>
            </div>
            <div>
              <p className="text-teal-400 font-semibold text-sm">Deployment</p>
              <p className="text-slate-400 text-xs">Railway (Backend), GitHub Pages (Frontend)</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
