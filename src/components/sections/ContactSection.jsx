import { useRef, useState, memo } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, MapPin, Phone, Github, Linkedin, Instagram, Send, CheckCircle2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { cn } from '@/lib/utils'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/Ghetiya-Raj', color: '#ffffff' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/rajghetiya61', color: '#0a66c2' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/raj_ghetiya789', color: '#e1306c' },
]

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'rajghetiya5@gmail.com', href: 'mailto:rajghetiya5@gmail.com', color: '#00ffc8' },
  { icon: Phone, label: 'Phone', value: '+91 93162 94843', href: '#', color: '#a855f7' },
  { icon: MapPin, label: 'Location', value: 'Upleta, Gujarat, India', href: '#', color: '#ff4da6' },
]

function ContactInfoCard({ item }) {
  const Icon = item.icon
  return (
    <a
      href={item.href}
      className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${item.color}12`, border: `1px solid ${item.color}30` }}
      >
        <Icon size={18} style={{ color: item.color }} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
        <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{item.value}</p>
      </div>
    </a>
  )
}

const ContactSection = memo(function ContactSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.1 })

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS env vars missing. Copy .env.example → .env and fill in values.')
      }

      await emailjs.send(serviceId, templateId, {
        name: data.name,
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      }, publicKey)

      setIsSubmitted(true)
      setTimeout(() => { reset(); setIsSubmitted(false) }, 4000)
    } catch (err) {
      console.error('EmailJS error:', err)
      const msg = err?.text || err?.message || JSON.stringify(err)
      alert(`Failed to send: ${msg}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={sectionRef} className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse, var(--primary), transparent)', filter: 'blur(80px)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-widest uppercase">Get in Touch</p>
          <h2 ref={titleRef} className="section-heading mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <div className="section-divider" />
          <p className="text-muted-foreground max-w-xl mx-auto mt-5">
            Ready to bring your ideas to life? I&apos;m always excited to discuss new projects and creative opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Let&apos;s build something amazing</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether you have a project in mind, a question, or just want to say hi — my inbox is always open.
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((item) => <ContactInfoCard key={item.label} item={item} />)}
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Follow me</p>
              <div className="flex gap-3">
                {socialLinks.map((s) => {
                  const Icon = s.icon
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 hover:scale-110 transition-all duration-300"
                      style={{ color: s.color }}
                      aria-label={s.name}
                    >
                      <Icon size={18} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="glass-card rounded-2xl p-7">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <CheckCircle2 size={48} className="text-primary" />
                <p className="text-lg font-semibold text-white">Message sent!</p>
                <p className="text-sm text-muted-foreground text-center">Thanks for reaching out. I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5" htmlFor="name">Name *</label>
                    <input
                      {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 chars' } })}
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Raj Ghetiya"
                      className={cn('form-input', errors.name && 'error')}
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5" htmlFor="email">Email *</label>
                    <input
                      {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="raj@example.com"
                      className={cn('form-input', errors.email && 'error')}
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5" htmlFor="subject">Subject *</label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    id="subject"
                    type="text"
                    placeholder="Project Inquiry"
                    className={cn('form-input', errors.subject && 'error')}
                  />
                  {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5" htmlFor="message">Message *</label>
                  <textarea
                    {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Min 10 chars' } })}
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={cn('form-input resize-none', errors.message && 'error')}
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                  style={{ background: 'linear-gradient(135deg, var(--primary), #06b6d4)', color: '#001a13' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
})

export default ContactSection
