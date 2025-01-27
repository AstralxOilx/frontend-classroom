"use client"
import React, { useState } from 'react'
import SetPageName from '@/lib/setPageName';
import { Button } from '@/components/ui/button';
import { BellOff, BellRing, ImageUp, KeyRound, PencilLine, RefreshCcw, Save, UserRoundCog } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNotificationContext } from '@/context/notification-context';
import Link from 'next/link';


export default function page() {
    const pageName = "โปรไฟล์";
    const { notification, setNotification } = useNotificationContext();
    const [formProfileData, setFormProfileData] = useState({
        first_name: "",
        last_name: "",
        identification: "",
    });

    const handleChangeUpdateProfileData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleUpdateProfileData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ลบฟิลด์ที่ไม่มีข้อมูล
        const filteredData = Object.fromEntries(
            Object.entries(formProfileData).filter(([_, value]) => value.trim() !== "")
        );

        if (Object.keys(filteredData).length === 0) {
            return null;
        } else {
            //อัปเดตข้อมูล
            console.log(filteredData)
        }
    };

    const resetFormProfileData = () => {
        setFormProfileData({
            first_name: '',
            last_name: '',
            identification: '',
        });
    }

    const toggleNotification = () => {
        setNotification(!notification);
    };



    return (
        <>
            <SetPageName name={pageName} />
            <div className="grid justify-center items-center h-[80%] w-full">
                <div className="bg-secondary/10 rounded-md shadow-md text-gray-600 dark:text-gray-400 py-14 px-2
                    grid lg:flex lg:items-center lg:gap-4 justify-center items-center w-[23rem] sm:w-[50rem]">
                    {/* ส่วนโปรไฟล์ */}
                    <div className="grid p-1 gap-4 w-[22rem] sm:w-[30rem]">
                        <div className="grid gap-1 justify-center items-center">
                            <div className="flex justify-center items-center gap-1">
                                <UserRoundCog />
                                <p>โปรไฟล์</p>
                            </div>
                            <div className="w-44 h-44 bg-white rounded-sm shadow-sm"></div>
                            <Button
                                variant="secondary"
                                className='shadow-sm rounded-sm'
                            >
                                <ImageUp />
                                อัปเดตโปรไฟล์
                            </Button>
                        </div>
                        <div className="flex gap-1 justify-center items-center">
                            <p>การแจ้งเตือน</p>
                            <div className="
                            text-md w-10 h-10 grid justify-center items-center text-gray-100 bg-yellow-500/80 
                            hover:cursor-pointer border border-secondary shadow-sm rounded-md
                            "
                                onClick={toggleNotification}
                            >
                                {
                                    notification ? (
                                        <BellRing strokeWidth={2} size={25} />
                                    ) : (
                                        <BellOff strokeWidth={2} size={25} />
                                    )
                                }
                            </div>
                        </div>
                        <Link
                            href={"/app/setting/change-password"}
                            className="flex mt-10 justify-center items-center text-gray-600 text-sm dark:text-gray-400 hover:text-primary hover:underline">
                            <KeyRound strokeWidth={2} size={18} />
                            <p>เปลี่ยนรหัสผ่าน?</p>
                        </Link>
                    </div>
                    {/* แบบฟอร์ม */}
                    <div className="h-full grid w-full">
                        <form onSubmit={handleUpdateProfileData} className="grid gap-6">
                            {/* ฟิลด์ชื่อ */}
                            <div className="grid gap-1 w-[22rem] sm:w-[30rem]">
                                <div className="flex gap-1">
                                    <div className="w-full">
                                        <div className="p-1 flex items-center">
                                            <PencilLine size={20} />
                                            <p className="text-sm">ชื่อ</p>
                                        </div>
                                        <Input
                                            id="first_name"
                                            name="first_name"
                                            type="text"
                                            value={formProfileData.first_name}
                                            onChange={handleChangeUpdateProfileData}
                                            placeholder="อนุวัฒน์"
                                        />
                                    </div>
                                </div>
                                {/* ฟิลด์นามสกุล */}
                                <div className="flex gap-1">
                                    <div className="w-full">
                                        <div className="p-1 flex items-center">
                                            <PencilLine size={20} />
                                            <p className="text-sm">นามสกุล</p>
                                        </div>
                                        <Input
                                            id="last_name"
                                            name="last_name"
                                            type="text"
                                            value={formProfileData.last_name}
                                            onChange={handleChangeUpdateProfileData}
                                            placeholder="กิ่งสกุล"
                                        />
                                    </div>
                                </div>
                                {/* ฟิลด์รหัส */}
                                <div className="flex gap-1">
                                    <div className="w-full">
                                        <div className="p-1 flex items-center">
                                            <PencilLine size={20} />
                                            <p className="text-sm">รหัสประจำตัว นักศึกษา/ครู</p>
                                        </div>
                                        <Input
                                            id="identification"
                                            name="identification"
                                            type="text"
                                            value={formProfileData.identification}
                                            onChange={handleChangeUpdateProfileData}
                                            placeholder="651723102242"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* ปุ่ม */}
                            <div className="flex gap-2 w-full justify-end">
                                <Button
                                    variant="outline"
                                    type="reset"
                                    onClick={resetFormProfileData}
                                >
                                    <RefreshCcw />
                                    รีเช็ต
                                </Button>
                                <Button
                                    className="transition-all duration-200 ease-in-out"
                                    variant={
                                        Object.values(formProfileData).some((value) => value.trim() !== "")
                                            ? "default"
                                            : "outline"
                                    }
                                    type="submit"
                                >
                                    <Save />
                                    อัปเดต
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
