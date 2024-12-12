
import CardCourses from '../../Courses/CardCourses/CardCourses';
import HeroSection from '../../../components/HeroSection/HeroSection';
import './Home.scss'
import Community from '../../About/SmallWorks/SmallWorks';
import Teacher from '../../../components/Teacher/Teacher';

export default function Home() {
  return (
    <div className=" container">
            <HeroSection/>
    <CardCourses/>
    <Community/>
    <Teacher/>
    </div>
  )
}
