import { useMemo, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import FormField from './FormField'
import FormIcon from './FormIcon'
import { buildUpiLink, paymentDetails } from '../data/paymentConfig'
import '../styles/forms.css'

const quickAmounts = [500, 1000, 5000]

function DonationForm() {
  const [donationSuccess, setDonationSuccess] = useState(false)
  const [amount, setAmount] = useState('1000')
  const upiLink = useMemo(() => buildUpiLink(amount), [amount])

  const handleDonationSubmit = (event) => {
    event.preventDefault()
    setDonationSuccess(true)
    event.currentTarget.reset()
    setAmount('1000')
  }

  return (
    <section className="modern-form-shell" aria-labelledby="donation-form-title">
      <header className="modern-form-header">
        <div className="modern-form-header-icon modern-form-header-icon--donate">
          <FormIcon name="donate" />
        </div>
        <div>
          <h2 id="donation-form-title">Make a Donation</h2>
          <p>
            Your donation helps underserved yet ambitious students pursue advanced education
            and professional opportunities. Pay via UPI and submit your details below.
          </p>
        </div>
      </header>

      <div className="modern-form-layout">
        <form onSubmit={handleDonationSubmit} className="modern-form">
          <div className="modern-form-section">
            <h3 className="modern-form-section-title">
              <FormIcon name="user" />
              Donor Details
            </h3>
            <FormField label="Full Name" name="name" icon="user" placeholder="Your name" required />
            <FormField label="Email" name="email" icon="mail" type="email" placeholder="you@email.com" required />
            <FormField label="Phone" name="phone" icon="phone" type="tel" placeholder="+91 98765 43210" required />
          </div>

          <div className="modern-form-section">
            <h3 className="modern-form-section-title">
              <FormIcon name="rupee" />
              Donation Amount
            </h3>
            <FormField
              label="Amount (INR)"
              name="amount"
              icon="rupee"
              type="number"
              placeholder="1000"
              required
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />

            <div className="modern-amount-chips">
              {quickAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={Number(amount) === value ? 'active' : ''}
                  onClick={() => setAmount(String(value))}
                >
                  ₹{value.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          <FormField label="Message (optional)" name="message" icon="message">
            <textarea id="message" name="message" rows="3" placeholder="Your message of support" />
          </FormField>

          <div className="modern-form-actions">
            <button type="submit" className="modern-form-btn modern-form-btn--orange">
              <FormIcon name="donate" />
              Submit Donation
            </button>
          </div>

          {donationSuccess && (
            <p className="modern-form-success" role="status">
              <span className="modern-form-success-icon" aria-hidden="true">
                <FormIcon name="check" />
              </span>
              Thank you! Please complete payment using the QR code on the right.
            </p>
          )}
        </form>

        <aside className="modern-pay-card">
          <div className="modern-pay-card-header">
            <FormIcon name="qr" />
            <h3>Scan to Pay</h3>
          </div>
          <div className="modern-pay-qr">
            <QRCodeSVG value={upiLink} size={168} level="M" includeMargin />
          </div>
          {Number(amount) > 0 && (
            <p className="modern-pay-amount">₹{Number(amount).toLocaleString('en-IN')}</p>
          )}
          <p className="modern-pay-upi">
            UPI: <strong>{paymentDetails.upiId}</strong>
          </p>
          <p className="modern-pay-note">
            {paymentDetails.bankName} · {paymentDetails.accountNumber} · {paymentDetails.ifsc}
          </p>
        </aside>
      </div>
    </section>
  )
}

export default DonationForm
