import { MouseEventHandler } from 'react'
import { GrFormClose } from 'react-icons/gr'

type Props = {
  isOpen: boolean
  closeModal: Function
  children: JSX.Element
}

export const Modal: React.FC<Props> = ({ isOpen, closeModal, children }) => {
  const onClickCloseModal: MouseEventHandler = () => {
    closeModal()
  }

  return (
    <>
      {isOpen && (
        /* Background */
        <div className='fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-[#111111bd] backdrop-blur-sm'>
          {/* Container */}
          <div className='w-96'>
            {/* Header */}
            <div className='flex p-2 rounded-tl-xl rounded-tr-xl bg-white border-b border-b-gray-300'>
              <button onClick={onClickCloseModal}>
                <GrFormClose size={24} />
              </button>
            </div>
            {/* Content */}
            <div className='p-8 rounded-bl-xl rounded-br-xl bg-white'>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
