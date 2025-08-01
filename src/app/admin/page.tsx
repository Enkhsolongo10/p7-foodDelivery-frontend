'use client';

import { FoodCategory } from '../_components/_admin-components/FoodCategory';
import FoodList from '../_components/_admin-components/FoodList';

export default function AdminPage() {
    return(
        <div className='flex flex-col ml-7'>
            <FoodCategory />
            <FoodList />           
        </div>
    )
};
