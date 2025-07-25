import Image from "next/image";

const Container = () => {
  return (
    <div className="flex justify-between items-center">
        <Image
          src="https://res.cloudinary.com/dvedrysvm/image/upload/v1748654363/BG_unvbdb.png"
          alt="Container"
          width={1440}
          height={668}
          className="object-contain xl:min-w-[1535px]"
        />
    </div>
  );
};

export default Container;