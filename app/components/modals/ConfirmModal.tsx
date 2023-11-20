'use client'

import useConfirmModal from '@/app/hooks/useConfirmModal'
import { useEffect, useState, useCallback } from 'react'

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
  const modalIsOpen = useConfirmModal((state) => state.isOpen)
  const closeModal = useConfirmModal((state) => state.onClose)
  const [smallScreen, setSmallScreen] = useState(false)

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
      closeModal?.()
    }, 300)
  }, [disabled, closeModal])

  if (!modalIsOpen) {
    return null
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none  bg-gray-700  bg-opacity-70 style={ smallScreen ? 'top-16' : ''}">
      <div className="relative w-full md:w-4/6 my-6 mx-auto h-full md:h-3/6 lg:h-auto">
        <div
          className={` translate duration-300 h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}
        `}>
          {/* Modal Content */}
          <div
            className=" translate h-full lg:h-auto md:h-auto border-0 shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none custom-border-radius
            ">
            <div className="flex items-center justify-center h-full">
              <div className="px-4 py-8 sm:p-6 sm:pb-4 items-center">
                <h3
                  className="text-6xl text-center font-bold text-gray-700 mb-4"
                  id="modal-title">
                  Thank you for <br /> your{' '}
                  <span className="text-yellow-400">booking!</span>
                </h3>
                {/* Additional content can go here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
