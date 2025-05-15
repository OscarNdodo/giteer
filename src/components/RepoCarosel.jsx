import { useState } from 'react';

export function RepoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const repos = [
        {
            name: "react",
            owner: "facebook",
            stars: 210000,
            description: "A biblioteca React para construir interfaces de usuário",
            language: "JavaScript",
            avatar: "https://github.com/facebook.png",
            updated: "2 dias atrás"
        },
        {
            name: "next.js",
            owner: "vercel",
            stars: 110000,
            description: "O framework React para produção",
            language: "JavaScript",
            avatar: "https://github.com/vercel.png",
            updated: "1 semana atrás"
        },
        {
            name: "tensorflow",
            owner: "tensorflow",
            stars: 170000,
            description: "Biblioteca de machine learning",
            language: "Python",
            avatar: "https://github.com/tensorflow.png",
            updated: "3 dias atrás"
        },
        {
            name: "vue",
            owner: "vuejs",
            stars: 205000,
            description: "Framework JavaScript progressivo",
            language: "TypeScript",
            avatar: "https://github.com/vuejs.png",
            updated: "1 dia atrás"
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === repos.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? repos.length - 1 : prevIndex - 1
        );
    };

    return (
        <section className="py-32 bg-gradient-to-r from-white to-orange-100  relative">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-left uppercase border-b border-black/30 text-gray-800 mb-8">
                    Repositórios Populares
                </h2>

                <div className="relative overflow-hidden grid grid-cols-1 sm:grid-cols-3">
                    {/* Controles do Carrossel */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Slides */}
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {repos.map((repo, index) => (
                            <div
                                key={index}
                                className="w-full flex-shrink-0 px-4"
                            >
                                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={repo.avatar}
                                            alt={repo.owner}
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <h3 className="font-bold text-gray-900">{repo.owner}/{repo.name}</h3>
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                ⭐ {Math.round(repo.stars / 1000)}k stars
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-4">{repo.description}</p>

                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>{repo.language}</span>
                                        <span>Atualizado {repo.updated}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Indicadores */}
                <div className="flex justify-center mt-6 space-x-2">
                    {repos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-amber-500' : 'bg-gray-300'}`}
                            aria-label={`Ir para slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}