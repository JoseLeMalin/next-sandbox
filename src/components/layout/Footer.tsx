import { SiteConfig } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "../ui/typography";
import image from "@/assets/images/William_Bouguereau_-_Dante_and_Virgile_-_Google_Art_Project_2.jpg";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-card">
      <div className="m-auto w-full max-w-3xl px-2 py-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-row items-center gap-2">
            <Image
              src={image}
              width={40}
              height={30}
              alt="app logo"
              priority={false}
            />
            <Typography variant="base" as={Link} href="/">
              {SiteConfig.title}
            </Typography>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
            <Link
              className="hover:underline"
              href="/legal/privacy"
              scroll={false}
            >
              Privacy
            </Link>
            <Link className="hover:underline" href="/legal/cgv" scroll={false}>
              CGV
            </Link>
            <Link className="hover:underline" href="/courses" scroll={false}>
              Courses
            </Link>
            <Link className="hover:underline" href="/admin" scroll={false}>
              Admin
            </Link>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <Typography variant="base" className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} YouCode
          </Typography>
        </div>
      </div>
    </footer>
  );
};
