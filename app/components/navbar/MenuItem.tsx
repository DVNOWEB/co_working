'use client'

interface MenuItemProps {
  onClick: () => void
  label: string
  onCloseMenu: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  onCloseMenu,
}) => {
  const handleClick = () => {
    onClick()
    onCloseMenu()
  }
  return (
    <div
      onClick={handleClick}
      className="px-4 py-3 hover:bg-neutral-100 transition cursor-pointer ">
      {label}
    </div>
  )
}

export default MenuItem