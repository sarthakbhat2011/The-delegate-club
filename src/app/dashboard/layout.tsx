import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="relative bg-[var(--color-brand-black)] min-h-screen text-[var(--color-foreground)]">
      <Navbar />
      <div className="pt-32 pb-20">
        {children}
      </div>
      <Footer />
    </div>
  );
}
