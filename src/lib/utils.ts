import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility function to create conditional classes
 */
export function conditionalClass(
  baseClasses: string,
  conditionalClasses: Record<string, boolean>
): string {
  const classes = [baseClasses]
  
  Object.entries(conditionalClasses).forEach(([className, condition]) => {
    if (condition) {
      classes.push(className)
    }
  })
  
  return cn(...classes)
}

/**
 * Utility function to create responsive classes
 */
export function responsiveClass(
  baseClasses: string,
  responsiveClasses: Record<string, string>
): string {
  const classes = [baseClasses]
  
  Object.entries(responsiveClasses).forEach(([breakpoint, className]) => {
    if (breakpoint === 'base') {
      classes.push(className)
    } else {
      classes.push(`${breakpoint}:${className}`)
    }
  })
  
  return cn(...classes)
} 