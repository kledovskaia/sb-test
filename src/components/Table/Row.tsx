import { DetailedHTMLProps, FC, HTMLAttributes, memo } from 'react'

type Props = {
  item: Post
} & DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>

const Row: FC<Props> = ({ item }) => {
  return (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>{item.body}</td>
    </tr>
  )
}

export default memo(Row)
