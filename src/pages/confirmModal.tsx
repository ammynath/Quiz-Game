export default function ConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className=" bg-blacfix the k/40 backdrop-blur-sm absolute inset-0 flex items-center justify-center">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center z-10">
        <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
        <p className="mb-6">
          Are you sure you want to clear the entire leaderboard?
        </p>
        <div className="flex justify-center gap-5">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
            onClick={onConfirm}
          >
            Yes, Clear
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
