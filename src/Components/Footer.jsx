import { Link } from 'react-router';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail 
} from 'lucide-react';
import { LuRotate3D } from 'react-icons/lu';

import logoImage from "../assets/Logo.png";
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';


const Footer = () => {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="bg-linear-to-r from-[#BC1823] to-[#3f060a] py-8 px-4  rounded-xl mt-20 text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center justify-center gap-2 flex-col  text-white">
         {/* <LuRotate3D size={25}/>
      <span className="text-xl font-bold  dark:text-gray-200">3D Model Hub</span> */}
      <img className="h-8 rounded-full" src={logoImage} alt="" />
                <h3 className="text-lg font-bold   ">FoodShare</h3>
    </div>
          <ul className="space-y-2 mt-4">
           
            <li><Link to="/" className=" hover:text-teal-200">Home</Link></li>
           
            <li><Link to="/available-foods" className=" hover:text-teal-200">Available Foods</Link></li>
            <li><Link to="/login" className=" hover:text-teal-200">Login</Link></li>
            
          </ul>
        </div>

       

        <div>
          <h3 className="text-lg font-bold mb-4  ">Community</h3>
          <ul className="space-y-2">
            <li><Link to="/" className=" hover:text-teal-200">Discussion Forums</Link></li>
            <li><Link to="/" className=" hover:text-teal-200">Events & Workshops</Link></li>
            <li><Link to="/" className=" hover:text-teal-200">Leaderboard</Link></li>
            <li><Link to="/" className=" hover:text-teal-200">Resources</Link></li>

          </ul>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
          <div className="flex flex-col gap-2 mb-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className=" hover:text-teal-200">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className=" hover:text-teal-200">
              <FaXTwitter size={24}/>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className=" hover:text-teal-200">
              <FaInstagram size={24} />
            </a>
          
          </div>
          <div>
            <a 
              href="mailto:food@share.com" 
              className="flex items-center hover:text-teal-200"
            >
              <Mail size={18} className="mr-2" /> food@share.com
            </a>
          </div>
        </div>
      </div>


      <div className="border-t lg:mb-0 md:mb-0 mb-20 border-[#fa7171] mt-8 pt-4 text-center">
        <p className="text-sm ">
          © {currentYear} Food Share. All Rights Reserved.
          <span className="ml-4">
            <Link to="/" className="hover:text-teal-200 mr-3">Privacy Policy</Link>
            <Link to="/" className="hover:text-teal-200">Terms of Service</Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;