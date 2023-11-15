'use client'

import { IoMdClose } from 'react-icons/io'

import { useEffect, useState, useCallback } from 'react'

interface ListingModalProps {
  isOpen?: boolean
  onClose?: () => void
  onSubmit?: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  actionLabel: string
  disabled?: boolean
  secondaryAction?: () => void
  secondaryActionLabel?: string
}

const ListingModal: React.FC<ListingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen)
  const [smallScreen, setSmallScreen] = useState(false)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

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
      onClose?.()
    }, 300)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return
    }

    onSubmit?.()
  }, [disabled, onSubmit])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return
    }

    secondaryAction()
  }, [disabled, secondaryAction])

  if (!isOpen) {
    return null
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  bg-gray-700  bg-opacity-70 style={ smallScreen ? 'top-16' : ''}
        ">
        <div
          className="relative w-full md:w-4/6 my-6 mx-auto h-full lg:h-auto md:h-auto
        ">
          {/* Content */}
          <div
            className={` translate duration-300 h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}
        `}>
            <div
              className=" translate h-full lg:h-auto md:h-auto border-0 shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none custom-border-radius
            ">
              {/* Header */}
              <button
                onClick={handleClose}
                className=" p-2 border-0 hover:opacity-70 transition absolute right-12 top-10 rounded-full  bg-gray-100
                ">
                <IoMdClose size={18} />
              </button>

              {/* Body */}
              <div className="relativ p-3 m-4 mb-0">{body}</div>

              {/* Footer */}
              <div className="flex flex-col gap-2 p-2 mb-1">{footer}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingModal
