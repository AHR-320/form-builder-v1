import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

import { Logo } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background flex min-h-screen min-w-full flex-col">
      <nav className="border-border flex h-16 items-center justify-between border-b px-4 py-2 md:px-8">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonBox: "rounded-md!",
                  userButtonAvatarBox: "rounded-md! size-9!",
                  userButtonTrigger: "rounded-md!",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
      <main className="flex w-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
