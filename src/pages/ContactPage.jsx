import { images } from '../data/images'
import { contactInfo, getWhatsAppLink, socialLinks } from '../data/siteConfig'

function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contactInfo.mapQuery)}&output=embed`

  return (
    <div className="contact-page">
      <section className="page-hero page-hero--short">
        <img src={images.library} alt="" className="page-hero-bg" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1>Contact Us</h1>
          <p>Reach us for admissions, scholarships, and welfare support.</p>
        </div>
      </section>

      <section className="contact-layout">
        <div className="contact-info-card">
          <img src={images.welfare} alt="IWSHA Foundation team" className="contact-photo" />
          <h2>Get In Touch</h2>
          <ul className="contact-list">
            <li>
              <span>📍</span>
              <div>
                <strong>Office Address</strong>
                <p>{contactInfo.address}</p>
                <p>{contactInfo.addressLine2}</p>
              </div>
            </li>
            <li>
              <span>📞</span>
              <div>
                <strong>Phone</strong>
                <a href={`tel:${contactInfo.phoneRaw}`}>{contactInfo.phone}</a>
              </div>
            </li>
            <li>
              <span>✉️</span>
              <div>
                <strong>Email</strong>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </div>
            </li>
            <li>
              <span>🕐</span>
              <div>
                <strong>Hours</strong>
                <p>{contactInfo.hours}</p>
              </div>
            </li>
          </ul>
          <a href={getWhatsAppLink()} className="contact-whatsapp-btn" target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </a>
          <div className="contact-social">
            {socialLinks.map((item) => (
              <a key={item.name} href={item.url} target="_blank" rel="noreferrer">
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <div className="contact-map-card">
          <h2>Find Us on Map</h2>
          <p className="map-address">{contactInfo.address}, {contactInfo.addressLine2}</p>
          <div className="map-wrap">
            <iframe title="Office Location" loading="lazy" allowFullScreen src={mapSrc} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
