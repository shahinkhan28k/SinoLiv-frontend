import React from 'react';
import { PlayCircle, UploadCloud, HelpCircle, Activity, LayoutGrid, Radio } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/src/contexts/AuthContext';
import { plans } from '@/src/data/plans';
import { cn } from '@/src/lib/utils';

export default function DashboardPage() {
  const { user } = useAuth();
  const currentPlan = plans.find(p => p.id === user?.planId) || plans[0];

  return (
    <div className="space-y-8 pb-24 md:pb-8">
      <header>
        <h2 className="text-3xl font-bold">Welcome Back, {user?.name || 'Explorer'}!</h2>
        <p className="text-gray-500 mt-1">
          Active Plan: <span className="text-blue-600 font-bold">{currentPlan.name}</span>
        </p>
      </header>

      {/* Stream Status Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-500">
              <Activity size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">No Active Streams</span>
              </div>
              <h3 className="text-xl font-bold">Streaming Usage: 0 / {currentPlan.slots} Slots</h3>
            </div>
          </div>
          <Link to="/live" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-center">
            Manage All Streams
          </Link>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <section>
        <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard 
            to="/stream"
            icon={<PlayCircle className="text-blue-600" />}
            title="Start New Stream"
            description="Configure and launch a 24/7 looped stream."
            color="bg-blue-50"
          />
          <ActionCard 
            to="/videos"
            icon={<UploadCloud className="text-purple-600" />}
            title="Upload Video"
            description="Add MP4 files to your library for streaming."
            color="bg-purple-50"
          />
          <ActionCard 
            to="/help"
            icon={<HelpCircle className="text-orange-600" />}
            title="Help Center"
            description="Watch our tutorials and read the documentation."
            color="bg-orange-50"
          />
        </div>
      </section>

      {/* Floating Support Button (Mobile only) */}
      <button className="md:hidden fixed right-6 bottom-20 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-gray-600 border border-gray-100 z-40">
        <HelpCircle size={24} />
      </button>
    </div>
  );
}

function ActionCard({ to, icon, title, description, color }: { to: string, icon: React.ReactNode, title: string, description: string, color: string }) {
  return (
    <Link to={to} className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", color)}>
        {icon}
      </div>
      <h4 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </Link>
  );
}
