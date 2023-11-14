'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { IconType } from "react-icons"
import queryString from "query-string"


interface FacilityBoxProps {
  label: string
  icon: IconType
  selected?: boolean
}
const FacilityBox: React.FC<FacilityBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = queryString.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      facilities: label,
    }

    if (params?.get('facilities') === label) {
      delete updatedQuery.facilities
    }

    const url = queryString.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true })

    router.push(url)

  }, [label, params, router])


  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-3 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
      ${selected ? 'border-b-neutral-800' : 'border-transparent'}
      ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}
      >

      <Icon size={24} />
      <div className="font-medium text-sm ">
        {label}
      </div>
      </div>
  )
}

export default FacilityBox