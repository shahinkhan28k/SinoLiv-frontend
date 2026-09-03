import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Trash2, FileVideo, HardDrive, Info, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/contexts/AuthContext';
import { plans } from '@/src/data/plans';

interface VideoFile {
  id: string;
  name: string;
  size: number; // Size in bytes
  duration: string;
  uploadedAt: number;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  // Load videos from storage
  useEffect(() => {
    const saved = localStorage.getItem(`videos_${user?.id}`);
    if (saved) setVideos(JSON.parse(saved));
  }, [user?.id]);

  // Save videos to storage
  const saveVideos = (updatedVideos: VideoFile[]) => {
    setVideos(updatedVideos);
    localStorage.setItem(`videos_${user?.id}`, JSON.stringify(updatedVideos));
  };

  // Get current plan limits
  const currentPlan = plans.find(p => p.id === user?.planId) || plans[0];
  const storageLimitGB = parseInt(currentPlan.storage);
  const storageLimitBytes = storageLimitGB * 1024 * 1024 * 1024;

  const currentUsageBytes = videos.reduce((acc, v) => acc + v.size, 0);
  const usagePercentage = Math.min((currentUsageBytes / storageLimitBytes) * 100, 100);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('video/mp4')) {
      alert('Please upload .mp4 files only.');
      return;
    }

    if (currentUsageBytes + file.size > storageLimitBytes) {
      alert(`Storage limit exceeded! Your ${currentPlan.name} plan only allows ${currentPlan.storage}. Upgrade your plan for more storage.`);
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newVideo: VideoFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        duration: '00:00', // In a real app, we'd extract duration
        uploadedAt: Date.now(),
      };
      
      saveVideos([newVideo, ...videos]);
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1500);
  };

  const deleteVideo = (id: string) => {
    if (confirm('Delete this video permanently?')) {
      saveVideos(videos.filter(v => v.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-24 md:pb-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Video Library</h2>
          <p className="text-gray-500 mt-1">Manage your uploaded content for streaming.</p>
        </div>
        <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 flex items-center gap-4">
          <HardDrive className="text-blue-600" size={20} />
          <div>
            <div className="text-xs text-gray-500 mb-1">
              Storage: {formatSize(currentUsageBytes)} / {currentPlan.storage}
            </div>
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-500",
                  usagePercentage > 90 ? "bg-red-500" : "bg-blue-600"
                )} 
                style={{ width: `${usagePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Upload Zone */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="video/mp4" 
        className="hidden" 
      />
      
      <motion.div 
        whileTap={{ scale: 0.99 }}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed border-gray-200 rounded-3xl p-12 bg-white flex flex-col items-center justify-center text-center transition-all cursor-pointer group",
          isUploading ? "opacity-50 cursor-not-allowed" : "hover:border-blue-400 hover:bg-blue-50/30"
        )}
      >
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
          {isUploading ? <Loader2 className="animate-spin" size={32} /> : <UploadCloud size={32} />}
        </div>
        <h3 className="text-xl font-bold mb-2">
          {isUploading ? "Uploading video..." : "Click to select MP4 from your device"}
        </h3>
        <p className="text-gray-500 max-w-xs mb-4">
          Current Plan: <span className="font-bold text-blue-600">{currentPlan.name}</span> ({currentPlan.storage} limit)
        </p>
        <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
          <Info size={14} /> Only .mp4 files supported
        </div>
      </motion.div>

      {/* Video List */}
      <section>
        <h3 className="text-xl font-bold mb-6">Your Videos ({videos.length})</h3>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {videos.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {videos.map((video) => (
                <div key={video.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 font-bold">
                      {video.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{video.name}</h4>
                      <div className="text-sm text-gray-500 flex items-center gap-3">
                        <span>{formatSize(video.size)}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{new Date(video.uploadedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteVideo(video.id)}
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-400">
              <FileVideo className="mx-auto mb-4 opacity-20" size={48} />
              <p>No videos uploaded yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
