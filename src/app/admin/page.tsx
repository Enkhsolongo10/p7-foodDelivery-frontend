'use client';

import {useEffect, useState} from 'react';
import { useSearchParams } from 'next/navigation';
import { AdminCategory } from '../_components/_admin-components/Category';
// import { AdminMenu } from '../_components/_admin-components/Food';

export default function AdminPage() {
    return(
        <div className='flex flex-col ml-7'>
            <AdminCategory />           
            {/* <AdminMenu/> */}
        </div>
    )
};
