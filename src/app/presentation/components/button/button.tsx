import { useState } from 'react'

type ButtonProps = {
  isDisabled: boolean
  onClick: () => void
  text: string
  className: string
  backgroundColor: string
  hoverColor: string
  stroke?: string
}

export const Button: React.FC<ButtonProps> = ({
  isDisabled,
  onClick,
  text,
  className,
  backgroundColor,
  hoverColor,
  stroke,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isDisabled ? "#e7e7e7" : isHovered ? hoverColor : backgroundColor,
        borderColor: isDisabled ? "" : stroke,
      }}
      className={className}
      data-disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </div>
  )
}
