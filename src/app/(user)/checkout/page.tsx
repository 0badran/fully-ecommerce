import Checkout from "@/components/checkout";
import { getUserAddress } from "@/server-functions/users";

export default async function CheckoutPageWrapper() {
  const address = await getUserAddress();
  return <Checkout address={address} />;
}
