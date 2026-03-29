'use client'

import { useEffect, useState, useRef, type ReactNode } from 'react'

interface RevealTextProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div'
}

export function RevealText({
  children,
  delay = 0,
  className = '',
  as: Component = 'div',
}: RevealTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <Component
      ref={ref as React.RefObject<HTMLElement & HTMLParagraphElement & HTMLHeadingElement & HTMLSpanElement & HTMLDivElement>}
      className={`
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${className}
      `}
    >
      {children}
    </Component>
  )
}
