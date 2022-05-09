type EditBookDto = {
  isForSale: boolean
  stock: number
  price: number
}

export const edit = async (isbn13: string, editBookDto: EditBookDto) => {
  const response = await fetch(`http://localhost:3100/books/${isbn13}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editBookDto)
  })
  if (response.ok) {
    const book = await response.json()
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

export const register = async (registerBookDto: RegisterBookDto) => {
  const response = await fetch('http://localhost:3100/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerBookDto)
  })
  if (response.ok) {
    const book = await response.json()
    return book
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}