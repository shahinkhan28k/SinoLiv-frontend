import React, { useState } from 'react';
import { Radio, ExternalLink, Power, Youtube, Facebook, Instagram, Twitch } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface Stream {
  id: string;
  title: string;
  platform: 'youtube' | 'facebook' | 'instagram' | 'twitch';
  status: 'live' | 'stopped';
  startTime: string;
}

export default function LivePage() {
  const [streams, setStreams] = useState<Stream[]>([]);

  const stopStream = (id: string) => {
    if (confirm('Are you sure you want to stop this stream?')) {
      setStreams(streams.filter(s => s.id !== id));
    }
  };

  const platformIcons = {
    youtube: Youtube,
    facebook: Facebook,
    instagram: Instagram,
    twitch: Twitch,
  };

  return (
    <div className="space-y-8 pb-24 md:pb-8">
      <header>
        <h2 className="text-3xl font-bold">Active Streams</h2>
        <p className="text-gray-500 mt-1">Monitor and manage your broadcasts in real-time.</p>
      </header>

      {streams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {streams.map((stream) => {
            const Icon = platformIcons[stream.platform];
            return (
              <motion.div 
                layout
                key={stream.id}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full flex items-center gap-1.5 uppercase tracking-widest border border-green-100">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      Live
                    </div>
                    <div className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-widest border border-gray-100">
                      {stream.platform}
                    </div>
                  </div>
                  <Icon className="text-gray-300" size={24} />
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{stream.title}</h3>
                <p className="text-sm text-gray-400 mb-8 flex items-center gap-1.5">
                  Started {stream.startTime}
                </p>

                <div className="flex gap-3">
                  <a 
                    href="#" 
                    className="flex-1 px-4 py-3 bg-gray-50 text-gray-700 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-all text-sm"
                  >
                    <ExternalLink size={16} /> Open Video
                  </a>
                  <button 
                    onClick={() => stopStream(stream.id)}
                    className="flex-1 px-4 py-3 bg-red-50 text-red-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 transition-all text-sm"
                  >
                    <Power size={16} /> Stop Stream
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white p-20 rounded-3xl border border-gray-100 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
            <Radio size={40} />
          </div>
          <h3 className="text-xl font-bold mb-2">No active streams</h3>
          <p className="text-gray-400 mb-8 max-w-sm">Launch your first stream from the Stream Setup page to see it here.</p>
          <a href="/stream" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all">
            Start Streaming
          </a>
        </div>
      )}
    </div>
  );
}
