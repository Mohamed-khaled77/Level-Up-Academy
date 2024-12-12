import "./About.scss"
import AboutTitle from "./AboutTitle/AboutTitle";
import Region from "./Region/Region";
import OurMentors from "./OurMentors/OurMentors"
import SmallWorks from "./SmallWorks/SmallWorks";
import SocialImpact from "./SocialImpact/SocialImpact"
export default function About() {
  return (
    <div className=" container">
      <AboutTitle/>
      <Region/>
      <OurMentors/>
      <SmallWorks/>
      < SocialImpact/>
    </div>
  )
}
