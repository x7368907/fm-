import { useState, useEffect, useRef, useMemo } from 'react'

interface UseInfiniteTableProps<T> {
  dataSource: T[]
  pageSize?: number
  resetDeps?: any[] // 用來觸發重置的依賴 (例如 viewMode 切換)
}

export function useInfiniteTable<T>({
  dataSource,
  pageSize = 20,
  resetDeps = [],
}: UseInfiniteTableProps<T>) {
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // 當依賴改變 (如切換分頁) 時，重置滾動狀態
  useEffect(() => {
    setPage(1)
    setLoadingMore(false)
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, resetDeps)

  // 計算目前要顯示的資料列表 (模擬前端分頁)
  const list = useMemo(() => {
    return dataSource.slice(0, page * pageSize)
  }, [dataSource, page, pageSize])

  // 是否已載入全部
  const finished = list.length >= dataSource.length

  // 滾動監聽
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget

    // 簡單的觸發條件：捲軸接近底部 10px 且沒有在載入中、還有資料沒載完
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
