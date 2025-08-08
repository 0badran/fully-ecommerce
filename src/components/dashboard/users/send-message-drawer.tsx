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
import { sendMail } from "@/server-functions/users";
import { Input } from "@/components/ui/input";

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
  const [messageBody, setMessageBody] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { emails } = users;
    try {
      for (const email of emails) {
        await sendMail(email, subject, messageBody);
      }

      setSuccess(true);
      setMessageBody("");
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-w-xl mx-auto">
        <DrawerHeader>
          <DrawerTitle>{t("sendMessage")}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4 space-y-5">
          <div className="mb-2 text-sm text-muted-foreground">
            {t("sendTo")}: <b>{users.names.join(", ")}</b> (
            {users.emails.join(", ")})
          </div>
          <Input
            placeholder={t("typeSubject")}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Textarea
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            placeholder={t("typeMessage")}
            rows={4}
            className="mb-3"
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
            <Button
              onClick={handleSend}
              disabled={loading || (!messageBody && !subject)}
            >
              {loading ? t("sending") : t("send")}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
