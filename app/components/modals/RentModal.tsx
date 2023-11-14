'use client'

import axios from 'axios'
import { useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRentModal from '@/app/hooks/useRentModal'

import Heading from '../Heading'
import Modal from './Modal'
import { facilities } from '../Facilities'
import FacilityInput from '../inputs/FacilityInput'
import CountrySelect from '../inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import ImageUploader from '../inputs/ImageUploader'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { MapContainer } from 'react-leaflet'


enum RentModalFields {
  FACILITIES = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter()
  const rentModal = useRentModal()

  const [step, setStep] = useState(RentModalFields.FACILITIES)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      facilities: [],
      location: null,
      guestCount: 1,
      deskCount: 1,
      roomCount: 1,
      images: [],
      price: 1,
      title: '',
      city: '',
      address: '',
      email: '',
      description: '',
    },
  })

  const selectedFacilities = watch('facilities')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const deskCount = watch('deskCount')
  const images = watch('images')

  // dynamic rerendering of the map when the location changes
  // ignore warning about location because we know we need location to render the map
  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location])


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
  }

  const toggleFacility = (facility: string) => {
    // Toggle the selected state of a facility
    const newFacilities = selectedFacilities.includes(facility)
      ? selectedFacilities.filter((f: string) => f !== facility)
      : [...selectedFacilities, facility]

    console.log('New Facilities:', newFacilities)

    setCustomValue('facilities', newFacilities)
  }


  const onBack = () => {
    setStep((value) => value - 1)
  }
  const onNext = () => {
    setStep((value) => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(step !== RentModalFields.PRICE){
      return onNext()
    }

    setIsLoading(true)

    console.log('Data to be sent:', data)
    
    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Congrats! Your co-working space has been listed')
      // router.push('/')
      router.refresh()
      reset()
      setStep(RentModalFields.FACILITIES)
      rentModal.onClose()
    })
    .catch(() => {
      toast.error('Something went wrong')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const actionLabel = useMemo(() => {
    if (step === RentModalFields.PRICE) {
      return 'Create'
    }
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === RentModalFields.FACILITIES) {
      return undefined
    }
    return 'Back'
  }, [step])

  // FACILITIES

  let bodyContent = (
    <div className="flex flex-col gap-8 m-5">
      <Heading
        title="Select your facilities"
        subtitle="Select the facilities you want to offer to your customers"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-auto">
        {facilities.map((item) => (
          <div key={item.label} className="col-span-1">
            <FacilityInput
              onClick={() => toggleFacility(item.label)}
              selected={selectedFacilities.includes(item.label)}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  // LOCATION

  if(step === RentModalFields.LOCATION){
    bodyContent = (
      <div className="flex flex-col gap-8 m-5">
        <Heading
          title="Select your location"
          subtitle="Select the location of your co-working space"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <MapContainer>
          <Map center={location?.latlng} />
        </MapContainer>
      </div>
    )
  }

  // INFO

  if(step === RentModalFields.INFO){
    bodyContent = (
      <div className="flex flex-col gap-8 m-5">
        <Heading
          title="My co-working space"
          subtitle="Share some info about your co-working space"
        />
        <Counter
          title="CO-Workers"
          subtitle="How many guest do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="CO-Workings rooms"
          subtitle="How many workings rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="CO-Workins desks"
          subtitle="How many guest do you allow?"
          value={deskCount}
          onChange={(value) => setCustomValue('deskCount', value)}
        />
      </div>
    )
  }

  // IMAGES

  if(step === RentModalFields.IMAGES){
    bodyContent = (
      <div className="flex flex-col gap-8 m-5">
        <Heading
          title="Add some images"
          subtitle="Upload some images of your co-working space"
        />
        <ImageUploader 
          value={images}
          onChange={(value) => setCustomValue('images', value)}
        />
      </div>
    )
  }

  // DESCRIPTION

  if(step === RentModalFields.DESCRIPTION){
    bodyContent = (
      <div className="flex flex-col gap-8 m-5">
        <Heading
          title="Add a description"
          subtitle="Don't need a write a book, just a few words about your co-working space"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="city"
          label="City"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="address"
          label="Address"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <textarea
          {...register('description', { required: true })}
          className="flex flex-row items-center m-auto gap-2 justify-center custom-input-radius w-4/6 h-32 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Add a description"
          required
        />
      </div>
    )
  }

  // PRICE

  if(step === RentModalFields.PRICE){
    bodyContent = (
      <div className="flex flex-col gap-8 m-5">
        <Heading
          title="Add a price"
          subtitle="How mach cost a day in your co-working space?"
        />
        <Input
          id="price"
          label="Price in Euro"
          formatPrice={true}
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }


  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      // Create listing efter the price step
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === RentModalFields.FACILITIES ? undefined : onBack}
      title="Rent a co-working space"
      body={bodyContent}
    />
  )
}

export default RentModal
