import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { StainedGlass3D } from "@/components/3d/StainedGlass3D";

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
    <div className="relative bg-background dark:bg-black min-h-screen text-foreground transition-colors duration-500">
      {/* 3D Interactive Stained Glass background */}
      <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
        <StainedGlass3D />
      </div>

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
