const Header = ({ children }) => (
  <div className="p-1 bg-white">{children}</div>
)

const Body = ({ children }) => <div className="p-4 space-y">{children}</div>

const Footer = ({ children }) => (
  <div className="p-1 flex flex-col gap-2">{children}</div>
)

export default function CardFichaClinica({ children, estilo }) {
  return (
    <div
      className={` w-full p-2.5 shadow-xl rounded-2xl bg-[#FFFF] flex-wrap ${estilo}`}
    >
      {children}
    </div>
  )
}

CardFichaClinica.Header = Header
CardFichaClinica.Body = Body
CardFichaClinica.Footer = Footer
