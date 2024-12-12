import HeroSection from "../../components/HeroSection/HeroSection"
import "./ForTalent.scss"
import Community from "../../components/community/Community"
import Expert from "../../components/Expert/Expert"
import Interview from "../../components/Interview/Interview"
import Teacher from "../../components/Teacher/Teacher"
import SmallCourses from "../../components/SmallCourses/SmallCourses"
import Join from "../../components/Join/Join"
import Talent from "../../components/Talent/Talent"
export default function Home() {
  return (
    <div className=" container">
      <HeroSection/>
      <Community/>
      <Expert/>
      <Interview/>
      <Teacher/>
      <SmallCourses />
      <Join/>
      <Talent/>
    </div>
  )
}
