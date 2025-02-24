import { toast } from 'sonner'

export function NetworkChecker() {
  const handleOnline = () => {
    // setIsOnline(true);
    toast('Вы снова онлайн 🌐')
  }

  const handleOffline = () => {
    // setIsOnline(false);
    toast('Нет подключения к интернету ❌')
  }

  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
}
