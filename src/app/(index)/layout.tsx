"use client";
import AppIndexNavbar from "@/components/layout/appIndexNavbar";
import { LayoutProvider } from "@/context/layoutContext";
import { PageProvider } from "@/context/pageNameContext"; 

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <LayoutProvider>
      <PageProvider>
        <div className="relative flex w-screen h-screen min-w-80">
          <main className="flex-1 flex flex-col">
            {/* Navbar */}
            <header className="
                            fixed top-0 w-full px-2 h-12
                            bg-background/50 z-10 flex items-center justify-between gap-1
                            backdrop-blur-md backdrop-brightness-105
                            shadow-sm  border-b
                        ">
              <AppIndexNavbar />
            </header>
              {/* Content */}
              <section className="flex-1 overflow-auto pt-16 px-2 justify-items-center">
                {children}
              </section>
          </main>
        </div>
      </PageProvider>
    </LayoutProvider>

  );
}
