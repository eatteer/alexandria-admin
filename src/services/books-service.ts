import { Book } from "../entities/Book"

type EditBookDto = {
  isForSale: boolean
  stock: number
  price: number
}

export const edit = async (isbn13: string, editBookDto: EditBookDto): Promise<Book> => {
  const response = await fetch(`http://localhost:3100/books/${isbn13}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editBookDto)
  })
  if (response.ok) {
    const book = await response.json() as Book
    return book
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}

type RegisterBookDto = {
  isbn13: string
  isForSale: boolean
  stock: number
  price: number
}

export const register = async (registerBookDto: RegisterBookDto): Promise<Book> => {
  const response = await fetch('http://localhost:3100/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerBookDto)
  })
  if (response.ok) {
    const book = await response.json() as Book
    return book
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}