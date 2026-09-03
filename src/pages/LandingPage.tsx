import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Shield, Zap, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

import { plans } from '@/src/data/plans';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <h1 className="font-['Caveat'] text-3xl font-bold text-blue-600">SinoLiv</h1>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-gray-600 font-medium hover:text-blue-600 transition-colors">Login</Link>
          <Link to="/signup" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
        >
          Turn any video into a <span className="text-blue-600">24/7 live stream</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-500 mb-10 leading-relaxed"
        >
          Broadcast pre-recorded content to YouTube, Facebook, and Instagram 
          as a live loop. No streaming hardware needed.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/signup" className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-full hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group">
            Start Free Trial <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#features" className="px-8 py-4 bg-gray-50 text-gray-700 text-lg font-semibold rounded-full hover:bg-gray-100 transition-all">
            See How It Works
          </a>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Zap className="text-blue-600" size={32} />}
            title="Instant Setup"
            description="Upload your video and go live in less than 60 seconds. No OBS required."
          />
          <FeatureCard 
            icon={<Shield className="text-green-500" size={32} />}
            title="24/7 Stability"
            description="Our servers keep your stream running day and night, even if your PC is off."
          />
          <FeatureCard 
            icon={<Globe className="text-purple-500" size={32} />}
            title="Multi-Platform"
            description="Broadcast to YouTube, FB, IG, Twitch, and custom RTMP simultaneously."
          />
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-6 py-24 max-w-7xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-16">Simple, Transparent Pricing</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricePreviewCard 
              key={plan.id}
              plan={plan.name} 
              price={`$${plan.price}`} 
              features={plan.features}
              highlighted={plan.id === 'pro'} 
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-10 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="mb-6">{icon}</div>
      <h4 className="text-xl font-bold mb-4">{title}</h4>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

function PricePreviewCard({ plan, price, features, highlighted = false }: { plan: string, price: string, features: string[], highlighted?: boolean, key?: string }) {
  return (
    <div className={cn(
      "p-10 rounded-3xl border text-left flex flex-col",
      highlighted ? "border-blue-600 ring-4 ring-blue-50 bg-white" : "border-gray-100 bg-gray-50/50"
    )}>
      <h4 className="text-lg font-bold mb-2">{plan}</h4>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-gray-500">/mo</span>
      </div>
      <ul className="space-y-4 mb-10 flex-1">
        {features.slice(0, 4).map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 size={16} className="text-green-500" /> {feature}
          </li>
        ))}
      </ul>
      <Link to="/signup" className={cn(
        "py-4 rounded-xl font-bold text-center transition-all",
        highlighted ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
      )}>
        Choose {plan}
      </Link>
    </div>
  );
}
