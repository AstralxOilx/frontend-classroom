import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// 1. สร้าง NotificationContext สำหรับแจ้งเตือน
interface NotificationContextType {
    notification: boolean;
    setNotification: (notification: boolean) => void;
    volume: number;
    setVolume: (volume: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    // 2. ดึงค่าจาก localStorage เมื่อแอปเริ่มต้น
    const [notification, setNotification] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const storedNotification = localStorage.getItem('notification');
            return storedNotification === 'true'; // แปลงค่าเป็น boolean
        }
        return false; // ค่าเริ่มต้นหากไม่ได้อยู่ในเบราว์เซอร์
    });

    // 3. ดึงค่าระดับเสียงจาก localStorage
    const [volume, setVolume] = useState<number>(() => {
        if (typeof window !== 'undefined') {
            const storedVolume = localStorage.getItem('volume');
            return storedVolume ? parseFloat(storedVolume) : 0.5; // ค่าปริยายคือ 0.5
        }
        return 0.5; // ค่าเริ่มต้น
    });

    // 4. ปรับ volume เป็น 0 ถ้า notification เป็น false
    useEffect(() => {
        if (!notification) {
            setVolume(0); // ถ้า notification เท็จให้ตั้งค่า volume เป็น 0
        } else {
            setVolume(0.2);
            // ถ้า notification เป็นจริง เก็บค่า volume จาก localStorage
            if (typeof window !== 'undefined') {
                const storedVolume = localStorage.getItem('volume');
                if (storedVolume) {
                    setVolume(parseFloat(storedVolume));
                }
            }
        }
    }, [notification]);

    // 5. อัปเดตค่า notification และเก็บค่าลงใน localStorage
    const updateNotification = (notification: boolean) => {
        setNotification(notification);
        if (typeof window !== 'undefined') {
            localStorage.setItem('notification', notification.toString());
        }
    };

    // 6. อัปเดตค่า volume ใน localStorage
    const updateVolume = (volume: number) => {
        setVolume(volume);
        if (typeof window !== 'undefined') {
            localStorage.setItem('volume', volume.toString());
        }
    };

    return (
        <NotificationContext.Provider value={{ notification, setNotification: updateNotification, volume, setVolume: updateVolume }}>
            {children}
        </NotificationContext.Provider>
    );
};

// 7. Hook สำหรับเข้าถึง context
export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotificationContext must be used within a NotificationProvider');
    }
    return context;
};
