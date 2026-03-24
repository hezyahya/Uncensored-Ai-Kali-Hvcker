// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Terminal, Shield, Cpu, MousePointer2, Monitor, Settings } from 'lucide-react';

export default function KaliAgentDashboard() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState('agent'); // 'agent' or 'space'
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!prompt) return;
    setLoading(true);
    const newMessages = [...messages, { role: 'user', content: prompt }];
    setMessages(newMessages);
    setPrompt('');

    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, mode }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let currentAgentMessage = { role: 'agent', content: '', thought: '' };
    setMessages([...newMessages, currentAgentMessage]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder.decode(value);
      
      // Basic parsing of thoughts vs content
      if (text.includes('<thought>')) {
        currentAgentMessage.thought += text;
      } else {
        currentAgentMessage.content += text;
      }
      
      setMessages([...newMessages, { ...currentAgentMessage }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-100 font-mono">
      {/* Sidebar: Agent Reasoning & Chat */}
      <aside className="w-1/3 border-r border-neutral-800 flex flex-col">
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h1 className="text-lg font-bold">DOLPHIN-KALI</h1>
          </div>
          <div className="flex gap-1">
            <Badge 
              variant={mode === 'agent' ? 'default' : 'secondary'} 
              className={`cursor-pointer text-[8px] ${mode === 'agent' ? 'bg-cyan-600' : ''}`} 
              onClick={() => setMode('agent')}
            >
              AGENT
            </Badge>
            <Badge 
              variant={mode === 'space' ? 'outline' : 'secondary'} 
              className={`cursor-pointer text-[8px] ${mode === 'space' ? 'border-blue-500 text-blue-500' : ''}`}
              onClick={() => setMode('space')}
            >
              LIVE SPACE
            </Badge>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-neutral-900 ml-8' : 'bg-neutral-800 mr-8 border-l-4 border-blue-500'}`}>
              {m.thought && (
                <div className="text-xs text-neutral-500 italic mb-2 p-2 bg-neutral-900/50 rounded">
                  {m.thought.replace(/<\/?thought>/g, '')}
                </div>
              )}
              <div className="text-sm">{m.content}</div>
            </div>
          ))}
          {loading && <div className="text-neutral-500 text-xs animate-pulse">Agent is thinking...</div>}
        </ScrollArea>

        <div className="p-4 border-t border-neutral-800 bg-neutral-900/50">
          <div className="flex gap-2">
            <Input 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)} 
              placeholder="Execute nmap scan... / Open browser..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="bg-neutral-800 border-neutral-700 text-xs h-10"
            />
            <Button onClick={sendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700 h-10">
              SEND
            </Button>
          </div>
        </div>
      </aside>

      {/* Main: Kali Desktop Canvas */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="p-2 border-b border-neutral-800 flex items-center gap-4 bg-neutral-900/30">
          <div className="flex items-center gap-1 text-[10px] text-neutral-400">
            <Monitor className="w-3 h-3" />
            <span>DISPLAY :1 (1280x800)</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-neutral-400">
            <Cpu className="w-3 h-3" />
            <span>2 vCPU | 4GB RAM</span>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="ghost" size="icon" className="w-6 h-6"><Terminal className="w-3 h-3"/></Button>
            <Button variant="ghost" size="icon" className="w-6 h-6"><MousePointer2 className="w-3 h-3"/></Button>
            <Button variant="ghost" size="icon" className="w-6 h-6"><Settings className="w-3 h-3"/></Button>
          </div>
        </header>

        <div className="flex-1 bg-neutral-900 relative flex items-center justify-center overflow-auto p-4">
          <div className="aspect-video w-full max-w-5xl bg-black shadow-2xl rounded-lg border border-neutral-800 overflow-hidden relative">
            {mode === 'space' ? (
              <iframe 
                src="https://hezxss-dolphin-ai.hf.space" 
                className="w-full h-full border-0" 
                title="Dolphin AI Space"
              />
            ) : (
              <>
                {/* VNC Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-neutral-700">
                  <div className="text-center">
                    <Monitor className="w-20 h-20 mx-auto opacity-20" />
                    <p className="mt-4 text-xs font-bold tracking-widest opacity-30 text-cyan-500">KALI DESKTOP (E2B)</p>
                    <p className="mt-2 text-[8px] opacity-20 italic">Controlled by Dolphin Uncensored AI</p>
                  </div>
                </div>
                {screenshot && <img src={`data:image/png;base64,${screenshot}`} className="w-full h-full object-contain" alt="Kali Desktop" />}
              </>
            )}
          </div>
        </div>

        {/* Floating Tool Tray */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-neutral-800/80 backdrop-blur-md border border-neutral-700 p-2 rounded-2xl flex gap-2 shadow-2xl">
          {['Nmap', 'Metasploit', 'Wireshark', 'Burp', 'Terminal', 'Browser'].map(tool => (
            <Button key={tool} variant="ghost" size="sm" className="text-[10px] h-8 px-3 hover:bg-neutral-700/50">{tool}</Button>
          ))}
        </div>
      </main>
    </div>
  );
}
