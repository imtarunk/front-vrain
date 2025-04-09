const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Vrain</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your content management platform
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for content cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Sample Content</h2>
          <p className="text-gray-600">
            This is a placeholder for your content.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Sample Content</h2>
          <p className="text-gray-600">
            This is a placeholder for your content.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Sample Content</h2>
          <p className="text-gray-600">
            This is a placeholder for your content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
