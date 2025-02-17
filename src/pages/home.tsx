import dynamic from "next/dynamic";

// Dynamically import the AppleCardsCarouselDemo to avoid SSR issues
const AppleCardsCarouselDemo = dynamic(
  () =>
    import("../components/apple-card").then(
      (mod) => mod.AppleCardsCarouselDemo
    ),
  {
    ssr: false,
  }
);

const Home = () => {
  return (
    <div>
      <AppleCardsCarouselDemo />
      <AppleCardsCarouselDemo />
    </div>
  );
};
export default Home;
