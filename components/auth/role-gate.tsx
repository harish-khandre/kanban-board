import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

export const RoleGate = ({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: UserRole;
}) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return <FormError message="You are not authorized to view this page" />;
  }

  return <>{children}</>;
};
