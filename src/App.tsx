import { useEffect } from 'react'
import LoginPage from './app/login/page'
import { NetworkChecker } from './utils/NetworkChecker'
import { ModeToggle } from './components/mode-toggle'

function App() {
  useEffect(() => {
    NetworkChecker()
  }, [])

  return (
    <>
      <div className='absolute right-4 top-4'>
        <ModeToggle />
      </div>
      <LoginPage />
    </>
  )
}

export default App
