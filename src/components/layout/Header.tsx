import Link from "next/link";
import { Navigation } from "./Navigation";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { SearchBar } from "../blog/SearchBar";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Perplexity
            </span>
          </Link>
          <Navigation />
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchBar />
          </div>
          <div className="hidden md:flex items-center">
            <ThemeToggle />
            <Button variant="ghost" className="ml-2">
              Sign In
            </Button>
            <Button className="ml-2">Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
}