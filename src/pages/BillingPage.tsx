import React, { useState } from 'react';
import { CreditCard, Check, ShieldCheck, Zap, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/contexts/AuthContext';

import { plans } from '@/src/data/plans';

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [selectedSlots, setSelectedSlots] = useState(3);

  const getPriceModifier = () => {
    if (billingCycle === 'yearly') return 0.8; // 20% off
    if (billingCycle === 'weekly') return 0.3; // Approx price for a week
    return 1;
  };

  const { user, updatePlan } = useAuth();

  const handleChoosePlan = (planId: string) => {
    updatePlan(planId);
    alert(`Successfully upgraded to ${plans.find(p => p.id === planId)?.name} plan! Your new limits are now active.`);
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 md:pb-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Billing & Subscription</h2>
        <p className="text-gray-500 mt-1">Manage your plan and streaming capacity.</p>
      </header>

      {/* Active Subscription */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-3xl text-white shadow-xl shadow-blue-100 mb-12 relative overflow-hidden"
      >
        <Zap className="absolute -right-8 -top-8 text-white/10 size-48 rotate-12" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-blue-100 text-sm font-bold uppercase tracking-widest mb-2">
            <Star size={14} fill="currentColor" /> Active Plan
          </div>
          <h3 className="text-3xl font-bold mb-6">Professional Monthly</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              <span className="text-sm opacity-80 mr-2">Streaming Slots:</span>
              <span className="font-bold">3 Active</span>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              <span className="text-sm opacity-80 mr-2">Next Billing:</span>
              <span className="font-bold">Oct 12, 2024</span>
            </div>
          </div>
          <div className="mt-10 flex gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all">
              Change Plan
            </button>
            <button className="px-6 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all">
              Restore Subscription
            </button>
          </div>
        </div>
      </motion.div>

      {/* Slots Selector */}
      <section className="mb-16">
        <h3 className="text-xl font-bold mb-6">How many streams do you need?</h3>
        <div className="flex gap-4">
          {[1, 2, 5, 10].map(n => (
            <button
              key={n}
              onClick={() => setSelectedSlots(n)}
              className={cn(
                "flex-1 py-4 rounded-2xl border-2 font-bold transition-all",
                selectedSlots === n 
                  ? "border-blue-600 bg-blue-50 text-blue-600" 
                  : "border-gray-50 bg-white text-gray-500 hover:border-gray-200"
              )}
            >
              {n} {n === 1 ? 'Slot' : 'Slots'}
            </button>
          ))}
        </div>
      </section>

      {/* Cycle Selector */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-100 p-1 rounded-2xl flex gap-1">
          {['weekly', 'monthly', 'yearly'].map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle as any)}
              className={cn(
                "px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all",
                billingCycle === cycle ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              {cycle}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className={cn(
            "bg-white p-8 rounded-3xl border border-gray-100 flex flex-col relative",
            plan.badge && "border-blue-200 ring-4 ring-blue-50/50"
          )}>
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {plan.badge}
              </div>
            )}
            <h4 className="text-lg font-bold mb-4">{plan.name}</h4>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold">${Math.round(plan.price * getPriceModifier())}</span>
              <span className="text-gray-400 text-sm">/{billingCycle.replace('ly', '')}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-2 text-sm text-gray-600 font-medium">
                <Check size={16} className="text-green-500 mt-0.5 shrink-0" /> {plan.slots} Streaming Slots
              </li>
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-500">
                  <Check size={16} className="text-green-500 mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleChoosePlan(plan.id)}
              className={cn(
                "w-full py-4 rounded-xl font-bold transition-all",
                plan.badge ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              )}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
