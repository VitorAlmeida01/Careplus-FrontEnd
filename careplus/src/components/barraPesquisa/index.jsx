import './style.css'
import { FiSearch, FiX } from 'react-icons/fi'
import { useRef, useState } from 'react'

export default function BarraPesquisa({ query, onQueryChange, sugestoes = [], onSelect }) {
    const [aberto, setAberto] = useState(false)
    const containerRef = useRef(null)

    const isControlled = onQueryChange !== undefined

    const handleChange = (e) => {
        if (isControlled) {
            onQueryChange(e.target.value)
            setAberto(true)
        }
    }

    const handleSelect = (item) => {
        if (onSelect) onSelect(item)
        setAberto(false)
    }

    const handleClear = () => {
        if (isControlled) {
            onQueryChange('')
            if (onSelect) onSelect(null)
        }
        setAberto(false)
    }

    const handleBlur = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.relatedTarget)) {
            setAberto(false)
        }
    }

    return (
        <div ref={containerRef} className='containerInput' style={{ position: 'relative' }} onBlur={handleBlur}>
            <FiSearch className='iconeLupa' size={20} />
            <input
                type="text"
                className='inputPesquisa'
                placeholder='Pesquisar'
                value={isControlled ? (query || '') : undefined}
                onChange={handleChange}
                onFocus={() => { if (sugestoes.length > 0) setAberto(true) }}
            />
            {isControlled && query && (
                <button
                    type="button"
                    onClick={handleClear}
                    style={{ position: 'absolute', right: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center' }}
                >
                    <FiX size={16} />
                </button>
            )}
            {isControlled && aberto && sugestoes.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    zIndex: 50,
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                    minWidth: 260,
                    maxHeight: 220,
                    overflowY: 'auto',
                    padding: 0,
                    margin: 0,
                    listStyle: 'none',
                }}>
                    {sugestoes.map((item) => (
                        <li
                            key={item.id}
                            onMouseDown={() => handleSelect(item)}
                            style={{ padding: '8px 14px', cursor: 'pointer', fontSize: 13, borderBottom: '1px solid #f3f4f6' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#EEF4FF'}
                            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                        >
                            <p style={{ margin: 0, fontWeight: 500, color: '#1e293b' }}>{item.nome}</p>
                            <p style={{ margin: 0, color: '#9ca3af', fontSize: 12 }}>{item.email}</p>
                        </li>
                    ))}
                </ul>
            )}
            {isControlled && aberto && query && query.length >= 2 && sugestoes.length === 0 && (
                <div style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    zIndex: 50,
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                    minWidth: 260,
                    padding: '10px 14px',
                    fontSize: 13,
                    color: '#9ca3af',
                }}>
                    Nenhum resultado encontrado
                </div>
            )}
        </div>
    )
}