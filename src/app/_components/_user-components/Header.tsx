import Image from "next/image";
import HeaderDialog from "./HeaderDialog";

const Header = () => {
  return (
    <div className="py-3 px-3 bg-[#18181B] flex justify-between items-center min-w-[320px] md:min-w-[768px] lg:min-w-[1024px] lg:px-20 xl:min-w-[1535px]">
      <div className="text-white flex gap-3">
        <Image
          src="https://res.cloudinary.com/dvedrysvm/image/upload/v1748649069/Screenshot_2024-12-17_at_18.02.18_1_Traced_elxaw3.png"
          alt="Logo"
          width={46}
          height={37.29}
          className="object-contain"
        />
        <div>
          <div className="flex font-semibold text-xl">
            <p>Nom</p>
            <p className="text-red-500">Nom</p>
          </div>
          <p className="text-sm">Swift Delivery</p>
        </div>
      </div>
      <div>
        <HeaderDialog />
      </div>
    </div>
  );
};

export default Header;