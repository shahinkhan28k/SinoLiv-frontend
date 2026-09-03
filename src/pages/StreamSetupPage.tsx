import React, { useState } from 'react';
import { Youtube, Facebook, Instagram, Twitch, Globe, Eye, EyeOff, Clipboard, Play, Check, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const platforms = [
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
  { id: 'twitch', name: 'Twitch', icon: Twitch, color: 'text-purple-600' },
  { id: 'custom', name: 'Custom RTMP', icon: Globe, color: 'text-gray-600' },
];

export default function StreamSetupPage() {
  const [platform, setPlatform] = useState(platforms[0]);
  const [showKey, setShowKey] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoLive = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Stream started successfully!');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto pb-24 md:pb-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Setup New Stream</h2>
        <p className="text-gray-500 mt-1">Configure your broadcast settings and go live.</p>
      </header>

      <div className="space-y-6">
        {/* Platform Selection */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Target Platform</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatform(p)}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2",
                  platform.id === p.id 
                    ? "border-blue-600 bg-blue-50/50" 
                    : "border-gray-50 hover:border-gray-200"
                )}
              >
                <p.icon className={cn("size-6", p.color)} />
                <span className="text-xs font-bold">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stream Details */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Stream Title</label>
            <input 
              type="text" 
              placeholder="E.g. My 24/7 Looped Music Channel"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
            />
          </div>

          {platform.id === 'custom' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">RTMP URL</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="rtmp://custom.server/live"
                  className="w-full pl-6 pr-14 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                  <Clipboard size={18} />
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Stream Key</label>
            <div className="relative">
              <input 
                type={showKey ? "text" : "password"} 
                placeholder="Paste your stream key here"
                className="w-full pl-6 pr-14 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <button 
                onClick={() => setShowKey(!showKey)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Video Picker */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Select Video</label>
          <button className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-blue-200 transition-all text-left">
            <span className="text-gray-600">Select from library...</span>
            <ChevronDown size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Loop Toggle */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <h4 className="font-bold">Loop 24/7</h4>
            <p className="text-xs text-gray-500">Video will restart automatically after it ends.</p>
          </div>
          <button 
            onClick={() => setIsLooping(!isLooping)}
            className={cn(
              "w-12 h-6 rounded-full relative transition-colors",
              isLooping ? "bg-blue-600" : "bg-gray-200"
            )}
          >
            <div className={cn(
              "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
              isLooping ? "translate-x-7" : "translate-x-1"
            )}></div>
          </button>
        </div>

        {/* Go Live Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleGoLive}
          disabled={isLoading}
          className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-full shadow-xl shadow-blue-200 hover:shadow-blue-300 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <Play fill="currentColor" size={20} /> Go Live Now
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
