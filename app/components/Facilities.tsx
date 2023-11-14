'use client'

import Container from "./Container"
import FacilityBox from "./FacilityBox"
import { usePathname, useSearchParams } from "next/navigation"

// icons
import { AiOutlineWifi } from 'react-icons/ai'
import { CgGym } from 'react-icons/cg'
import { FaCoffee } from 'react-icons/fa'
import { BiRestaurant } from 'react-icons/bi'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { MdLocationCity } from 'react-icons/md'
import { MdWineBar } from 'react-icons/md'
import { LuMonitorCheck } from 'react-icons/lu'
import { TbToolsKitchen2 } from 'react-icons/tb'
import { GrLounge } from 'react-icons/gr'

export const facilities = [
  {
    label: 'Wifi',
    icon: AiOutlineWifi,
    description: 'Wifi is available in the space',
  },
  {
    label: 'Gym',
    icon: CgGym,
    description: 'Gym is available in the space',
  },
  {
    label: 'Coffee',
    icon: FaCoffee,
    description: 'Free Coffee is available in the space',
  },
  {
    label: 'Restaurant',
    icon: BiRestaurant,
    description: 'Restaurant is available in the space',
  },
  {
    label: 'Safety',
    icon: AiOutlineSafetyCertificate,
    description: 'Safety is garanted in the space',
  },
  {
    label: 'Location',
    icon: MdLocationCity,
    description: 'Prime location in the city',
  },
  {
    label: 'Bar',
    icon: MdWineBar,
    description: 'Bar is available in the space',
  },
  {
    label: 'Technology',
    icon: LuMonitorCheck,
    description: 'Technology is available in the space',
  },
  {
    label: 'Kitchen',
    icon: TbToolsKitchen2,
    description: 'Kitchen is available in the space',
  },
  {
    label: 'Lounge',
    icon: GrLounge,
    description: 'Lounge space is available in the space',
  },
]

const Facilities = () => {
  const params = useSearchParams()
  const facility = params?.get('facility')
  const pathname = usePathname()

  const isMainPage = pathname === '/'

  if (!isMainPage) {
    return null
  } 


  return (
    <Container>
      <div className="pt-4 flex flex-row flex-wrap items-center justify-between overflow-x-auto">
        {facilities.map((item) => (
          <FacilityBox
            key={item.label}
            label={item.label}
            selected={facility === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  )
}

export default Facilities