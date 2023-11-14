'use client'

import useCountries from '@/app/hooks/useCountries'

import Select from 'react-select'

export type ContrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  region: string
  value: string
}

interface CountrySelectProps {
  value?: ContrySelectValue
  onChange: (value: ContrySelectValue) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries()

  return (
    <div>
      <Select
        placeholder="Thailand, Bangkok"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as ContrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3 ">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-400 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 20,
          colors: {
            ...theme.colors,
            primary: '#28A745',
            primary25: '#c1e6ca',
          },
        })}
      />
    </div>
  )
}

export default CountrySelect
