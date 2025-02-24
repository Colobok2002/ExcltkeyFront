import { useEffect } from 'react'
import LoginPage from './app/login/page'
import { NetworkChecker } from './utils/NetworkChecker'

function App() {
  useEffect(() => {
    NetworkChecker()
  }, [])

  return (
    <>
      <LoginPage />
    </>
  )
}

export default App
