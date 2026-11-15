import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { site } from '../../data/site'
import type { TranslationKey } from '../../i18n/translations'
import { useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { Section } from '../Section'
import { SectionHeader } from '../SectionHeader'
import { ContactProgress } from '../features/contact/ContactProgress'

type ProjectType = 'website' | 'platform' | 'uiux' | 'other'

interface FormState {
  type: ProjectType | ''
  message: string
  name: string
  email: string
}

/**
 * Errors hold translation keys, not translated text, so a language switch
 * re-renders them in the new language instead of freezing the old one.
 */
type Errors = Partial<Record<keyof FormState, TranslationKey>>

/** Control to focus when a given field fails validation. */
const errorFocusTargets: Record<keyof FormState, string> = {
  type: 'contact-type-0',
  message: 'contact-message',
  name: 'contact-name',
  email: 'contact-email',
}

const initialForm: FormState = { type: '', message: '', name: '', email: '' }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const projectTypes: { value: ProjectType; labelKey: TranslationKey; icon: string }[] = [
  { value: 'website', labelKey: 'contact.type.website', icon: 'code' },
  { value: 'platform', labelKey: 'contact.type.platform', icon: 'layers' },
  { value: 'uiux', labelKey: 'contact.type.uiux', icon: 'pen' },
  { value: 'other', labelKey: 'contact.type.other', icon: 'chat' },
]

const TOTAL_STEPS = 3

export function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Errors>({})
  const [step, setStep] = useState(0)
  const stepRef = useRef<HTMLDivElement>(null)
  const previousStepRef = useRef(step)

  // Each step swaps the whole fieldset out, so without this the focused
  // Continue/Back button is unmounted and focus falls back to <body>.
  // Comparing against the previous step (rather than a mounted flag) keeps
  // StrictMode's second mount pass from stealing focus on first load.
  useEffect(() => {
    if (previousStepRef.current === step) return
    previousStepRef.current = step
    stepRef.current?.focus()
  }, [step])

  const focusFirstError = (next: Errors) => {
    const field = (Object.keys(errorFocusTargets) as (keyof FormState)[]).find(
      (key) => next[key]
    )
    if (field) document.getElementById(errorFocusTargets[field])?.focus()
  }

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validateStep = (index: number): Errors => {
    const next: Errors = {}
    if (index === 0 && !form.type) {
      next.type = 'contact.form.error.type'
    }
    if (index === 1 && !form.message.trim()) {
      next.message = 'contact.form.error.required'
    }
    if (index === 2) {
      if (!form.name.trim()) next.name = 'contact.form.error.required'
      if (!form.email.trim()) {
        next.email = 'contact.form.error.required'
      } else if (!emailPattern.test(form.email.trim())) {
        next.email = 'contact.form.error.email'
      }
    }
    return next
  }

  const goNext = () => {
    const next = validateStep(step)
    setErrors(next)
    if (Object.values(next).some(Boolean)) {
      focusFirstError(next)
      return
    }
    setStep((value) => Math.min(value + 1, TOTAL_STEPS - 1))
  }

  const goBack = () => {
    setErrors({})
    setStep((value) => Math.max(value - 1, 0))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (step < TOTAL_STEPS - 1) {
      goNext()
      return
    }

    const next = validateStep(2)
    setErrors(next)
    if (Object.values(next).some(Boolean)) {
      focusFirstError(next)
      return
    }

    const typeLabel = form.type
      ? t(projectTypes.find((item) => item.value === form.type)!.labelKey)
      : ''
    const subject = `${t('contact.form.subject')} — ${typeLabel} — ${form.name.trim()}`
    const body =
      `${t('contact.form.type')}: ${typeLabel}\n\n` +
      `${form.message.trim()}\n\n${form.name.trim()} <${form.email.trim()}>`

    window.location.href =
      `mailto:${site.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`
  }

  const fieldClass = (hasError: boolean) =>
    `w-full border-0 border-b bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-0 ${
      hasError
        ? 'border-red-600 focus:border-red-600 dark:border-red-400 dark:focus:border-red-400'
        : 'border-border focus:border-primary'
    }`

  const steps = [
    t('contact.step.type'),
    t('contact.step.details'),
    t('contact.step.contact'),
  ]

  const progressLabel = t('contact.step.progress')
    .replace('{current}', String(step + 1))
    .replace('{total}', String(TOTAL_STEPS))

  return (
    <Section id="contact">
      <SectionHeader
        index="04"
        overline={t('contact.eyebrow')}
        title={t('contact.title')}
        intro={t('contact.intro')}
      />

      <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <p className="overline text-muted-foreground">{t('contact.email')}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 block break-all font-display text-xl font-semibold tracking-tight text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary md:text-2xl"
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
        </Reveal>

        <div className="lg:col-span-8">
          <ContactProgress steps={steps} current={step} progressLabel={progressLabel} />

          <form onSubmit={handleSubmit} noValidate className="mt-10">
            <div
              ref={stepRef}
              role="group"
              tabIndex={-1}
              aria-label={steps[step]}
              className="outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {step === 0 ? (
                <fieldset>
                  <legend className="overline text-muted-foreground">
                    {t('contact.form.type')}
                  </legend>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {projectTypes.map((option, optionIndex) => {
                      const isActive = form.type === option.value
                      return (
                        <button
                          key={option.value}
                          id={`contact-type-${optionIndex}`}
                          type="button"
                          onClick={() => setField('type', option.value)}
                          aria-pressed={isActive}
                          aria-describedby={
                            errors.type ? 'contact-type-error' : undefined
                          }
                          className={`flex items-center gap-3 border p-4 text-left text-sm font-medium transition-colors ${
                            isActive
                              ? 'border-primary bg-primary/5 text-foreground'
                              : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                          }`}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center ${
                              isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-surface text-muted-foreground'
                            }`}
                          >
                            <Icon name={option.icon} className="h-4 w-4" />
                          </span>
                          {t(option.labelKey)}
                        </button>
                      )
                    })}
                  </div>
                  {errors.type ? (
                    <p
                      id="contact-type-error"
                      role="alert"
                      className="mt-3 font-mono text-xs text-red-600 dark:text-red-400"
                    >
                      {t(errors.type)}
                    </p>
                  ) : null}
                </fieldset>
              ) : null}

              {step === 1 ? (
                <div>
                  <label
                    htmlFor="contact-message"
                    className="overline text-muted-foreground"
                  >
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    value={form.message}
                    onChange={(event) => setField('message', event.target.value)}
                    placeholder={t('contact.form.message.placeholder')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? 'contact-message-error' : undefined
                    }
                    className={`${fieldClass(Boolean(errors.message))} resize-none`}
                  />
                  {errors.message ? (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-2 font-mono text-xs text-red-600 dark:text-red-400"
                    >
                      {t(errors.message)}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {step === 2 ? (
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
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={fieldClass(Boolean(errors.name))}
                    />
                    {errors.name ? (
                      <p
                        id="contact-name-error"
                        role="alert"
                        className="mt-2 font-mono text-xs text-red-600 dark:text-red-400"
                      >
                        {t(errors.name)}
                      </p>
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
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={fieldClass(Boolean(errors.email))}
                    />
                    {errors.email ? (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="mt-2 font-mono text-xs text-red-600 dark:text-red-400"
                      >
                        {t(errors.email)}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <div className="flex items-center gap-3">
                {step > 0 ? (
                  <button type="button" onClick={goBack} className="btn btn-ghost">
                    {t('contact.step.back')}
                  </button>
                ) : null}
                <button type="submit" className="btn btn-primary">
                  {step === TOTAL_STEPS - 1
                    ? t('contact.form.submit')
                    : t('contact.step.next')}
                  <Icon name="arrowUpRight" className="h-4 w-4" />
                </button>
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                {step === TOTAL_STEPS - 1 ? t('contact.form.hint') : null}
              </p>
            </div>
          </form>
        </div>
      </div>
    </Section>
  )
}
