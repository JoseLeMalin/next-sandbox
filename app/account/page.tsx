import Account from "@/components/account/Account";
import { useSession } from "next-auth/react";


export default function AccountPage() {

  return (
    <div>
      <Account/>
    </div>
  );
}