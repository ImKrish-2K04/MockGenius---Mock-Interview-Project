const MarqueeImage = ({ img }: { img: string }) => {
  const isReactLogo = img.includes("react.png");
  return (
    <img
      src={img}
      className="object-contain grayscale mx-12 xl:mx-16"
      alt=""
      style={isReactLogo ? { width: "100px" } : { width: "200px" }}
    />
  );
};

export default MarqueeImage;
