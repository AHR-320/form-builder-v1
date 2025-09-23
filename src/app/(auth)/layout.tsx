import { Logo } from "@/modules/home/components/ui/logo";
import { ThemeSwitcher } from "@/modules/home/components/ui/theme-switcher";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background flex min-h-screen min-w-full flex-col">
      <nav className="border-border flex h-16 items-center justify-between border-b px-4 py-2 md:px-8">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
        </div>
      </nav>
      <main className="flex h-full w-full flex-grow items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
