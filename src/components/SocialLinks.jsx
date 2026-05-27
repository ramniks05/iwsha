import { socialLinks } from '../data/siteConfig'

function SocialLinks({ className = '' }) {
  return (
    <div className={`social-links ${className}`}>
      {socialLinks.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          aria-label={item.name}
          className="social-link"
          style={{ '--social-color': item.color }}
        >
          {item.icon}
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
