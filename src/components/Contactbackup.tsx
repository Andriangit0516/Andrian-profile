import React from 'react';

// ── ContactCard sub-components ─────────────────────────────────────────────

type ContactInfoItem = {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
};

function ContactInfoRow({ icon, label, value, className }: ContactInfoItem) {
  return (
    <div className={`contact-card-info-row${className ? ' ' + className : ''}`}>
      <div className="contact-card-info-icon">{icon}</div>
      <div>
        <p className="contact-card-info-label">{label}</p>
        <p className="contact-card-info-value">{value}</p>
      </div>
    </div>
  );
}

// ── SVG icons ──────────────────────────────────────────────────────────────

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="M12 5v14"/>
  </svg>
);

// ── ContactCard ────────────────────────────────────────────────────────────

const contactInfo: ContactInfoItem[] = [
  { icon: <MailIcon />,   label: 'Email',   value: 'andrian.dayag@gmail.com' },
  { icon: <PhoneIcon />,  label: 'Phone',   value: '0991-649-8863' },
  { icon: <MapPinIcon />, label: 'Address', value: 'General Santos City', className: 'col-span-2' },
];

export default function Contact() {
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">Get In Touch</h2>

      <div className="contact-card-wrapper">
        <div className="contact-card">
          {/* Corner plusses */}
          <span className="contact-card-plus top-left"><PlusIcon /></span>
          <span className="contact-card-plus top-right"><PlusIcon /></span>
          <span className="contact-card-plus bottom-left"><PlusIcon /></span>
          <span className="contact-card-plus bottom-right"><PlusIcon /></span>

          {/* Left / info panel */}
          <div className="contact-card-left">
            <h3 className="contact-card-title">Get in touch</h3>
            <p className="contact-card-desc">
              If you have any questions or just want to say hi, fill out the form here.
              I do my best to respond within 1 business day.
            </p>
            <div className="contact-card-info-grid">
              {contactInfo.map((info, i) => (
                <ContactInfoRow key={i} {...info} />
              ))}
            </div>
          </div>

          {/* Right / form panel */}
          <div className="contact-card-right">
            <div className="contact-form-group">
              <label className="contact-form-label">Name</label>
              <input type="text" className="contact-form-input" placeholder="Your name" />
            </div>
            <div className="contact-form-group">
              <label className="contact-form-label">Email</label>
              <input type="email" className="contact-form-input" placeholder="your@email.com" />
            </div>
            <div className="contact-form-group">
              <label className="contact-form-label">Phone</label>
              <input type="tel" className="contact-form-input" placeholder="+63 000 000 0000" />
            </div>
            <div className="contact-form-group">
              <label className="contact-form-label">Message</label>
              <textarea className="contact-form-textarea" rows={4} placeholder="Your message…" />
            </div>
            <button className="contact-form-submit btn btn-primary" onClick={handleSubmit}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
