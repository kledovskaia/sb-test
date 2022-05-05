import { DetailedHTMLProps, FC, HTMLAttributes, memo } from 'react'
import cn from 'classnames'
import styles from './Loader.module.scss'
import { RootState } from '../../redux/store'
import { connect } from 'react-redux'

type Props = ReturnType<typeof mapStateToProps> &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Loader: FC<Props> = ({ className, isLoading, ...props }) => {
  if (!isLoading) return null

  return <div className={cn(className, styles.loader)} {...props} />
}

const mapStateToProps = (state: RootState) => ({
  isLoading: state.loading.value,
})

export default connect(mapStateToProps)(memo(Loader))
