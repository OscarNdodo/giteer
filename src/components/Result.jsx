import { useState, useEffect, type JSX } from 'react';
import {
    FiStar, FiGitBranch, FiEye, FiFilter,
    FiX, FiSearch, FiChevronDown, FiGrid, FiList,
    FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { LineChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Tipos TypeScript
type Repository = {
    id: number;
    full_name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    updated_at: string;
    private: boolean;
    open_issues_count?: number;
    size?: number;
};

type Filters = {
    language: string;
    stars: string;
    sort: 'best-match' | 'stars' | 'forks' | 'updated';
    order: 'asc' | 'desc';
    page: number;
};

type quickFilters = {
    label: string;
    value: string;
    icon?: JSX.Element;
};

const Results = ({ searchQuery = '' }: { searchQuery?: string }) => {
    // Estados
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [showMetrics, setShowMetrics] = useState<boolean>(false);
    const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

    // Filtros com valores padrão
    const [filters, setFilters] = useState<Filters>({
        language: '',
        stars: '',
        sort: 'best-match',
        order: 'desc',
        page: 1
    });

    // Filtros rápidos pré-definidos
    const quickFilters: quickFilters[] = [
        { label: 'JavaScript', value: 'language:javascript' },
        { label: 'TypeScript', value: 'language:typescript' },
        { label: 'Python', value: 'language:python' },
        { label: '100+ Stars', value: 'stars:>=100' },
        { label: 'Atualizados', value: 'sort:updated' }
    ];


    // Linguagens sugeridas (baseadas nas mais populares do GitHub)
    const suggestedLanguages = [
        'JavaScript', 'TypeScript', 'Python', 'Java', 'Go',
        'Ruby', 'PHP', 'C++', 'C#', 'Swift'
    ];

    // Busca inicial
    useEffect(() => {
        if (searchQuery) {
            fetchRepos();
        }
    }, [searchQuery, filters.page]);

    const fetchRepos = async () => {
        setLoading(true);
        try {
            let url = `https://api.github.com/search/repositories?q=${searchQuery}`;

            // Filtros
            if (filters.language) url += `+language:${encodeURIComponent(filters.language)}`;
            if (filters.stars) url += `+stars:>=${filters.stars}`;

            const applyQuickFilter = (filterValue: string) => {
                const [key, value] = filterValue.split(':');
                let newFilters = { ...filters };
        
                if (key === 'language') {
                    newFilters.language = value;
                } else if (key === 'stars') {
                    newFilters.stars = value.replace('>=', '');
                } else if (key === 'sort') {
                    newFilters.sort = value as Filters['sort'];
                }
        
                setFilters(newFilters);
                applyQuickFilter(filterValue);
                // fetchRepos(searchQuery);
            };

            // Ordenação e paginação
            if (filters.sort !== 'best-match') url += `&sort=${filters.sort}&order=${filters.order}`;
            url += `&page=${filters.page}&per_page=12`;

            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                setRepos(data.items || []);
                setTotalCount(data.total_count || 0);
            } else {
                throw new Error(data.message || 'Erro ao buscar repositórios');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Dados para gráficos
    const chartData = [
        { name: 'Stars', value: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) },
        { name: 'Forks', value: repos.reduce((sum, repo) => sum + repo.forks_count, 0) },
        { name: 'Watchers', value: repos.reduce((sum, repo) => sum + repo.watchers_count, 0) },
    ];

    // Paginação
    const totalPages = Math.ceil(totalCount / 12);
    const nextPage = () => setFilters({ ...filters, page: Math.min(filters.page + 1, totalPages) });
    const prevPage = () => setFilters({ ...filters, page: Math.max(filters.page - 1, 1) });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header (como fornecido anteriormente) */}
            <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
                {/* ... conteúdo do header ... */}
            </header>

            <main className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
                {/* Sidebar de Filtros */}
                <aside className="md:w-1/4 md:order-last">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
                        {/* Controles de Visualização */}
                        <div className="flex justify-between mb-6">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-amber-100 text-amber-600' : 'text-gray-500'}`}
                            >
                                <FiList size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'text-gray-500'}`}
                            >
                                <FiGrid size={20} />
                            </button>
                            <button
                                onClick={() => setShowMetrics(!showMetrics)}
                                className={`p-2 rounded-md ${showMetrics ? 'bg-amber-100 text-amber-600' : 'text-gray-500'}`}
                            >
                                <span className="text-sm font-medium">Métricas</span>
                            </button>
                        </div>

                        {/* Linguagens Sugeridas */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Linguagens Populares</h3>
                            <div className="flex flex-wrap gap-2">
                                {suggestedLanguages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => {
                                            setFilters({ ...filters, language: lang, page: 1 });
                                            fetchRepos();
                                        }}
                                        className={`text-xs px-3 py-1 rounded-full ${filters.language === lang
                                                ? 'bg-amber-500 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filtros (como anteriormente) */}
                           {/* Sidebar de Filtros (direita em desktop) */}
                                        <aside className="md:w-1/4 md:order-last">
                                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
                                                <h2 className="text-lg font-semibold mb-4 flex items-center">
                                                    <FiFilter className="mr-2 text-amber-600" />
                                                    Filtros
                                                </h2>
                        
                                                {/* Filtros Rápidos */}
                                                <div className="mb-6">
                                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Filtros Populares</h3>
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
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Linguagem</label>
                                                    <input
                                                        type="text"
                                                        value={filters.language}
                                                        onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                                                        placeholder="Ex: TypeScript"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                                    />
                                                </div>
                        
                                                {/* Filtro por Stars */}
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mínimo de Stars</label>
                                                    <input
                                                        type="number"
                                                        value={filters.stars}
                                                        onChange={(e) => setFilters({ ...filters, stars: e.target.value })}
                                                        placeholder="Ex: 100"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                                    />
                                                </div>
                        
                                                {/* Ordenação */}
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
                                                    <select
                                                        value={filters.sort}
                                                        onChange={(e) => setFilters({ ...filters, sort: e.target.value as Filters['sort'] })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
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
                                                    className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition flex items-center justify-center"
                                                >
                                                    Aplicar Filtros
                                                </button>
                                            </div>
                                        </aside>
                        
                        {/* ... */}
                    </div>
                </aside>

                {/* Área de Resultados */}
                <div className="md:w-3/4">
                    {/* Gráficos (condicional) */}
                    {showMetrics && repos.length > 0 && (
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                            <h3 className="text-lg font-semibold mb-4">Métricas dos Resultados</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#F59E0B" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {/* Lista/Grid de Resultados */}
                    {viewMode === 'list' ? (
                        <div className="space-y-4">
                            {repos.map((repo) => (
                                <RepoCard key={repo.id} repo={repo} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {repos.map((repo) => (
                                <RepoGridCard key={repo.id} repo={repo} />
                            ))}
                        </div>
                    )}

                    {/* Paginação */}
                    {totalCount > 0 && (
                        <div className="flex justify-between items-center mt-8 bg-white p-4 rounded-lg shadow-sm">
                            <button
                                onClick={prevPage}
                                disabled={filters.page === 1}
                                className="flex items-center px-4 py-2 rounded-md bg-gray-100 disabled:opacity-50"
                            >
                                <FiChevronLeft className="mr-1" /> Anterior
                            </button>

                            <span className="text-sm text-gray-600">
                                Página {filters.page} de {totalPages} • {totalCount} resultados
                            </span>

                            <button
                                onClick={nextPage}
                                disabled={filters.page >= totalPages}
                                className="flex items-center px-4 py-2 rounded-md bg-gray-100 disabled:opacity-50"
                            >
                                Próxima <FiChevronRight className="ml-1" />
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// Componente de Card para Lista
const RepoCard = ({ repo }: { repo: Repository }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
        {/* ... (conteúdo igual ao anterior) ... */}
        <div className="flex justify-between">
            <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-amber-600 hover:underline"
            >
                {repo.full_name}
            </a>
            <span className={`text-xs px-2 py-1 rounded-full ${repo.private ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
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
);

// Componente de Card para Grid
const RepoGridCard = ({ repo }: { repo: Repository }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition h-full flex flex-col">
        <div className="flex-grow">
            <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-md font-semibold text-amber-600 hover:underline line-clamp-1"
            >
                {repo.full_name}
            </a>
            {repo.description && (
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">{repo.description}</p>
            )}
        </div>

        <div className="mt-4 pt-2 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                {repo.language && (
                    <span className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-gray-300 mr-1"></span>
                        {repo.language}
                    </span>
                )}
                <span className="flex items-center">
                    <FiStar className="mr-1" size={12} />
                    {repo.stargazers_count.toLocaleString()}
                </span>
                <span className="flex items-center">
                    <FiGitBranch className="mr-1" size={12} />
                    {repo.forks_count.toLocaleString()}
                </span>
            </div>
        </div>
    </div>
);

export default Results;