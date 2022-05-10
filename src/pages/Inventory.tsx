import { useEffect, useState } from 'react'
import { Book } from '../entities/Book'
import useModal from '../hooks/useModal'
import { Modal } from '../components/Modal'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { GrFormEdit } from 'react-icons/gr'
import { Register } from './Register'
import { Edit } from './Edit'
import { Topbar } from '../components/Topbar'
export const Inventory: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null)
  const [books, setBooks] = useState<Book[]>([])

  const {
    isOpen: isOpenEditModal,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal()
  const {
    isOpen: isOpenRegisterModal,
    openModal: openRegisterModal,
    closeModal: closeRegisterModal,
  } = useModal()

  useEffect(() => {
    const searchAllBooks = async () => {
      const response = await fetch('http://localhost:3100/books')
      if (response.ok) {
        const books = await response.json()
        setBooks(books)
      }
    }
    searchAllBooks()
  }, [])

  return (
    <>
      <Topbar />
      <div>
        <div className='container mt-8'>
          <button className='button button-primary' onClick={openRegisterModal}>
            Register book
            <span>
              <IoMdAddCircleOutline size={24} />
            </span>
          </button>
          <table className='w-full border-collapse table-auto mt-8'>
            <thead className='bg-gray-200'>
              <tr className='border-b border-b-gray-300 text-gray-800 text-left hover:bg-gray-200'>
                <th className='p-2'>Thumbnail</th>
                <th>ISBN13</th>
                <th>Title</th>
                <th>For sale</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            {books[0] && (
              <tbody>
                {books.map((book) => {
                  const isForSale = book.bookSaleData.isForSale ? 'Yes' : 'No'
                  const variant = book.bookSaleData.isForSale
                    ? 'badge-green'
                    : 'badge-red'
                  return (
                    <tr
                      className='border-b border-b-gray-300 text-gray-800 text-left hover:bg-gray-200'
                      key={book.isbn13}
                    >
                      <td className='p-2'>
                        <img
                          className='h-12 rounded'
                          src={book.thumbnail}
                          alt='Book thumbnail'
                        />
                      </td>
                      <td>{book.isbn13}</td>
                      <td>{book.title}</td>
                      <td>
                        <span className={`badge ${variant}`}>{isForSale}</span>
                      </td>
                      <td>{book.bookSaleData.stock}</td>
                      <td>${book.bookSaleData.price}</td>
                      <td>
                        <button
                          className='badge-button badge-button-blue'
                          onClick={() => {
                            setBook(book)
                            openEditModal()
                          }}
                        >
                          <GrFormEdit size={24} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <Modal isOpen={isOpenEditModal} closeModal={closeEditModal}>
        <Edit book={book!} closeModal={closeEditModal} setBooks={setBooks} />
      </Modal>
      <Modal isOpen={isOpenRegisterModal} closeModal={closeRegisterModal}>
        <Register closeModal={closeRegisterModal} setBooks={setBooks} />
      </Modal>
    </>
  )
}
