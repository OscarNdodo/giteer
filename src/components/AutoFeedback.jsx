import { useState, useEffect, useRef } from 'react';

export function AutoFeedback() {
    const testimonials = [
        {
            id: 1,
            name: "Carlos Silva",
            role: "Engenheiro de Software, TechSolutions",
            content: "O Giteer revolucionou nossa análise de repositórios. Conseguimos identificar gargalos no nosso código 3x mais rápido.",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5
        },
        {
            id: 2,
            name: "Ana Oliveira",
            role: "Líder Técnica, InovaCode",
            content: "A ferramenta essencial para qualquer equipe que trabalha com GitHub. Visualização de métricas nunca foi tão intuitiva.",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 4
        },
        {
            id: 3,
            name: "Miguel Santos",
            role: "DevOps Engineer, CloudBridge",
            content: "Economizamos 10 horas semanais graças aos relatórios automatizados do Giteer. Simplesmente indispensável!",
            avatar: "https://randomuser.me/api/portraits/men/67.jpg",
            rating: 5
        },
        {
            id: 4,
            name: "Juliana Costa",
            role: "CTO, DevFlow",
            content: "Integração perfeita com nosso fluxo de trabalho. A equipe adotou imediatamente as funcionalidades.",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            rating: 5
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    // Configura o carrossel automático
    useEffect(() => {
        const startCarousel = () => {
            intervalRef.current = setInterval(() => {
                if (!isPaused) {
                    setActiveIndex(prevIndex =>
                        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
                    );
                }
            }, 5000); // Muda a cada 5 segundos
        };

        startCarousel();
        return () => clearInterval(intervalRef.current);
    }, [testimonials.length, isPaused]);

    const goToIndex = (index) => {
        clearInterval(intervalRef.current);
        setActiveIndex(index);
        // Não reinicia automaticamente após clique manual
    };

    return (
        <section className="py-24 pb-40 bg-gradient-to-r from-amber-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold uppercase text-gray-900 mb-4">Feedback dos Nossos Usuários</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Veja o que a comunidade está dizendo sobre o Giteer</p>
                </div>

                <div
                    className="max-w-4xl mx-auto relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Testemunhos com transição suave */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="w-full flex-shrink-0 px-4"
                                >
                                    <div className="bg-white rounded-xl shadow-lg p-8">
                                        <div className="flex flex-col md:flex-row items-center">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="w-20 h-20 rounded-full object-cover border-4 border-amber-100 mb-4 md:mb-0 md:mr-8"
                                            />
                                            <div className="text-center md:text-left">
                                                <div className="flex justify-center md:justify-start mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controles de navegação */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? 'bg-amber-600 w-6' : 'bg-gray-300'}`}
                                aria-label={`Ir para depoimento ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Botões de navegação (opcional) */}
                    <button
                        onClick={() => goToIndex(activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => goToIndex(activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}