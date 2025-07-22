import { getUserAddress } from "@/actions";
import Checkout from "@/components/checkout";

export default async function CheckoutPageWrapper() {
  const address = await getUserAddress();
  return <Checkout address={address} />;
}
