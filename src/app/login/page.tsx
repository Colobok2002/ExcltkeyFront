import { LoginForm } from '@/components/authorization/login-form'
import { ModeToggle } from '@/components/mode-toggle'

export default function LoginPage() {
  return (
    <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex justify-end'>
          <ModeToggle />
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
