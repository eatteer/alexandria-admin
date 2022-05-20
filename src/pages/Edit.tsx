import { Form, Formik } from 'formik'
import { GrFormEdit } from 'react-icons/gr'
import { InputField } from '../components/InputField'
import { InputSelect } from '../components/InputSelect'
import { Book } from '../entities/Book'
import { edit } from '../services/books-service'

type Props = {
  book: Book
  closeModal: Function
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
}

export const Edit: React.FC<Props> = ({ book, closeModal, setBooks }) => {
  const updateBookList = (editedBook: Book) => {
    setBooks((prevBooks) => {
      const updatedBookList = prevBooks.map((book) => {
        return book.isbn13 !== editedBook.isbn13 ? book : editedBook
      })
      return updatedBookList
    })
  }

  return (
    <div>
      <div className='flex flex-col items-center'>
        <h2 className='text-3xl font-bold mb-2 text-center'>{book.title}</h2>
        <h3 className='text-lg text-gray-500 mb-4 text-center'>
          {book.isbn13}
        </h3>
      </div>
      <Formik
        initialValues={{
          stock: book.bookSaleData.stock,
          price: book.bookSaleData.price,
          /* Cast isForSale from boolean to string to handle form values correctly
          because option element only works with string values */
          isForSale: String(book.bookSaleData.isForSale),
        }}
        onSubmit={async (values) => {
          const { isForSale, ...rest } = values
          const editBookDto = {
            /* Cast isForSale from string to boolean because is the type needed for the server */
            isForSale: JSON.parse(isForSale) as boolean,
            ...rest,
          }
          try {
            const editedBook = await edit(book.isbn13, editBookDto)
            updateBookList(editedBook)
            closeModal()
          } catch (error) {
            console.error(error)
          }
        }}
      >
        {() => (
          <Form>
            <div className='mb-8 space-y-2'>
              <div>
                <label className='block mb-1 font-medium'>Stock</label>
                <InputField type='number' name='stock' min={0}/>
              </div>
              <div>
                <label className='block mb-1 font-medium'>Price</label>
                <InputField type='number' name='price' min={5000}/>
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
              Edit book
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
