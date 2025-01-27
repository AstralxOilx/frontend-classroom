import React from 'react'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { ThemeModeToggle } from "@/components/themeModeToggle";

export default function AppIndexNavbar() {
    const pathname = usePathname();

    return (
        <>
            <div className="grid items-center text-center ">
                <div className="grid justify-center items-center bg-gray-400 w-10 h-10 bg-background rounded-sm border cursor-pointer">

                    {/* logo */}

                </div>
            </div>
            <div className="p-1 flex gap-1 justify-center items-center">
                <Link className={`${pathname === '/'
                    ? 'text-primary transition-all duration-500 ease-in-out shadow-sm'
                    : 'transition-all duration-500 ease-in-out '
                    } p-1 px-3 border rounded-sm`}
                    href="/">ลงชื่อเข้าใช้</Link>
                <Link className={`${pathname.startsWith('/signup')
                    ? 'text-primary transition-all duration-500 ease-in-out shadow-sm'
                    : 'transition-all duration-500 ease-in-out '
                    } p-1 px-3 border rounded-sm`} href="/signup">ลงทะเบียน</Link>
                <div className="text-md w-10 h-10 grid justify-center rounded-lg items-center overflow-hidden">
                    <ThemeModeToggle />
                </div>

            </div>
        </>
    )
}
