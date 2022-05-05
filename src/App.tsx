import { FC, HTMLAttributes, DetailedHTMLProps } from 'react'
import cn from 'classnames'
import styles from './styles/App.module.scss'
import Search from './components/Search/Search'
import Pagination from './components/Pagination/Pagination'

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const App: FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn(className, styles.app)} {...props}>
      <Search />
      <Pagination />
    </div>
  )
}

export default App
