import { HashOnLoad } from "@/components/hash-on-load";
import { Cases } from "@/components/landing/cases";
import { Finale } from "@/components/landing/finale";
import { Hero } from "@/components/landing/hero";
import { Marquee } from "@/components/landing/marquee";
import { Method } from "@/components/landing/method";
import { Services } from "@/components/landing/services";
import { Story } from "@/components/landing/story";
import { Voices } from "@/components/landing/voices";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <HashOnLoad />
      <main id="content">
        <Hero />
        <Marquee />
        <Story />
        <Services />
        <Cases />
        <Method />
        <Voices />
        <Finale />
      </main>
      <SiteFooter />
    </>
  );
}
