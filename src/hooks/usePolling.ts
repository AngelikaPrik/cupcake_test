import { useEffect, useState } from 'react'

export const usePollingUpdate = (asyncFunc: () => void, interval: number) => {
  const [subscription, setSubscription] = useState<number | null>(null)

  useEffect(() => {
    const id = setInterval(asyncFunc, interval)
    setSubscription(id)
    return () => {
      if (subscription) clearInterval(subscription)
    }
  }, [])
}
