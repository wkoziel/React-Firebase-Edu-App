import { createContext, useContext, useState } from 'react'
import Modal from '../Components/Modal/Modal'

interface ModalContextInterface {
  openModal: (title: string, text: string, buttonText: string) => void
}

const ModalContext = createContext<ModalContextInterface | undefined>(undefined)

export const useModalContext = (): ModalContextInterface => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModalContext must be within UserContextProvider')
  }

  return context
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [buttonText, setButtonText] = useState('')

  const onClose = () => {
    setIsOpen(false)
  }

  const openModal = (title = '', text = '', buttonText = '') => {
    setTitle(title)
    setText(text)
    setButtonText(buttonText)
    setIsOpen(true)
  }

  const value: ModalContextInterface = { openModal }

  return (
    <ModalContext.Provider value={value}>
      {
        <>
          {isOpen && <Modal open={isOpen} title={title} text={text} buttonText={buttonText} onClose={onClose} />}
          {children}
        </>
      }
    </ModalContext.Provider>
  )
}
