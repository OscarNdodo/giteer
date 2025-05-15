import { useState, useEffect } from 'react';
import { FiStar, FiGitBranch, FiClock, FiChevronLeft, FiUser } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import Footer from '../../components/Footer';
import { AiFillClockCircle, AiFillStar } from 'react-icons/ai';

const Repository = () => {
    const { owner, repo } = useParams();
    const navigate = useNavigate();
    const [readme, setReadme] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [repoInfo, setRepoInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Busca informações do repositório
                const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
                const repoData = await repoResponse.json();
                if (!repoResponse.ok) throw new Error(repoData.message || 'Erro ao buscar repositório');
                setRepoInfo(repoData);

                // Busca o README
                const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
                    headers: {
                        'Accept': 'application/vnd.github.v3.raw'
                    }
                });

                if (readmeResponse.ok) {
                    const text = await readmeResponse.text();
                    setReadme(text);
                } else {
                    setReadme(`# ${repo}\n\nEste repositório não possui um README.md`);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [owner, repo]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-4xl mx-auto mt-10">
                    <p className="text-red-700">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            {/* Header */}
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
                                <AiFillStar className="mr-1" /> Favoritos
                            </a>
                            <a href="#" className="hover:text-amber-400 transition flex items-center">
                                <AiFillClockCircle className="mr-1" /> Recentes
                            </a>
                            <a href="#" className="hover:text-amber-400 border rounded-full p-2  transition">
                                <FiUser className='h-4 w-4 text-gray-800' />
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-amber-600 hover:text-amber-800 mb-6 transition"
                >
                    <FiChevronLeft className="mr-1" /> Voltar aos resultados
                </button>

                {/* Repository Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start mb-4 md:mb-0">
                            <img
                                src={repoInfo.owner.avatar_url}
                                alt={`Avatar de ${repoInfo.owner.login}`}
                                className="w-16 h-16 rounded-full mr-4"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{repoInfo.full_name}</h1>
                                <p className="text-gray-600 mt-1">{repoInfo.description}</p>
                            </div>
                        </div>

                        <div className="flex pl-5 gap-3">
                            <span className={`text-sm px-3 py-1 rounded-full ${repoInfo.private ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                {repoInfo.private ? 'Privado' : 'Público'}
                            </span>
                            <span className="flex items-center bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                                <FiStar className="mr-1" /> {repoInfo.stargazers_count.toLocaleString()}
                            </span>
                            <span className="flex items-center bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                                <FiGitBranch className="mr-1" /> {repoInfo.forks_count.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* README Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200 px-6 py-3 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-800">README.md</h2>
                    </div>
                    <div className="p-6 markdown-body">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold border-b pb-2 mb-4 mt-6 text-gray-800" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold border-b pb-2 mb-4 mt-6 text-gray-800" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-xl font-bold mb-3 mt-5 text-gray-800" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
                                a: ({ node, ...props }) => <a className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                code: ({ node, inline, className, children, ...props }) => {
                                    if (inline) {
                                        return <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800" {...props}>{children}</code>;
                                    }
                                    return <code className={`${className} block bg-gray-50 p-3 rounded mb-4 overflow-x-auto text-sm`} {...props}>{children}</code>;
                                },
                                pre: ({ node, ...props }) => <pre className="bg-gray-50 p-3 rounded mb-4 overflow-x-auto" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                                li: ({ node, ...props }) => <li className="mb-1 text-gray-700" {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-amber-400 pl-4 italic text-gray-600 mb-4" {...props} />,
                                table: ({ node, ...props }) => <table className="w-full border-collapse mb-4" {...props} />,
                                th: ({ node, ...props }) => <th className="border px-4 py-2 text-left bg-gray-50 font-semibold" {...props} />,
                                td: ({ node, ...props }) => <td className="border px-4 py-2" {...props} />,
                                img: ({ node, ...props }) => <img className="max-w-full h-auto rounded border border-gray-200 my-2" {...props} />,
                            }}
                        >
                            {readme}
                        </ReactMarkdown>
                    </div>
                </div>
            </main>

            {/* Custom CSS for markdown (you can add this to your global CSS instead) */}
            <style jsx>{`
                .markdown-body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
                    line-height: 1.6;
                }
                .markdown-body code {
                    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
                }
            `}</style>

            <Footer />
        </div>
    );
};

export default Repository;