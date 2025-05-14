import { ReactNode, createContext, useContext, useState } from "react";

interface BookingModalContextProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextProps>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  toggleModal: () => {},
});

export const BookingModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <BookingModalContext.Provider value={{ isOpen, openModal, closeModal, toggleModal }}>
      {children}
    </BookingModalContext.Provider>
  );
};

export const useBookingModal = () => useContext(BookingModalContext);