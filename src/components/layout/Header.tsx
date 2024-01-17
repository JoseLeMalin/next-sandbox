import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Typography } from "@/components/ui/typography";
import { SiteConfig } from "@/lib/site-config";
import image from "@/assets/images/William_Bouguereau_-_Dante_and_Virgile_-_Google_Art_Project_2.jpg";
import Image from "next/image";
import Link from "next/link";
import DropDownLogin from "../DropDownLogin";
import { getAuthSession } from "@/lib/auth";
import { ButtonExploreCourses } from "../ButtonExploreCourses";
import { ButtonUserCourses } from "../ButtonUserCourses";

export async function Header() {
  const session = await getAuthSession();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2">
          <Image src={image} width={50} height={35} alt="app logo" />
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ButtonExploreCourses />
            <ButtonUserCourses />
            <DropDownLogin />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
