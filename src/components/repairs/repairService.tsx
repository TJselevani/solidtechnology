const RepairServices = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Expert Repair Services
      </h1>

      <p className="text-lg text-center text-gray-600 mb-8">
        We specialize in high-quality repairs for a variety of devices. Whether
        it&apos;s a cracked screen, battery issues, or hardware failure, our
        skilled technicians have you covered.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2">Smartphone Repairs</h2>
          <p className="text-gray-600">
            Screen replacements, battery fixes, water damage repair, and more.
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2">Laptop & PC Repairs</h2>
          <p className="text-gray-600">
            Hardware upgrades, OS troubleshooting, virus removal, and
            performance tuning.
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2">Tablet Repairs</h2>
          <p className="text-gray-600">
            Cracked screens, charging port issues, and software troubleshooting.
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2">Gaming Console Repairs</h2>
          <p className="text-gray-600">
            Fix overheating issues, controller repairs, and software updates.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-3">Need a Repair?</h2>
        <p className="text-gray-600">
          Contact us today for a free consultation and let us bring your device
          back to life.
        </p>
        <button className="mt-4 px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary-50 transition">
          Get a Quote
        </button>
      </div>
    </div>
  );
};

export default RepairServices;
