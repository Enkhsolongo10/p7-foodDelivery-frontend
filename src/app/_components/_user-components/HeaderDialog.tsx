import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa6";

const HeaderDialog = () => {
  return (
    <div className="flex gap-3 items-center">
      <Dialog>
        <DialogTrigger className="md:hidden">
          <GoLocation className="w-[30px] h-[30px] text-[#EF4444]" />
        </DialogTrigger>
        <DialogTrigger className="bg-white text-[13px] rounded-full h-[36px] px-3 hidden md:block">
          <div className="flex justify-between items-center gap-2">
            <div className="text-[#EF4444] flex items-center gap-1">
              <GoLocation className="w-[20px] h-[20px]" />
              <p>Delivery Address:</p>
            </div>
            <div className="text-[#71717A] flex items-center gap-1">
              <p>Add Location</p>
              <FaChevronRight />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger className="bg-white rounded-full p-2 w-[36px] h-[36px] text-black flex justify-center items-center">
          <FiShoppingCart />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger className="bg-red-500 rounded-full p-2 w-[36px] h-[36px] text-white flex justify-center items-center">
          <IoPersonOutline />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeaderDialog;