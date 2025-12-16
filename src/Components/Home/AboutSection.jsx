import { FaBoxes, FaUserCheck, FaChartLine, FaShieldAlt } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose AssetVerse
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            AssetVerse empowers organizations to manage physical assets
            efficiently with transparency, control, and real-time insights.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card 1 */}
          <div className="p-6 rounded-xl border hover:shadow-lg transition">
            <FaBoxes className="text-4xl text-primary mb-4" />
            <h4 className="text-xl font-semibold mb-2">
              Centralized Tracking
            </h4>
            <p className="text-gray-600 text-sm">
              Manage and monitor all company assets from a single dashboard.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl border hover:shadow-lg transition">
            <FaUserCheck className="text-4xl text-primary mb-4" />
            <h4 className="text-xl font-semibold mb-2">
              Role-Based Approval
            </h4>
            <p className="text-gray-600 text-sm">
              Secure approval workflows for employees, HR, and admins.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl border hover:shadow-lg transition">
            <FaChartLine className="text-4xl text-primary mb-4" />
            <h4 className="text-xl font-semibold mb-2">
              Real-Time Insights
            </h4>
            <p className="text-gray-600 text-sm">
              Get instant visibility into asset usage and performance.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-xl border hover:shadow-lg transition">
            <FaShieldAlt className="text-4xl text-primary mb-4" />
            <h4 className="text-xl font-semibold mb-2">
              Secure & Scalable
            </h4>
            <p className="text-gray-600 text-sm">
              Built with enterprise-grade security for growing businesses.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
