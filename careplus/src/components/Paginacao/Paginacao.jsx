import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { listarFuncionarios } from "@/src/service/funcionarios/funcionarios.service"

import { useEffect, useState, useMemo } from "react"

export function Paginacao({ page, setPage }) {

    const [totalPaginas, setTotalPaginas] = useState(0)
    
    const paginasAtuais = useMemo(() => {
        return [page - 1, page, page + 1].filter(p => p >= 0 && p < totalPaginas)
    }, [page, totalPaginas])

    async function getPaginas(pagina) {
        listarFuncionarios(pagina).then((response) => {
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
                    <PaginationPrevious href="#" onClick={() => page > 0 && setPage(page - 1)} />
                </PaginationItem>
                {paginasAtuais.map((pagina, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink href="#" onClick={() => setPage(pagina)} isActive={page === pagina}>
                            {pagina + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href='#' onClick={() => page < totalPaginas - 1 && setPage(page + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
