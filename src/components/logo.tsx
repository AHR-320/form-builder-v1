import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tighter text-transparent hover:cursor-pointer"
    >
      FORMIC
    </Link>
  );
};
