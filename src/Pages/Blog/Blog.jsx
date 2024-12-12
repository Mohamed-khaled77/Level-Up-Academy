
import Quotes from "./Quotes/Quotes"
import Articles from "./Articles/Articles"
import "./Blog.scss"
export default function Blog() {
  return (
    <div className=" container  ">
      <div className="row g-0 ">

      <Quotes/>
      <Articles/>

      </div>
    </div>
  )
}

