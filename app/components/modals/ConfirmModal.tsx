'use client'

import useConfirmModal from '@/app/hooks/useConfirmModal'
import { useEffect, useState, useCallback } from 'react'

import { IoMdClose } from 'react-icons/io'

interface ConfirmModalProps {
  isOpen?: boolean
  onClose?: () => void
  title?: string
  disabled?: boolean
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen: ModalIsOpen, // Rename the prop here
  onClose,
  disabled,
}) => {
  const [showModal, setShowModal] = useState(ModalIsOpen)
  const [smallScreen, setSmallScreen] = useState(false)
  const modalIsOpen = useConfirmModal((state) => state.isOpen)
  const modalOnClose = useConfirmModal((state) => state.onClose)

  useEffect(() => {
    setShowModal(modalIsOpen)
  }, [modalIsOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    if (mediaQuery.matches) {
      setSmallScreen(true)
    }
  }, [])

  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }
    setShowModal(false)
    setTimeout(() => {
      modalOnClose?.()
    }, 300)
  }, [disabled, modalOnClose])

  if (!modalIsOpen) {
    return null
  }

  return (
    <>
      {modalIsOpen && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  bg-gray-700 bg-opacity-70">
          
            <div
              className={` translate duration-300 h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
              <div className=" translate h-full lg:h-auto md:py-[50vh] md:px-[50vw] border-0 shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none custom-border-radius">
                <div className=" flex items-center mt-20 rounded-t justify-center relative">
                  <div className="text-4xl text-gray-700 font-bold">
                    <h2 className=" text-6xl text-neutral-700">
                      Thank you for your{' '}
                      <span className="text-yellow-400">booking!</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}
    </>
  )
}

export default ConfirmModal