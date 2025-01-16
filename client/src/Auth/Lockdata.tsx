import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import secondbrain from "../../public/brains.png";
import { FiGithub } from "react-icons/fi";
import { MdArrowRightAlt } from "react-icons/md";

const Lockdata = () => {
  return (
    <div className="bg-[#1a1625] w-full h-screen pt-16 md:pt-0">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="text-center">
            <div className="mb-3">
            <span className="bg-purple-500/20 text-purple-200 px-4 py-1 rounded-full text-sm">
                Your Digital Memory Vault
              </span>
            </div>
            
            <div className="flex justify-center mb-6">
              <motion.img 
                src={secondbrain} 
                width={150} 
                height={150} 
                className="mx-auto"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>

            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-6 font-['Montserrat'] uppercase leading-tight">
              Super<span className="text-purple-400">Brain</span>
            </h1>
            
            <p className="text-md  md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-mono tracking-tight">
              Share your entire collection of notes, documents, tweets, and videos with others.
              Think of it as your second brain - always organized, always accessible.
            </p>
            
            <div className="flex justify-center gap-6">
             <Link to="/login">
             
             <motion.button 
                className=" text-white px-4 py-2 
                 flex items-center shadow-lg border-2 rounded-3xl"
                
              >
                Get Started
              </motion.button>
             </Link>
              
            <Link to="https://github.com/prudvinani/secondbrain">
            <motion.button 
                className=" text-white hover:underline mt-2">
                <div className="flex items-center">
                <FiGithub className="text-xl mr-1"/> 
                Github 
                <MdArrowRightAlt className="text-xl ml-1"/>
                </div>
              </motion.button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lockdata;