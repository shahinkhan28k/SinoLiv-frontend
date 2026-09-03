import React from 'react';
import { User, CreditCard, Gift, HelpCircle, ShieldCheck, FileText, LogOut, ChevronRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '@/src/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto pb-24 md:pb-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-gray-500 mt-1">Manage your account and preferences.</p>
      </header>

      {/* Account Info */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-6"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 text-2xl font-bold">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">{user?.name || 'User Name'}</h3>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
              <Mail size={14} /> {user?.email || 'user@example.com'}
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-50 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-100">
            Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Menu List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="divide-y divide-gray-50">
          <MenuLink to="/settings/billing" icon={<CreditCard size={20} className="text-blue-500" />} label="Billing & Subscription" />
          <MenuLink to="/help" icon={<Gift size={20} className="text-orange-500" />} label="Refer & Earn" />
          <MenuLink to="/help" icon={<HelpCircle size={20} className="text-purple-500" />} label="Help & Support" />
          <MenuLink to="/help" icon={<ShieldCheck size={20} className="text-green-500" />} label="Privacy Policy" />
          <MenuLink to="/help" icon={<FileText size={20} className="text-gray-500" />} label="Terms & Conditions" />
        </div>
      </div>

      <button 
        onClick={handleLogout}
        className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-all"
      >
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
}

function MenuLink({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <Link to={to} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gray-50 rounded-xl">{icon}</div>
        <span className="font-bold text-gray-700">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-300" />
    </Link>
  );
}
