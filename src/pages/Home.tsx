import { Link } from 'react-router-dom'

function Home() {
  const features = [
    {
      title: 'Algorithm Visualizer',
      description: 'Watch step-by-step animations of sorting, searching, and other algorithms.',
      link: '/visualize',
      icon: '📊',
    },
    {
      title: 'Code Snippets',
      description: 'Save and organize your code snippets with tags and notes.',
      link: '/snippets',
      icon: '📝',
    },
    {
      title: 'Interview Problems',
      description: 'Browse a library of common interview questions with solutions.',
      link: '/problems',
      icon: '🎯',
    },
    {
      title: 'Coding Patterns',
      description: 'Learn common patterns like sliding window, two pointers, and more.',
      link: '/patterns',
      icon: '🧩',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Code Visualizer
        </h1>
        <p className="text-xl text-slate-400">
          Interactive learning tool for coding interview preparation
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.link}
            className="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h2 className="text-xl font-semibold text-white mb-2">
              {feature.title}
            </h2>
            <p className="text-slate-400">{feature.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
