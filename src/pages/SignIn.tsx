import { Form, Formik } from 'formik'
import { InputField } from '../components/InputField'
import { auth } from '../services/users-services'
import { login } from '../redux/user/actions'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { toastErrorOptions } from '../components/toast/toast-options'
import { useNavigate } from 'react-router-dom'

export const SignIn: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={(values) => {
        const errors: any = {}
        if (!values.username) {
          errors.username = 'Required'
        }
        if (!values.password) {
          errors.password = 'Required'
        }
        return errors
      }}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values) => {
        const { username, password } = values
        try {
          const user = await auth(username, password)
          dispatch(login(user))
          navigate('/inventory')
        } catch (error: any) {
          toast.error(error.message, toastErrorOptions)
          console.error(error)
        }
      }}
    >
      {() => (
        <div className='container mt-16 flex justify-center'>
          <Form className='w-96 p-8 bg-white border rounded-lg drop-shadow-md'>
            <h2 className='mb-2 text-4xl text-center font-bold'>Sign in</h2>
            <h3 className='mb-4 text-lg text-center text-gray-500 '>
              Sign in with your username here
            </h3>
            <div className='space-y-4'>
              <InputField type='text' name='username' placeholder='Username' />
              <InputField
                type='password'
                name='password'
                placeholder='Password'
              />
              <button className='button button-primary w-full' type='submit'>
                Sign in
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  )
}
