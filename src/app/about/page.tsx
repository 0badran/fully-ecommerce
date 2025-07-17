import Services from "@/components/home/services";
import { MonyBag, Sale, Shop, ShoppingBag } from "@/components/icon";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import about from "public/about-us.jpg";

const iconsData = [
  { icon: Shop, title: "Sellers active our site", count: 10.5 },
  { icon: MonyBag, title: "Monthly Product Sale", count: 33 },
  { icon: ShoppingBag, title: "Monthly Product Sale", count: 45.5 },
  { icon: Sale, title: "Monthly Product Sale", count: 25 },
];
export default function AboutPage() {
  return (
    <main className="container space-y-16 mt-10">
      {/* Breadcrumb */}
      <Breadcrumbs links={[{ label: "", href: "" }]} />
      {/* Story Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl lg:text-5xl font-semibold mb-6">Our Story</h1>
          <p className="mb-4 text-gray-700">
            Launched in 2015, Exclusive is South Asia&apos;s premier online
            shopping marketplace with an active presence in Bangladesh.
            Supported by wide range of tailored marketing, data and service
            solutions, Exclusive has 10,500 sellers and 300 brands and serves 3
            million customers across the region.
          </p>
          <p className="text-gray-700">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <div>
          <Image
            src={about}
            alt="Shopping image"
            className="rounded-lg object-cover"
          />
          <Link
            href="http://www.freepik.com"
            className="text-xs block text-center underline"
          >
            Designed by Freepik
          </Link>
        </div>
      </section>
      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
        {iconsData.map((item, i) => (
          <Card
            key={i}
            className="flex group *:transition-colors *:duration-500 transition-colors duration-500 hover:bg-main flex-col items-center py-8 hover:text-white"
          >
            <div className="p-2.5 rounded-full bg-[#2F2E30]/30 group-hover:bg-white/30">
              <div className="p-2 rounded-full bg-black group-hover:bg-white">
                <item.icon className="text-white group-hover:text-black" />
              </div>
            </div>
            <span className="text-2xl font-bold">{item.count}k</span>
            <span>{item.title}</span>
          </Card>
        ))}
      </section>

      <Services />
    </main>
  );
}
