import { useState, useEffect, useRef } from 'react'

const CHECK_INTERVAL_MS = 10 * 60 * 1000 // 10 Minuten

async function fetchVersion() {
  const res = await fetch(`${import.meta.env.BASE_URL}version.json?t=${Date.now()}`)
  if (!res.ok) throw new Error('version fetch failed')
  const data = await res.json()
  return data.version
}

export function useVersionCheck() {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const initialVersion = useRef(null)

  useEffect(() => {
    let cancelled = false

    const check = async () => {
      try {
        const version = await fetchVersion()
        if (cancelled) return

        if (initialVersion.current === null) {
          initialVersion.current = version
        } else if (version !== initialVersion.current && version !== 'dev') {
          setUpdateAvailable(true)
        }
      } catch {}
    }

    check()
    const timer = setInterval(check, CHECK_INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [])

  return updateAvailable
}
