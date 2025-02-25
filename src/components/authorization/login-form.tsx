import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import InputCode, { InputPhone } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useState } from 'react'




export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {

  const [loginValid, setLoginValid] = useState<boolean>(false)
  // const [sendCaptcha, setSendCaptcha] = useState<boolean>(true)
  const [sendCode, setSendCode] = useState<boolean>(false)

  const [_, setCode] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Тут будет логика с бэка
    // Возможны два варианта 
    // 1 успешно запросит код его нужно принять и опять отправить запрос на бэк
    // 2 Понадобится капча , я отдам картинку и id капчи ее нужно будет скинуть на бэк и если успешно принять код
    
    e.preventDefault();

    // const form = e.currentTarget;

    // const phone = form.elements.namedItem('phone') as HTMLInputElement;
    // const captcha = form.elements.namedItem('captcha') as HTMLInputElement | null;

    // console.log(phone.value);

    setSendCode(true)


    toast('Упс нужно пойти капчу');
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <h1 className='text-xl font-bold'>Добро пожаловать</h1>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-3'>
              <Label htmlFor='login'>Номер телефона</Label>
              <InputPhone
                id='phone'
                type='phone'
                required
                setLoginValid={setLoginValid}
              />
            </div>
            {sendCode && (
              <div className='grid gap-3'>
                <Label htmlFor='login'>Полученный код</Label>
                <InputCode setCode={setCode} />
              </div>
            )}
            <Button type='submit' className='w-full' disabled={!loginValid}>
              Login
            </Button>
          </div>
        </div>
      </form>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        Нажимая «Продолжить», вы соглашаетесь с нашими <a href='#'>Условиями обслуживания</a>{' '}
        и <a href='#'>Политикой конфиденциальности</a>.
      </div>
    </div>
  )
}
