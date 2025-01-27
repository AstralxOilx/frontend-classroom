// lib/SetPageName.tsx
'use client';

import { useEffect } from 'react';
import { usePageContext } from '@/context/pageNameContext';

interface SetPageNameProps {
    name: string;
}

export default function SetPageName({ name }: SetPageNameProps) {
    const { setPageName } = usePageContext();

    useEffect(() => {
        setPageName(name);
    }, [name, setPageName]);

    return null;
}
