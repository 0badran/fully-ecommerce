"use client";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import MainButton from "@/components/shared/main-button";
import ReusableForm from "@/components/shared/reusable-form";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactUsPage() {
  const t = useTranslations();
  const fields = [
    {
      name: "name",
      label: t("name"),
      className: "bg-secondary border-0 focus-visible:border",
    },
    {
      name: "email",
      label: t("email"),
      type: "email",
      className: "bg-secondary border-0 focus-visible:border",
    },
    {
      name: "phone",
      label: t("phone"),
      className: "bg-secondary border-0 focus-visible:border",
    },
    {
      name: "message",
      label: t("message"),
      parentClassName: "col-span-full",
      className: "bg-secondary min-h-36 border-0 focus-visible:border",
    },
  ];
  return (
    <section className="container mt-16 space-y-12">
      <Breadcrumbs links={[{ href: "/contact", label: "contact" }]} />
      <div className="flex max-md:flex-col gap-4">
        {/* Details */}
        <Card className="w-full md:max-w-xs px-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-3 bg-main rounded-full">
                <Phone className="text-white" />
              </div>
              <span>Call To Us</span>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +201063806110</p>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-3 bg-main rounded-full">
                <Mail className="text-white" />
              </div>
              <span>Call To Us</span>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +201063806110</p>
          </div>
        </Card>
        {/* Form */}
        <Card className="flex-1 px-6">
          <ReusableForm
            formFields={fields}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            formAction={() => {}}
            renderButton={
              <MainButton
                text="Submit message"
                className="col-span-full max-w-[200px]"
              />
            }
          />
        </Card>
      </div>
    </section>
  );
}
