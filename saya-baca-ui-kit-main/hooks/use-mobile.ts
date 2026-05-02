import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Set initial without calling setState synchronously inside the effect if possible, 
    // but the pattern usually is: setIsMobile(mql.matches)
    // we can do it via a function
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    
    // Use queueMicrotask to avoid React warning about sync set state in effect
    queueMicrotask(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    })
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
