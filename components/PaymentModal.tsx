interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const PaymentModal = ({
  isOpen,
  onClose,
  onConfirm,
}: PaymentModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-[#1a1a1c] border border-purple-500/50 p-8 rounded-2xl max-w-sm w-full text-center shadow-[0_0_50px_rgba(168,85,247,0.4)] animate-in zoom-in-95 duration-300">
        <h3 className="text-2xl font-bold mb-4 text-white">🔮 VIP-разбор</h3>
        <p className="text-gray-400 mb-6">
          Получите полный анализ вашей судьбы всего за 190 рублей.
        </p>

        <button
          onClick={onConfirm}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-bold text-white hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-500/20"
        >
          Оплатить 190₽
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-gray-500 text-sm hover:text-gray-300 transition-colors hover:underline"
        >
          Отмена
        </button>
      </div>
    </div>
  );
};
