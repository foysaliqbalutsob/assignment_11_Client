import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#00000f] text-neutral-content">
      <div className="footer sm:footer-horizontal p-10">

        {/* Quick Navigation */}
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Assets</a>
          <a className="link link-hover">My Requests</a>
          <a className="link link-hover">Dashboard</a>
        </nav>

        {/* Contact Info */}
        <nav>
          <h6 className="footer-title">Contact</h6>
          <p>Email: foysal@example.com</p>
          <p>Phone: +880 1XXXXXXXXX</p>
        </nav>

        {/* Social Media */}
        <nav>
          <h6 className="footer-title">Follow Us</h6>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-primary">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-primary">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-primary">
              <FaLinkedin />
            </a>
          </div>
        </nav>
      </div>

      {/* Copyright Section */}
      <div className="text-center py-4 border-t border-gray-700">
        <p className="text-sm">
          © {new Date().getFullYear()} Foysal Iqbal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
