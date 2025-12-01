'use client';

import OrderDetailView from '@/components/organisms/orderDetailView';
import { use } from 'react';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  return <OrderDetailView orderId={id} />;
}
