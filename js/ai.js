/* ============================================================
   ROAD ROCK HOLDINGS — AI CHAT WIDGET (FIXED VERSION)
   Fixes:
   1. Logo overflow on small screens
   2. Widget positioned ABOVE WhatsApp button (not beside/overlapping)
   3. Widget never auto-opens — only opens on click
   4. Full-screen mode on open
   5. Top-right: minimize (-) and close (x) buttons
      - Minimize: shrinks chat back to icon
      - Close (x): shows confirm popup "End this chat?"
        Yes → closes with thank-you message
        No  → returns to chat
   6. Top-left: back arrow — goes back to the page (closes chat)
   ============================================================ */

(function () {
  /* ── COMPANY KNOWLEDGE BASE ─────────────────────────────── */
  const COMPANY = {
    name: "Road Rock Holdings",
    tagline: "Building the Future. Delivering Excellence.",
    type: "Multi-Industry Holding Company",
    hq: "Lagos, Nigeria",
    coverage: "Nigeria, Africa & Global Markets",
    founded: "Established with 15+ years of excellence",
    ceo: "Tech Engineer Ikechukwu B. Anyanwu",
    ceoTitle: "CEO & Founder",
    phones: ["+234 808 236 3104", "+234 901 805 3469"],
    email: "info@roadrockholdings.com",
    whatsapp: "https://wa.me/2348082363104",
    hours: "Monday–Friday: 8:00 AM – 6:00 PM | Saturday: 9:00 AM – 2:00 PM",
    stats: {
      years: "15+",
      projects: "250+",
      clients: "100+",
      sectors: "5",
      team: "50+",
    },
    services: [
      {
        id: "construction",
        name: "Road & Civil Construction",
        icon: '<i class="fas fa-hard-hat"></i>',
        desc: "Highway construction, bridge engineering, road rehabilitation, drainage systems, urban infrastructure, asphalt & concrete works, earthworks and traffic management systems.",
        link: "services.html#construction",
      },
      {
        id: "realestate",
        name: "Real Estate Development",
        icon: '<i class="fas fa-building"></i>',
        desc: "Smart homes, luxury apartments, commercial buildings, estate planning, property development, facility management, off-plan sales and property investment advisory.",
        link: "services.html#real-estate",
      },
      {
        id: "solar",
        name: "Solar & Renewable Energy",
        icon: '<i class="fas fa-solar-panel"></i>',
        desc: "Solar panel installation, inverter & battery systems, industrial solar solutions, smart energy management, solar street lights, hybrid power systems, energy consultation and ongoing maintenance.",
        link: "services.html#solar",
      },
      {
        id: "technology",
        name: "Information Technology (IT)",
        icon: '<i class="fas fa-laptop-code"></i>',
        desc: "Network infrastructure, cybersecurity solutions, cloud services, software development, smart automation, IT support & consultancy, CCTV & surveillance, web & app development.",
        link: "services.html#technology",
      },
      {
        id: "interiors",
        name: "Interiors & Exteriors",
        icon: '<i class="fas fa-paint-roller"></i>',
        desc: "Modern interior designs, POP ceiling designs, smart home finishing, landscaping, exterior beautification, luxury transformations, office fit-outs, flooring & wall finishing.",
        link: "services.html#interiors",
      },
    ],
    values: ["Innovation", "Integrity", "Sustainability", "Excellence", "Human-Centered Development"],
    mission: "To transform industries through innovation, engineering excellence, sustainability, and technology-driven solutions that improve lives across Africa.",
    vision: "To be Africa's most trusted multi-industry conglomerate, delivering world-class solutions while empowering communities and driving economic growth.",
    markets: {
      infrastructure: "$170B+ infrastructure gap in Africa growing at 7.2% CAGR",
      solar: "$24B+ solar energy market in Nigeria by 2030, growing at 12.4% CAGR",
      tech: "$7B+ Nigeria tech market growing at 15.6% CAGR",
      realestate: "$29B+ real estate sector with 20M+ housing deficit",
      interiors: "$3B+ interior design market growing at 8.3% CAGR",
    },
  };

  /* ── RESPONSE ENGINE ─────────────────────────────────────── */
  const RESPONSES = {
    greetings: [
      `Hey there! <i class="fas fa-hand-wave"></i> Welcome to **${COMPANY.name}**! I'm your virtual assistant, and I'm here to help you with anything you need. Whether it's about our services, projects, or just getting in touch — ask away! <i class="fas fa-smile"></i>`,
      `Hello! <i class="fas fa-smile"></i> Great to have you here at **${COMPANY.name}**! We're a multi-industry conglomerate based in Lagos, Nigeria, and I'm here to guide you. What can I help you with today?`,
      `Hi! Welcome! <i class="fas fa-star"></i> I'm the AI assistant for **${COMPANY.name}** — your go-to guide for everything about our company, services, and team. How can I assist you today?`,
      `Good day! <i class="fas fa-hand-wave"></i> You've reached the virtual assistant for **${COMPANY.name}**. We're always excited to connect with people interested in what we do. What brings you here today?`,
    ],
    about: [
      `**${COMPANY.name}** is a visionary multi-industry holding company based in **${COMPANY.hq}**. <i class="fas fa-city"></i>\n\nWe operate across **5 strategic sectors**: Construction, Real Estate, Solar Energy, IT Solutions, and Interior Design — delivering world-class solutions for governments, businesses, and individuals across Africa.\n\nWith **${COMPANY.stats.projects} completed projects**, **${COMPANY.stats.clients} satisfied clients**, and a team of **${COMPANY.stats.team} expert professionals**, we're one of Africa's most trusted conglomerates. <i class="fas fa-flex"></i>`,
      `Great question! **${COMPANY.name}** is a powerhouse multi-sector holding company. <i class="fas fa-rocket"></i>\n\nFounded by **${COMPANY.ceo}**, our mission is: *"${COMPANY.mission}"*\n\nWe cover everything from building roads and highways to designing luxury interiors — all under one roof! Think of us as the company that builds Africa's future. <i class="fas fa-globe-africa"></i>`,
    ],
    services: [
      `We offer **5 world-class services** at ${COMPANY.name}:\n\n<i class="fas fa-hard-hat"></i> **Road & Civil Construction** — Highways, bridges, urban infrastructure\n<i class="fas fa-building"></i> **Real Estate Development** — Smart homes, luxury apartments, commercial spaces\n<i class="fas fa-solar-panel"></i> **Solar & Renewable Energy** — Full solar solutions for homes & businesses\n<i class="fas fa-laptop-code"></i> **IT Solutions** — Networks, cybersecurity, cloud & software\n<i class="fas fa-paint-roller"></i> **Interiors & Exteriors** — Luxury interior design & finishing\n\nWhich one interests you most? I can go deeper on any of them! <i class="fas fa-smile"></i>`,
    ],
    construction: [
      `Our **Road & Civil Construction** division is one of our strongest! <i class="fas fa-hard-hat"></i>\n\nWe handle:\n• Highway & road construction\n• Bridge engineering\n• Road rehabilitation\n• Drainage & stormwater systems\n• Urban infrastructure\n• Asphalt & concrete works\n• Earthworks & traffic management\n\nWe use **modern equipment**, **certified materials**, and follow **international engineering standards**. Want to get a project quote? <i class="fas fa-arrow-down"></i>`,
    ],
    solar: [
      `Excellent! Our **Solar & Renewable Energy** division is perfect for Nigeria's energy challenges! <i class="fas fa-solar-panel"></i>\n\nWe offer:\n• Solar panel installation (home & industrial)\n• Inverter & battery backup systems\n• Hybrid power solutions\n• Smart energy management\n• Solar street lighting\n• Ongoing system maintenance\n\n<i class="fas fa-lightbulb"></i> With Nigeria's energy situation, going solar with us means **100% power independence**. Want a free energy audit? Contact us today!`,
    ],
    realestate: [
      `Our **Real Estate Development** division creates spaces people love to live and work in. <i class="fas fa-home"></i>\n\nWe develop:\n• Smart homes & luxury apartments\n• Commercial buildings & offices\n• Residential estates\n• Off-plan property sales\n• Property investment advisory\n\nWith **Nigeria's housing deficit at 20M+ units**, there's never been a better time to invest in real estate with a trusted developer. Want to discuss a project?`,
    ],
    technology: [
      `Our **IT Solutions Division** is your digital backbone! <i class="fas fa-laptop-code"></i>\n\nServices include:\n• Enterprise network infrastructure\n• Cybersecurity & data protection\n• Cloud services & migration\n• Custom software development\n• Smart home & office automation\n• CCTV & surveillance systems\n• Website & app development\n• IT support & managed services\n\nIn today's digital economy, the right IT infrastructure is your **competitive advantage**. Let us build it for you! <i class="fas fa-rocket"></i>`,
    ],
    interiors: [
      `Our **Interiors & Exteriors Division** transforms spaces into experiences! <i class="fas fa-paint-roller"></i>\n\nWe specialize in:\n• Modern interior design concepts\n• POP ceiling masterpieces\n• Smart home finishing\n• Luxury space transformations\n• Office fit-outs\n• Landscaping & exterior beautification\n• Flooring & premium wall finishes\n\nYour home should tell YOUR story. Our designers combine artistic vision with technical precision for results that wow! <i class="fas fa-star"></i>`,
    ],
    contact: [
      `Here's how to reach **${COMPANY.name}** <i class="fas fa-phone-alt"></i>\n\n<i class="fas fa-phone"></i> **Phone:** ${COMPANY.phones[0]}\n<i class="fas fa-phone"></i> **Phone 2:** ${COMPANY.phones[1]}\n<i class="fas fa-envelope"></i> **Email:** ${COMPANY.email}\n<i class="fab fa-whatsapp"></i> **WhatsApp:** [Chat Now](${COMPANY.whatsapp})\n<i class="fas fa-map-marker-alt"></i> **Location:** ${COMPANY.hq}\n<i class="fas fa-clock"></i> **Hours:** ${COMPANY.hours}\n\nFeel free to reach out — we respond fast! <i class="fas fa-smile"></i>`,
    ],
    phone: [
      `You can call us at:\n\n<i class="fas fa-phone-alt"></i> **${COMPANY.phones[0]}**\n<i class="fas fa-phone-alt"></i> **${COMPANY.phones[1]}**\n\nOr better yet, WhatsApp us for a faster response: [Chat on WhatsApp](${COMPANY.whatsapp}) <i class="fab fa-whatsapp"></i>`,
    ],
    email: [
      `Our email address is <i class="fas fa-envelope"></i> **${COMPANY.email}**\n\nWe typically respond within **24 hours**. For urgent matters, calling or WhatsApp-ing us is faster!\n\n<i class="fab fa-whatsapp"></i> WhatsApp: [${COMPANY.phones[0]}](${COMPANY.whatsapp})`,
    ],
    location: [
      `We're headquartered in **Lagos, Nigeria** <i class="fas fa-map-marker-alt"></i>\n\nFrom Lagos, we operate across **Nigeria and the wider African market**. Whether you're in Abuja, Port Harcourt, or anywhere else — we can reach you!\n\nWant to visit? Give us a call first: **${COMPANY.phones[0]}** <i class="fas fa-phone-alt"></i>`,
    ],
    ceo: [
      `**${COMPANY.ceo}** is the CEO & Founder of ${COMPANY.name}. <i class="fas fa-user-tie"></i>\n\nHe's a visionary entrepreneur, technology engineer, and infrastructure strategist with a passion for innovation and transformational development across emerging economies.\n\nHis philosophy: *"True progress comes from combining technical excellence with genuine human-centered development."*\n\nA remarkable leader building Africa's future, one project at a time! <i class="fas fa-globe-africa"></i>`,
    ],
    quote: [
      `Getting a quote is super easy! <i class="fas fa-smile"></i>\n\nJust reach out through any of these channels:\n\n<i class="fas fa-phone-alt"></i> **Call:** ${COMPANY.phones[0]}\n<i class="fas fa-envelope"></i> **Email:** ${COMPANY.email}\n<i class="fab fa-whatsapp"></i> **WhatsApp:** [Chat Now](${COMPANY.whatsapp})\n<i class="fas fa-globe"></i> **Contact Form:** [Visit Contact Page](contact.html)\n\nTell us:\n1. The type of service you need\n2. Your project location\n3. A rough description\n\nAnd we'll get back to you within **24 hours** with a tailored proposal! <i class="fas fa-hard-hat"></i>`,
    ],
    stats: [
      `Here are some quick facts about **${COMPANY.name}** <i class="fas fa-chart-bar"></i>\n\n<i class="fas fa-trophy"></i> **${COMPANY.stats.years} Years** of excellence\n<i class="fas fa-hard-hat"></i> **${COMPANY.stats.projects} Projects** completed\n<i class="fas fa-smile"></i> **${COMPANY.stats.clients} Clients** served\n<i class="fas fa-industry"></i> **${COMPANY.stats.sectors} Business sectors**\n<i class="fas fa-users"></i> **${COMPANY.stats.team} Expert professionals**\n\nWe're growing fast and just getting started! <i class="fas fa-rocket"></i>`,
    ],
    mission: [
      `Our **mission** is:\n\n*"${COMPANY.mission}"*\n\nAnd our **vision**:\n\n*"${COMPANY.vision}"*\n\nEvery project we take on is a step toward making this real. <i class="fas fa-globe-africa"></i>`,
    ],
    values: [
      `Our **core values** guide everything we do:\n\n<i class="fas fa-lightbulb"></i> **Innovation** — Always ahead of the curve\n<i class="fas fa-handshake"></i> **Integrity** — Transparent and ethical always\n<i class="fas fa-leaf"></i> **Sustainability** — Building with the future in mind\n<i class="fas fa-star"></i> **Excellence** — Uncompromising quality\n<i class="fas fa-heart"></i> **Human-Centered** — People first, always\n\nThese aren't just words — they show in every project we deliver! <i class="fas fa-trophy"></i>`,
    ],
    pricing: [
      `Pricing depends on the scope and specifics of your project — every job is unique! <i class="fas fa-smile"></i>\n\nFor an accurate quote:\n\n<i class="fas fa-phone-alt"></i> Call us: **${COMPANY.phones[0]}**\n<i class="fab fa-whatsapp"></i> WhatsApp: [Chat Now](${COMPANY.whatsapp})\n<i class="fas fa-envelope"></i> Email: **${COMPANY.email}**\n\nWe'll assess your requirements and give you a **competitive, transparent proposal** — no hidden costs! <i class="fas fa-hands-helping"></i>`,
    ],
    whatsapp: [
      `Yes! WhatsApp is actually our **fastest contact channel**! <i class="fas fa-mobile-alt"></i>\n\nClick here to chat: [WhatsApp Us Now](${COMPANY.whatsapp})\n\nOr save the number: **${COMPANY.phones[0]}**\n\nOur team is responsive and friendly on WhatsApp! <i class="fas fa-smile"></i>`,
    ],
    thanks: [
      `You're so welcome! <i class="fas fa-smile"></i> That's what I'm here for. Is there anything else you'd like to know about **${COMPANY.name}**?`,
      `Anytime! <i class="fas fa-star"></i> Happy to help. Don't hesitate to ask if you have more questions!`,
    ],
    default: [
      `That's an interesting question! <i class="fas fa-thinking"></i> While I may not have the exact answer right now, I'd recommend reaching out to our team directly for the most accurate information.\n\n<i class="fas fa-phone-alt"></i> **${COMPANY.phones[0]}**\n<i class="fas fa-envelope"></i> **${COMPANY.email}**\n<i class="fab fa-whatsapp"></i> [WhatsApp](${COMPANY.whatsapp})\n\nOr feel free to ask me about our services, team, location, or how to get a quote! <i class="fas fa-smile"></i>`,
    ],
  };

  /* ── QUICK REPLIES ─────────────────────────────────────── */
  const QUICK_REPLIES = [
    { label: '<i class="fas fa-hard-hat"></i> Construction', key: "construction" },
    { label: '<i class="fas fa-building"></i> Real Estate', key: "realestate" },
    { label: '<i class="fas fa-solar-panel"></i> Solar Energy', key: "solar" },
    { label: '<i class="fas fa-laptop-code"></i> IT Solutions', key: "technology" },
    { label: '<i class="fas fa-paint-roller"></i> Interiors', key: "interiors" },
    { label: '<i class="fas fa-phone-alt"></i> Contact Info', key: "contact" },
    { label: '<i class="fas fa-file-invoice-dollar"></i> Get a Quote', key: "quote" },
    { label: '<i class="fas fa-user-tie"></i> About CEO', key: "ceo" },
  ];

  /* ── INTENT CLASSIFIER ───────────────────────────────────── */
  function classify(text) {
    const t = text.toLowerCase().replace(/[^\w\s]/g, " ");
    const words = t.split(/\s+/);
    const match = (keywords) =>
      keywords.some((kw) => t.includes(kw) || words.includes(kw));

    if (match(["hi","hello","hey","howdy","good morning","good afternoon","good evening","hiya","sup","whats up","yo","greetings"])) return "greetings";
    if (match(["thank","thanks","thank you","cheers","appreciated","great help","helpful"])) return "thanks";
    if (match(["whatsapp","whatsap","watsapp","wa","chat"])) return "whatsapp";
    if (match(["phone","call","number","telephone","ring","dial","mobile","line"])) return "phone";
    if (match(["email","mail","e-mail","inbox","send message"])) return "email";
    if (match(["location","address","where","office","headquarters","hq","find you","situated","based"])) return "location";
    if (match(["contact","reach","get in touch","reach out","speak","talk to"])) return "contact";
    if (match(["quote","quotation","estimate","cost","price","pricing","how much","fee","charge","rate"])) return "pricing";
    if (match(["ceo","founder","owner","ikechukwu","anyanwu","who started","who owns","who founded","director","leadership"])) return "ceo";
    if (match(["mission","vision","purpose","goal","aim","objective"])) return "mission";
    if (match(["value","values","believe","principle","integrity","innovation","excellence","sustainability"])) return "values";
    if (match(["stat","statistics","how many","projects","clients","years","team","numbers","track record"])) return "stats";
    if (match(["road","construction","civil","highway","bridge","asphalt","concrete","earthwork","drainage","infrastructure"])) return "construction";
    if (match(["real estate","property","house","home","apartment","housing","building","flat","estate","residential"])) return "realestate";
    if (match(["solar","energy","power","electricity","inverter","battery","renewable","panel","light","nepa","generator"])) return "solar";
    if (match(["it","technology","tech","software","network","cybersecurity","cloud","cctv","website","app","digital"])) return "technology";
    if (match(["interior","design","decor","ceiling","pop","furniture","finishing","landscape","exterior","renovation"])) return "interiors";
    if (match(["service","offer","provide","do you do","what do","specializ","division","sector","industry"])) return "services";
    if (match(["about","who are","what is","tell me about","describe","overview","explain","company"])) return "about";
    return "default";
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getResponse(text) {
    const intent = classify(text);
    const pool = RESPONSES[intent] || RESPONSES.default;
    return { text: pick(pool), intent };
  }

  function renderMD(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#c9a84c;text-decoration:underline;">$1</a>')
      .replace(/\n/g, "<br>");
  }

  /* ── INJECT STYLES ───────────────────────────────────────── */
  const style = document.createElement("style");
  style.textContent = `
    /* ── LOGO FIX ── */
    .logo img {
      height: 56px !important;
      width: auto !important;
      max-width: 160px !important;
      object-fit: contain !important;
      display: block !important;
    }
    @media (max-width: 480px) {
      .logo img {
        height: 44px !important;
        max-width: 120px !important;
      }
      .nav-wrap {
        height: 60px !important;
      }
    }

    /* ── WHATSAPP FAB — stays at bottom right ── */
    .wa-fab {
      position: fixed !important;
      bottom: 28px !important;
      right: 28px !important;
      z-index: 998 !important;
    }
    @media (max-width: 480px) {
      .wa-fab {
        bottom: 16px !important;
        right: 16px !important;
      }
    }

    /* ── CHAT TRIGGER BUTTON — sits ABOVE whatsapp ── */
    #rrh-chat-btn {
      position: fixed;
      bottom: 96px;   /* 28px bottom + 56px wa-fab + 12px gap */
      right: 28px;
      z-index: 9998;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #c9a84c, #9a7a30);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 24px rgba(201,168,76,.45);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform .3s, box-shadow .3s;
      animation: rrhPulse 2.5s ease-in-out infinite;
    }
    @media (max-width: 480px) {
      #rrh-chat-btn {
        bottom: 84px;  /* 16px + 56px + 12px */
        right: 16px;
        width: 50px;
        height: 50px;
      }
    }
    #rrh-chat-btn:hover { transform: scale(1.1); box-shadow: 0 8px 32px rgba(201,168,76,.6); }
    #rrh-chat-btn svg { width:26px; height:26px; fill:#0a0a0a; }
    @keyframes rrhPulse {
      0%,100%{box-shadow:0 4px 24px rgba(201,168,76,.45);}
      50%{box-shadow:0 4px 36px rgba(201,168,76,.75);}
    }

    /* ── FULL-SCREEN CHAT WINDOW ── */
    #rrh-chat-window {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: #111;
      display: flex;
      flex-direction: column;
      transform: translateY(100%);
      opacity: 0;
      transition: transform .4s cubic-bezier(.2,.9,.4,1.1), opacity .3s ease;
      pointer-events: none;
      font-family: 'Barlow', sans-serif;
    }
    #rrh-chat-window.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    /* ── CHAT HEADER ── */
    .rrh-chat-header {
      background: linear-gradient(135deg,#1a1a1a,#222);
      border-bottom: 1px solid rgba(201,168,76,.2);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      min-height: 60px;
    }

    /* Back arrow — top left */
    .rrh-back-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: rgba(255,255,255,.6);
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color .2s;
      flex-shrink: 0;
    }
    .rrh-back-btn:hover { color: #c9a84c; }
    .rrh-back-btn svg { width:20px; height:20px; stroke:currentColor; fill:none; stroke-width:2.5; }

    .rrh-chat-avatar {
      width:36px; height:36px; border-radius:50%;
      background:linear-gradient(135deg,#c9a84c,#9a7a30);
      display:flex;align-items:center;justify-content:center;flex-shrink:0;
    }
    .rrh-chat-avatar svg { width:18px;height:18px;fill:#0a0a0a; }
    .rrh-chat-header-info { flex:1; min-width:0; }
    .rrh-chat-header-name {
      font-family:'Barlow Condensed',sans-serif; font-size:13px;
      font-weight:800; letter-spacing:1px; color:#fff; text-transform:uppercase;
      white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
    }
    .rrh-chat-header-status {
      font-size:11px; color:#4ade80; display:flex; align-items:center; gap:5px;
    }
    .rrh-status-dot {
      width:6px;height:6px;border-radius:50%;background:#4ade80;
      animation:rrhBlink 2s ease-in-out infinite;
    }
    @keyframes rrhBlink{0%,100%{opacity:1;}50%{opacity:.3;}}

    /* Top-right controls: minimize + close */
    .rrh-header-controls {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .rrh-ctrl-btn {
      width: 32px; height: 32px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background .2s, border-color .2s;
      color: rgba(255,255,255,.6);
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 18px;
      font-weight: 700;
      line-height: 1;
    }
    .rrh-ctrl-btn:hover { background: rgba(201,168,76,.15); border-color: rgba(201,168,76,.4); color: #c9a84c; }
    .rrh-ctrl-btn.close-btn:hover { background: rgba(220,50,50,.15); border-color: rgba(220,50,50,.4); color: #f87171; }
    .rrh-ctrl-btn svg { width:14px; height:14px; stroke:currentColor; fill:none; stroke-width:2.5; }

    /* ── MESSAGES AREA ── */
    .rrh-chat-messages {
      flex:1; overflow-y:auto; padding:16px; display:flex;
      flex-direction:column; gap:12px;
      scrollbar-width:thin; scrollbar-color:#9a7a30 #111;
    }
    .rrh-chat-messages::-webkit-scrollbar{width:4px;}
    .rrh-chat-messages::-webkit-scrollbar-thumb{background:#9a7a30;border-radius:2px;}
    .rrh-msg {
      display:flex; gap:8px; align-items:flex-start;
      animation:rrhMsgIn .35s cubic-bezier(.2,.9,.4,1.1) both;
    }
    @keyframes rrhMsgIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
    .rrh-msg.user { flex-direction:row-reverse; }
    .rrh-msg-avatar {
      width:28px;height:28px;border-radius:50%;flex-shrink:0;
      display:flex;align-items:center;justify-content:center;font-size:13px;
    }
    .rrh-msg-avatar.bot { background:linear-gradient(135deg,#c9a84c,#9a7a30); }
    .rrh-msg-avatar.bot svg { width:14px;height:14px;fill:#0a0a0a; }
    .rrh-msg-avatar.user { background:#222; font-size:15px; }
    .rrh-bubble {
      max-width:80%; padding:10px 14px; font-size:13.5px; line-height:1.6;
      border-radius:0; position:relative;
    }
    .rrh-bubble.bot { background:#1a1a1a; color:rgba(255,255,255,.85); border-left:2px solid #c9a84c; }
    .rrh-bubble.user { background:linear-gradient(135deg,#c9a84c,#9a7a30); color:#0a0a0a; font-weight:500; }
    .rrh-bubble strong{color:#c9a84c;}
    .rrh-bubble.user strong{color:#0a0a0a;}
    .rrh-bubble i{color:#c9a84c;}
    .rrh-bubble.user i{color:#0a0a0a;}
    .rrh-msg-time {font-size:10px;color:rgba(255,255,255,.25);margin-top:4px;text-align:right;}
    .rrh-msg.user .rrh-msg-time{text-align:left;}
    .rrh-typing {display:flex;gap:8px;align-items:flex-start;animation:rrhMsgIn .3s ease both;}
    .rrh-typing-dots {background:#1a1a1a;border-left:2px solid #c9a84c;padding:12px 16px;display:flex;gap:5px;align-items:center;}
    .rrh-typing-dots span {width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.4);animation:rrhDot 1.2s ease-in-out infinite;}
    .rrh-typing-dots span:nth-child(2){animation-delay:.2s;}
    .rrh-typing-dots span:nth-child(3){animation-delay:.4s;}
    @keyframes rrhDot{0%,80%,100%{transform:scale(.8);opacity:.4;}40%{transform:scale(1);opacity:1;}}

    /* ── QUICK REPLIES ── */
    .rrh-quick-replies {
      padding:8px 16px 4px; display:flex; flex-wrap:wrap; gap:6px; flex-shrink:0;
      border-top:1px solid rgba(255,255,255,.06);
    }
    .rrh-qr {
      padding:5px 11px; border:1px solid rgba(201,168,76,.3);
      background:rgba(201,168,76,.06); color:#c9a84c;
      font-family:'Barlow Condensed',sans-serif; font-size:11px;
      font-weight:700; letter-spacing:1px; cursor:pointer;
      transition:all .2s; text-transform:uppercase; border-radius:0;
    }
    .rrh-qr:hover{background:rgba(201,168,76,.15);border-color:#c9a84c;}
    .rrh-qr i{margin-right:4px;}

    /* ── INPUT ROW ── */
    .rrh-chat-input-row {display:flex;gap:0;border-top:1px solid rgba(201,168,76,.15);flex-shrink:0;}
    #rrh-chat-input {
      flex:1;background:#181818;border:none;outline:none;
      padding:13px 16px;font-size:13.5px;color:#fff;
      font-family:'Barlow',sans-serif; resize:none; height:48px;
    }
    #rrh-chat-input::placeholder{color:rgba(255,255,255,.28);}
    #rrh-chat-send {
      width:52px;background:linear-gradient(135deg,#c9a84c,#9a7a30);
      border:none;cursor:pointer;transition:opacity .2s;
      display:flex;align-items:center;justify-content:center;flex-shrink:0;
    }
    #rrh-chat-send:hover{opacity:.85;}
    #rrh-chat-send svg{width:18px;height:18px;fill:#0a0a0a;}
    .rrh-chat-footer {
      padding:5px 16px 8px;text-align:center;flex-shrink:0;
      border-top:1px solid rgba(255,255,255,.04);
    }
    .rrh-chat-footer span{font-size:10px;color:rgba(255,255,255,.18);letter-spacing:1px;text-transform:uppercase;}
    .rrh-chat-footer strong{color:rgba(201,168,76,.5);}

    /* ── END CHAT CONFIRM OVERLAY ── */
    #rrh-end-overlay {
      position:absolute; inset:0; z-index:10;
      background:rgba(10,10,10,.92);
      display:none; align-items:center; justify-content:center;
      flex-direction:column; gap:20px; padding:32px;
    }
    #rrh-end-overlay.show { display:flex; }
    .rrh-end-box {
      background:#1a1a1a; border:1px solid rgba(201,168,76,.3);
      padding:28px 32px; max-width:340px; width:100%; text-align:center;
    }
    .rrh-end-box p {
      font-family:'Barlow Condensed',sans-serif; font-size:20px; font-weight:800;
      letter-spacing:1px; color:#fff; margin-bottom:8px;
    }
    .rrh-end-box span {
      font-size:13px; color:rgba(255,255,255,.5); display:block; margin-bottom:24px;
    }
    .rrh-end-btns { display:flex; gap:12px; justify-content:center; }
    .rrh-end-yes {
      padding:10px 28px; background:linear-gradient(135deg,#c9a84c,#9a7a30);
      color:#0a0a0a; border:none; cursor:pointer;
      font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:800;
      letter-spacing:2px; text-transform:uppercase; transition:opacity .2s;
    }
    .rrh-end-yes:hover{opacity:.85;}
    .rrh-end-no {
      padding:10px 28px; background:transparent;
      color:rgba(255,255,255,.6); border:1px solid rgba(255,255,255,.2);
      cursor:pointer; font-family:'Barlow Condensed',sans-serif; font-size:13px;
      font-weight:700; letter-spacing:2px; text-transform:uppercase; transition:all .2s;
    }
    .rrh-end-no:hover{border-color:rgba(201,168,76,.4);color:#c9a84c;}
  `;
  document.head.appendChild(style);

  /* ── BUILD DOM ───────────────────────────────────────────── */
  // Trigger button
  const btn = document.createElement("button");
  btn.id = "rrh-chat-btn";
  btn.setAttribute("aria-label", "Open Chat");
  btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>`;
  document.body.appendChild(btn);

  // Full-screen window
  const win = document.createElement("div");
  win.id = "rrh-chat-window";
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-label", "Road Rock Holdings Chat");
  win.innerHTML = `
    <!-- End Chat Confirm Overlay -->
    <div id="rrh-end-overlay">
      <div class="rrh-end-box">
        <p>End this chat?</p>
        <span>Your conversation will be closed.</span>
        <div class="rrh-end-btns">
          <button class="rrh-end-yes" id="rrh-end-yes">Yes, End</button>
          <button class="rrh-end-no" id="rrh-end-no">No, Go Back</button>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="rrh-chat-header">
      <!-- Back arrow (top-left) -->
      <button class="rrh-back-btn" id="rrh-back-btn" aria-label="Back to page">
        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="rrh-chat-avatar">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      </div>
      <div class="rrh-chat-header-info">
        <div class="rrh-chat-header-name">RRH Assistant</div>
        <div class="rrh-chat-header-status">
          <div class="rrh-status-dot"></div> Online — Always here to help
        </div>
      </div>
      <!-- Top-right controls: minimize + close -->
      <div class="rrh-header-controls">
        <button class="rrh-ctrl-btn" id="rrh-minimize-btn" aria-label="Minimize chat" title="Minimise">
          <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <button class="rrh-ctrl-btn close-btn" id="rrh-close-btn" aria-label="Close chat" title="Close">
          <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Messages -->
    <div class="rrh-chat-messages" id="rrh-chat-messages"></div>

    <!-- Quick Replies -->
    <div class="rrh-quick-replies" id="rrh-quick-replies"></div>

    <!-- Input -->
    <div class="rrh-chat-input-row">
      <input id="rrh-chat-input" placeholder="Ask me anything about Road Rock Holdings…" autocomplete="off" maxlength="300" />
      <button id="rrh-chat-send" aria-label="Send">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div class="rrh-chat-footer"><span>Powered by <strong>Road Rock Holdings AI</strong></span></div>
  `;
  document.body.appendChild(win);

  /* ── ELEMENTS ────────────────────────────────────────────── */
  const msgs = document.getElementById("rrh-chat-messages");
  const input = document.getElementById("rrh-chat-input");
  const sendBtn = document.getElementById("rrh-chat-send");
  const backBtn = document.getElementById("rrh-back-btn");
  const minimizeBtn = document.getElementById("rrh-minimize-btn");
  const closeBtn = document.getElementById("rrh-close-btn");
  const qrContainer = document.getElementById("rrh-quick-replies");
  const endOverlay = document.getElementById("rrh-end-overlay");
  const endYes = document.getElementById("rrh-end-yes");
  const endNo = document.getElementById("rrh-end-no");

  /* ── QUICK REPLIES ───────────────────────────────────────── */
  QUICK_REPLIES.forEach((qr) => {
    const el = document.createElement("button");
    el.className = "rrh-qr";
    el.innerHTML = qr.label;
    el.addEventListener("click", () => {
      const cleanLabel = qr.label.replace(/<[^>]*>/g, '').trim();
      appendMsg(cleanLabel, "user");
      triggerResponse(cleanLabel);
    });
    qrContainer.appendChild(el);
  });

  /* ── OPEN / CLOSE / MINIMIZE ─────────────────────────────── */
  let isOpen = false;
  let chatStarted = false;

  function openChat() {
    isOpen = true;
    win.classList.add("open");
    document.body.style.overflow = "hidden"; // prevent page scroll when chat open
    input.focus();
    if (!chatStarted) {
      chatStarted = true;
      sendWelcome();
    }
  }

  function closeChat() {
    isOpen = false;
    win.classList.remove("open");
    document.body.style.overflow = ""; // restore page scroll
  }

  function minimizeChat() {
    closeChat();
    // Just minimizes — chat history preserved, can reopen by clicking button
  }

  function showEndConfirm() {
    endOverlay.classList.add("show");
  }

  function hideEndConfirm() {
    endOverlay.classList.remove("show");
  }

  /* Button: open chat on click ONLY */
  btn.addEventListener("click", () => {
    if (!isOpen) openChat();
  });

  /* Back arrow: go back to page (same as minimize) */
  backBtn.addEventListener("click", minimizeChat);

  /* Minimize button (-) */
  minimizeBtn.addEventListener("click", minimizeChat);

  /* Close button (x): show confirm */
  closeBtn.addEventListener("click", showEndConfirm);

  /* End confirm — YES */
  endYes.addEventListener("click", () => {
    hideEndConfirm();
    // Show thank-you message briefly then close
    msgs.innerHTML = ""; // clear
    appendMsg(`Thanks so much for chatting with us! 😊 Have a wonderful day!`, "bot");
    setTimeout(() => {
      closeChat();
      // Reset so next open shows fresh welcome
      chatStarted = false;
    }, 2200);
  });

  /* End confirm — NO: go back to chat */
  endNo.addEventListener("click", hideEndConfirm);

  /* ── MESSAGES ────────────────────────────────────────────── */
  function now() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function appendMsg(text, role) {
    const div = document.createElement("div");
    div.className = `rrh-msg ${role}`;
    const avatarHTML =
      role === "bot"
        ? `<div class="rrh-msg-avatar bot"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>`
        : `<div class="rrh-msg-avatar user"><i class="fas fa-user"></i></div>`;
    div.innerHTML = `${avatarHTML}<div><div class="rrh-bubble ${role}">${renderMD(text)}</div><div class="rrh-msg-time">${now()}</div></div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const t = document.createElement("div");
    t.className = "rrh-typing";
    t.id = "rrh-typing";
    t.innerHTML = `
      <div class="rrh-msg-avatar bot"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>
      <div class="rrh-typing-dots"><span></span><span></span><span></span></div>`;
    msgs.appendChild(t);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById("rrh-typing");
    if (t) t.remove();
  }

  function sendWelcome() {
    const welcomes = [
      `<i class="fas fa-hand-wave"></i> Hi there! Welcome to **Road Rock Holdings**! I'm your virtual assistant, ready to help with anything — our services, team, contact info, or getting a quote. What would you like to know? <i class="fas fa-smile"></i>`,
      `Hello! <i class="fas fa-star"></i> Great to have you here! I'm the AI assistant for **Road Rock Holdings** — Nigeria's leading multi-industry conglomerate. Ask me anything! I'm all ears. <i class="fas fa-smile"></i>`,
      `Hey! Welcome to **Road Rock Holdings**! <i class="fas fa-hard-hat"></i> We build roads, homes, energy systems, tech solutions, and beautiful interiors — all under one roof. How can I help you today?`,
    ];
    setTimeout(() => {
      showTyping();
      setTimeout(() => {
        removeTyping();
        appendMsg(pick(welcomes), "bot");
      }, 1200);
    }, 400);
  }

  function triggerResponse(userText) {
    showTyping();
    const delay = 900 + Math.random() * 600;
    setTimeout(() => {
      removeTyping();
      const { text } = getResponse(userText);
      appendMsg(text, "bot");
    }, delay);
  }

  /* ── SEND ────────────────────────────────────────────────── */
  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    appendMsg(text, "user");
    input.value = "";
    triggerResponse(text);
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });

  /* ── NO AUTO-OPEN — removed entirely ── */
  // Widget only opens when user clicks the button. Period.

})();