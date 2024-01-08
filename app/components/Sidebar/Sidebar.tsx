"use client";
import { useGlobalState } from "@/app/context/GlobalProvider";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import menu from "@/app/utils/menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const router = useRouter();
  const { theme } = useGlobalState();
  // console.log(theme);
  const handleClick = (link: string) => {
    router.push(link);
  };
  const pathname = usePathname();
  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay">
          <Image
            width={70}
            height={70}
            src={"/images/profile.jpg"}
            alt={"Profile-image"}
          />
        </div>
        <h1>
          <span>Abhibhab</span>
          <span>Mitra</span>
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item) => {
          const link = item.link;
          return (
            <li
              className={`nav-item ${pathname === link ? "active" : ""}`}
              onClick={() => {
                handleClick(link);
              }}
            >
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <button></button>
    </SidebarStyled>
  );
};
const SidebarStyled = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${(props) => props.theme.colorGrey3};

  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;

    border-radius: 1rem;
    cursor: pointer;

    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};

    display: flex;
    align-items: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      transition: all 0.55s linear;
      border-radius: 1rem;
      border: 2px solid ${(props) => props.theme.borderColor2};

      opacity: 0.2;
    }

  }

  

`;

export default Sidebar;
