import React from 'react'

export function Card({ children, className, ...props }) {
  return (
    <div 
      className={`bg-card text-card-foreground rounded-lg border shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

// Example usage
export default function Component() {
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold mb-2">Example Card</h2>
          <p>This is an example of how to use the Card and CardContent components.</p>
        </CardContent>
      </Card>
    </div>
  )
}