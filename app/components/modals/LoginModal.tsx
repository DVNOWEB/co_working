'use client'

import { signIn } from 'next-auth/react'

// import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'

import Modal from './Modal'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
// import Button from '../Button'
import { useRouter } from 'next/navigation'

const LoginModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success('Logged in successfully')
        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const toggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

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

      <div
        className="
        text-neutral-600 text-center font-extralight
      ">
        <div
          className="
          flex flex-col items-center gap-2 justify-center
        ">
          <span>
            Don`t have an account?
            <span
              onClick={toggle}
              className="
              text-neutral-500 font-semibold cursor-pointer ml-1 hover:underline
            ">
              Register here
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
  //       label="Login with Google"
  //       icon={FcGoogle}
  //       onClick={() => {}}
  //     />
  //   </div>
  // )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      // footer={footerContent}
    />
  )
}

export default LoginModal
