import { FC } from "react";

interface AvatarProps {
  fullname: string;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({ fullname, className = "" }) => {
  const initials = fullname
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); // Limit to 2 initials

  return (
    <div
      className={`w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium ${className}`}
      title={fullname}
    >
      {initials || "U"}
    </div>
  );
};

export default Avatar;
