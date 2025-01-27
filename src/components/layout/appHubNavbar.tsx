"use client";
import { useLayoutContext } from '@/context/layoutContext';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { AlignJustify, IndentDecrease, IndentIncrease, Slash } from 'lucide-react';
import { usePageContext } from '@/context/pageNameContext';

export default function AppHubNavbar() {
    const { isSidebarOpen, toggleSidebar } = useLayoutContext();
    const { toggleDrawer } = useLayoutContext();
    const [isMobile, setIsMobile] = useState(false);
    const { pageName } = usePageContext();
    const paths = Array.isArray(pageName) ? pageName : [pageName];



    // ตรวจสอบขนาดหน้าจอ
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // ขนาด 768px หรือต่ำกว่า ถือว่าเป็นหน้าจอขนาดเล็ก
        };

        handleResize(); // เรียกครั้งแรกเมื่อคอมโพเนนต์ mount
        window.addEventListener("resize", handleResize); // อัพเดตเมื่อขนาดหน้าจอเปลี่ยน

        return () => window.removeEventListener("resize", handleResize); // ทำความสะอาด listener เมื่อคอมโพเนนต์ถูก unmount
    }, []);

    return (
        <aside className="flex gap-1 items-center">
            {isMobile ? (
                // สำหรับหน้าจอขนาดเล็ก
                <div className="flex gap-1 transition-all duration-300 ease-in-out items-center justify-center">
                    <div className="grid items-center text-center ">
                        <div className="grid justify-center items-center bg-gray-400 w-10 h-10 bg-background rounded-sm border cursor-pointer">

                            {/* {logo} */}

                        </div>
                    </div>
                    <Button
                        className='rounded-full'
                        variant={"secondary"}
                        size={"icon"}
                        onClick={toggleDrawer}
                    >
                        <AlignJustify />
                    </Button>
                </div>
            ) : (
                // สำหรับหน้าจอขนาดใหญ่
                <div className="transition-all duration-300 ease-in-out items-center justify-center">
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={toggleSidebar}
                    >
                        {isSidebarOpen ? <IndentDecrease /> : <IndentIncrease />}
                    </Button>
                </div>
            )}

            <div>  {
                paths.map((path) => {
                    const pathSegments = path.split("/");
                    return (
                        <div key={path} className="flex flex-row items-center my-2">
                            {pathSegments.map((segment: string, index: number) => (
                                <div key={index} className="flex items-center">
                                    <p
                                        className={`${index === 0 ? 'text-[15px] dark:text-gray-300 text-gray-600' : 'text-[12px] dark:text-gray-400 text-gray-500'}`}
                                    >
                                        {segment}
                                    </p>
                                    {index < pathSegments.length - 1 && (
                                        <div className='flex items-center space-y-1'>
                                            <Slash size={12} className='text-gray-400' />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    );
                })
            }
            </div>
        </aside>
    );
}
