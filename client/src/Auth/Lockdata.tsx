import { Link } from "react-router-dom"
import { ModeToggle } from "../components/mode-toggle"
import { Button } from "../components/ui/button"

const Lockdata = () => {
  return (
    <div >
        <p className="text-end p-5"><ModeToggle/></p>
<div className="flex flex-col justify-center items-center pt-72 md:pt-56 ">
<p className=" text-xl md:text-3xl tracking-tighter font-semibold">Welcome to SecondBrain 🧠📝</p>
<p className="  md:text-3xl tracking-tighter  text-center px-10 pt-2 text-sm">Share your entire collection of notes, documents, tweets, and videos with others.</p>
<div className="flex pt-4 ">
<p className="mr-4">   
    
    
    <Link to="/login"> <Button variant="outline">Login</Button></Link>
</p>
  <Link to="/signup">  <Button variant="outline">Signup</Button></Link>

</div>
    
    </div>        
    </div>
  )
}

export default Lockdata