import { projects } from '../../../data/projects'
import type { ProjectCategory, ProjectLocale } from '../../../data/projects'
import { sectorLabelKey, sectorOrder } from '../../../data/sectors'
import type { SectorId } from '../../../data/sectors'
import type { TranslationKey } from '../../../i18n/translations'
import { useLanguage } from '../../../i18n/useLanguage'

export type CategoryFilter = 'all' | ProjectCategory
export type LocaleFilter = 'all' | ProjectLocale
export type SectorFilter = 'all' | SectorId

/** Only sectors that actually have a project get a filter, in display order. */
const sectorsInUse = sectorOrder.filter((sector) =>
  projects.some((project) => project.sectors.includes(sector))
)

const categoryOptions: { value: CategoryFilter; labelKey: TranslationKey }[] = [
  { value: 'all', labelKey: 'projects.filter.all' },
  { value: 'institutional', labelKey: 'projects.filter.institutional' },
  { value: 'platform', labelKey: 'projects.filter.platform' },
]

const localeOptions: { value: LocaleFilter; labelKey: TranslationKey }[] = [
  { value: 'all', labelKey: 'projects.filter.all' },
  { value: 'br', labelKey: 'projects.filter.br' },
  { value: 'intl', labelKey: 'projects.filter.intl' },
]

function FilterGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string
  options: { value: T; labelKey: TranslationKey; count?: number }[]
  value: T
  onChange: (value: T) => void
}) {
  const { t } = useLanguage()

  return (
    <fieldset className="min-w-0">
      <legend className="overline text-muted-foreground">{legend}</legend>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:items-start lg:gap-1 lg:overflow-visible lg:pb-0">
        {options.map((option) => {
          const isActive = value === option.value
          const isEmpty = option.count === 0 && !isActive
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isActive}
              disabled={isEmpty}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 lg:rounded-none lg:border-l-2 lg:px-3 lg:py-1.5 ${
                isActive
                  ? 'bg-primary text-primary-foreground lg:bg-transparent lg:border-primary lg:text-primary'
                  : 'border border-border text-muted-foreground hover:text-foreground lg:border lg:border-transparent lg:border-l-2'
              }`}
            >
              {t(option.labelKey)}
              {option.count !== undefined ? (
                <>
                  <span aria-hidden="true" className="ml-1.5 font-mono text-xs">
                    {option.count}
                  </span>
                  <span className="sr-only">
                    {' '}
                    {option.count}{' '}
                    {t(
                      option.count === 1 ? 'projects.count.one' : 'projects.count.other'
                    )}
                  </span>
                </>
              ) : null}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export function ProjectFilters({
  sectorCounts,
  sector,
  category,
  locale,
  onSectorChange,
  onCategoryChange,
  onLocaleChange,
  count,
}: {
  /** Per-sector result counts given the *other* active filters. */
  sectorCounts: Record<SectorId, number>
  sector: SectorFilter
  category: CategoryFilter
  locale: LocaleFilter
  onSectorChange: (value: SectorFilter) => void
  onCategoryChange: (value: CategoryFilter) => void
  onLocaleChange: (value: LocaleFilter) => void
  count: number
}) {
  const { t } = useLanguage()
  const sectorOptions: {
    value: SectorFilter
    labelKey: TranslationKey
    count?: number
  }[] = [
    { value: 'all', labelKey: 'projects.filter.all' },
    ...sectorsInUse.map((id) => ({
      value: id as SectorFilter,
      labelKey: sectorLabelKey[id],
      count: sectorCounts[id],
    })),
  ]

  return (
    <div className="-mx-1 flex flex-col gap-6 px-1 lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:gap-8 lg:overflow-y-auto">
      <FilterGroup
        legend={t('projects.filters.sector')}
        options={sectorOptions}
        value={sector}
        onChange={onSectorChange}
      />
      <FilterGroup
        legend={t('projects.filters.category')}
        options={categoryOptions}
        value={category}
        onChange={onCategoryChange}
      />
      <FilterGroup
        legend={t('projects.filters.locale')}
        options={localeOptions}
        value={locale}
        onChange={onLocaleChange}
      />
      <p aria-live="polite" className="font-mono text-xs text-muted-foreground">
        {count} {t(count === 1 ? 'projects.count.one' : 'projects.count.other')}
      </p>
    </div>
  )
}
