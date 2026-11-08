/* =====================================================================
   SITE DATA  —  the ONLY file you need to edit for day-to-day changes.
   Everything on both pages (index.html + projects.html) is rendered
   from this object: links, contact info, projects, hardware, skills.

   Tips
   - Leave a value as "" to hide it (e.g. phone: "" hides the phone icon).
   - A project with url: "" shows as "Coming soon" (not clickable).
   - To add a project, copy one block in `projects` and edit it.
   - Set featured: true to also show it on the home page.
   ===================================================================== */
window.SITE = {

  /* ---------- Identity ---------- */
  name: "anandhuajith",
  officialName: "Anandhakrishnan Ajith",
  pageTitle: "anandhuajith — Portfolio",
  defaultTheme: "light",            // "light" or "dark" (visitor's choice is remembered)

  /* ---------- Contact & social links ---------- */
  contact: {
    email:    "anandhuajith@gmail.com",            // <-- put your real email
    phone:    "",                              // <-- e.g. "+91 98765 43210"  ("" = hidden)
    github:   "https://github.com/ANANDHUAJITH",
    linkedin: "https://www.linkedin.com/in/anandhuajithh/",         // <-- put your real LinkedIn URL
  },

  /* ---------- Navigation (Ketchup OS is last; it forwards straight out) ---------- */
  nav: [
    { label: "Home",     href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "About",    href: "#about" },
    { label: "Skills",   href: "#skills" },
    { label: "Contact",  href: "#contact" },
    { label: "Ketchup-OS", href: "https://anandhuajith.github.io/ketchup-web/",
      external: true, newTab: false, logo: "assets/ketchup-mark.svg" },
  ],

  /* ---------- Hero ---------- */
  hero: {
    typingPrefix: ["CODE", "BUILD"],
    typingWords:  ["IMPROVE", "CREATE", "EXPERIMENT", "SHIP"],
    statementHtml: "B.Tech student who<br> loves to <strong>build systems.</strong>",
    statusCard: "Available for interesting builds",
    signature: "JUST ANOTHER DEVELOPER...",
    buttons: [
      { label: "View Projects", href: "#projects", style: "primary", arrow: true },
      { label: "About Me",      href: "#about",    style: "secondary" },
    ],
    // little icon dock at bottom-left of the hero
    toolbox: [
      { icon: "linux",   label: "Linux",              url: "https://www.linux.org/" },
      { icon: "vscode",  label: "Visual Studio Code", url: "https://code.visualstudio.com/" },
      { icon: "github",  label: "GitHub",             url: "https://github.com/ANANDHUAJITH" },
      { icon: "arduino", label: "Arduino",            url: "https://www.arduino.cc/" },
      { icon: "python",  label: "Python",             url: "https://www.python.org/" },
    ],
  },

  /* ---------- Projects ----------
     category: used by the filter chips on the showcase page.
     featured: true  => shown on the home page (home shows these + "See more").
     logo:     optional image shown on the card.                              */
  projectCategories: ["Systems", "Robotics", "Embedded", "Assistive", "Networking"],

  projects: [
    {
      title: "Ketchup OS", category: "Systems", featured: true,
      logo: "assets/ketchup-mark.svg", logoDark: "assets/ketchup-mark.svg",
      desc: "My main project: an Arch-based operating system built by modifying CachyOS and ArchISO. A hands-on exploration of Linux systems, distro engineering, and the desktop experience.",
      tags: ["LINUX", "ARCH", "CACHYOS", "ARCHISO"],
      url: "https://anandhuajith.github.io/ketchup-web/",
    },
    {
      title: "FES Device", category: "Assistive", featured: true,
      desc: "A functional electrical stimulation device exploring assistive technology for patients with paralysis.",
      tags: ["BIOMEDICAL", "ELECTRONICS", "FES"],
      url: "https://github.com/ANANDHUAJITH/fes",
    },
    {
      title: "ISLR — Sign-to-Voice Wearable", category: "Assistive", featured: true,
      desc: "A wearable designed to sit on a shirt like a wireless microphone, aimed at translating sign language into spoken voice for non-speaking users.",
      tags: ["WEARABLES", "EMBEDDED", "ASSISTIVE TECH"],
      url: "https://github.com/ANANDHUAJITH/ISLR",
    },
    {
      title: "Getmeby Chat", category: "Networking", featured: true,
      desc: "A WhatsApp-inspired chat clone built with TCP as a learning-by-practice project.",
      tags: ["TCP", "NETWORKING", "CHAT"],
      url: "https://github.com/ANANDHUAJITH/getmeby",
    },
    {
      title: "Getmeby Pay", category: "Networking", featured: true,
      desc: "A UPI-inspired payment clone built over TCP for learning through implementation.",
      tags: ["TCP", "NETWORKING", "PAYMENTS"],
      url: "https://github.com/ANANDHUAJITH/getmeby_pay",
    },
    {
      title: "Piper Robotic Arm", category: "Robotics", featured: true,
      desc: "ROS configuration and simulation work for the Piper robotic arm, along with experience on AgileX real hardware.",
      tags: ["ROS", "ROBOTICS", "SIMULATION"],
      url: "https://github.com/ANANDHUAJITH/piper",
    },
    {
      title: "TurtleBot 4 & Pololu romi", category: "Robotics", featured: true,
      desc: "Worked with TurtleBot 4 and built/configured Pololu robots, implementing telemetry and navigation.",
      tags: ["ROS", "TELEMETRY", "NAVIGATION"],
      url: "https://github.com/ANANDHUAJITH/REPLACE-MOBILE-ROBOT-REPO",
    },
    {
      title: "ESP32 & Raspberry Pi Builds", category: "Embedded", featured: true,
      desc: "Hands-on embedded and mobile-robot projects using ESP32 and Raspberry Pi 3, 4, 5, and Zero 2 W.",
      tags: ["ESP32", "RASPBERRY PI", "EMBEDDED"],
      url: "https://github.com/ANANDHUAJITH?tab=repositories",
    },

    /* ---- More projects (showcase page only). EDIT / DELETE these freely. ---- */
    {
      title: "iRobot Create 3 Mobile Base", category: "Robotics", featured: false,
      desc: "Working with the iRobot Create 3 as a ROS 2 mobile base for navigation and sensor experiments.",
      tags: ["ROS 2", "CREATE 3", "MOBILE ROBOT"],
      url: "https://github.com/CENTRE-FOR-ROBOTICS-TKMCE/create-3",
    },
    {
      title: "RealSense + RPLiDAR Perception", category: "Robotics", featured: false,
      desc: "Sensor setups combining an Intel RealSense depth camera with a 2D RPLiDAR for mapping and obstacle sensing.",
      tags: ["REALSENSE", "RPLIDAR", "PERCEPTION"],
      url: "https://github.com/ANANDHUAJITH/REPLACE-PERCEPTION-REPO",
    },
    {
      title: "Microcontroller Experiments", category: "Embedded", featured: false,
      desc: "Small builds across ESP8266, ATmega and ATtiny boards — from Wi-Fi gadgets to tiny low-power circuits.",
      tags: ["ESP8266", "ATMEGA", "ATTINY"],
      url: "https://github.com/ANANDHUAJITH/",
    },
    // ---- Template: copy, paste, edit ----
    // {
    //   title: "My New Project", category: "Systems", featured: false,
    //   desc: "One or two sentences about it.",
    //   tags: ["TAG ONE", "TAG TWO"],
    //   url: "https://github.com/ANANDHUAJITH/my-new-project",
    // },
  ],

  /* ---------- "See more" card on the home page ---------- */
  seeMore: {
    title: "See more projects",
    desc: "The full showcase: everything above plus newer builds.",
    href: "projects.html#project-showcase",
  },

  /* ---------- About ---------- */
  about: {
    kicker: "A little about me",
    titleHtml: "Curious by default.<br>Developer by choice.",
    copyHtml: "I'm <strong>Anandhu Ajith</strong> (official name: Anandhakrishnan Ajith), a B.Tech student with hands-on experience across Linux, robotics, embedded systems, and assistive technology. I’m especially drawn to Linux and robotics systems,kernel-level design, bio-robotics, and Site Reliability Engineering (SRE). I learn by building and testing real things—from an Arch-based OS and TCP applications to robotic platforms and assistive devices.",
    leadership: {
      kicker: "Leadership & community",
      title: "Head of Advanced Robotics Team (ART)",
      paragraphs: [
        "Center for Robotics, TKM College of Engineering (CROB). I also maintain the ART GitHub community.",
        "Mentored 300+ students through 7+ workshops and multiple talk sessions, sharing practical experience and supporting hands-on learning.",
      ],
    },
  },

  /* ---------- Skills ---------- */
  skills: {
    kicker: "Toolbox",
    title: "Systems, robots & the stack.",
    items: [
      "Linux · Arch · CachyOS", "ROS · Robotics", "Bio-robotics · FES", "SRE foundations",
      "ESP32 · Embedded", "Raspberry Pi 3/4/5 · Zero 2 W", "TCP · Networking", "Python · Git",
      "Go · currently learning", "Rust · currently learning", "HTML / CSS / JavaScript", "Hyprland",
    ],
  },

  /* ---------- Hardware ----------
     note: small label on the chip (e.g. "basic use"). Leave "" for none.   */
  hardware: {
    kicker: "Hardware",
    title: "Boards, robots & sensors I've used.",
    groups: [
      { name: "Microcontrollers", items: [
        { name: "ESP32" }, { name: "ESP8266" }, { name: "ATmega" }, { name: "ATtiny" },
      ]},
      { name: "Single-board computers", items: [
        { name: "Raspberry Pi 3" }, { name: "Raspberry Pi 4" }, { name: "Raspberry Pi 5" },
        { name: "Raspberry Pi Zero 2 W" }, { name: "Jetson Nano", note: "basic use" },
      ]},
      { name: "Robots & arms", items: [
        { name: "TurtleBot 4" }, { name: "iRobot Create 3" }, { name: "Pololu romi" },
        { name: "Piper arm" },
      ]},
      { name: "Sensors", items: [
        { name: "Intel RealSense camera" }, { name: "RPLiDAR 2D" },
      ]},
    ],
  },

  /* ---------- Contact section ---------- */
  contactSection: {
    kicker: "Get in touch",
    title: "Have an interesting idea?",
    copy: "Let's build something worth exploring.",
    buttonLabel: "Say Hello",
  },

  /* ---------- Showcase page ---------- */
  showcase: {
    kicker: "Project showcase",
    title: "Everything I've built.",
    copy: "Systems, robots, embedded boards and assistive tech — filter by area or open any card for the repo or demo.",
    // Big banner at the top of the showcase page. Delete the whole `banner` block to remove it.
    banner: {
      title: "Ketchup OS",
      desc: "An Arch-based operating system built on CachyOS and ArchISO. Visit the Ketchup website to see it in action.",
      label: "Visit Ketchup OS",
      url: "https://anandhuajith.github.io/ketchup-web/",
      logoLight: "assets/ketchup-logo.svg",       // wordmark for light theme
      logoDark:  "assets/ketchup-logo-dark.svg",  // wordmark for dark theme
    },
  },

  footer: "© anandhuajith · Anandhakrishnan Ajith · Designed & built with curiosity.",
};
