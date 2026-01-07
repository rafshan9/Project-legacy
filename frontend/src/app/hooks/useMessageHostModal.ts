import { create } from 'zustand';

interface MessageHostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMessageHostModal = create<MessageHostModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMessageHostModal;