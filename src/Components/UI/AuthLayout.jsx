import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from './Icon'
const AuthLayout = ({children, title, subtitle}) => {
  return (
    <>
      <div className='main flex flex-col items-center w-full min-h-screen justify-between pt-4 pb-10 gap-4'>
        <div className='layout w-full'>
          <Link to="/" className='h-10 w-10 btn bg-light border border-line rounded-md'>
          <Icon>arrow_back</Icon>
          </Link>
          <div className='flex flex-col gap-6'>
            <div className='mt-6 text-center'>
              <h3 className='font-semibold font-sora text-xl'>{title}</h3>
              <p className='text-sub '>{subtitle}</p>
            </div>
          <div>{ children}</div>
          </div>
        </div>

      </div>
    </>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

export default AuthLayout