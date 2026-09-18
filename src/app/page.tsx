import { Hero } from "@/components/home/hero";
import { AboutSummary } from "@/components/home/about-summary";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { TechStackGrid } from "@/components/home/tech-stack-grid";
import { RecentPosts } from "@/components/home/recent-posts";
import { Stats } from "@/components/home/stats";
import { ContactCta } from "@/components/home/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSummary />
      <FeaturedProjects />
      <TechStackGrid />
      <RecentPosts />
      <Stats />
      <ContactCta />
    </>
  );
}
