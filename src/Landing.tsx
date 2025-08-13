import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Sparkles, Users, Zap } from 'lucide-react'

export const Landing = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-500"></div>
        
        <div className="absolute top-32 right-32 animate-bounce delay-300">
          <div className="w-8 h-8 bg-teal-200 rounded-full opacity-40"></div>
        </div>
        <div className="absolute bottom-32 left-32 animate-bounce delay-700">
          <div className="w-6 h-6 bg-emerald-200 rounded-full opacity-40"></div>
        </div>
        <div className="absolute top-1/2 left-16 animate-bounce delay-1000">
          <div className="w-4 h-4 bg-cyan-200 rounded-full opacity-40"></div>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-teal-500 to-emerald-500 p-4 rounded-full">
                  <Sparkles className="h-12 w-12 text-white animate-spin-slow" />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 mb-6 leading-tight">
              Generador de Grupos
              <span className="block text-5xl md:text-6xl bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text">
                Aleatorios
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-medium">
              🎯 La herramienta más <span className="text-teal-600 font-bold">divertida</span> y <span className="text-emerald-600 font-bold">eficiente</span> para crear grupos aleatorios
            </p>
            
            <p className="text-lg text-gray-600 mb-12">
              Perfecta para docentes que buscan dinamizar sus clases con agrupaciones justas y variadas
            </p>
          </div>

          {/* CTA Button */}
          <div className="mb-16">
            <Link to="/generator">
              <Button size="lg" className="group relative text-xl px-16 py-8 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1 border-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <Zap className="h-6 w-6 animate-pulse" />
                  <span className="font-bold">¡Empezar Ahora!</span>
                  <Users className="h-6 w-6 group-hover:animate-bounce" />
                </div>
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold text-teal-700 mb-2">Súper Rápido</h3>
              <p className="text-gray-600 text-sm">Genera grupos en segundos</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">🎲</div>
              <h3 className="text-lg font-bold text-emerald-700 mb-2">100% Aleatorio</h3>
              <p className="text-gray-600 text-sm">Distribución completamente justa</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-cyan-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-lg font-bold text-cyan-700 mb-2">Multi-dispositivo</h3>
              <p className="text-gray-600 text-sm">Funciona en móvil y desktop</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-gray-500 text-sm">
            <p className="flex items-center justify-center gap-2">
              <span>&lt;&gt; con ❤️ por</span>
              <a target="_blank" href="https://guidocode.vercel.app/" className="text-purple-400 font-medium">GuidoCode</a>
              <span>para educadores increíbles</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
