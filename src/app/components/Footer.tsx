// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0E3855]  to-black text-white  ">
      <div className="border-t border-gray-700 px-2 sm:px-6 lg:px-28">
        <div className=" mx-auto  py-6 flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-4 md:mb-0 flex items-center gap-2">
            <img
              src="/mawell-icon.svg"
              alt="Mawell Logo"
              className="w-24 h-auto"
            />
          </div>

          {/* Social media icons */}
          <div className="flex space-x-4">
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className=" mx-auto  py-4 flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <p>Mawell S.R.L © 2025. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white">
              Home
            </a>
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Blog
            </a>
            <a href="#" className="hover:text-white">
              Help Center
            </a>
            <a href="#" className="hover:text-white">
              About
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
