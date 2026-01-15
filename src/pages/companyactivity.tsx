
import {
  FiGlobe,
  FiMonitor,
  FiSmartphone,
  FiCode,
  FiGrid,
  FiUsers,
  FiFeather,
  FiHeart,
} from 'react-icons/fi';

const CompanyActivities = () => {
  const companyData = {
    name: 'Ustwo Fampany Limited',
    founded: {
      year: 2004,
      location: 'London, United Kingdom',
    },
    kenyaLaunch: {
      year: 2026,
      month: 'January',
    },
    globalOffices: [
      { city: 'London', country: 'UK' },
      { city: 'New York', country: 'USA' },
      { city: 'Malmö', country: 'Sweden' },
      { city: 'Tokyo', country: 'Japan' },
      { city: 'Lisbon', country: 'Portugal' },
    ],
    coreActivities: [
      {
        title: 'Digital Product Design',
        description:
          'Designing mobile applications, websites, and platforms with a strong emphasis on user experience and interface design.',
        icon: <FiSmartphone className="text-blue-600" />,
      },
      {
        title: 'Software Development',
        description:
          'Building reliable and scalable software solutions for startups, businesses, and organizations across different industries.',
        icon: <FiCode className="text-blue-600" />,
      },
      {
        title: 'Creative Innovation',
        description:
          'Developing innovative digital games and interactive experiences recognized globally for quality and originality.',
        icon: <FiGrid className="text-blue-600" />,
      },
      {
        title: 'Startup Support',
        description:
          'Supporting innovation through startup investment, mentorship, and partnerships, helping early-stage ventures grow.',
        icon: <FiUsers className="text-blue-600" />,
      },
    ],
    values: [
      {
        title: 'People-First Approach',
        description:
          'Prioritizing employees, clients, and community well-being in all operations.',
        icon: <FiUsers className="text-blue-600" />,
      },
      {
        title: 'Ethical Practices',
        description:
          'Maintaining high ethical standards in all business dealings and decision-making.',
        icon: <FiFeather className="text-blue-600" />,
      },
      {
        title: 'Sustainability',
        description:
          'Promoting sustainable business practices and social responsibility in Kenya and globally.',
        icon: <FiHeart className="text-blue-600" />,
      },
    ],
  };

  return (
    <div className="min-h-scene bg-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
          Company Activity – {companyData.name}
        </h1>
      </div>

      {/* Company Background */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 border border-blue-100">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
          <FiGlobe className="mr-2 text-blue-600" /> Company Background
        </h2>
        <p className="text-blue-800">
          {companyData.name} was founded in {companyData.founded.year} in{' '}
          {companyData.founded.location}, with a strong focus on creativity,
          innovation, and people-centered design.
        </p>
      </div>

      {/* Global Presence */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 border border-blue-100">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center">
          <FiGlobe className="mr-2 text-blue-600" /> Global Presence
        </h2>
        <p className="text-blue-800 mb-4">
          The company operates internationally with studios and offices in:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {companyData.globalOffices.map((office, index) => (
            <div
              key={index}
              className="bg-blue-50 p-4 rounded-lg border border-blue-200"
            >
              <h3 className="font-semibold text-blue-900">{office.city}</h3>
              <p className="text-blue-800 text-sm">{office.country}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Introduction in Kenya */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 border border-blue-100">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
          <FiGlobe className="mr-2 text-blue-600" /> Introduction in Kenya
        </h2>
        <p className="text-blue-800">
          {companyData.name} was launched in Kenya on{' '}
          {companyData.kenyaLaunch.month} {companyData.kenyaLaunch.year},
          providing investment opportunities and expanding its digital product
          design, software development, and creative innovation services to the
          Kenyan market.
        </p>
      </div>

      {/* Core Activities */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 border border-blue-100">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center">
          <FiMonitor className="mr-2 text-blue-600" /> Core Activities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companyData.coreActivities.map((activity, index) => (
            <div
              key={index}
              className="bg-blue-50 p-5 rounded-lg border border-blue-200"
            >
              <div className="flex items-start mb-3">
                <div className="mr-3 mt-1">{activity.icon}</div>
                <h3 className="font-semibold text-blue-900">
                  {activity.title}
                </h3>
              </div>
              <p className="text-blue-800 text-sm pl-8">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center">
          <FiHeart className="mr-2 text-blue-600" /> Company Values
        </h2>
        <p className="text-blue-800 mb-4">
          The company operates as a people-first and ethical organization,
          promoting sustainable business practices and social responsibility.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companyData.values.map((value, index) => (
            <div
              key={index}
              className="bg-blue-50 p-5 rounded-lg border border-blue-200"
            >
              <div className="flex items-start mb-3">
                <div className="mr-3 mt-1">{value.icon}</div>
                <h3 className="font-semibold text-blue-900">{value.title}</h3>
              </div>
              <p className="text-blue-800 text-sm pl-8">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyActivities;
