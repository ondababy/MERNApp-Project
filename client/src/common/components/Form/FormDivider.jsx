import { cn } from '@common/lib/utils'
import React from 'react'

export default function FormDivider({ label = '', outerStyle = '' }) {
  return (
    <div className={outerStyle}>
      <div className="divider">
        {label}
      </div>
    </div>
  )
}
