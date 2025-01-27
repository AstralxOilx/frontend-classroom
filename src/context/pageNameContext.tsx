import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

const PageContext = createContext<{ pageName: string; setPageName: (name: string) => void } | undefined>(undefined);

export const PageProvider = ({ children }: { children: ReactNode }) => {
    const [pageName, setPageName] = useState<string>(() => {
        // ดึงค่าจาก localStorage ถ้ามี
        if (typeof window !== 'undefined') {
            const storedPageName = localStorage.getItem('pageName');
            return storedPageName || ''; // ถ้าไม่มีค่าจะคืนค่าว่าง
        }
        return ''; // ค่าเริ่มต้นถ้าไม่ได้อยู่ในเบราว์เซอร์
    });

    // ฟังก์ชันสำหรับเปลี่ยนชื่อเพจ
    const updatePageName = (name: string) => {
        setPageName(name);
        localStorage.setItem('pageName', name); // บันทึกค่าลงใน localStorage
    };

    return (
        <PageContext.Provider value={{ pageName, setPageName: updatePageName }}>
            {children}
        </PageContext.Provider>
    );
};

export const usePageContext = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error('usePageContext must be used within a PageProvider');
    }
    return context;
};
