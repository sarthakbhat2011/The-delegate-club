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
    <div className="relative min-h-screen text-foreground transition-colors duration-500">
      <div className="relative z-10">
        <Navbar />
        <div className="pt-32 pb-20">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
