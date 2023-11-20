'use client'
import MenuItem from './MenuItem'

import { FaUser, FaHome} from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { ImUserTie } from 'react-icons/im'

import { useCallback, useState } from 'react'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRentModal from '@/app/hooks/useRentModal'
import { SafeUser } from '@/app/types'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { MdAccountTree } from 'react-icons/md'


interface UserMenuProps {
  currentUser?: SafeUser | null
  setIsOpen?: (value: boolean) => void
  isOpen?: boolean
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
}) => {
  const router = useRouter()
  const [showMenuButton, setShowMenuButton] = useState(true)
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
    setShowMenuButton((value) => !value)
  }, [setIsOpen])

  const openLoginModal = () => {
    loginModal.onOpen()
  }

  const onRentals = useCallback(() => {
    if(!currentUser){
      return loginModal.onOpen()
    }

    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {showMenuButton ? (
          <div
            onClick={toggleOpen}
            className="p-4 md:hidden flex flex-row items-center gap-3 rounded-full cursor-pointe ">
            <AiOutlineMenu className="  bg-gray-100  hover:bg-gray-200 transition text-black-400 text-4xl cursor-pointer border-[1px] border-black-400 rounded-full p-1.5" />
          </div>
        ) : (
          <div
            onClick={toggleOpen}
            className=" p-4 md:hidden flex flex-row items-center gap-3 rounded-full cursor-pointer ">
            <AiOutlineClose className=" bg-gray-100 hover-bg-gray-200 transition text-black-400 text-4xl cursor-pointer border-[1px] border-black-400 rounded-full p-1.5 z-100 " />
          </div>
        )}
        <div className=" hidden md:block text-sm py-3 px-1 rounded-full hover-bg-neutral-100 transition cursor-pointer ">
          {currentUser ? (
            // If the user is signed in, show the "Account" and "Logout" buttons on desktop
            <>
              <div className=" flex flex-row items-left gap-2">
                <div>
                  <MdAccountTree
                    onClick={() => router.push('/reservations')}
                    label="Owner Dashboard"
                    className=" bg-gray-100 hover-bg-gray-200 transition text-black-400 text-4xl cursor-pointer border-[1px] border-black-400 rounded-full p-1.5 "
                  />
                </div>

                <div className=" flex flex-row items-center ">
                  <ImUserTie
                    onClick={onRentals}
                    label="Property owner"
                    className=" bg-gray-100 hover-bg-gray-200 transition text-black-400 text-4xl cursor-pointer border-[1px] border-black-400 rounded-full p-1.5 "
                  />
                </div>

                <div className=" flex flex-row items-center ">
                  <FaUser
                    onClick={() => router.push('/account')}
                    label="Account"
                    className=" bg-gray-100 hover-bg-gray-200 transition text-black-400 text-4xl cursor-pointer border-[1px] border-black-400 rounded-full p-1.5 "
                  />
                </div>

                <div className=" flex flex-row items-center">
                  <FiLogOut
                    onClick={() => signOut()}
                    label="Logout"
                    className=" bg-gray-100 hover-bg-gray-200 transition text-black-400 text-4xl cursor-pointer border-[1px] border-black-400 rounded-full p-1.5 "
                  />
                </div>
              </div>
            </>
          ) : (
            // If the user is not signed in, show the "Account" button
            <FaUser
              onClick={openLoginModal}
              label="Login"
              className=" bg-gray-100 text-black-400 text-4xl cursor-pointer border-[1px] border-black-400 rounded-full p-1.5 "
            />
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="fixed inset-0 w-full h-screen bg-white overflow-hidden text-sm py-4 px-3">
          <div className="flex flex-col cursor-pointer ">
            <div
              onClick={toggleOpen}
              className="p-4 md:hidden flex flex-row items-center justify-end gap-3 rounded-full cursor-pointer ">
              {showMenuButton ? (
                <AiOutlineMenu className=" hover:bg-gray-200 transition text-black-400 text-4xl cursor-pointer border-[1px] border-black-400 rounded-full p-1.5" />
              ) : (
                <AiOutlineClose className=" hover:bg-gray-200 transition text-black-400 text-4xl cursor-pointer border-[1px] border-black-400 rounded-full p-1.5" />
              )}
            </div>

            <hr className="border-[1px] border-black-400" />
            <div className="flex flex-col items-start space-y-1 py-2">
              <div className="flex flex-row w-full  items-center px-2 hover:bg-gray-200 transition">
                <FaHome
                  onClick={() => router.push('/')}
                  label="Home"
                  onCloseMenu={toggleOpen}
                  className="text-black-400 text-4xl cursor-pointer border-black-400 rounded-full p-1.5"
                />
                <MenuItem
                  onClick={() => router.push('/')}
                  label="Home"
                  onCloseMenu={toggleOpen}
                />
              </div>

              {currentUser ? (
                <div className="flex flex-col items-left w-full">
                  <div className="flex flex-row items-center px-2 hover:bg-gray-200 transition">
                    <MdAccountTree
                      onClick={() => router.push('/reservations')}
                      label="Owner Dashboard"
                      onCloseMenu={toggleOpen}
                      className="text-black-400 text-4xl cursor-pointer border-black-400 rounded-full p-1.5"
                    />
                    <MenuItem
                      onClick={() => router.push('/reservations')}
                      label="Owner Dashboard"
                      onCloseMenu={toggleOpen}
                    />
                  </div>

                  <div className="flex flex-row items-center px-2 hover:bg-gray-200 transition">
                    <ImUserTie
                      onClick={onRentals}
                      label="Property owner"
                      onCloseMenu={toggleOpen}
                      className="text-black-400 text-4xl cursor-pointer border-black-400 rounded-full p-1.5"
                    />
                    <MenuItem
                      onClick={onRentals}
                      label="
                   Property owner"
                      onCloseMenu={toggleOpen}
                    />
                  </div>

                  <div className="flex flex-row items-center px-2 hover:bg-gray-200 transition">
                    <FaUser
                      onClick={() => router.push('/account')}
                      label="Account"
                      onCloseMenu={toggleOpen}
                      className="text-black-400 text-4xl cursor-pointer border-black-400 rounded-full p-1.5"
                    />
                    <MenuItem
                      onClick={() => router.push('/account')}
                      label="My Account"
                      onCloseMenu={toggleOpen}
                    />
                  </div>

                  <div className="flex flex-row items-center px-2 hover:bg-gray-200 transition">
                    <FiLogOut
                      onClick={signOut}
                      label="Login"
                      onCloseMenu={toggleOpen}
                      className="text-black-400 text-4xl cursor-pointer border-black-400 rounded-full p-1.5"
                    />
                    <MenuItem
                      onClick={signOut}
                      label="Logout"
                      onCloseMenu={toggleOpen}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-row items-center px-2 bg-white hover:bg-gray-100">
                  <FaUser
                    onClick={openLoginModal}
                    label="Login"
                    onCloseMenu={toggleOpen}
                    className="text-black-400 text-4xl cursor-pointer border-black-400 rounded-full p-1.5"
                  />
                  <MenuItem
                    onClick={openLoginModal}
                    label="Login"
                    onCloseMenu={toggleOpen}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )

}

export default UserMenu
