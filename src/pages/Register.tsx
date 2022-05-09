import { Form, Formik } from 'formik'
import { InputField } from '../components/InputField'
import { InputSelect } from '../components/InputSelect'
import { Book } from '../entities/Book'
import { register } from '../services/booksService'

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
      initialValues={{ isbn13: '', stock: 0, price: 0, isForSale: 'true' }}
      onSubmit={async (values) => {
        const { isForSale, ...rest } = values
        const registerBookDto = {
          isForSale: JSON.parse(isForSale) as boolean,
          ...rest,
        }
        try {
          const newBook = await register(registerBookDto)
          updateBookList(newBook)
          closeModal()
        } catch (error) {
          console.error(error)
        }
      }}
    >
      {() => (
        <Form>
          <div className='mb-8 space-y-4'>
            <h2 className='text-2xl font-bold mb-4 text-center'>
              Register book
            </h2>
            <div>
              <label className='block mb-1 font-medium'>ISBN13</label>
              <InputField type='text' name='isbn13' />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Stock</label>
              <InputField type='number' name='stock' />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Price</label>
              <InputField type='number' name='price' />
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
          <button className='cc-button cc-button-variant-primary w-full' type='submit'>
            Register book
          </button>
        </Form>
      )}
    </Formik>
  )
}
