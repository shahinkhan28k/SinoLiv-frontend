export interface Plan {
  id: string;
  name: string;
  price: number;
  slots: number;
  storage: string;
  quality: string;
  features: string[];
  badge?: string;
}

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9,
    slots: 1,
    storage: '5GB Storage',
    quality: '720p HD',
    features: ['1 Live Slot', '5GB Cloud Storage', '720p HD Quality', '24/7 Looping', 'Standard Support'],
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 29,
    slots: 3,
    storage: '25GB Storage',
    quality: '1080p Full HD',
    features: ['3 Live Slots', '25GB Cloud Storage', '1080p Full HD', '24/7 Looping', 'Priority Support', 'No Watermark'],
    badge: 'Best Value',
  },
  {
    id: 'biz',
    name: 'Business',
    price: 89,
    slots: 10,
    storage: '100GB Storage',
    quality: '4K Ultra HD',
    features: ['10 Live Slots', '100GB Cloud Storage', '4K Ultra HD', '24/7 Looping', 'Dedicated Account Manager', 'Custom RTMP Pull'],
  },
];
