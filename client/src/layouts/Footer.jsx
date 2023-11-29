import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">© 2023 Your Company. All rights reserved.</p>
        <div className="mt-2">
          <a
            href="#"
            className="text-gray-400 hover:text-white mx-2 transition duration-300"
          >
            Privacy Policy
          </a>
          <span className="text-gray-400 mx-2">|</span>
          <a
            href="#"
            className="text-gray-400 hover:text-white mx-2 transition duration-300"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
