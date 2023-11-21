import { differenceInCalendarDays } from 'date-fns'

export const calculateTotalPrice = (
  price: number,
  startDate: Date | null | undefined,
  endDate: Date | null | undefined
) => {
  if (!startDate || !endDate) {
    return '0.00'
  }

  const numberOfDays =
    differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1
  let totalPrice = price * numberOfDays

  if (numberOfDays >= 30) {
    totalPrice *= 0.8 
  } else if (numberOfDays >= 7) {
    totalPrice *= 0.9 
  }

  totalPrice = Math.round(totalPrice)

  return totalPrice
}
