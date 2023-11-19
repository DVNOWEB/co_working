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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Thank you for your booking!
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal