import React, { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  author: 'bot' | 'user';
  text: string;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // greet on first mount
    setMessages([{ id: 'm1', author: 'bot', text: 'Hi! How can I help you?' }]);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: `u-${Date.now()}`, author: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    // simple echo bot
    setTimeout(() => {
      setMessages(prev => [...prev, { id: `b-${Date.now()}`, author: 'bot', text: 'Hi! 👋' }]);
    }, 400);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="w-80 h-96 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden mb-3">
          <div className="bg-black/60 px-3 py-2 text-white font-bold flex items-center justify-between">
            <span>Assistant</span>
            <button onClick={() => setOpen(false)} className="text-gray-300 hover:text-white">✕</button>
          </div>
          <div ref={listRef} className="flex-1 overflow-auto p-3 space-y-2">
            {messages.map(m => (
              <div key={m.id} className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${m.author === 'bot' ? 'bg-gray-800 text-gray-100 self-start' : 'bg-teal-600 text-white self-end ml-auto'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-gray-800 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Type a message" className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg outline-none" />
            <button onClick={send} className="bg-teal-600 hover:bg-teal-700 text-white px-3 rounded-lg font-bold">Send</button>
          </div>
        </div>
      )}

      <button onClick={() => setOpen(v => !v)} className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-green-500 text-white font-black shadow-lg hover:shadow-teal-500/40">
        💬
      </button>
    </div>
  );
}


