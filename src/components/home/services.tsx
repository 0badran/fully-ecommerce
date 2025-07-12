import { useTranslations } from "next-intl";
import Image from "next/image";
import sv from "public/services.png";
import sv2 from "public/services2.png";
import sv3 from "public/services3.png";

const services = [
  {
    src: sv,
    title: "servicesTitle",
    description: "servicesDescription",
  },
  {
    src: sv2,
    title: "servicesTitle2",
    description: "servicesDescription2",
  },
  {
    src: sv3,
    title: "servicesTitle3",
    description: "servicesDescription3",
  },
];

export default function Services() {
  const t = useTranslations();
  return (
    <section className="px-10 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-5">
      {services.map(({ src, title, description }, i) => (
        <div key={i} className="text-center space-y-3">
          <Image src={src} alt={t(title)} className="mx-auto size-20" />
          <h2 className="font-semibold text-xl">{t(title)}</h2>
          <p>{t(description)}</p>
        </div>
      ))}
    </section>
  );
}
