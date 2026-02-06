import { useEffect, useRef, useState } from 'react'

interface UseInfiniteTableProps<T> {
  dataSource: T[]
  pageSize?: number
  resetDeps?: any[]
}

export function useInfiniteTable<T>({
  dataSource,
  pageSize = 20,
  resetDeps = [],
}: UseInfiniteTableProps<T>) {
  const [list, setList] = useState<T[]>([])
  const [limit, setLimit] = useState(pageSize)
  const [loadingMore, setLoadingMore] = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = dataSource.slice(0, pageSize)
    setList(init)
    setLimit(pageSize)
    setFinished(dataSource.length <= pageSize)
    setLoadingMore(false)
    containerRef.current?.scrollTo({ top: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource, ...resetDeps])

  const loadMore = () => {
    if (loadingMore || finished) return
    setLoadingMore(true)

    setTimeout(() => {
      const nextLimit = limit + pageSize
      const next = dataSource.slice(0, nextLimit)

      setList(next)
      setLimit(nextLimit)
      setLoadingMore(false)

      if (next.length >= dataSource.length) setFinished(true)
    }, 300)
  }

  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loadingMore || finished) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      loadMore()
    }
  }

  return {
    list,
    finished,
    loadingMore,
    containerRef,
    handleScroll,
  }
}
