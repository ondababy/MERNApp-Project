"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@common/components/ui/input-otp"

export function InputOTPForm({ otp, onChange = () => { } }) {
  const [value, setValue] = React.useState("")
  const handleChange = (value) => {
    setValue(value)
    onChange(value)
  }

  React.useEffect(() => {
    setValue(otp)
  }, [otp])


  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={handleChange}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-sm">
        Enter your one-time password.
      </div>
    </div>
  )
}
