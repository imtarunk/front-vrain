import "tailwindcss/tailwind.css";

const Loader = () => {
  return (
    <div className="relative w-[128px] h-[86px] mx-auto my-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-[26px] h-[26px] bg-orange-500 rounded-sm"
          style={{
            left: `calc(${i} * 30px)`,
            top: "30px",
            animation: `square${
              i + 1
            } 2.4s ease-in-out infinite, squarefadein 0.4s ${
              i * 0.1
            }s ease-out both`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Loader;

<style>
  {`
@keyframes square1 {
  0%, 100% { left: 0; top: 30px; }
  8.333% { left: 0; top: 60px; }
}
@keyframes square2 {
  0% { left: 0; top: 60px; }
  8.333% { left: 0; top: 90px; }
  16.67% { left: 30px; top: 90px; }
  25.00% { left: 30px; top: 60px; }
  100% { left: 0; top: 30px; }
}
@keyframes square3 {
  0%, 100% { left: 30px; top: 60px; }
  25.00% { left: 30px; top: 30px; }
  33.33% { left: 60px; top: 30px; }
  41.67% { left: 60px; top: 60px; }
}
@keyframes square4 {
  0% { left: 60px; top: 60px; }
  41.67% { left: 60px; top: 90px; }
  50.00% { left: 90px; top: 90px; }
  58.33% { left: 90px; top: 60px; }
}
@keyframes square5 {
  0% { left: 90px; top: 60px; }
  58.33% { left: 90px; top: 30px; }
  66.67% { left: 60px; top: 30px; }
  75.00% { left: 60px; top: 60px; }
}
@keyframes squarefadein {
  0% { transform: scale(0.75); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
`}
</style>;
