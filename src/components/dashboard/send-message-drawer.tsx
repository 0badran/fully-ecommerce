import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface SendMessageDrawerProps {
  users: {
    emails: string[];
    names: string[];
  };
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function SendMessageDrawer({
  users,
  open,
  setOpen,
}: SendMessageDrawerProps) {
  const t = useTranslations();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Replace with your API call
      await new Promise((res) => setTimeout(res, 1000));
      setSuccess(true);
      setMessage("");
    } catch (e: any) {
      setError(e.message || "Unknown error");
    }
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-w-xl mx-auto">
        <DrawerHeader>
          <DrawerTitle>{t("sendMessage")}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <div className="mb-2 text-sm text-muted-foreground">
            {t("sendTo")}: <b>{users.names.join(", ")}</b> (
            {users.emails.join(", ")})
          </div>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("typeMessage")}
            rows={4}
            className="mb-2"
          />
          {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
          {success && (
            <div className="text-green-600 text-xs mb-2">
              {t("messageSent")}
            </div>
          )}
          <div className="flex gap-2 justify-end">
            <DrawerClose asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </DrawerClose>
            <Button onClick={handleSend} disabled={loading || !message}>
              {loading ? t("sending") : t("send")}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
