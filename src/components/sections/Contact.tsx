import { useState } from 'react'
import type { FormEvent } from 'react'
import { site } from '../../data/site'
import { useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../Icon'
import { SectionHeader } from '../SectionHeader'

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

    const subject = `${t('contact.form.subject')} — ${form.name.trim()}`
    const body = `${form.message.trim()}\n\n${form.name.trim()} <${form.email.trim()}>`
    window.location.href =
      `mailto:${site.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`
  }

  const fieldClass = (hasError: boolean) =>
    `w-full border-0 border-b bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-0 ${
      hasError
        ? 'border-red-400 focus:border-red-400'
        : 'border-border focus:border-primary'
    }`

  return (
    <section id="contact" className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <SectionHeader
          index="05"
          overline={t('contact.eyebrow')}
          title={t('contact.title')}
          intro={t('contact.intro')}
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="overline text-muted-foreground">{t('hero.meta.mail')}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-block font-mono text-lg font-medium text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary md:text-2xl"
            >
              {site.email}
            </a>

            <p className="mt-10 overline text-muted-foreground">{t('contact.socials')}</p>
            <ul className="mt-3">
              {Object.entries(site.socials).map(([key, social]) => (
                <li key={key} className="border-t border-border">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between py-3.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <span className="flex items-center gap-3">
                      <Icon name={key} className="h-4 w-4 text-muted-foreground" />
                      {social.label}
                    </span>
                    <Icon
                      name="arrowUpRight"
                      className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-10 inline-flex items-center gap-2.5 font-mono text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {t('hero.availability')}
            </p>
          </div>

          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-10">
              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="overline text-muted-foreground"
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
                    <p className="mt-2 font-mono text-xs text-red-400">{errors.name}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="overline text-muted-foreground"
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
                    <p className="mt-2 font-mono text-xs text-red-400">{errors.email}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="overline text-muted-foreground"
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
                  <p className="mt-2 font-mono text-xs text-red-400">{errors.message}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button type="submit" className="btn btn-primary">
                  {t('contact.form.submit')}
                  <Icon name="arrowUpRight" className="h-4 w-4" />
                </button>
                <p className="font-mono text-xs text-muted-foreground">
                  {t('contact.form.hint')}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
