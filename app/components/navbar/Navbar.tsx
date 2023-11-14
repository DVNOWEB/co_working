'use client'

import { useState } from 'react'

import Container from '../Container'
import Logo from './Logo'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="fixed w-full bg-transparent z-10">
      <div
        className="
        py-4
      ">
        <Container>
          <div
            className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
          ">
            <Logo isOpen={isOpen} />
            <UserMenu
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              currentUser={currentUser}
            />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
