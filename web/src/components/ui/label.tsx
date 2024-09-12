import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps extends ComponentProps<'label'> {
  htmlFor: string
}

export function Label({ htmlFor, ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={twMerge(
        'font-medium text-sm tracking-tight leading-normal',
        props.className
      )}
    />
  )
}
