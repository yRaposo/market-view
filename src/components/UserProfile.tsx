import Image from "next/image";
import { CgSpinner } from "react-icons/cg";
import { UserProfileProps } from "@/services/api.types";

export default function UserProfile({ userProfileImg, userName, userId }: UserProfileProps) {
  if (!userProfileImg || !userName || !userId) {
    return <CgSpinner className="animate-spin" size={32} />;
  }

  return (
    <>
      <Image src={userProfileImg} alt="User Profile" width={32} height={32} className="rounded-full h-8 w-8" />
    </>
  );
}