import {
  Mail,
  User,
  FileText,
  Pencil,
  Clock3,
  Globe,
  Github,
  MessageCircle,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="relative overflow-hidden bg-[#070B1B] py-24 text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#3b82f620,transparent_45%),radial-gradient(circle_at_bottom_right,#9333ea20,transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
              Contact StorySparkAI
            </span>

            <h1 className="mt-6 text-6xl font-black leading-tight">
              Let's Build
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                Something Amazing
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
              Whether you have an idea, feedback, collaboration proposal, or
              simply want to say hello, we'd love to hear from you.
            </p>

            {/* Cards */}
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              <InfoCard
                icon={<Clock3 />}
                title="Response Time"
                value="Within 24 Hours"
              />

              <InfoCard
                icon={<Globe />}
                title="Community"
                value="Worldwide Creators"
              />
            </div>

            {/* Contact Details */}
            <div className="mt-10 space-y-4">
              <ContactCard
                icon={<Mail size={22} />}
                title="Email"
                subtitle="support@storyspark.ai"
              />

              <ContactCard
                icon={<Github size={22} />}
                title="GitHub"
                subtitle="Contribute to StorySparkAI"
              />

              <ContactCard
                icon={<MessageCircle size={22} />}
                title="Community"
                subtitle="Join our Discord discussions"
              />
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl"
          >
            <h2 className="mb-8 text-3xl font-bold">
              Send us a message
            </h2>

            <form className="space-y-5">
              <Input icon={<User size={20} />} placeholder="Full Name" />

              <Input icon={<Mail size={20} />} placeholder="Email Address" />

              <Input icon={<FileText size={20} />} placeholder="Subject" />

              <div className="relative">
                <Pencil className="absolute left-5 top-5 text-purple-400" />

                <textarea
                  rows={5}
                  placeholder="Your message..."
                  className="w-full rounded-2xl border border-white/10 bg-[#111827]/80 py-5 pl-14 pr-5 text-white placeholder:text-slate-500 outline-none focus:border-purple-500"
                />
              </div>

              <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-4 text-lg font-semibold transition hover:scale-[1.02]">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="mb-5 text-purple-400">{icon}</div>

      <p className="text-slate-400">{title}</p>

      <h3 className="mt-2 text-xl font-bold">{value}</h3>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-purple-500/50">
      <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}

