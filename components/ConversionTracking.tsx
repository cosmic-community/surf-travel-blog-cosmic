'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ConversionTracking() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: pathname,
      })
    }

    // Track scroll depth for engagement
    let maxScroll = 0
    const trackScrollDepth = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollPercentage > maxScroll && scrollPercentage % 25 === 0) {
        maxScroll = scrollPercentage
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'scroll_depth', {
            percent: scrollPercentage,
            page: pathname
          })
        }
      }
    }

    window.addEventListener('scroll', trackScrollDepth, { passive: true })
    return () => window.removeEventListener('scroll', trackScrollDepth)
  }, [pathname])

  return null
}