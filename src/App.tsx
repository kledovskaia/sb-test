import { FC, HTMLAttributes, DetailedHTMLProps } from 'react'
import cn from 'classnames'
import styles from './styles/App.module.scss'
import Search from './components/Search/Search'
import Pagination from './components/Pagination/Pagination'
import Table from './components/Table/Table'

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const App: FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn(className, styles.app)} {...props}>
      <Search />
      <Table
        className={styles.app__table}
        items={[
          {
            userId: 1,
            id: 1,
            title: 'test title',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
          },
        ]}
      />
      <Pagination />
    </div>
  )
}

export default App