function Input({
  icon,
  placeholder,
}: {
  icon: React.ReactNode;
  placeholder: string;
}) {
  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="contact-section relative overflow-hidden bg-[#020617] text-white"
    >
      {/* Layered background */}
      <div aria-hidden="true" className="contact-bg-mesh" />
      <div aria-hidden="true" className="contact-orb contact-orb-blue" />
      <div aria-hidden="true" className="contact-orb contact-orb-purple" />
      <div aria-hidden="true" className="contact-orb contact-orb-pink" />
      <div aria-hidden="true" className="contact-grid-overlay" />

      {/* Page content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-20 xl:px-16">

        {/* Mobile badge */}
        <div className="mb-10 flex flex-col items-center text-center lg:hidden">
          <span
            className={`contact-badge inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Zap className="h-3 w-3" aria-hidden="true" />
            Get in Touch
          </span>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 xl:gap-20">

          {/* LEFT COLUMN */}
          <div
            className={`contact-col-left flex flex-col transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Desktop badge */}
            <span className="contact-badge mb-6 hidden w-fit items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300 lg:inline-flex">
              <Zap className="h-3 w-3" aria-hidden="true" />
              Get in Touch
            </span>

            {/* Heading */}
            <h1
              id="contact-heading"
              className="font-black leading-[0.9] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="block text-[clamp(2.75rem,6vw,4.5rem)] text-white">
                Let's Start a
              </span>
              <span className="contact-heading-gradient block text-[clamp(2.75rem,6vw,4.5rem)]">
                Conversation
              </span>
            </h1>

            {/* Accent bar */}
            <div aria-hidden="true" className="contact-accent-bar mt-5" />

            {/* Intro description — improved */}
            <p className="mt-6 max-w-[42ch] text-[0.9375rem] leading-[1.8] text-slate-400 sm:text-base">
              I'm always open to discussing new ideas, collaborations, freelance
              work, or creative projects. Have a story idea or feature suggestion?
              Drop me a message — I read everything and reply within 24 hours.
            </p>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              {STATS.map(({ value, label }, i) => (
                <div
                  key={label}
                  className="contact-stat-card rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3 text-center sm:p-4"
                  style={{
                    transitionDelay: isVisible ? `${i * 80}ms` : "0ms",
                  }}
                >
                  <p className="text-lg font-black text-white sm:text-xl">{value}</p>
                  <p className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-slate-500 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Info cards grid */}
            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3">
              {INFO_CARDS.map(({ icon: Icon, label, value, color, iconColor }) => (
                <div
                  key={label}
                  className="contact-info-card flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-3 backdrop-blur-sm"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} ${iconColor}`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-slate-500">
                      {label}
                    </span>
                    <span className="block truncate text-xs font-semibold text-slate-300">
                      {value}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* Contact channels */}
            <ul className="mt-5 space-y-2.5 sm:mt-6" aria-label="Contact channels">
              {CONTACT_CHANNELS.map(
                ({ icon: Icon, label, value, href, color, iconColor, hoverBorder }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label}: ${value}`}
                      className={`contact-channel-link group flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 backdrop-blur-sm ${hoverBorder}`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} ${iconColor}`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-slate-500">
                          {label}
                        </span>
                        <span className="block truncate text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-200">
                          {value}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 shrink-0 text-slate-600 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-400"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                )
              )}
            </ul>

            {/* Social media links */}
            <div className="mt-6">
              <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-widest text-slate-500">
                Find me on
              </p>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`contact-social-btn flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-500 transition-all duration-200 ${color}`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Illustration */}
            <div
              aria-hidden="true"
              className="contact-illustration relative mt-10 hidden items-end lg:flex"
            >
              <div className="contact-illustration-glow" />
              <img
                src={storybook}
                alt=""
                loading="lazy"
                decoding="async"
                className="relative z-10 w-full max-w-[340px] object-contain xl:max-w-[380px]"
              />
            </div>
          </div>

          {/* RIGHT COLUMN — FORM */}
          <div
            className={`contact-col-right w-full lg:mx-auto lg:max-w-2xl lg:sticky lg:top-24 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="contact-form-shell">
              <div aria-hidden="true" className="contact-form-glow-ring" />

              <div className="contact-form-card">
                <div aria-hidden="true" className="contact-form-top-line" />

                {/* Form header */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Send a Message
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-400">
                    All fields marked <span className="text-violet-400 font-semibold">*</span> are required. We'll reply within 24 hours.
                  </p>
                </div>

                <form
                  onSubmit={submitHandler}
                  noValidate
                  aria-label="Contact form"
                  className="space-y-5"
                >
                  {/* Floating label text inputs */}
                  {FORM_FIELDS.map(({ id, name, type, label, icon, autoComplete, required }) => (
                    <FloatingLabelInput
                      key={id}
                      id={id}
                      name={name}
                      type={type}
                      label={label}
                      icon={icon}
                      autoComplete={autoComplete}
                      value={formData[name]}
                      onChange={changeHandler}
                      error={fieldErrors[name]}
                      required={required}
                    />
                  ))}

                  {/* Floating label textarea */}
                  <FloatingLabelTextarea
                    value={formData.message}
                    onChange={changeHandler}
                    error={fieldErrors.message}
                  />

                  {/* Global error banner */}
                  {error && !Object.values(fieldErrors).some(Boolean) && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3.5 contact-fade-in"
                    >
                      <AlertCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                        aria-hidden="true"
                      />
                      <p className="text-sm font-medium text-red-400">{error}</p>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    aria-label={loading ? "Sending message…" : "Send message"}
                    className="contact-submit-btn group relative mt-1 flex h-12 w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl text-sm font-bold text-white sm:h-[3.125rem] sm:text-base"
                  >
                    <span aria-hidden="true" className="contact-btn-gradient absolute inset-0" />
                    {/* Shimmer sweep on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    />
                    <span className="relative flex items-center gap-2.5">
                      {loading ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                          />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <Send
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                          <span>Send Message</span>
                        </>
                      )}
                    </span>
                  </button>

                  {/* Success */}
                  {success && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-4 contact-fade-in"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-emerald-400">
                          Message sent successfully!
                        </p>
                        <p className="mt-0.5 text-xs text-emerald-500/80">
                          We'll get back to you within 24 hours.
                        </p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-[#111827]/80 py-5 pl-14 pr-5 text-white placeholder:text-slate-500 outline-none focus:border-purple-500"
      />
    </div>
  );
}