export const paymentDetails = {
  upiId: 'iwshafoundation@upi',
  payeeName: 'IWSHA FOUNDATION',
  bankName: 'State Bank of India',
  accountNumber: 'XXXX XXXX 1234',
  ifsc: 'SBIN0001234',
  accountHolder: 'IWSHA FOUNDATION',
}

export function buildUpiLink(amount) {
  const params = new URLSearchParams({
    pa: paymentDetails.upiId,
    pn: paymentDetails.payeeName,
    cu: 'INR',
  })

  if (amount && Number(amount) > 0) {
    params.set('am', String(amount))
  }

  return `upi://pay?${params.toString()}`
}
