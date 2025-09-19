// app/(webpage)/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/home')
  }, [router])

  return (
    <div>
      {/* Puedes mostrar un mensaje de carga o un spinner aquí si lo deseas */}
    </div>
  )
}