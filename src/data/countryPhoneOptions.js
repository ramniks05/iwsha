import { getCountries, getCountryCallingCode } from 'libphonenumber-js'

let cachedOptions = null

function getRegionName(code) {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code
  } catch {
    return code
  }
}

export function getCountryPhoneOptions() {
  if (cachedOptions) return cachedOptions

  cachedOptions = getCountries()
    .map((code) => ({
      code,
      dialCode: `+${getCountryCallingCode(code)}`,
      name: getRegionName(code),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return cachedOptions
}

export const DEFAULT_PHONE_COUNTRY = 'IN'
