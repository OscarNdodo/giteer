import { useState } from "react";

export function FeedbackSection() {
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
        }
    ];

    const [activeTestimonial, setActiveTestimonial] = useState(0);

    return (
        <section className="py-16 bg-gradient-to-r from-amber-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">O que dizem nossos usuários</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Veja como o Giteer está transformando o workflow de desenvolvedores e equipes</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Testemunhos */}
                    <div className="relative bg-white rounded-xl shadow-lg p-8 mb-8">
                        <div className="flex flex-col md:flex-row items-center">
                            <img
                                src={testimonials[activeTestimonial].avatar}
                                alt={testimonials[activeTestimonial].name}
                                className="w-20 h-20 rounded-full object-cover border-4 border-amber-100 mb-4 md:mb-0 md:mr-8"
                            />
                            <div className="text-center md:text-left">
                                <div className="flex justify-center md:justify-start mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonials[activeTestimonial].rating ? 'text-amber-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 italic mb-4">"{testimonials[activeTestimonial].content}"</p>
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonials[activeTestimonial].name}</h4>
                                    <p className="text-sm text-gray-600">{testimonials[activeTestimonial].role}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controles */}
                    <div className="flex justify-center space-x-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTestimonial(index)}
                                className={`w-3 h-3 rounded-full ${activeTestimonial === index ? 'bg-amber-600' : 'bg-gray-300'}`}
                                aria-label={`Ir para depoimento ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-12">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Pronto para transformar sua experiência?</h3>
                        <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg">
                            Experimente gratuitamente
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}