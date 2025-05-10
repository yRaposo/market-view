'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import UserProfile from "@/components/UserProfile";
import { fetchUser } from "@/services/userService";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [userProfileImg, setUserProfileImg] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        async function getUserData() {
            try {
                const userData = await fetchUser();
                setUserProfileImg(userData.profile_img);
                setUserName(userData.nickname);
                setUserId(userData.id);
            } catch (error) {
                console.error('Error fetching user', error);
            }
        }

        getUserData();
    }, []);

    return (
            <div>
                <header className="header bg-white text-black p-4 flex justify-between w-auto mx-2 my-2 rounded-xl border-2 border-gray-300 ">
                    <div>
                        <h1 className="text-xl font-bold">MarketView</h1>
                    </div>
                    <div className="flex gap-4">
                        <Link className="align-middle" href="/home">Home</Link>
                        <Link className="align-middle" href="/about">About</Link>
                        {userProfileImg ? (
                            <Link className="align-middle" href={'/user'}>
                                <UserProfile userProfileImg={userProfileImg} userName={userName} userId={userId} />
                            </Link>
                        ) : (
                            <div><CgSpinner className="animate-spin" size={20} /></div>
                        )}
                    </div>
                </header>
                <div className="container mx-auto">
                    {children}
                </div>
            </div>
    );
}