export const SITE_BIRTH_DATE = '2025-12-30'

export const journalMeta = [
  { id: 'lost-and-rebuild', date: '2026-04-10', wordCount: 1384 },
  { id: 'emotional-overload', date: '2026-03-05', wordCount: 835 },
  { id: 'untitled-2025', date: '2025-12-30', wordCount: 1047 },
]

export function getJournalStats(now = new Date()) {
  const siteBirth = new Date(SITE_BIRTH_DATE)
  const days = Math.floor((now - siteBirth) / 86400000)
  const words = journalMeta.reduce((total, entry) => total + entry.wordCount, 0)
  const lastUpdated = journalMeta.reduce(
    (latest, entry) => entry.date > latest ? entry.date : latest,
    ''
  )

  return {
    days,
    words,
    posts: journalMeta.length,
    lastUpdated,
  }
}
