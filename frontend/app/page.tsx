export default function Home() {
  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Intelligent Notes Summarizer
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your notes into concise summaries and interactive flashcards using AI-powered intelligence.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Get Started
            </a>
            <a href="/login" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition">
              Sign In
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white bg-opacity-50 rounded-lg mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Smart Summarization</h3>
            <p className="text-gray-600">AI-powered summaries that capture the essence of your notes</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🎴</div>
            <h3 className="text-xl font-semibold mb-2">Auto Flashcards</h3>
            <p className="text-gray-600">Generate flashcards automatically from your summaries</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
            <p className="text-gray-600">Upload, summarize, and study in seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
}
