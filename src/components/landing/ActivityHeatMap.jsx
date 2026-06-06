import { useMemo } from 'react'

export default function ActivityHeatMap({ posts }) {
  const { weeks, monthLabels } = useMemo(() => {
    const postDates = new Set(posts.map((post) => post.date))
    const today = new Date()
    const start = new Date(today)
    start.setDate(today.getDate() - 364)
    start.setDate(start.getDate() - start.getDay())

    const result = []
    const months = []
    const cursor = new Date(start)
    let lastMonth = -1
    let weekIndex = 0

    while (cursor <= today) {
      const week = []

      for (let day = 0; day < 7; day++) {
        const iso = cursor.toISOString().slice(0, 10)
        const month = cursor.getMonth()

        if (day === 0 && month !== lastMonth) {
          months.push({
            col: weekIndex,
            label: cursor.toLocaleString('default', { month: 'short' }),
          })
          lastMonth = month
        }

        week.push({
          date: iso,
          active: postDates.has(iso),
          future: cursor > today,
        })
        cursor.setDate(cursor.getDate() + 1)
      }

      result.push(week)
      weekIndex++
    }

    return {
      weeks: result,
      monthLabels: months.map((month) => ({
        ...month,
        pct: (month.col / weekIndex) * 100,
      })),
    }
  }, [posts])

  return (
    <div className="heatmap-wrap">
      <div style={{ position: 'relative' }}>
        <div className="heatmap-months">
          {monthLabels.map((month) => (
            <span
              key={`${month.col}-${month.label}`}
              className="heatmap-month"
              style={{ left: `${month.pct}%` }}
            >
              {month.label}
            </span>
          ))}
        </div>
        <div className="heatmap-grid" style={{ marginTop: 18 }}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="heatmap-col">
              {week.map((cell) => (
                <div
                  key={cell.date}
                  className={`heatmap-cell${cell.future ? ' future' : cell.active ? ' active' : ''}`}
                  title={cell.date}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
