import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

type UsePage = (page: number | null, setPage: (arg: number) => void) => void

export const usePageRouting: UsePage = (page, setPage) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const pageParam = searchParams.get('page')
    if (pageParam) setPage(+pageParam)
    else setPage(1)
  }, [searchParams, setPage])

  useEffect(() => {
    if (!page) return
    navigate(`/?page=${page}`)
  }, [page, navigate])
}
