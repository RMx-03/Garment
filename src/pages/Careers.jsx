import { Link } from 'react-router-dom';

const departments = [
  {
    name: 'Design',
    positions: [
      'Senior Fashion Designer',
      'Pattern Maker',
      'Textile Designer'
    ]
  },
  {
    name: 'Technology',
    positions: [
      'Full Stack Developer',
      'UX Designer',
      'Data Analyst'
    ]
  },
  {
    name: 'Operations',
    positions: [
      'Supply Chain Manager',
      'Retail Operations Manager',
      'Logistics Coordinator'
    ]
  }
];

const Careers = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-black">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Join Our Team
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Help us redefine the future of sustainable fashion. We're looking for passionate individuals who want to make a difference.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-16">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="h-16 w-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-white">🌱</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Sustainability First</h3>
            <p className="text-gray-600">
              We believe in making choices that benefit both people and the planet.
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-white">💡</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-600">
              We're constantly pushing boundaries and exploring new possibilities.
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-white">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
            <p className="text-gray-600">
              We work together to create meaningful impact.
            </p>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <div key={dept.name} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{dept.name}</h3>
                <ul className="space-y-3">
                  {dept.positions.map((position) => (
                    <li key={position} className="group">
                      <Link 
                        to="/careers/position" 
                        className="flex items-center justify-between text-gray-600 hover:text-black"
                      >
                        <span>{position}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;