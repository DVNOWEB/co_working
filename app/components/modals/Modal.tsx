'use client'
import { IoMdClose } from 'react-icons/io'

import Button from '../Button'

import { useEffect, useState, useCallback } from 'react'

interface ModalProps {
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

const Modal: React.FC<ModalProps> = ({
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
          className=" relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto
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
                className=" p-1 border-0 hover:opacity-70 transition absolute right-16 top-10 rounded-full  bg-gray-100
                ">
                <IoMdClose size={18} />
              </button>
              <div
                className=" flex items-center mt-20 rounded-t justify-center relative
                ">
                <div className="text-4xl text-gray-700 font-bold">{title}</div>
              </div>

              {/* Body */}
              <div className="relativ p-3 m-4 mb-0">{body}</div>

              {/* Footer */}
              <div className="flex flex-col gap-2 p-2 m-5 mb-10">
                <div
                  className=" flex flex-row items-center gap-4 w-full
                 ">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
