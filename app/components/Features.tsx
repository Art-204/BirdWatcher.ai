import { Bird, Crown, BarChart3 } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* AI Identification Card */}
        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-100 mb-6">
            <Bird className="w-6 h-6 text-violet-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            AI Identification
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Advanced machine learning technology that accurately identifies bird species from your photos instantly, providing detailed information about each species.
          </p>
        </div>

        {/* Simple Interface Card */}
        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-6">
            <Crown className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Simple Interface
          </h3>
          <p className="text-gray-600 leading-relaxed">
            User-friendly design that makes bird identification easy and accessible. Simply upload your photo and get instant results with detailed information.
          </p>
        </div>

        {/* Advanced Analytics Card */}
        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-6">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Bird Database
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Access comprehensive information about bird species, including habitats, behaviors, migration patterns, and conservation status.
          </p>
        </div>
      </div>
    </section>
  );
}