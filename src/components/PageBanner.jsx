function PageBanner({ image, title, subtitle, overlay = 'dark' }) {
  return (
    <section
      className={`page-banner page-banner--${overlay}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="page-banner-content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  )
}

export default PageBanner
