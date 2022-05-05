import { DetailedHTMLProps, FC, HTMLAttributes, memo } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import { RootState } from '../../redux/store'

import styles from './Loader.module.scss'

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Loader: FC<Props> = ({ className, isLoading, ...props }) => {
  if (!isLoading) return null

  return <div className={cn(className, styles.loader)} {...props} />
}

const mapStateToProps = (state: RootState) => ({
  isLoading: state.loading.value,
})
const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Loader))
