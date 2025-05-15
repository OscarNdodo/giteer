import { RepoCarousel } from '../../components/RepoCarosel';
import Footer from '../../components/Footer';
import { AutoFeedback } from '../../components/AutoFeedback';
import "./style.css"
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { FaCodeBranch, FaGithub, FaPlusMinus } from 'react-icons/fa6';

export default function Home() {
  const navigate = useNavigate();

  function goResult() {
    return navigate("/explore")
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col">

      <Header />

      {/* HERO SECTION - Com animações */}
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-16">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-block px-4 py-2 bg-orange-100 rounded-full">
            <span className="text-xs font-semibold text-[#d84506]">PRE-LANÇAMENTO (MVP)</span>
          </div>

          <h1 className="text-4xl uppercase md:text-6xl flex fle/x-col justify-center items-center mulish-black w-full font-bold text-gray-900 leading-tight mb-6 animate-fadeIn">
            GitHub
            <FaPlusMinus className='text-orange-500/50' />
            Google
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-fadeIn delay-100">
            Giteer te permite fazer buscas por repositórios do Github com se estive fazendo buscas por websites na Google.
          </p>



          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn delay-200 py-10">
            <button onClick={goResult} className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#d84506] to-orange-500 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-[#d84506] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Explorar repositórios agora
              <FaCodeBranch className='ml-4' />
            </button>
            <a href="https://github.com/OscarNdodo/giteer" target='_blank' className="px-8 py-4 bg-white text-[#d84506] border-2 border-orange-100 font-semibold rounded-lg hover:bg-orange-50 transition-all duration-300 shadow hover:shadow-md">
              <div className="flex items-center justify-center space-x-2">
                <span>Apioar projecto</span>
                <FaGithub />
              </div>
            </a>
          </div>









        </div>


      </main>


      <RepoCarousel />


      <AutoFeedback />


      <Footer />
    </div >
  );
}