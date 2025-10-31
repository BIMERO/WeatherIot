import React from "react";
import { TbSunset2 } from "react-icons/tb";
import Link from "next/link";
import ProfileModal from "./modals/ProfileModal";
import { Button } from "./ui/button";
import { IoLogoGithub } from "react-icons/io5";
import { signOut } from "@/actions";
import { FiLogOut } from "react-icons/fi";
import ProfileDrawer from "./drawers/ProfileDrawer";
import SettingModal from "./modals/SettingModal";

const Navbar = () => {
  return (
    <section className="py-6 px-10">
      <div className="flex items-center justify-between gap-3 ">
        <Link href="/">
          <TbSunset2 color="white" size={80} />
        </Link>

        <div>
          <ul className="flex md:gap-1 items-center text-white text-base">
            <li className="hidden md:block">
              <ProfileModal />
            </li>

            <li className="md:hidden">
              <ProfileDrawer />
            </li>

            <li className="hidden md:block">
              <SettingModal />
            </li>

            <li>
              <Link
                href={"https://github.com/BIMERO/WeatherIot"}
                target="_blank"
              >
                <Button variant={"secondary"} className="gap-1">
                  <IoLogoGithub size={20} />
                  <p className="hidden md:block">Github</p>
                </Button>
              </Link>
            </li>

            <li>
              <form action={signOut}>
                <Button type="submit">
                  <FiLogOut />
                  Sign Out
                </Button>
              </form>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full mt-2 h-[2px] bg-gradient-to-r from-transparent via-[#c3cbd8] to-transparent"></div>
    </section>
  );
};

export default Navbar;
