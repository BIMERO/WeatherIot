"use client";
import { useGetUser } from "@/hooks/useGetUser";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ProfileForm = () => {
  const res = useGetUser();
  const email = res.userInfo?.session.user.email;
  const avatarUrl = res.userInfo?.session.user.user_metadata.avatar_url;
  const userFullName = res.userInfo?.session.user.user_metadata.full_name;

  return (
    <div>
      <div className="flex items-center gap-5 justify-center m-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="bg-blue-300">AVATAR</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-3">
          <span className="flex items-center gap-2">
            <h3 className="font-bold">Email:</h3>
            <p className="text-sm">{email}</p>
          </span>
          <span className="flex items-center gap-2">
            {" "}
            <h3 className="font-bold">Full Name:</h3>
            <p className="text-sm">{userFullName ? userFullName : "NA"}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
