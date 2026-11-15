import type { TranslationKey } from '../i18n/translations'

export type SectorId =
  | 'education'
  | 'retail'
  | 'saas'
  | 'biotech'
  | 'proptech'
  | 'collectibles'
  | 'fintech'
  | 'community'

/** Display order for sector filters and tags. */
export const sectorOrder: SectorId[] = [
  'education',
  'saas',
  'biotech',
  'retail',
  'proptech',
  'collectibles',
  'fintech',
  'community',
]

export const sectorLabelKey: Record<SectorId, TranslationKey> = {
  education: 'sector.education',
  retail: 'sector.retail',
  saas: 'sector.saas',
  biotech: 'sector.biotech',
  proptech: 'sector.proptech',
  collectibles: 'sector.collectibles',
  fintech: 'sector.fintech',
  community: 'sector.community',
}
