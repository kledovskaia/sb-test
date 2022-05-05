import { DetailedHTMLProps, FC, HTMLAttributes, memo } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import cn from 'classnames'
import styles from './Error.module.scss'

type Props = ReturnType<typeof mapStateToProps> &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Error: FC<Props> = ({ className, error, ...props }) => {
  if (!error) return null

  return (
    <div className={cn(className, styles.error)} {...props}>
      {error}
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus,
      dolorum?
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  error: state.error.value,
})

export default connect(mapStateToProps)(memo(Error))
