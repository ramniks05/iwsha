import { useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProgramsPage from './pages/ProgramsPage'
import ScholarshipsPage from './pages/ScholarshipsPage'
import ScholarshipApplyPage from './pages/ScholarshipApplyPage'
import DonationPage from './pages/DonationPage'
import ContactPage from './pages/ContactPage'
import FaqPage from './pages/FaqPage'
import UniversityDetailPage from './pages/UniversityDetailPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminUniversitiesPage from './pages/AdminUniversitiesPage'
import AdminApplicationsPage from './pages/AdminApplicationsPage'
import AdminMessagesPage from './pages/AdminMessagesPage'
import AdminChangePasswordPage from './pages/AdminChangePasswordPage'
import RequireAdmin from './components/RequireAdmin'
import SocialLinks from './components/SocialLinks'
import FooterDonateQr from './components/FooterDonateQr'
import WhatsAppButton from './components/WhatsAppButton'
import iwshaLogo from './assets/iwsha-logo.png'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { contactInfo, getWhatsAppLink, organization } from './data/siteConfig'
import './styles/site.css'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/programs', label: 'Programs' },
  { to: '/scholarships', label: 'Scholarships' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <AdminAuthProvider>
      <Routes>
        {/* ── Admin routes (login + protected panel) ── */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={<RequireAdmin><AdminDashboardPage /></RequireAdmin>}
        />
        <Route
          path="/admin/universities"
          element={<RequireAdmin><AdminUniversitiesPage /></RequireAdmin>}
        />
        <Route
          path="/admin/applications"
          element={<RequireAdmin><AdminApplicationsPage /></RequireAdmin>}
        />
        <Route
          path="/admin/messages"
          element={<RequireAdmin><AdminMessagesPage /></RequireAdmin>}
        />
        <Route
          path="/admin/change-password"
          element={<RequireAdmin><AdminChangePasswordPage /></RequireAdmin>}
        />
        {/* ── Public routes (with site header + footer) ── */}
        <Route path="*" element={<PublicLayout menuOpen={menuOpen} setMenuOpen={setMenuOpen} closeMenu={closeMenu} />} />
      </Routes>
    </AdminAuthProvider>
  )
}

function PublicLayout({ menuOpen, setMenuOpen, closeMenu }) {
  return (
    <div className="app">
      {/* Top bar */}
      <div className="header-top">
        <div className="header-top-inner">
          <div className="header-top-left">
            <a href={`tel:${contactInfo.phoneRaw}`}>📞 {contactInfo.phone}</a>
            <a href={`mailto:${contactInfo.email}`}>✉️ {contactInfo.email}</a>
          </div>
          <SocialLinks className="header-top-social" />
        </div>
      </div>

      {/* Main header */}
      <header className="header">
        <div className="header-inner">
          <NavLink to="/" className="brand" onClick={closeMenu}>
            <img src={iwshaLogo} alt="IWSHA Foundation" />
            <div className="brand-text">
              <strong>{organization.name}</strong>
              <span className="brand-society">{organization.societyName}</span>
            </div>
          </NavLink>

          <button
            type="button"
            className="menu-btn"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>

          <div className={`header-right ${menuOpen ? 'open' : ''}`}>
            <nav className="nav">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} onClick={closeMenu}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="header-actions">
              <a
                href={getWhatsAppLink()}
                className="btn-whatsapp"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <NavLink to="/scholarships/donate" className="btn-donate-header" onClick={closeMenu}>
                Donate
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />
          <Route path="/scholarships/apply" element={<ScholarshipApplyPage />} />
          <Route path="/scholarships/donate" element={<DonationPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/universities/:slug" element={<UniversityDetailPage />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand-block">
            <div className="footer-brand">
              <img src={iwshaLogo} alt="" />
              <div>
                <strong>{organization.name}</strong>
                <p>{organization.societyName}</p>
                <span>{organization.regNo}</span>
                <span className="footer-address">{contactInfo.address}</span>
              </div>
            </div>
            <p className="footer-mission">{organization.footerMission}</p>
            <SocialLinks className="footer-social" />
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/programs">Programs</NavLink>
            <NavLink to="/scholarships">Scholarships</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/scholarships/donate">Donate</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <a href={`tel:${contactInfo.phoneRaw}`}>{contactInfo.phone}</a>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            <span>{contactInfo.address}</span>
            <a href={getWhatsAppLink()} className="footer-whatsapp-link" target="_blank" rel="noreferrer">
              💬 Chat on WhatsApp
            </a>
          </div>

          <FooterDonateQr />
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copy">
            © {new Date().getFullYear()} IWSHA FOUNDATION. All rights reserved.
          </p>
          <SocialLinks className="footer-bottom-social" />
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}

export default App
