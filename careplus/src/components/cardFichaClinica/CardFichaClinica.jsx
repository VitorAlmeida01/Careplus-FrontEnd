const Header = ({ children }) => (
  <div className="p-1 border-b border-gray-100 bg-blue-50/50">{children}</div>
)

const Body = ({ children }) => <div className="p-4 space-y">{children}</div>

const Footer = ({ children }) => (
  <div className="p-1 flex flex-col gap-2">{children}</div>
)

export default function CardFichaClinica({ children, estilo }) {
  return (
    <div
      className={` w-full h-full  p-2.5 shadow-xl rounded-md bg-[#F3F4F6] flex-wrap ${estilo}`}
    >
      {children}
    </div>
  )
}

CardFichaClinica.Header = Header
CardFichaClinica.Body = Body
CardFichaClinica.Footer = Footer
