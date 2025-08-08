// 'use client';

// import { AdminFoodCategory } from '../_components/AdminFoodCategory';
// import { AdminFoodSection } from '../_components/AdminFoodSection';

// export default function AdminPage() {
//     return(
//         <div className='flex flex-col ml-7'>
//             <AdminFoodCategory />
//             <AdminFoodSection />
//         </div>
//     )
// };
"use client";
import AdminSidebar from "../_components/admin-components/SideBar";
import Pfp from "../_components/admin-components/ProfilePicture";
import { FoodCategory } from "../_components/admin-components/FoodCategory";
import { FoodSection } from "../_components/admin-components/FoodSection";
// type Props = {
//   searchParams: Promise<{ category: string }>;
// };

// type Foods = {
//   _id: string;
//   foodName: string;
//   price: string;
//   image: string;
//   ingredients: string;
//   category: string;
// };

// export default async function Page(props: Props) {
// const { category } = await props.searchParams;
// console.log(category);
// const [foods, setFoods] = useState<Foods[]>([]);

// async function getFood() {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${category}`);
//   const data = await response.json();
//   setFoods(data);
// }
// useEffect(() => {
//   getFood();
// }, [foods]);
export default function Page() {
  return (
    <AdminSidebar>
      <div className="relative">
        <Pfp />
      </div>
      <FoodCategory />
      {/* {!category ? <Section /> : <div></div>} */}
      <FoodSection />
    </AdminSidebar>
  );
}