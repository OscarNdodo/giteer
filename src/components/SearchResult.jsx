import { useState, useEffect } from 'react';
import { FiStar, FiGitBranch, FiEye, FiFilter, FiX, FiChevronDown, FiUser, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


const SearchResult = ({ searchQuery = '' }) => {
    // Estados com tipagem
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        language: '',
        stars: '',
        sort: 'best-match',
        order: 'desc'
    });
    const [activeQuickFilter, setActiveQuickFilter] = useState(null);

    // Filtros rápidos pré-definidos
    const quickFilters = [
        { label: 'Python', value: 'language:python' },
        { label: 'TypeScript', value: 'language:typescript' },
        { label: 'JavaScript', value: 'language:javascript' },
        { label: 'PHP', value: 'language:php' },
        { label: 'Java', value: 'language:java' },
        { label: 'GoLang', value: 'language:go' },
        { label: 'Ruby', value: 'language:ruby' },
        { label: '1000+ Estrelas', value: 'stars:>=1000' },
        { label: 'Atualizados', value: 'sort:updated' }
    ];

    const navigate = useNavigate()

    // Busca inicial com valores padrão
    useEffect(() => {
        if (searchQuery) {
            fetchRepos(searchQuery);
        }
    }, [searchQuery]);

    const fetchRepos = async (query) => {
        setLoading(true);
        setError(null);

        try {
            let url = `https://api.github.com/search/repositories?q=${query}`;

            // Aplica filtros
            if (filters.language) url += `+language:${encodeURIComponent(filters.language)}`;
            if (filters.stars) url += `+stars:>=${filters.stars}`;
            if (filters.sort !== 'best-match') url += `&sort=${filters.sort}&order=${filters.order}`;

            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                setRepos(data.items || []);
            } else {
                throw new Error(data.message || 'Erro ao buscar repositórios');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };



    const applyQuickFilter = (filterValue) => {
        const [key, value] = filterValue.split(':');
        let newFilters = { ...filters };

        if (key === 'language') {
            newFilters.language = value;
        } else if (key === 'stars') {
            newFilters.stars = value.replace('>=', '');
        } else if (key === 'sort') {
            newFilters.sort = value;
        }

        setFilters(newFilters);
        setActiveQuickFilter(filterValue);
        fetchRepos(searchQuery);
    };




    const findRepos = (event) => {
        const value = event.target.value;
        fetchRepos(value)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            <header className="bg-white text-gray-700 pb-4 sticky top-0 left-0 z-30 shadow-sm peer-hover:transition-opacity">
                <div className="container mx-auto px-4 pt-4">
                    <div className="flex justify-between items-center gap-4">
                        {/* Logo e Nome */}
                        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                            <div className="w-8 h-8 bg-[#d84506] rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#d84506] ml-1 to-orange-400 bg-clip-text text-transparent">
                                Giteer
                            </h1>
                        </div>

                        <button className="md:hidden text-gray-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>


                        {/* Menu */}
                        <nav className="hidden md:flex space-x-6 text-sm">
                            <a href="#" className="hover:text-amber-400 transition flex items-center">
                                <FiStar className="mr-1" /> Favoritos
                            </a>
                            <a href="#" className="hover:text-amber-400 transition flex items-center">
                                <FiClock className="mr-1" /> Recentes
                            </a>
                            <a href="#" className="hover:text-amber-400 border rounded-full p-2  transition">
                                <FiUser className='h-4 w-4 text-gray-800' />
                            </a>
                        </nav>
                    </div>
                </div>
            </header>


            {/* Corpo principal com layout sidebar + resultados */}
            <main className="container mx-auto p-4 flex flex-col-reverse md:flex-row gap-6 py-10">
                {/* Sidebar de Filtros (direita em desktop) */}
                <aside className="md:w-1/4 md:order-last">
                    <div className="bg-white p-6 px-4 rounded-lg shadow-sm border border-gray-200 sticky top-4">
                        <h2 className="text-lg font-semibold mb-4 flex items-center">
                            <FiFilter className="mr-2 text-amber-600" />
                            Filtros
                        </h2>

                        {/* Filtros Rápidos */}
                        <div className="mb-6">
                            <h3 className="text-xs font-medium text-gray-700 mb-2 bg-orange-100 rounded p-1 px-2">Filtros Populares</h3>
                            <div className="flex flex-wrap gap-2">
                                {quickFilters.map((filter) => (
                                    <button
                                        key={filter.value}
                                        onClick={() => applyQuickFilter(filter.value)}
                                        className={`text-xs px-3 py-1 rounded-full ${activeQuickFilter === filter.value
                                            ? 'bg-amber-500 text-white'
                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                            }`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filtro por Linguagem */}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-700 mb-1 bg-orange-100 rounded p-1 px-2">Linguagem</label>
                            <input
                                type="text"
                                value={filters.language}
                                onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                                placeholder="Ex: TypeScript"
                                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>

                        {/* Filtro por Stars */}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-700 mb-1 bg-orange-100 rounded p-1 px-2">Mínimo de Stars</label>
                            <input
                                type="number"
                                value={filters.stars}
                                onChange={(e) => setFilters({ ...filters, stars: e.target.value })}
                                placeholder="Ex: 100"
                                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>

                        {/* Ordenação */}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-700 mb-1 bg-orange-100 rounded p-1 px-2">Ordenar por</label>
                            <select
                                value={filters.sort}
                                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            >
                                <option value="best-match">Melhor resultado</option>
                                <option value="stars">Mais estrelas</option>
                                <option value="forks">Mais forks</option>
                                <option value="updated">Atualizados</option>
                            </select>
                        </div>

                        {/* Botão Aplicar */}
                        <button
                            onClick={() => fetchRepos(searchQuery)}
                            className="w-full bg-amber-600 text-white text-sm py-2 px-4 rounded-md hover:bg-amber-700 transition flex items-center justify-center"
                        >
                            Aplicar Filtros
                        </button>
                    </div>
                </aside>


                {/* Área de Resultados */}
                <div className="md:w-3/4">
                    {/* Barra de pesquisa */}
                    <div className="flex items-center bg-white rounded-lg mb-5 hover:shadow-amber-300 shadow-sm border border-gray-200 overflow-hidden">
                        <input
                            type="text"
                            defaultValue={searchQuery}
                            onChange={findRepos}
                            placeholder="Pesquise pelo termo...  (ex. dompdf)"
                            className="flex-1 px-5 sm:px-10 py-4 sm:py-5 focus:outline-none"
                        />
                        <button className="px-8 py-5 text-amber-500 opacity-70 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                    {/* Status da Busca */}
                    {loading && (
                        <div className="flex justify-center items-center p-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                            <div className="flex items-center">
                                <FiX className="text-red-500 mr-2" />
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    )}



                    {/* Contagem de Resultados */}
                    {!loading && !error && (
                        <div className="mb-4 hidden sm:flex justify-between items-center">
                            <p className="text-gray-600 text-xs ">
                                {repos.length > 0
                                    ? `#${repos.length} repositórios encontrados para: ${searchQuery || "Todos os repositórios"}`
                                    : 'Nenhum repositório encontrado'
                                }
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                                <span>Ordenado por: </span>
                                <span className="ml-1 font-medium text-gray-700">
                                    {filters.sort === 'best-match' ? 'Relevância' :
                                        filters.sort === 'stars' ? 'Estrelas' :
                                            filters.sort === 'forks' ? 'Forks' : 'Atualização'}
                                </span>
                                <FiChevronDown className="ml-1" />
                            </div>
                        </div>
                    )}



                    {/* Lista de Repositórios */}
                    {!loading && repos.length > 0 && (
                        <div className="space-y-4">
                            {repos.map((repo) => (
                                <div key={repo.id} className="bg-white p-6 rounded-lg  border border-gray-200 hover:shadow-md transition">
                                    <div className=" flex justify-between">
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex text-lg font-semibold text-amber-600 hover:underline"
                                        >
                                            <img
                                                src={repo.owner.avatar_url}
                                                alt={`Avatar de ${repo.owner.login}`}
                                                className="w-10 h-10 rounded-full mr-2"
                                            />
                                            <div className='flex flex-col'>
                                                <span>{repo.full_name}</span>
                                                <small className='text-gray-500 text-sm -mt-1'>
                                                    {repo.owner.type == "User" ? "Desenvolvedor" : "Empresa"}
                                                    {/* <FaBalanceScale /> */}
                                                    {/* {repo.license.key} */}
                                                </small>
                                            </div>
                                        </a>
                                        <span className={`text-xs px-3 py-1 h-6 rounded-full ${repo.private ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {repo.private ? 'Privado' : 'Público'}
                                        </span>
                                    </div>

                                    {repo.description && (
                                        <p className="text-gray-600 mt-2">{repo.description}</p>
                                    )}

                                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                        {repo.language && (
                                            <span className="flex items-center">
                                                <span className="w-3 h-3 rounded-full bg-gray-300 mr-1"></span>
                                                {repo.language}
                                            </span>
                                        )}
                                        <span className="flex items-center">
                                            <FiStar className="mr-1" />
                                            {repo.stargazers_count.toLocaleString()}
                                        </span>
                                        <span className="flex items-center">
                                            <FiGitBranch className="mr-1" />
                                            {repo.forks_count.toLocaleString()}
                                        </span>
                                        <span className="flex items-center">
                                            <FiEye className="mr-1" />
                                            {repo.watchers_count.toLocaleString()}
                                        </span>
                                        <span className="ml-auto">
                                            Atualizado em {new Date(repo.updated_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SearchResult;