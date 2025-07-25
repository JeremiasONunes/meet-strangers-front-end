export default function Controls() {
  return (
    <div className="flex gap-3 mt-4">
      <button
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl shadow transition duration-200"
      >
        Próximo
      </button>
      <button
        className="flex-1 bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 rounded-xl shadow transition duration-200"
      >
        Sair
      </button>
    </div>
  )
}
