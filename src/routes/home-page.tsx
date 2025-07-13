import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Marquee from "react-fast-marquee";
import MarqueeImage from "@/components/marquee-image";
import { Link } from "react-router-dom";

interface CounterItemProps {
  end: number;
  suffix?: string;
  label: string;
  decimals?: number;
}

const CounterItem = ({ end, suffix, label, decimals }: CounterItemProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className="text-3xl font-semibold text-gray-900 text-center dark:text-gray-300"
    >
      <CountUp
        end={inView ? end : 0}
        suffix={suffix}
        duration={2.5}
        delay={0.1}
        decimals={decimals}
        decimal="."
      />
      <span className="block text-xl text-muted-foreground font-normal">
        {label}
      </span>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col w-full pb-24">
      <Container>
        {/* Header UI */}
        <div className="my-8">
          <h2 className="text-2xl text-center md:text-left md:text-6xl">
            <span className="text-outline text-4xl font-extrabold md:text-8xl">
              AI Superpower{" "}
            </span>
            <span className="text-gray-500 md:text-5xl text-4xl font-extrabold">
              - A better way to
            </span>
            <br />
            improve your interview chances and skills
          </h2>
          <p className="mt-4 text-muted-foreground text-sm">
            Boost your interview skills and increase your success rate with
            Al-driven insights. Discover a smarter way to prepare, practice, and
            stand out.
          </p>
        </div>

        {/* Animated Achievement Metrics */}
        <div className="flex w-full items-center justify-evenly md:justify-end gap-12 md:px-12 md:py-6">
          <CounterItem end={250} suffix="K+" label="Offers Received" />
          <CounterItem
            end={1.2}
            suffix="M+"
            label="Interview Aced"
            decimals={1}
          />
        </div>

        {/* image section */}
        <div className="w-full mt-4 rounded-xl h-[320px] md:h-[420px] bg-white drop-shadow-3xl overflow-hidden relative">
          <img
            src="/assets/img/hero.jpg"
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />

          <div className="absolute top-4 left-4 px-4 py-2 rounded-md bg-white/30 backdrop-blur z-10">
            Inteviews Copilot&copy;
          </div>

          <div className="hidden md:block absolute bottom-4 right-4 max-w-xs w-full px-4 py-3 rounded-lg bg-white/30 backdrop-blur z-10 shadow-lg">
            <h2 className="text-neutral-800 font-semibold">Developer</h2>
            <p className="text-sm text-neutral-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              distinctio natus, quos voluptatibus magni sapiente.
            </p>
            <Button className="mt-3 flex items-center gap-2 cursor-pointer">
              Generate <Sparkles />
            </Button>
          </div>
        </div>
      </Container>

      {/* Marquee section */}
      <div className="w-full my-12">
        <Marquee pauseOnHover>
          <MarqueeImage
            img="/assets/img/logo/firebase.png"
            siteName="firebase"
          />
          <MarqueeImage img="/assets/img/logo/meet.png" siteName="meet" />
          <MarqueeImage
            img="/assets/img/logo/microsoft.png"
            siteName="microsoft"
          />
          <MarqueeImage img="/assets/img/logo/react.png" siteName="react" />
          <MarqueeImage
            img="/assets/img/logo/tailwindcss.png"
            siteName="tailwindcss"
          />
          <MarqueeImage img="/assets/img/logo/zoom.png" siteName="zoom" />
        </Marquee>
      </div>

      {/* flex-container */}
      <Container className="py-8 space-y-8">
        <h2 className="tracking-wide text-xl text-gray-800 font-semibold dark:text-white/60">
          Unleash your potential with personalized AI insights and targeted
          interview practice.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="col-span-1 md:col-span-3">
            <img
              src="/assets/img/office.jpg"
              alt=""
              className="w-full max-h-96 rounded-md object-cover"
            />
          </div>

          <div className="col-span-1 md:col-span-2 gap-8 max-h-90 min-h-60 w-full flex flex-col items-center justify-center text-center self-center">
            <p className="text-center text-muted-foreground">
              Transform the way you prepare, gain confidence, and boost your
              chances of landing your dream job. Let AI be your edge in
              today&apos;s competitive job market.
            </p>

            <Link to={"/generate"} className="w-full">
              <Button className="w-3/4 cursor-pointer">
                Generate <Sparkles className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
