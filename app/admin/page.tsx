"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

function onApiRouteClick() {
  fetch("/api/admin/store/").then((res) => {
    if (res.ok) {
      toast.success("Allowd api route!");
    } else {
      toast.error("Forbidden api route!");
    }
  });
}

const onServerActionClick = () => {
  admin().then((res) => {
    if (res.success) {
      toast.success("Allowd api route!");
    } else {
      toast.error("Forbidden api route!");
    }
  });
};

export default function AdminPage() {
  return (
    <Card>
      <CardHeader>
        <p> 🗝️ Admin </p>
      </CardHeader>
      <CardContent>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="Welcome Admin!" />
          <p>Create CMS For store </p>
          <div className="flex flex-row items-center justify-between rounded0lg border p-3 shadow-md">
            <p className="text-sm font-medium">
              Push products through this Admin only API :
            </p>
            <Button className="text-primary text-sm" onClick={onApiRouteClick}>
              /api/admin/store
            </Button>
          </div>
          <div className="flex flex-row items-center justify-between rounded0lg border p-3 shadow-md">
            <p className="text-sm font-medium">
              Push products through this Admin only Server Action :
            </p>
            <Button
              className="text-primary text-sm"
              onClick={onServerActionClick}
            >
              Check
            </Button>
          </div>
        </RoleGate>
      </CardContent>
    </Card>
  );
}
