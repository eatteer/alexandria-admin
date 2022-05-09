import { Form, Formik } from 'formik'
import { InputField } from '../components/InputField'
import { auth } from '../services/usersServices'

export const SignIn: React.FC = () => {
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
          console.log(user)
        } catch (error) {
          console.error(error)
        }
      }}
    >
      {() => (
        <div className='cc-container mt-16 flex justify-center'>
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
              <button
                className='cc-button cc-button-variant-primary w-full'
                type='submit'
              >
                Sign in
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  )
}
