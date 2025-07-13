import { imgSiteMap } from "@/lib/helpers";

const MarqueeImage = ({ img, siteName }: { img: string; siteName: string }) => {
  const isReactLogo = img.includes("react.png");
  const siteLink =
    imgSiteMap.find((siteData) => siteData.siteName === siteName)?.link || "#";
  return (
    <div className="mx-12 xl:mx-16">
      <a href={siteLink} target="_blank">
        <img
          src={img}
          className="object-contain grayscale hover:grayscale-0 transition-all delay-150 ease-linear"
          alt=""
          style={isReactLogo ? { width: "100px" } : { width: "200px" }}
        />
      </a>
    </div>
  );
};

export default MarqueeImage;
