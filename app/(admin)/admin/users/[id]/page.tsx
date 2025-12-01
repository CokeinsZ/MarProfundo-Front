'use client';

import UserDetailView from '@/components/organisms/userDetailView';
import { use } from 'react';

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  return <UserDetailView userId={id} />;
}
