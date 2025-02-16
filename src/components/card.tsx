const Card = ({ data }) => {
  return (
    <div className="h-full w-full ">
      <div className="relative w-60 min-h-80 overflow-hidden rounded-xl border-2 shadow-lg bg-white transition-transform duration-300 hover:scale-105">
        {/* Title */}
        <h1 className="text-lg font-semibold text-center p-4">
          Contact Form Validation
        </h1>

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://appx-wsb-gcp-mcdn.akamai.net.in/paid_course3/2023-11-10-0.3523174787735883.jpeg"
            alt="Course Thumbnail"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>

        {/* Description */}
        <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium z-10">
          {data.link}
        </p>

        {/* Tags & Priority */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
            {data.title}
          </span>
          <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            High
          </span>
        </div>

        {/* Blurred Light Effect */}
        <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
      </div>
    </div>
  );
};

export default Card;
