import { useState, useEffect, useRef, useMemo } from 'react'

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
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // 當依賴改變 (如切換 ViewMode) 時，重置滾動狀態
  useEffect(() => {
    setPage(1)
    setLoadingMore(false)
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, resetDeps)

  // 模擬前端分頁切片
  const list = useMemo(() => {
    return dataSource.slice(0, page * pageSize)
  }, [dataSource, page, pageSize])

  const finished = list.length >= dataSource.length

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget

    // 簡單的觸發條件：捲軸接近底部 10px 且沒有在載入中
    if (
      scrollHeight - scrollTop - clientHeight < 10 &&
      !loadingMore &&
      !finished
    ) {
      setLoadingMore(true)
      // 模擬網路延遲 0.5 秒
      setTimeout(() => {
        setPage((prev) => prev + 1)
        setLoadingMore(false)
      }, 500)
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
