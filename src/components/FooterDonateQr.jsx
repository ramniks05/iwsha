import { QRCodeSVG } from 'qrcode.react'
import { buildUpiLink, paymentDetails } from '../data/paymentConfig'
import { Link } from 'react-router-dom'

function FooterDonateQr() {
  const upiLink = buildUpiLink()

  return (
    <div className="footer-donate">
      <h4>Donate via UPI</h4>
      <div className="footer-qr-wrap">
        <QRCodeSVG value={upiLink} size={110} level="M" includeMargin />
      </div>
      <p className="footer-upi-id">{paymentDetails.upiId}</p>
      <Link to="/scholarships/donate" className="footer-donate-link">
        Donate Now →
      </Link>
    </div>
  )
}

export default FooterDonateQr
