import HeroSection from '@/components/portfolio/HeroSection'
import AboutSection from '@/components/portfolio/AboutSection'
import SkillsGrid from '@/components/portfolio/SkillsGrid'
import FeaturedProjects from '@/components/portfolio/FeaturedProjects'
import ContactCTA from '@/components/portfolio/ContactCTA'
import FeaturedArt from '@/components/art/FeaturedArt'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsGrid />
      <FeaturedProjects />
      <FeaturedArt />
      <ContactCTA />
    </>
  )
}
