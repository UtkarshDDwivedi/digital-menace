import PlatformCarousel from "@/components/PlatformCarousel";
import ProfileMenu from "@/components/auth/profile-menu";

export default function Home() {
  return (
    <div className="grow flex flex-col">
      <div className="flex items-center justify-between md:justify-start md:gap-4 m-4">
        <p className="w-[75%] md:w-fit text-6xl font-extrabold tracking-wide">
          Pick a platform
        </p>
        <ProfileMenu />
      </div>
      <PlatformCarousel />
    </div>
  );
}
