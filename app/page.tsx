'use client';

import { useState } from 'react';
import Features from './components/Features';
import ImageUploader from './components/ImageUploader';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleIdentify = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/identify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to identify bird');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">
          Birdwatcher.ai
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col items-center justify-center">
            <ImageUploader 
              onImageSelected={handleIdentify}
              loading={loading}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">{result.commonName}</h2>
              <p className="text-xl text-gray-600 italic">{result.scientificName}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Habitat</h3>
                  <p className="text-gray-600 leading-relaxed">{result.habitat}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Diet</h3>
                  <p className="text-gray-600 leading-relaxed">{result.diet}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Behavior</h3>
                  <p className="text-gray-600 leading-relaxed">{result.behavior}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Migration Patterns</h3>
                  <p className="text-gray-600 leading-relaxed">{result.migrationPattern}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Conservation Status</h3>
                  <p className="text-gray-600 leading-relaxed">{result.conservationStatus}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interesting Facts</h3>
                  <p className="text-gray-600 leading-relaxed">{result.interestingFacts}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <Features />
      </main>
    </div>
  );
}