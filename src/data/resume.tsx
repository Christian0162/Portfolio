import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Csharp } from "@/components/ui/svgs/csharp";
import { Tailwindcss } from "@/components/ui/svgs/tailwindcss";
import {
  Css3,
  DotNet,
  Firebase,
  Html5,
  Inertia,
  JavaScript,
  Jest,
  Laravel,
  Php,
  Playwright,
  Postman,
} from "@/components/ui/svgs/brand-icons";

export const DATA = {
  name: "Christian Llyod G. Rivera",
  initials: "CR",
  url: "https://github.com/Christian0162",
  location: "Libo, Tayud Consolacion, Cebu, Philippines",
  locationLink: "https://www.google.com/maps/place/Consolacion,+Cebu",
  description:
    "Motivated Full-Stack Developer and IT graduate with hands-on experience in building scalable web applications, software testing, and DevOps workflows.",
  summary:
    "Full-Stack Developer and Information Technology graduate with internship and client project experience building scalable web applications. Proficient in React, Laravel, ASP.NET MVC, Node.js, Tailwind CSS, and REST API development. Experienced in database design, software testing, deployment workflows, Docker, GitHub, and Agile development practices. Passionate about developing high-quality software solutions and continuously learning new technologies to deliver business value. ",
  avatarUrl: "/me.png",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Laravel", icon: Laravel },
    { name: "PHP", icon: Php },
    { name: "C#", icon: Csharp },
    { name: "Typescript", icon: Typescript },
    { name: "Tailwind CSS", icon: Tailwindcss },
    { name: "Node.js", icon: Nodejs },
    { name: "Python", icon: Python },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Docker", icon: Docker },
    { name: "JavaScript", icon: JavaScript },
    { name: "HTML", icon: Html5 },
    { name: "CSS", icon: Css3 },
    { name: "Inertia.js", icon: Inertia },
    { name: "ASP.NET MVC", icon: DotNet },
    { name: "Firebase", icon: Firebase },
    { name: "Postman", icon: Postman },
    { name: "Git / GitHub", icon: Icons.github },
    { name: "Playwright", icon: Playwright },
    { name: "Jest", icon: Jest },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "riv.christian19@gmail.com",
    tel: "09603253142",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Christian0162",
        icon: Icons.github,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:riv.christian19@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Sprobe Inc.",
      href: "",
      badges: ["Internship"],
      location: "Mandaue City, Cebu (Remote/Hybrid)",
      title: "Full-Stack Developer Intern",
      logoUrl: "/sprobe.png",
      start: "Feb 2026",
      end: "May 2026",
      description:
        "Collaborated with a development team to build TripEase, a real-time itinerary management web application. Developed and maintained frontend and backend features using React, Inertia.js, Laravel, and Tailwind CSS. Integrated Mapbox API for interactive mapping and location-based features. Implemented UI components using modern libraries such as shadcn/ui. Performed API testing, debugging, and validation using Postman. Supported deployment workflows and version control using GitHub and Docker. Assisted in end-to-end testing using Playwright to ensure system reliability.",
    },
  ],
  education: [
    {
      school: "University of Cebu Lapu-Lapu Mandaue (UCLM)",
      href: "https://www.facebook.com/uclmofficial/",
      degree: "Bachelor of Science in Information Technology (Dean's Lister)",
      logoUrl: "uc.png",
      start: "2022",
      end: "2026",
    },
    {
      school: "Tayud National High School",
      href: "",
      degree: "Senior High School Graduate",
      logoUrl: "tayud.png",
      start: "2020",
      end: "2022",
    },
    {
      school: "Tayud National High School",
      href: "",
      degree: "Junior High School Graduate",
      logoUrl: "tayud.png",
      start: "2017",
      end: "2020",
    },
  ],
  projects: [
    {
      title: "EventPro: Smart Supplier Management and Analytics Platform (Capstone Project)",
      href: "",
      dates: "May 2025 - Dec 2025",
      active: true,
      description:
        "Developed EventPro, a smart supplier management and analytics platform for event planning (Capstone project). Implemented modules including event posting, supplier applications, contract management, and secure transactions. Built a real-time messaging system and an analytics dashboard for user insights. Designed role-based access control for different user types (admin, supplier, client) and integrated AI-assisted supplier recommendation features.",
      technologies: [
        "React",
        "Python",
        "Node.js",
        "Firebase Authentication",
        "Firebase Realtime Database",
        "Firestore",
        "FastAPI",
        "Gemini AI",
        "Lalamove API",
        "Xendit API",
        "REST API",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Christian0162",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "eventpro.png",
      video: "",
    },
    {
      title: "PeptieshayByKisha (Client Project)",
      href: "",
      dates: "April 2026",
      active: true,
      description:
        "Developed PeptieshayByKisha, an e-commerce and health-tracking platform for peptide products. Implemented user authentication, product catalog, shopping cart, and order checkout tracking. Built advanced tracking functionalities including syringe tracking, reconstitution guidance, dosage management, lab test monitoring, and a community interaction forum called 'PepTalk'.",
      technologies: [
        "React",
        "TailwindCSS",
        "Firebase",
        "Firestore",
        "Docker",
        "Firebase Authentication",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Christian0162",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "peptieshaybykisha.png",
      video: "",
    },
    {
      title: "Salon Management System (Client Project)",
      href: "",
      dates: "March 2024 - April 2024",
      active: true,
      description:
        "Developed an end-to-end salon management system designed to streamline booking, scheduling, and billing workflows. Designed the database schema and system architecture for scalability. Built responsive admin and staff dashboards with role-based access control. Implemented key features including inventory tracking, appointment scheduling, and automated billing reports.",
      technologies: [
        "ASP.NET MVC",
        "Razor",
        "TailwindCSS",
        "SSMS (SQL Server Management Studio)",
        "System Design",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Christian0162",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "salon.png",
      video: "",
    },
  ],
  certificates: [
    {
      title: "Tech Talk: Database Programming",
      issuer: "University of Cebu Lapu-Lapu and Mandaue",
      dates: "2024",
      description:
        "Attended Tech Talk on Database Programming focusing on advanced database concepts, optimization, and programming techniques.",
      image: "uc.png",
      links: [],
    },
    {
      title: "Network Tutorial 2024",
      issuer: "University of Cebu Lapu-Lapu and Mandaue",
      dates: "2024",
      description:
        "Completed technical tutorial sessions on networking essentials, network setup, troubleshooting, and network protocols.",
      image: "uc.png",
      links: [],
    },
    {
      title: "Certificate of Recognition",
      issuer: "University of Cebu Lapu-Lapu and Mandaue",
      dates: "2026",
      description:
        "Awarded for being recognized as the Outstanding Capstone Project for the study entitled 'EventPro: Smart Supplier Management and Analytics Platform for Event Planning'",
      image: "uc.png",
      links: [],
    },
    {
      title: "Certificate of Completion",
      issuer: "Sprobe Inc.",
      dates: "2026",
      description:
        "Awarded for having excellently performed in Sprobe's internship program under the Project Manangement Division (PMD) from February 2026 to May 2026, with a service equivalent to 540 hours.",
      image: "sprobe.png",
      links: [],
    },
  ],
} as const;
