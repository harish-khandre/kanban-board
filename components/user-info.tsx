import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md ">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/*
          Todo: Add image support for credentials users and render them properly

        {user?.isOAuth === true && (
          <Image src={user?.image as string} height={500} width={500} alt={user?.name} className="rounded-full mx-auto" />
        )}

        */}
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-secondary rounded-md ">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-secondary rounded-md ">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-secondary rounded-md ">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <div className="truncate text-xs max-w-[180px] font-mono p-1 bg-secondary rounded-md ">
            <Badge
              variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            >
              {user?.isTwoFactorEnabled ? "ON" : "OFF"}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/settings">
          <Button>Update</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
