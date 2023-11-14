import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

interface ImageUploaderProps {
  onChange: (values: string[]) => void
  value: string[] // Provide a default value as an empty array
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onChange,
  value = [],
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      // Append the new image URL to the existing array
      onChange([...value, result.info.secure_url])
    },
    [onChange, value]
  )

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="jfszwntx"
      options={{
        maxFiles: 5,
      }}>
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative custom-border-radius flex flex-col items-center justify-center w-full h-64 bg-gray-100 hover:opacity-70 border-2 border-gray-300 border-dashed rounded-lg transition cursor-pointer">
            <TbPhotoPlus className="w-10 h-10 text-gray-400" />
            <div className="font-semibold text-lg">
              Click to upload an image
            </div>
            {value.map((imageUrl, index) => (
              <div key={index} className="absolute inset-0 w-full h-full">
                <Image
                  className="custom-border-radius"
                  alt={`Uploaded Image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  src={imageUrl}
                />
              </div>
            ))}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}


export default ImageUploader
