import { useState } from "react";

export function useModal(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return [isOpen, openModal, closeModal];
}
