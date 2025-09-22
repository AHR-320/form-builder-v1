import { Logo } from "@/modules/home/components/ui/logo";
import { ThemeSwitcher } from "@/modules/home/components/ui/theme-switcher";

const SubmitLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background flex h-screen w-full flex-col">
      <nav className="border-border flex h-16 items-center justify-between border-b px-4 py-2 md:px-8">
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main className="flex h-full w-full">{children}</main>
    </div>
  );
};

export default SubmitLayout;
