import { UserButton } from "@clerk/nextjs";
import React from "react";

function DashboardHeader() {
  return (
    <div className="p-4 shadow-sm border-b items-center flex justify-between">
      <div className="input-container">
        <input
          type="text"
          name="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon">
          <svg
            width="19px"
            height="19px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="1"
              d="M14 5H20"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              opacity="1"
              d="M14 8H17"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
              stroke="#000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              opacity="1"
              d="M22 22L20 20"
              stroke="#000"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>

        <style jsx>{`
          .input-container {
            width: 220px;
            position: relative;
          }

          .icon {
            position: absolute;
            right: 10px;
            top: calc(50% + 5px);
            transform: translateY(calc(-50% - 5px));
          }

          .input {
            width: 100%;
            height: 40px;
            padding: 10px;
            transition: 0.2s linear;
            border: 2.5px solid black;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 2px;
          }

          .input:focus {
            outline: none;
            border: 0.5px solid black;
            box-shadow: -5px -5px 0px black;
          }

          .input-container:hover > .icon {
            animation: anim 1s linear infinite;
          }

          @keyframes anim {
            0%,
            100% {
              transform: translateY(calc(-50% - 5px)) scale(1);
            }

            50% {
              transform: translateY(calc(-50% - 5px)) scale(1.1);
            }
          }
        `}</style>
      </div>

      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
