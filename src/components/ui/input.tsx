import { cn } from '@/lib/utils'
import * as React from 'react'
import { useState } from "react";
import OtpInput from "react-otp-input";


const _get_input_cls = (className: string | undefined) => {
  // Tw стили для input
  return cn(
    'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    className
  )
}


function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={_get_input_cls(className)}
      {...props}
    />
  )
}

interface InputPhoneProps extends React.ComponentProps<'input'> {
  setLoginValid?: (isValid: boolean) => void;
}


function InputPhone({ className, type, setLoginValid, ...props }: InputPhoneProps) {

  const [value, setValue] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, '');

    if (inputValue.length > 11) {
      inputValue = inputValue.slice(0, 11);
    }

    let formattedValue = '';
    if (inputValue.length > 0) {
      formattedValue += '+7';
      if (inputValue.length == 1 && inputValue != '7') {
        formattedValue += `-(${inputValue}`;
      }
      if (inputValue.length > 1) {
        formattedValue += `-(${inputValue.slice(1, 4)}`;
      }
      if (inputValue.length > 4) {
        formattedValue += `)-${inputValue.slice(4, 7)}`;
      }
      if (inputValue.length > 7) {
        formattedValue += `-${inputValue.slice(7, 9)}`;
      }
      if (inputValue.length > 9) {
        formattedValue += `-${inputValue.slice(9, 11)}`;
      }
    }

    if (setLoginValid) {
      if (inputValue.length == 11) {
        setLoginValid(true)
      } else {
        setLoginValid(false)
      }
    }
    setValue(formattedValue);
  };

  return (
    <Input
      type={type}
      data-slot="input"
      className={_get_input_cls(className)}
      value={value}
      onChange={handleChange}
      placeholder="+7-(999)-999-99-99"
      {...props}
    ></Input>
  );
}


interface InputCodeProps extends React.ComponentProps<'input'> {
  setCode?: (code: string) => void;
}


export default function InputCode({ setCode }: InputCodeProps) {

  const [renderCode, setRenderCode] = useState<string>("");

  const inputStyles = {
    height: 50,
    flex: 1,
    flexGrow: 1,
  };

  return (
    <div style={{ display: "flex", flex: 1, }}>
      <OtpInput
        value={renderCode}
        onChange={(value) => { setRenderCode(value); setCode ? setCode(value) : null }}
        numInputs={6}
        renderInput={(props) => <Input {...props} />}
        inputType="number"
        inputStyle={inputStyles}
        containerStyle={{ "flex": 1, display: "flex", justifyContent: "space-between", gap: 7 }}
      />
    </div>
  );
}

export { Input, InputPhone, InputCode };
