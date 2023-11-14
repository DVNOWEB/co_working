'use client'

import axios from 'axios'
// import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Modal from './Modal'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
// import Button from '../Button'

const RegisterModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { password, repeatPassword } = data

    // Check if passwords match
    if (password !== repeatPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)

    axios
      .post('/api/register', data)
      .then(() => {
        registerModal.onClose()
        loginModal.onOpen()
      })

      .catch((err) => {
        toast.error('Something went wrong, please try again')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const toggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [registerModal, loginModal])

  // Body content
  const bodyContent = (
    <div className="flex flex-col mt-3 gap-4 ">
      <Input
        id="email"
        label="Email:"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password:"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="repeatPassword"
        type="password"
        label="RepeatPassword:"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <div
        className="
        text-neutral-600 text-center font-extralight 
      ">
        <div
          className="
          flex flex-row items-center gap-2 justify-center
        ">
          <span>
            Already have an account?
            <span
              onClick={toggle}
              className="
              text-neutral-500 font-semibold cursor-pointer ml-1 hover:underline
            ">
              Login here
            </span>
          </span>
        </div>
      </div>
    </div>
  )

  // Footer content
  // const footerContent = (
  //   <div className="flex flex-col mt-3 gap-4 ">
  //     <Button
  //       outline
  //       small
  //       label="Register with Google"
  //       icon={FcGoogle}
  //       onClick={() => {}}
  //     />
  //   </div>
  // )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      // footer={footerContent}
    />
  )
}

export default RegisterModal
