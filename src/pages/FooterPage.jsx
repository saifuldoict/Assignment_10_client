import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const FooterPage = () => {
  return (
    <footer className="bg-base-300 text-base-content mt-10">
   
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    
        <div className="text-center sm:text-left">
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: "#7cbc5e" }}
          >
            Contact Us
          </h2>
          <p className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <FaPhoneAlt className="text-[#7cbc5e]" /> +880 1745032477
          </p>
          <p className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <FaEnvelope className="text-[#7cbc5e]" /> saifulnhk@gmail.com
          </p>
          <p className="flex items-center justify-center sm:justify-start gap-2">
            <FaMapMarkerAlt className="text-[#7cbc5e]" /> Meherpur, Bangladesh
          </p>
        </div>

  
        <div className="text-center">
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: "#7cbc5e" }}
          >
            Follow Us
          </h2>
          <div className="flex justify-center gap-6 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaFacebookF className="text-[#1877F2]" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaTwitter className="text-[#1DA1F2]" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaInstagram className="text-[#E4405F]" />
            </a>
          </div>
        </div>


        <div className="text-center sm:text-left">
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: "#7cbc5e" }}
          >
            Policies
          </h2>
          <ul className="space-y-2">
            <li>
              <a href="/privacy" className="hover:text-[#7cbc5e] transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-[#7cbc5e] transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-[#7cbc5e] transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>


      <div className="border-t border-gray-300 py-4 text-center text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span style={{ color: "#7cbc5e", fontWeight: "600" }}>PetCare</span>.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;