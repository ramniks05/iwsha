import { paymentDetails, paymentQrImage } from '../data/paymentConfig'
import { Link } from 'react-router-dom'

function FooterDonateQr() {
  return (
    <div className="footer-donate">
      <h4>Donate via UPI</h4>
      <div className="footer-qr-wrap">
        <img src={paymentQrImage} alt="Scan to pay via UPI" width={110} height={110} />
      </div>
      <p className="footer-pay-id">TID: {paymentDetails.terminalId}</p>
      <Link to="/scholarships/donate" className="footer-donate-link">
        Donate Now →
      </Link>
    </div>
  )
}

export default FooterDonateQr
