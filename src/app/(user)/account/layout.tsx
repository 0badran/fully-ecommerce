"use client";
import AccountBreadcrumb from "@/components/account-breadcrumb";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
const tabs = [
  {
    label: "manageMyAccount",
    items: [
      { label: "myAccount", href: "/account" },
      { label: "addressBook", href: "/account/address-book" },
    ],
  },
  {
    label: "myOrder",
    items: [
      { label: "myReturns", href: "/account/returns" },
      { label: "myCancellations", href: "/account/cancellations" },
    ],
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <div className="container space-y-16 mt-14">
      <AccountBreadcrumb />
      <div className=" flex flex-col md:flex-row gap-8 md:gap-16">
        <aside className="w-full md:w-64">
          <nav className="space-y-8">
            {tabs.map((section) => (
              <div key={section.label}>
                <h3 className="mb-2 font-semibold text-gray-700 text-base">
                  {t(section.label)}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-2 py-1 rounded transition text-gray-600 hover:text-main hover:bg-gray-100",
                          pathname === item.href &&
                            "text-main font-medium bg-gray-50"
                        )}
                      >
                        {t(item.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
        <section className="flex-1">{children}</section>
      </div>
    </div>
  );
}
