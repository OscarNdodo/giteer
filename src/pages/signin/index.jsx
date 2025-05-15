import { useState } from 'react';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Simulação de chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Login realizado com sucesso!');
      // orangeirecionar para dashboard
    } catch (error) {
      alert('Corangeenciais inválidas. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Cabeçalho */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center mb-4">
            <div className="bg-orange-500 text-gray-100 p-2 rounded-lg mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="bg-whiteb p-8 rounded-lg b order">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`pl-10 w-full px-3 py-3 border ${errors.email ? 'border-orange-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                placeholder="seu@email.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-orange-600">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`pl-10 w-full px-3 py-3 border ${errors.password ? 'border-orange-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                placeholder="••••••"
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-orange-600">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">

            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="text-orange-600 hover:text-orange-700">
                Esqueceu sua senha?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-tl from-orange-600 to-amber-200 text-white py-4 px-4 rounded-md hover:bg-orange-500 transition flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? (
              'Entrando...'
            ) : (
              <>
                Acessar <FiArrowRight className="ml-2" />
              </>
            )}
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-medium">
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}