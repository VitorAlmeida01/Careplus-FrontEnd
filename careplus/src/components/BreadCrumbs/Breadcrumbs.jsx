import { Link, useLocation } from "react-router-dom"
import { BREADCRUMB_LABELS } from "../../config/breadCrumbsConfig"
import { logoutService } from "../../service/login/login.service"

export default function Breadcrumbs() {
  const location = useLocation()

  const pathnames = location.pathname
    .split("/")
    .filter(Boolean)

  return (
    <nav className="breadcrumbs">
      <Link to="/" onClick={logoutService}>Início</Link>

      {pathnames.map((segment, index) => {
        const path = "/" + pathnames.slice(0, index + 1).join("/")
        const label = BREADCRUMB_LABELS[segment] || segment

        return (
          <span key={path}>
            {" > "}
            {index === pathnames.length - 1 ? (
              <span className="current">{label}</span>
            ) : (
              <Link to={path}>{label}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}