export default function Loading({ message = "Carregando..." }) {
  return (
    <div className="bg-white w-[90%] min-h-[735px] max-h-[735px] my-[1%] mx-[4%] shadow-md rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}
