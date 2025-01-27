"use client";
import AppHubNavbar from "@/components/layout/appHubNavbar";
import AppHubSlider from "@/components/layout/appHubSlider";
import { LayoutProvider } from "@/context/layoutContext";
import { NotificationProvider } from "@/context/notification-context";
import { PageProvider } from "@/context/pageNameContext";
export default function AppHubLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (

        <NotificationProvider>
            <LayoutProvider>
                <PageProvider>
                    <div className="relative flex w-screen h-screen min-w-80">
                        {/* Sidebar */}
                        <aside className="h-screen border-r bg-secondary z-20 shadow-lg">
                            <AppHubSlider />
                        </aside>

                        <main className="flex-1 flex flex-col">
                            {/* Navbar */}
                            <header className="
                            fixed top-0 w-full h-10 
                            bg-background/50 z-10 flex items-center
                            backdrop-blur-md backdrop-brightness-105
                            shadow-sm 
                        ">
                                <AppHubNavbar />
                            </header>
                            {/* Content */}
                            <section className="flex-1 overflow-auto pt-10 px-1">
                                {children}
                            </section>
                        </main>
                    </div>
                </PageProvider>
            </LayoutProvider>
        </NotificationProvider>
    );
}
