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
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Centering Trick */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        {/* Adjust width, max-width, and border-radius for modal */}
        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl md:max-w-6xl sm:w-full lg:w-3/4 xl:w-1/2 custom-border-radius">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start mx-10 my-10">
              {' '}
              {/* Adjusted margins */}
              <div className="text-center mx-auto py-4 md:py-24 px-4 md:px-24">
                <h3
                  className="text-4xl leading-10 font-bold text-gray-700 mb-4"
                  id="modal-title"
                  style={{ letterSpacing: '0.05em', lineHeight: '1.5' }}>
                  Thank you for your{' '}
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
};

export default ConfirmModal