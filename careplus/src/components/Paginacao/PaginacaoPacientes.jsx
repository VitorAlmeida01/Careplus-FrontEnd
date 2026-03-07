import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { listarPacitentes } from "@/src/service/pacientes/pacientes.service"

import { useEffect, useState, useMemo } from "react"

export function PaginacaoPacientes({ page, setPage }) {

    const [totalPaginas, setTotalPaginas] = useState(0)
    
    const paginasAtuais = useMemo(() => {
        return [page - 1, page, page + 1].filter(p => p >= 0 && p < totalPaginas)
    }, [page, totalPaginas])

    async function getPaginas(pagina) {
        listarPacitentes(pagina).then((response) => {
            setTotalPaginas(response.totalPages)
            console.log('Total de páginas:', response.totalPages)
        })
    }

    useEffect(() => {
        console.log('Página atual:', page)
        getPaginas(page)
    }, [page])

    useEffect(() => {
        console.log('Paginas atuais', paginasAtuais)
    }, [paginasAtuais])





    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={`?page=${page - 1}`} onClick={(e) => {
                        e.preventDefault()
                        page > 0 && setPage(page - 1)
                    }} />
                </PaginationItem>
                {paginasAtuais.map((pagina, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink href={`?page=${pagina}`} onClick={(e) => {
                            e.preventDefault()
                            setPage(pagina)
                        }} isActive={page === pagina}>
                            {pagina + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href={`?page=${page + 1}`} onClick={(e) => {
                        e.preventDefault()
                        page < totalPaginas - 1 && setPage(page + 1)
                    }} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
