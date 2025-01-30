"use client";

import React, { useState, useEffect } from "react";
import { useLayoutContext } from "@/context/layoutContext";
import { Button } from "../ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


import { Backpack, BellOff, BellRing, ChartNoAxesGantt, LayoutGrid, LogOut, School, Settings, UserCog } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeModeToggle } from "../themeModeToggle";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNotificationContext } from "@/context/notification-context";
import { signOut, useSession } from "next-auth/react";



export default function AppHubSlider() {
    const { isSidebarOpen, toggleSidebar } = useLayoutContext();
    const { isDrawerOpen, toggleDrawer } = useLayoutContext();
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const { notification } = useNotificationContext();
    // ตรวจสอบขนาดหน้าจอ
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // ขนาด 768px หรือต่ำกว่า ถือว่าเป็นหน้าจอขนาดเล็ก
        };

        handleResize(); // เรียกครั้งแรกเมื่อคอมโพเนนต์ mount
        window.addEventListener("resize", handleResize); // อัพเดตเมื่อขนาดหน้าจอเปลี่ยน

        return () => window.removeEventListener("resize", handleResize); // ทำความสะอาด listener เมื่อคอมโพเนนต์ถูก unmount
    }, [session]);

    return (
        <>
            {isMobile ? (
                // Drawer สำหรับหน้าจอขนาดเล็ก
                <>
                    <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
                        <DrawerTrigger>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full  max-w-sm">
                                <DrawerHeader>
                                    <DrawerTitle>
                                        <div className="grid justify-center items-center">
                                            <div className="w-10 h-10 bg-slate-300">
                                                {/* {logo} */}
                                            </div>
                                        </div>
                                        <p>Classroom</p>
                                    </DrawerTitle>
                                    <DrawerDescription>Lorem ipsum dolor sit amet.</DrawerDescription>
                                </DrawerHeader>
                                <div className="p-4 pb-0 grid gap-1">
                                    <div
                                        onClick={() => {
                                            router.push('/dashboard');
                                        }}
                                        className={`${pathname.startsWith('/app/dashboard')
                                            ? 'bg-primary/90 text-gray-100 shadow-lg'
                                            : 'bg-secondary text-gray-600 dark:text-gray-300'
                                            } flex gap-1 justify-start items-center cursor-pointer rounded-md border hover:bg-primary hover:text-gray-200 transition-all duration-500 ease-in-out shadow-md`}
                                    >
                                        <div className="grid items-center text-center">
                                            <div className="text-md w-10 h-10 grid justify-center items-center">
                                                <LayoutGrid strokeWidth={2} size={25} />
                                            </div>
                                        </div>
                                        <p>แดช บอร์ด</p>
                                    </div>

                                    <div
                                        onClick={() => {
                                            router.push('/app/group');
                                        }}
                                        className={`${pathname.startsWith('/app/group')
                                            ? 'bg-primary/90 text-gray-200 shadow-lg'
                                            : 'bg-secondary text-gray-600 dark:text-gray-300'
                                            } flex gap-1 justify-start items-center cursor-pointer rounded-md border hover:bg-primary hover:text-gray-200 transition-all duration-500 ease-in-out shadow-md`}
                                    >
                                        <div className="grid items-center text-center">
                                            <div className="text-md w-10 h-10 grid justify-center items-center">
                                                <School strokeWidth={2} size={25} />
                                            </div>
                                        </div>
                                        <p>ห้องเรียน</p>
                                    </div>

                                    <div
                                        onClick={() => {
                                            router.push('/app/assignments');
                                        }}
                                        className={`${pathname.startsWith('/app/assignments')
                                            ? 'bg-primary/90 text-gray-200 shadow-lg'
                                            : 'bg-secondary text-gray-600 dark:text-gray-300'
                                            } flex gap-1 justify-start items-center cursor-pointer rounded-md border hover:bg-primary hover:text-gray-200 transition-all duration-500 ease-in-out shadow-md`}
                                    >
                                        <div className="grid items-center text-center">
                                            <div className="text-md w-10 h-10 grid justify-center items-center">
                                                <Backpack strokeWidth={2} size={25} />
                                            </div>
                                        </div>
                                        <p>การบ้าน</p>
                                    </div>

                                    <div
                                        onClick={() => {
                                            router.push('/app/notification');
                                        }}
                                        className={`${pathname.startsWith('/app/notification')
                                            ? 'bg-primary/90 text-gray-200 shadow-lg'
                                            : 'bg-secondary text-gray-600 dark:text-gray-300'
                                            } flex gap-1 justify-start items-center cursor-pointer rounded-md border hover:bg-primary 
                                             hover:text-gray-200 transition-all duration-500 ease-in-out shadow-md
                                                relative
                                             `}
                                    >
                                        <div className="grid items-center text-center">
                                            <div className="text-md w-10 h-10 grid justify-center items-center">
                                                {
                                                    notification ? (
                                                        <BellRing strokeWidth={2} size={25} />
                                                    ) : (
                                                        <BellOff strokeWidth={2} size={25} />
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <p>การแจ้งเตือน</p>
                                        <div className={` 
                                            absolute top-0 right-1 
                                        `}>+990</div>
                                    </div>

                                    <div
                                        onClick={() => router.push('/app/setting/profile')}
                                        className={`${pathname.startsWith('/app/setting')
                                            ? 'bg-primary/90 text-gray-200 shadow-lg'
                                            : 'bg-secondary text-gray-600 dark:text-gray-300'} 
                                            flex gap-1 justify-start items-center 
                                            cursor-pointer rounded-md border 
                                            hover:bg-primary hover:text-gray-200 
                                            transition-all duration-500 ease-in-out shadow-md`}
                                    >
                                        <div className="grid items-center text-center">
                                            <div className="text-md w-10 h-10 grid justify-center items-center">
                                                <UserCog strokeWidth={2} size={25} />
                                            </div>
                                        </div>
                                        <p>ตั้งค่าโปรไฟล์</p>
                                    </div>

                                    <div className="w-full grid gap-2">
                                        <div className="flex gap-1 justify-between items-center ">
                                            <div className="flex gap-1 max-w-44 overflow-hidden items-center">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" />
                                                    <AvatarFallback>
                                                        {
                                                            session?.user.fname ?
                                                                session?.user.fname.charAt(0).toUpperCase() : 'e'
                                                        }
                                                    </AvatarFallback>
                                                </Avatar>
                                                <p>
                                                    {session?.user.fname ?
                                                        session?.user.fname.charAt(0).toUpperCase() + session?.user.fname.slice(1).toLowerCase() : 'err'}
                                                </p>
                                            </div>

                                            <div className="grid items-center text-center overflow-hidden rounded-lg ">
                                                <div className="text-md w-14 h-10 grid justify-center items-center rounded-md">
                                                    <ThemeModeToggle></ThemeModeToggle>
                                                </div>
                                                <p>ธีม</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-1 text-gray-600 dark:text-gray-300">
                                            <ChartNoAxesGantt />
                                            {
                                                session?.user.roleName ?
                                                    session?.user.roleName.charAt(0).toUpperCase() + session?.user.roleName.slice(1).toLowerCase() : 'err'
                                            }

                                        </div>

                                        <div onClick={() => { signOut() }} className="flex gap-1 text-rose-700">
                                            <LogOut strokeWidth={2} />
                                            <p>ออกจากระบบ</p>
                                        </div>

                                    </div>
                                </div>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </>
            ) : (
                // Sidebar สำหรับหน้าจอขนาดใหญ่
                <>
                    <div
                        className={`${isSidebarOpen ? "w-52 items-start" : "w-14"} 
                            py-3 px-2 transition-all 
                            duration-500 ease-in-out flex flex-col 
                            gap-1 justify-between overflow-hidden
                             h-full
                    `}>
                        {/* ส่วนบน */}
                        <div className="grid gap-2 w-full">
                            <div className="flex gap-1 justify-start items-center">
                                <div className="grid items-center text-center">
                                    <div className="grid justify-center items-center bg-gray-400 w-10 h-10 bg-background rounded-sm border cursor-pointer">
                                        {/* {logo} */}
                                    </div>
                                </div>
                                {isSidebarOpen ? <p>ClassRoom</p> : null}
                            </div>

                            <div
                                onClick={() => router.push('/app/dashboard')}
                                className={`${pathname.startsWith('/app/dashboard')
                                    ? 'bg-primary/90 text-gray-100 shadow-lg'
                                    : 'bg-secondary text-gray-600 dark:text-gray-300'} 
                                    flex gap-1 justify-start items-center 
                                    cursor-pointer rounded-md border 
                                    hover:bg-primary hover:text-gray-200 
                                    transition-all duration-500 ease-in-out shadow-md`}
                            >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className="grid items-center text-center">
                                                <div className="text-md w-10 h-10 grid justify-center items-center">
                                                    <LayoutGrid strokeWidth={2} size={25} />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>แดช บอร์ด</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {isSidebarOpen ? <p>แดช บอร์ด</p> : null}
                            </div>

                            <div
                                onClick={() => router.push('/app/group')}
                                className={`${pathname.startsWith('/app/group')
                                    ? 'bg-primary/90 text-gray-200 shadow-lg'
                                    : 'bg-secondary text-gray-600 dark:text-gray-300'} 
                                    flex gap-1 justify-start items-center 
                                    cursor-pointer rounded-md border 
                                    hover:bg-primary hover:text-gray-200 
                                    transition-all duration-500 ease-in-out shadow-md`}
                            >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className="grid items-center text-center">
                                                <div className="text-md w-10 h-10 grid justify-center items-center">
                                                    <School strokeWidth={2} size={25} />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>ห้องเรียน</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {isSidebarOpen ? <p>ห้องเรียน</p> : null}
                            </div>

                            <div
                                onClick={() => {
                                    router.push('/app/assignments');
                                }}
                                className={`${pathname.startsWith('/app/assignments')
                                    ? 'bg-primary/90 text-gray-200 shadow-lg'
                                    : 'bg-secondary text-gray-600 dark:text-gray-300'
                                    } flex gap-1 justify-start items-center cursor-pointer rounded-md border hover:bg-primary hover:text-gray-200 transition-all duration-500 ease-in-out shadow-md`}
                            >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className="grid items-center text-center">
                                                <div className="text-md w-10 h-10 grid justify-center items-center">
                                                    <Backpack strokeWidth={2} size={25} />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>การบ้าน</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {isSidebarOpen ? <p>การบ้าน</p> : null}
                            </div>

                            <div
                                onClick={() => {
                                    router.push('/app/notification');
                                }}
                                className={`${pathname.startsWith('/app/notification')
                                    ? 'bg-primary/90 text-gray-200 shadow-lg'
                                    : 'bg-secondary text-gray-600 dark:text-gray-300'} 
                                    flex gap-1 justify-start items-center 
                                    cursor-pointer rounded-md border  relative
                                    hover:bg-primary hover:text-gray-200 
                                    transition-all duration-500 ease-in-out shadow-md`}
                            >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className=" relative grid items-center text-center ">
                                                <div className="text-md w-10 h-10 grid justify-center items-center">
                                                    {
                                                        notification ? (
                                                            <BellRing strokeWidth={2} size={25} />
                                                        ) : (
                                                            <BellOff strokeWidth={2} size={25} />
                                                        )
                                                    }
                                                </div>

                                                {isSidebarOpen ?
                                                    null
                                                    : <div>
                                                        <span className="absolute bottom-8 left-8 inline-flex h-3 w-3 animate-ping  rounded-full bg-orange-500 opacity-30"></span>
                                                        <span className="absolute bottom-8 left-8 inline-flex h-3 w-3 rounded-full bg-red-600 opacity-90"></span>
                                                    </div>
                                                }
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>การแจ้งเตือน</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {isSidebarOpen ?
                                    <div>
                                        <p>การแจ้งเตือน</p>
                                        <div className={` 
                                            absolute top-0 right-1 
                                        `}>+990</div>
                                    </div>
                                    : null
                                }
                            </div>

                            <div
                                onClick={() => router.push('/app/setting/profile')}
                                className={`${pathname.startsWith('/app/setting')
                                    ? 'bg-primary/90 text-gray-200 shadow-lg'
                                    : 'bg-secondary text-gray-600 dark:text-gray-300'} 
                                    flex gap-1 justify-start items-center 
                                    cursor-pointer rounded-md border 
                                    hover:bg-primary hover:text-gray-200 
                                    transition-all duration-500 ease-in-out shadow-md`}
                            >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className="grid items-center text-center">
                                                <div className="text-md w-10 h-10 grid justify-center items-center">
                                                    <UserCog strokeWidth={2} size={25} />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>ตั้งค่าโปรไฟล์</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {isSidebarOpen ? <p>ตั้งค่าโปรไฟล์</p> : null}
                            </div>
                        </div>

                        {/* ส่วนล่าง */}
                        <div className="grid gap-1 w-full">
                            {/* เมนู Dropdown */}
                            <div className="grid gap-1 w-full">
                                <div className="w-full flex gap-1 justify-start items-center cursor-pointer rounded-md bg-secondary text-gray-600 dark:text-gray-300">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="w-full">
                                            <div className="w-full flex gap-1 items-center text-center">
                                                <div className="text-md w-10 h-10 grid justify-center items-center">
                                                    <Avatar>
                                                        <AvatarImage src="https://github.com/shadcn.png" />
                                                        <AvatarFallback>
                                                            {
                                                                session?.user.fname ?
                                                                    session?.user.fname.charAt(0).toUpperCase() : 'e'
                                                            }
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                {isSidebarOpen ?
                                                    <p>
                                                        {session?.user.fname ?
                                                            session?.user.fname.charAt(0).toUpperCase() + session?.user.fname.slice(1).toLowerCase() : 'err'}
                                                    </p>
                                                    : null}
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>
                                                <p>
                                                    {session?.user.fname ?
                                                        session?.user.fname.charAt(0).toUpperCase() + session?.user.fname.slice(1).toLowerCase() : 'err'}
                                                </p>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem disabled>
                                                <div className="flex gap-1 text-gray-600 dark:text-gray-300">
                                                    <ChartNoAxesGantt strokeWidth={2} />
                                                    <p>{
                                                        session?.user.roleName ?
                                                            session?.user.roleName.charAt(0).toUpperCase() + session?.user.roleName.slice(1).toLowerCase() : 'err'
                                                    }
                                                    </p>
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div onClick={() => router.push('/app/setting/profile')} className="flex gap-1 text-gray-600 dark:text-gray-300">
                                                    <UserCog strokeWidth={2} />
                                                    <p>ตั้งค่าโปรไฟล์</p>
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div onClick={() => { signOut() }} className="flex gap-1 text-rose-700">
                                                    <LogOut strokeWidth={2} />
                                                    <p>ออกจากระบบ</p>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            {/* ตัวเลือกเปลี่ยนธีม */}
                            <div className="grid gap-1 w-full">
                                <div className="flex gap-1 items-center">
                                    <div className="grid items-center text-center">
                                        <div className="text-md w-10 h-10 grid justify-center items-center">
                                            <ThemeModeToggle />
                                        </div>
                                    </div>
                                    {isSidebarOpen ? <p>ธีม</p> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
}
