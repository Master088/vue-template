import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

// Function to convert a PST time to the local machine time
export const convertPSTToLocal = (pstTime) => {
  const localTime = dayjs.tz(pstTime, 'America/Los_Angeles').local()
  return localTime // Returns local machine time
}

export const convertUtcToLocal = (utcDateStr) => {
  if (!utcDateStr) return null

  const localDate = dayjs.utc(utcDateStr).local()

  return localDate
}

export const cvtUTCToMachineLocal = (utcDate) => {
  return new Date(utcDate).toLocaleString()
}
export const toMachineLocal = (utcDate) => {
  const date = new Date(utcDate)
  return date.toISOString().split('T')[0]
}

// For Display Purposes (00/00/0000)
export const dueDateFormat = (utcDate) => {
  const date = new Date(utcDate)
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)

  const month = String(localDate.getMonth() + 1).padStart(2, '0')
  const day = String(localDate.getDate()).padStart(2, '0')
  const year = localDate.getFullYear()

  return `${month}/${day}/${year}`
}

export function getTaskAge(dateString) {
  if (!dateString) return 'Unknown'

  const now = dayjs()
  const created = dayjs.utc(dateString).local() // Convert UTC to local machine time

  const diffMinutes = now.diff(created, 'minute')
  const diffHours = now.diff(created, 'hour')
  const diffDays = now.diff(created, 'day')
  const diffWeeks = now.diff(created, 'week')
  const diffMonths = now.diff(created, 'month')
  const diffYears = now.diff(created, 'year')

  let timeAgo = ''
  if (diffMinutes < 60) timeAgo = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
  else if (diffHours < 24) timeAgo = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  else if (diffDays < 7) timeAgo = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  else if (diffWeeks < 4) timeAgo = `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`
  else if (diffMonths < 12) timeAgo = `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
  else timeAgo = `${diffYears} year${diffYears > 1 ? 's' : ''} ago`

  // Format: MM/DD/YYYY | hh:mm A (machine local time)
  const formattedDate = created.format('MM/DD/YYYY | hh:mm A')

  return `${timeAgo} ${formattedDate}`
}

export const convertUTCToMachineLocal = (utcDate) => {
  const date = new Date(utcDate)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  }).format(date)
}

export const convertUTCToPST = (utcDate) => {
  return dayjs.utc(utcDate).tz('America/Los_Angeles').format('MM/DD/YYYY HH:mm [PST]')
}

export const convertDateToPST = (date) => {
  // Get the machine's local time zone
  const localTimeZone = dayjs.tz.guess()

  // If the machine's time zone is already 'America/Los_Angeles', return the date as-is
  if (localTimeZone === 'America/Los_Angeles') {
    return dayjs(date)
  }

  return dayjs(date).tz('America/Los_Angeles')
}

export const convertDateToUTC = (date) => {
  const pstTime = convertDateToPST(date)
  return dayjs(pstTime).utc().toISOString()
}

// Function to get the local machine time in a formatted string
export const getLocalTime = () => {
  return dayjs().format('ddd, D MMM YYYY')
}

// Function to get the current time in PST
export const getPSTTime = () => {
  const pstTime = dayjs().tz('America/Los_Angeles')
  return pstTime // Returns PST time
}

export const getUTCStart = (isYesterday = false) => {
  const pstTime = getPSTTime()
  const date = dayjs(pstTime)
  let startOfDayLocal = date.startOf('day')

  if (isYesterday) {
    startOfDayLocal = startOfDayLocal.subtract(1, 'day')
  }

  const startOfDayUTC = startOfDayLocal.utc().toISOString()

  return startOfDayUTC
}

export const getUTCEnd = (isYesterday = false) => {
  const pstTime = getPSTTime()
  const date = dayjs(pstTime)

  // Get start of the day and end of the day in local time
  let endOfDayLocal = date.endOf('day')

  // Adjust the date based on whether yesterday is selected
  if (isYesterday) {
    endOfDayLocal = endOfDayLocal.subtract(1, 'day')
  }

  // Convert to UTC
  const endOfDayUTC = endOfDayLocal.utc().toISOString()

  return endOfDayUTC
}

export const convertUTCToPSTToLocal = (utcDateString) => {
  // Step 1: Parse the UTC date and convert to PST
  const pstDate = dayjs.utc(utcDateString).tz('America/Los_Angeles')

  // Step 2: Convert PST date to the local timezone
  const localDate = pstDate.tz(dayjs.tz.guess())

  return localDate // Adjust format as needed
}

export const convertUTCToLocal = (dateString) => {
  const utcDate = dayjs.utc(dateString)

  const localTimezone = dayjs.tz.guess()

  const localDate = utcDate.tz(localTimezone)

  const formattedDate = localDate.format('MMMM D, YYYY')
  const formattedTime = localDate.format('h:mm A')

  return { formattedDate, formattedTime }
}

export const timeCoverageLocal = () => {
  const PST_TIMEZONE = 'America/Los_Angeles'

  // Get the current time in PST
  const currentTimePST = dayjs().tz(PST_TIMEZONE)

  // Determine the start and end of the coverage window
  let startOfCoverage = currentTimePST.hour(8).minute(0).second(0)
  let endOfCoverage = startOfCoverage.add(1, 'day').subtract(1, 'minute') // 7:59 AM next day

  // Adjust if the current time is before 8:00 AM (i.e., coverage is from the previous day)
  if (currentTimePST.isBefore(startOfCoverage)) {
    startOfCoverage = startOfCoverage.subtract(1, 'day')
    endOfCoverage = endOfCoverage.subtract(1, 'day')
  }

  // Convert to local timezone
  let localStart = startOfCoverage.tz()
  let localEnd = endOfCoverage.tz()

  return {
    localStart: localStart.format('MMM D, YYYY h:mm A'),
    localEnd: localEnd.format('MMM D, YYYY h:mm A')
  }
}

export const timeCoveragePstToUtcToday = () => {
  // Define PST timezone
  const PST_TIMEZONE = 'America/Los_Angeles'

  const currentTimePST = dayjs().tz(PST_TIMEZONE)

  // Get the current date in PST and set time to 8:00 a.m.

  let startOfDayPST = dayjs().tz(PST_TIMEZONE).startOf('day').hour(8).minute(0).second(0)
  let endOfDayPST = startOfDayPST.add(1, 'day').subtract(1, 'minute') // 7:59 a.m. next day PST

  // If the current time is before the start of the day, shift the times to the previous day
  if (currentTimePST.isBefore(startOfDayPST)) {
    startOfDayPST = startOfDayPST.subtract(1, 'day')
    endOfDayPST = endOfDayPST.subtract(1, 'day')
  }

  // Convert start and end times to UTC
  const utcStart = startOfDayPST.utc().toISOString()
  const utcEnd = endOfDayPST.utc().toISOString()

  return {
    utcStart,
    utcEnd
  }
}

export const timeCoveragePstToUtcYesterday = () => {
  // Define PST timezone
  const PST_TIMEZONE = 'America/Los_Angeles'

  const currentTimePST = dayjs().tz(PST_TIMEZONE)
  let temptStartOfDayPST = dayjs().tz(PST_TIMEZONE).startOf('day').hour(8).minute(0).second(0)

  // Get yesterday's date in PST and set time to 8:00 a.m.
  let startOfDayPST = dayjs()
    .subtract(1, 'day')
    .set('hour', 8)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 11)
  let endOfDayPST = startOfDayPST.add(1, 'day').subtract(1, 'minute') // 7:59 a.m. next day PST

  if (currentTimePST.isBefore(temptStartOfDayPST)) {
    startOfDayPST = startOfDayPST.subtract(1, 'day')
    endOfDayPST = endOfDayPST.subtract(1, 'day')
  }

  // Convert start and end times to UTC
  const utcStart = startOfDayPST.utc().toISOString()
  const utcEnd = endOfDayPST.utc().toISOString()

  return {
    utcStart,
    utcEnd
  }
}
