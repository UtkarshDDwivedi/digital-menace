import PlatformCarousel from "@/components/PlatformCarousel";
import ProfileMenu from "@/components/auth/profile-menu";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      {/* On mobile, this block occupies at least 100dvh, placing the footer below the fold */}
      <div className="flex flex-col min-h-dvh sm:min-h-0 sm:grow justify-between sm:justify-start">
        <div className="flex items-center justify-between md:justify-start md:gap-4 m-4">
          <p className="w-[75%] md:w-fit text-6xl font-extrabold tracking-wide">
            Pick a platform
          </p>
          <ProfileMenu />
        </div>

        <div className="grow flex flex-col justify-center my-2 sm:my-4">
          <PlatformCarousel />
        </div>
      </div>

      <Footer />
    </div>
  );
}
