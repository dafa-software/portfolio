import { useState } from 'react'
import type { FormEvent } from 'react'
import { site } from '../../data/site'
import { useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../Icon'
import { SectionHeading } from '../SectionHeading'

interface FormState {
  name: string
  email: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const initialForm: FormState = { name: '', email: '', message: '' }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: Errors = {}
    if (!form.name.trim()) {
      nextErrors.name = t('contact.form.error.required')
    }
    if (!form.email.trim()) {
      nextErrors.email = t('contact.form.error.required')
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = t('contact.form.error.email')
    }
    if (!form.message.trim()) {
      nextErrors.message = t('contact.form.error.required')
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return
    setSubmitted(true)
  }

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-ring ${
      hasError ? 'border-red-400/70 focus:border-red-400' : 'border-border'
    }`

  return (
    <section id="contact" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <SectionHeading
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          intro={t('contact.intro')}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon name="mail" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {t('contact.email')}
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex h-2 w-2 rounded-full bg-primary" />
                {t('hero.availability')}
              </span>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t('contact.socials')}
              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {Object.entries(site.socials).map(([key, social]) => (
                  <li key={key}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <Icon name={key} className="h-4 w-4" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <h3 className="mt-4 text-xl font-bold text-foreground">
                  {t('contact.success.title')}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {t('contact.success.message')}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm)
                    setSubmitted(false)
                  }}
                  className="mt-8 rounded-full border border-border bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {t('contact.success.back')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      {t('contact.form.name')}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(event) => setField('name', event.target.value)}
                      placeholder={t('contact.form.name.placeholder')}
                      aria-invalid={Boolean(errors.name)}
                      className={fieldClass(Boolean(errors.name))}
                    />
                    {errors.name ? (
                      <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      {t('contact.form.email')}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(event) => setField('email', event.target.value)}
                      placeholder={t('contact.form.email.placeholder')}
                      aria-invalid={Boolean(errors.email)}
                      className={fieldClass(Boolean(errors.email))}
                    />
                    {errors.email ? (
                      <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(event) => setField('message', event.target.value)}
                    placeholder={t('contact.form.message.placeholder')}
                    aria-invalid={Boolean(errors.message)}
                    className={`${fieldClass(Boolean(errors.message))} resize-none`}
                  />
                  {errors.message ? (
                    <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover sm:w-auto"
                >
                  {t('contact.form.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
