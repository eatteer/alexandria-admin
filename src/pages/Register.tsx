import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { Book } from '../entities/Book'
import { register } from '../services/books-service'
import { InputField } from '../components/InputField'
import { InputSelect } from '../components/InputSelect'
import {
  toastSuccessOptions,
  toastErrorOptions,
} from '../components/toast/toast-options'

type Props = {
  closeModal: Function
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
}

export const Register: React.FC<Props> = ({ closeModal, setBooks }) => {
  const updateBookList = (newBook: Book) => {
    setBooks((prevBooks) => {
      const updatedBooks = [...prevBooks, newBook]
      return updatedBooks
    })
  }

  return (
    <Formik
      initialValues={{ isbn13: '', stock: 10, price: 5000, isForSale: 'true' }}
      validate={(values) => {
        let errors: any = {}
        if (!values.isbn13) {
          errors.isbn13 = 'Required'
        }
        return errors
      }}
      onSubmit={async (values) => {
        const { isForSale, ...rest } = values
        const registerBookDto = {
          isForSale: JSON.parse(isForSale) as boolean,
          ...rest,
        }
        try {
          const newBook = await register(registerBookDto)
          updateBookList(newBook)
          toast.success('Book registered successfully', toastSuccessOptions)
          closeModal()
        } catch (error: any) {
          toast.error(error.message, toastErrorOptions)
          console.error(error)
        }
      }}
    >
      {() => (
        <Form>
          <div className='mb-8 space-y-2'>
            <h2 className='text-3xl font-bold mb-4 text-center'>
              Register book
            </h2>
            <div>
              <label className='block mb-1 font-medium'>ISBN13</label>
              <InputField type='text' name='isbn13' />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Stock</label>
              <InputField type='number' name='stock' min={10} />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Price</label>
              <InputField type='number' name='price' min={5000} />
            </div>
            <div>
              <label className='block mb-1 font-medium'>For sale</label>
              <InputSelect name='isForSale'>
                {/* TODO: option cannot be styled, so create a custom select component */}
                <option value='true'>Yes</option>
                <option value='false'>No</option>
              </InputSelect>
            </div>
          </div>
          <button className='button button-primary w-full' type='submit'>
            Register book
          </button>
        </Form>
      )}
    </Formik>
  )
}
