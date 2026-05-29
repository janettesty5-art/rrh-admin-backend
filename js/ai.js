/* ============================================================
   ROAD ROCK HOLDINGS — AI CHAT WIDGET
   Drop this <script src="chat-widget.js"></script> at the
   bottom of EVERY page's <body> to activate the widget.
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
      `Sure! So **${COMPANY.name}** is essentially a one-stop solution company. <i class="fas fa-trophy"></i>\n\nWe combine **engineering excellence, renewable energy, technology, real estate, and smart design** into a single diversified conglomerate. Based in **Lagos**, we've been transforming communities for **${COMPANY.stats.years} years** with **${COMPANY.stats.projects} projects** delivered!\n\nWant to know about any specific service?`,
    ],
    services: [
      `We offer **5 world-class services** at ${COMPANY.name}:\n\n<i class="fas fa-hard-hat"></i> **Road & Civil Construction** — Highways, bridges, urban infrastructure\n<i class="fas fa-building"></i> **Real Estate Development** — Smart homes, luxury apartments, commercial spaces\n<i class="fas fa-solar-panel"></i> **Solar & Renewable Energy** — Full solar solutions for homes & businesses\n<i class="fas fa-laptop-code"></i> **IT Solutions** — Networks, cybersecurity, cloud & software\n<i class="fas fa-paint-roller"></i> **Interiors & Exteriors** — Luxury interior design & finishing\n\nWhich one interests you most? I can go deeper on any of them! <i class="fas fa-smile"></i>`,
      `Absolutely! Here's what we do at **${COMPANY.name}**:\n\n1️⃣ **Construction** — Roads, bridges, civil engineering\n2️⃣ **Real Estate** — Residential & commercial property development\n3️⃣ **Solar Energy** — Clean, reliable power solutions\n4️⃣ **Technology (IT)** — Digital infrastructure & cybersecurity\n5️⃣ **Interiors & Design** — Beautiful, functional spaces\n\nAll five divisions operate under one trusted brand. Would you like details on any specific service? <i class="fas fa-hands-helping"></i>`,
      `${COMPANY.name} covers **five major industries** — here's a quick overview:\n\n• <i class="fas fa-hard-hat"></i> Civil Construction & Roads\n• <i class="fas fa-home"></i> Real Estate Development\n• <i class="fas fa-bolt"></i> Solar & Renewable Energy\n• <i class="fas fa-desktop"></i> IT & Technology Solutions\n• <i class="fas fa-couch"></i> Interiors & Exterior Design\n\nThe beauty of working with us? You can bundle multiple services together! Building a house and want solar panels AND interior design? We handle it all. <i class="fas fa-briefcase"></i>`,
    ],
    construction: [
      `Our **Road & Civil Construction** division is one of our strongest! <i class="fas fa-hard-hat"></i>\n\nWe handle:\n• Highway & road construction\n• Bridge engineering\n• Road rehabilitation\n• Drainage & stormwater systems\n• Urban infrastructure\n• Asphalt & concrete works\n• Earthworks & traffic management\n\nWe use **modern equipment**, **certified materials**, and follow **international engineering standards**. Want to get a project quote? <i class="fas fa-arrow-down"></i>`,
      `Great choice! Our **Construction Division** is built for serious infrastructure. <i class="fas fa-flex"></i>\n\nFrom small access roads to full highway projects — we design, plan, procure materials, execute, and hand over completed projects. Our team of civil engineers ensures every road we build **stands the test of time**.\n\n<i class="fas fa-phone-alt"></i> Call us: **${COMPANY.phones[0]}** or visit our services page for more!`,
    ],
    solar: [
      `Excellent! Our **Solar & Renewable Energy** division is perfect for Nigeria's energy challenges! <i class="fas fa-solar-panel"></i>\n\nWe offer:\n• Solar panel installation (home & industrial)\n• Inverter & battery backup systems\n• Hybrid power solutions\n• Smart energy management\n• Solar street lighting\n• Ongoing system maintenance\n\n<i class="fas fa-lightbulb"></i> With Nigeria's energy situation, going solar with us means **100% power independence**. Want a free energy audit? Contact us today!`,
      `Solar energy is one of our fastest-growing divisions! <i class="fas fa-bolt"></i>\n\nWhether you're tired of NEPA/generator costs or you're a business looking to reduce energy bills — we've got you covered. Our solar systems come with **warranties** and **post-installation support**.\n\nMarket fact: Nigeria's solar market is projected at **$24B+ by 2030** — and we're right at the forefront! Ready to get a solar quote? <i class="fas fa-sun"></i>`,
    ],
    realestate: [
      `Our **Real Estate Development** division creates spaces people love to live and work in. <i class="fas fa-home"></i>\n\nWe develop:\n• Smart homes & luxury apartments\n• Commercial buildings & offices\n• Residential estates\n• Off-plan property sales\n• Property investment advisory\n\nWith **Nigeria's housing deficit at 20M+ units**, there's never been a better time to invest in real estate with a trusted developer. Want to discuss a project?`,
      `Real estate with **${COMPANY.name}** means quality from foundation to finishing! <i class="fas fa-building"></i>\n\nWe handle everything — architectural design, regulatory approvals, construction, and delivery. Our properties are built with **smart technology integration** and **long-term investment value** in mind.\n\nInterested in buying, developing, or investing? Let's talk! <i class="fas fa-phone-alt"></i> **${COMPANY.phones[0]}**`,
    ],
    technology: [
      `Our **IT Solutions Division** is your digital backbone! <i class="fas fa-laptop-code"></i>\n\nServices include:\n• Enterprise network infrastructure\n• Cybersecurity & data protection\n• Cloud services & migration\n• Custom software development\n• Smart home & office automation\n• CCTV & surveillance systems\n• Website & app development\n• IT support & managed services\n\nIn today's digital economy, the right IT infrastructure is your **competitive advantage**. Let us build it for you! <i class="fas fa-rocket"></i>`,
      `Tech is in our DNA! <i class="fas fa-grin"></i> Our IT division helps businesses modernize, secure, and scale their digital operations.\n\nFrom setting up your company network to building custom software or deploying smart automation — we do it all with **precision and professionalism**.\n\nNeed an IT consultation? Reach out: <i class="fas fa-envelope"></i> **${COMPANY.email}**`,
    ],
    interiors: [
      `Our **Interiors & Exteriors Division** transforms spaces into experiences! <i class="fas fa-paint-roller"></i>\n\nWe specialize in:\n• Modern interior design concepts\n• POP ceiling masterpieces\n• Smart home finishing\n• Luxury space transformations\n• Office fit-outs\n• Landscaping & exterior beautification\n• Flooring & premium wall finishes\n\nYour home should tell YOUR story. Our designers combine artistic vision with technical precision for results that wow! <i class="fas fa-star"></i>`,
      `Interior design is where we get truly creative! <i class="fas fa-couch"></i>\n\nWhether it's a sleek modern home, a corporate office, or a luxury apartment — our team brings it to life from concept to completion. We provide **3D visualizations** so you see it before we build it!\n\nWant to transform your space? Let's chat: **${COMPANY.phones[0]}** <i class="fas fa-phone-alt"></i>`,
    ],
    contact: [
      `Here's how to reach **${COMPANY.name}** <i class="fas fa-phone-alt"></i>\n\n<i class="fas fa-phone"></i> **Phone:** ${COMPANY.phones[0]}\n<i class="fas fa-phone"></i> **Phone 2:** ${COMPANY.phones[1]}\n<i class="fas fa-envelope"></i> **Email:** ${COMPANY.email}\n<i class="fab fa-whatsapp"></i> **WhatsApp:** [Chat Now](${COMPANY.whatsapp})\n<i class="fas fa-map-marker-alt"></i> **Location:** ${COMPANY.hq}\n<i class="fas fa-clock"></i> **Hours:** ${COMPANY.hours}\n\nFeel free to reach out — we respond fast! <i class="fas fa-smile"></i>`,
      `You can connect with us through multiple channels! <i class="fas fa-star"></i>\n\n• <i class="fas fa-phone-alt"></i> Call: **${COMPANY.phones[0]}** or **${COMPANY.phones[1]}**\n• <i class="fas fa-envelope"></i> Email: **${COMPANY.email}**\n• <i class="fab fa-whatsapp"></i> WhatsApp: [Click to Chat](${COMPANY.whatsapp})\n• <i class="fas fa-map-marker-alt"></i> Visit: **Lagos, Nigeria**\n• <i class="fas fa-clock"></i> We're open: **${COMPANY.hours}**\n\nOur team is friendly and responsive — don't hesitate!`,
      `Reaching us is easy! Here are all the ways <i class="fas fa-arrow-down"></i>\n\n<i class="fas fa-phone-alt"></i> **Direct Call:** ${COMPANY.phones[0]}\n<i class="fas fa-phone-alt"></i> **Alternate:** ${COMPANY.phones[1]}\n<i class="fas fa-envelope"></i> **Email:** ${COMPANY.email}\n<i class="fab fa-whatsapp"></i> **WhatsApp (fastest!):** [${COMPANY.phones[0]}](${COMPANY.whatsapp})\n<i class="fas fa-map-marker-alt"></i> **Office:** Lagos, Nigeria\n\nFor quotes, we usually respond within **24 hours**. <i class="fas fa-hands-helping"></i>`,
    ],
    phone: [
      `You can call us at:\n\n<i class="fas fa-phone-alt"></i> **${COMPANY.phones[0]}**\n<i class="fas fa-phone-alt"></i> **${COMPANY.phones[1]}**\n\nOr better yet, WhatsApp us for a faster response: [Chat on WhatsApp](${COMPANY.whatsapp}) <i class="fab fa-whatsapp"></i>`,
      `Our phone numbers are:\n\n• **${COMPANY.phones[0]}**\n• **${COMPANY.phones[1]}**\n\nWe're available **${COMPANY.hours}**. You can also shoot us a WhatsApp message for quick replies! <i class="fas fa-smile"></i>`,
    ],
    email: [
      `Our email address is <i class="fas fa-envelope"></i> **${COMPANY.email}**\n\nWe typically respond within **24 hours**. For urgent matters, calling or WhatsApp-ing us is faster!\n\n<i class="fab fa-whatsapp"></i> WhatsApp: [${COMPANY.phones[0]}](${COMPANY.whatsapp})`,
      `You can email us at **${COMPANY.email}** — we check it regularly and you'll hear back within a day!\n\nPrefer quicker communication? Try WhatsApp: [Chat Here](${COMPANY.whatsapp}) <i class="fas fa-mobile-alt"></i>`,
    ],
    location: [
      `We're headquartered in **Lagos, Nigeria** <i class="fas fa-map-marker-alt"></i>\n\nFrom Lagos, we operate across **Nigeria and the wider African market**. Whether you're in Abuja, Port Harcourt, or anywhere else — we can reach you!\n\nWant to visit? Give us a call first: **${COMPANY.phones[0]}** <i class="fas fa-phone-alt"></i>`,
      `Our base is **Lagos, Nigeria** <i class="fas fa-flag"></i> — the commercial heart of Africa!\n\nWe serve clients across Nigeria and beyond. Our coverage includes government contracts, private sector projects, and international partnerships.\n\nFeel free to reach out regardless of your location! <i class="fas fa-globe-africa"></i>`,
    ],
    ceo: [
      `**${COMPANY.ceo}** is the CEO & Founder of ${COMPANY.name}. <i class="fas fa-user-tie"></i>\n\nHe's a visionary entrepreneur, technology engineer, and infrastructure strategist with a passion for innovation and transformational development across emerging economies.\n\nHis philosophy: *"True progress comes from combining technical excellence with genuine human-centered development."*\n\nA remarkable leader building Africa's future, one project at a time! <i class="fas fa-globe-africa"></i>`,
      `Great question! **${COMPANY.ceo}** founded ${COMPANY.name} with a bold vision — to create a diversified conglomerate that solves Africa's most pressing infrastructure and tech challenges.\n\nWith years of experience in engineering, construction, renewable energy, and business leadership, he built 5 thriving divisions from the ground up. Truly inspiring! <i class="fas fa-flex"></i>`,
    ],
    quote: [
      `Getting a quote is super easy! <i class="fas fa-smile"></i>\n\nJust reach out through any of these channels:\n\n<i class="fas fa-phone-alt"></i> **Call:** ${COMPANY.phones[0]}\n<i class="fas fa-envelope"></i> **Email:** ${COMPANY.email}\n<i class="fab fa-whatsapp"></i> **WhatsApp:** [Chat Now](${COMPANY.whatsapp})\n<i class="fas fa-globe"></i> **Contact Form:** [Visit Contact Page](contact.html)\n\nTell us:\n1. The type of service you need\n2. Your project location\n3. A rough description\n\nAnd we'll get back to you within **24 hours** with a tailored proposal! <i class="fas fa-hard-hat"></i>`,
      `We'd love to quote your project! <i class="fas fa-bullseye"></i>\n\nThe fastest way is to:\n1. **Call or WhatsApp** us: [${COMPANY.phones[0]}](${COMPANY.whatsapp})\n2. Or **fill out our contact form**: [Contact Page](contact.html)\n3. Or email: ${COMPANY.email}\n\nWe'll assess your needs and send a **custom proposal** — usually within 24 hours. No obligation! <i class="fas fa-smile"></i>`,
    ],
    stats: [
      `Here are some quick facts about **${COMPANY.name}** <i class="fas fa-chart-bar"></i>\n\n<i class="fas fa-trophy"></i> **${COMPANY.stats.years} Years** of excellence\n<i class="fas fa-hard-hat"></i> **${COMPANY.stats.projects} Projects** completed\n<i class="fas fa-smile"></i> **${COMPANY.stats.clients} Clients** served\n<i class="fas fa-industry"></i> **${COMPANY.stats.sectors} Business sectors**\n<i class="fas fa-users"></i> **${COMPANY.stats.team} Expert professionals**\n\nWe're growing fast and just getting started! <i class="fas fa-rocket"></i>`,
      `Numbers don't lie! Here's the **${COMPANY.name}** scorecard:\n\n• <i class="fas fa-check-circle"></i> ${COMPANY.stats.projects} successful projects\n• <i class="fas fa-handshake"></i> ${COMPANY.stats.clients} happy clients\n• <i class="fas fa-calendar-alt"></i> ${COMPANY.stats.years} years of industry experience\n• <i class="fas fa-globe"></i> 5 thriving business divisions\n• <i class="fas fa-user-hard-hat"></i> ${COMPANY.stats.team} professionals on our team\n\nSolid track record, right? <i class="fas fa-flex"></i>`,
    ],
    mission: [
      `Our **mission** is:\n\n*"${COMPANY.mission}"*\n\nAnd our **vision**:\n\n*"${COMPANY.vision}"*\n\nEvery project we take on is a step toward making this real. <i class="fas fa-globe-africa"></i>`,
      `**${COMPANY.name}** is driven by purpose:\n\n<i class="fas fa-bullseye"></i> **Mission:** ${COMPANY.mission}\n\n<i class="fas fa-star"></i> **Vision:** ${COMPANY.vision}\n\nThat's not just words on a wall — it's the foundation of everything we build! <i class="fas fa-flex"></i>`,
    ],
    values: [
      `Our **core values** guide everything we do:\n\n<i class="fas fa-lightbulb"></i> **Innovation** — Always ahead of the curve\n<i class="fas fa-handshake"></i> **Integrity** — Transparent and ethical always\n<i class="fas fa-leaf"></i> **Sustainability** — Building with the future in mind\n<i class="fas fa-star"></i> **Excellence** — Uncompromising quality\n<i class="fas fa-heart"></i> **Human-Centered** — People first, always\n\nThese aren't just words — they show in every project we deliver! <i class="fas fa-trophy"></i>`,
    ],
    pricing: [
      `Pricing depends on the scope and specifics of your project — every job is unique! <i class="fas fa-smile"></i>\n\nFor an accurate quote:\n\n<i class="fas fa-phone-alt"></i> Call us: **${COMPANY.phones[0]}**\n<i class="fab fa-whatsapp"></i> WhatsApp: [Chat Now](${COMPANY.whatsapp})\n<i class="fas fa-envelope"></i> Email: **${COMPANY.email}**\n\nWe'll assess your requirements and give you a **competitive, transparent proposal** — no hidden costs! <i class="fas fa-hands-helping"></i>`,
      `Great question on pricing! We provide **custom quotes** based on:\n\n• Project type & scope\n• Location\n• Materials required\n• Timeline\n\nTo get your tailored quote, just reach out:\n<i class="fas fa-phone-alt"></i> **${COMPANY.phones[0]}** | <i class="fas fa-envelope"></i> **${COMPANY.email}**\n\nWe promise — very competitive rates! <i class="fas fa-flex"></i>`,
    ],
    whatsapp: [
      `Yes! WhatsApp is actually our **fastest contact channel**! <i class="fas fa-mobile-alt"></i>\n\nClick here to chat: [WhatsApp Us Now](${COMPANY.whatsapp})\n\nOr save the number: **${COMPANY.phones[0]}**\n\nOur team is responsive and friendly on WhatsApp! <i class="fas fa-smile"></i>`,
    ],
    thanks: [
      `You're so welcome! <i class="fas fa-smile"></i> That's what I'm here for. Is there anything else you'd like to know about **${COMPANY.name}**?`,
      `Anytime! <i class="fas fa-star"></i> Happy to help. Don't hesitate to ask if you have more questions!`,
      `Of course! It's my pleasure. Feel free to ask anything else — I'm always here! <i class="fas fa-smile"></i>`,
    ],
    default: [
      `That's an interesting question! <i class="fas fa-thinking"></i> While I may not have the exact answer right now, I'd recommend reaching out to our team directly for the most accurate information.\n\n<i class="fas fa-phone-alt"></i> **${COMPANY.phones[0]}**\n<i class="fas fa-envelope"></i> **${COMPANY.email}**\n<i class="fab fa-whatsapp"></i> [WhatsApp](${COMPANY.whatsapp})\n\nOr feel free to ask me about our services, team, location, or how to get a quote! <i class="fas fa-smile"></i>`,
      `Hmm, I want to make sure you get the right answer on that! <i class="fas fa-smile"></i> For detailed or specific queries, our team is best placed to help:\n\n• Call: **${COMPANY.phones[0]}**\n• Email: **${COMPANY.email}**\n• WhatsApp: [Chat Here](${COMPANY.whatsapp})\n\nMeanwhile, I can help with info on our services, company details, contact info, or getting a quote!`,
      `Great question — and I want to give you the best answer! <i class="fas fa-star"></i> For anything beyond our general company info, our experts are just a message away:\n\n<i class="fas fa-mobile-alt"></i> **${COMPANY.phones[0]}** | <i class="fas fa-envelope"></i> **${COMPANY.email}**\n\nWhat else can I help you with? Try asking about our services, CEO, or how to get a quote! <i class="fas fa-smile"></i>`,
    ],
  };

  /* ── QUICK REPLY SUGGESTIONS ─────────────────────────────── */
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

    if (match(["hi","hello","hey","howdy","good morning","good afternoon","good evening","hiya","sup","what's up","whats up","yo","greetings"]))
      return "greetings";
    if (match(["thank","thanks","thank you","cheers","appreciated","great help","helpful"]))
      return "thanks";
    if (match(["whatsapp","whatsap","watsapp","wa","chat"]))
      return "whatsapp";
    if (match(["phone","call","number","telephone","ring","dial","mobile","line"]))
      return "phone";
    if (match(["email","mail","e-mail","inbox","send message","message"]))
      return "email";
    if (match(["location","address","where","office","headquarters","hq","find you","situated","based"]))
      return "location";
    if (match(["contact","reach","get in touch","how do i contact","reach out","speak","talk to"]))
      return "contact";
    if (match(["quote","quotation","estimate","cost","price","pricing","how much","fee","charge","rate","proposal"]))
      return "pricing";
    if (match(["quote","proposal","get a quote","free quote","send quote","project quote"]) && match(["get","send","free","need","want"]))
      return "quote";
    if (match(["ceo","founder","owner","ikechukwu","anyanwu","who started","who owns","who founded","director","leadership","chairman"]))
      return "ceo";
    if (match(["mission","vision","purpose","goal","aim","objective"]))
      return "mission";
    if (match(["value","values","believe","principle","integrity","innovation","excellence","sustainability"]))
      return "values";
    if (match(["stat","statistics","how many","projects","clients","years","team","numbers","track record","achievement"]))
      return "stats";
    if (match(["road","construction","civil","highway","bridge","asphalt","concrete","earthwork","drainage","infrastructure","rehabilitation"]))
      return "construction";
    if (match(["real estate","property","house","home","apartment","housing","building","flat","estate","residential","commercial property","land"]))
      return "realestate";
    if (match(["solar","energy","power","electricity","inverter","battery","renewable","panel","light","nepa","generator","hybrid"]))
      return "solar";
    if (match(["it","technology","tech","software","network","cybersecurity","cloud","cctv","website","app","digital","computer","system","automation","web"]))
      return "technology";
    if (match(["interior","design","decor","ceiling","pop","furniture","finishing","landscape","exterior","beautif","renovation","fitting"]))
      return "interiors";
    if (match(["service","offer","provide","do you do","what do","what you","specializ","division","sector","industry"]))
      return "services";
    if (match(["about","who are","what is","tell me about","describe","overview","explain","what does","company","platform","website","this"]))
      return "about";
    return "default";
  }

  /* ── RANDOM PICK ─────────────────────────────────────────── */
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* ── GET RESPONSE ────────────────────────────────────────── */
  function getResponse(text) {
    const intent = classify(text);
    const pool = RESPONSES[intent] || RESPONSES.default;
    return { text: pick(pool), intent };
  }

  /* ── MARKDOWN RENDERER ───────────────────────────────────── */
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
    #rrh-chat-btn {
      position: fixed; bottom: 100px; right: 28px; z-index: 9998;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #c9a84c, #9a7a30);
      border: none; cursor: pointer; box-shadow: 0 4px 24px rgba(201,168,76,.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform .3s, box-shadow .3s;
      animation: rrhPulse 2.5s ease-in-out infinite;
    }
    #rrh-chat-btn:hover { transform: scale(1.12); box-shadow: 0 8px 36px rgba(201,168,76,.6); }
    #rrh-chat-btn svg { width:28px; height:28px; fill:#0a0a0a; }
    @keyframes rrhPulse {
      0%,100%{box-shadow:0 4px 24px rgba(201,168,76,.45);}
      50%{box-shadow:0 4px 36px rgba(201,168,76,.75);}
    }
    #rrh-chat-badge {
      position:absolute; top:-3px; right:-3px; width:18px; height:18px;
      background:#e94444; border-radius:50%; font-size:10px; color:#fff;
      display:flex;align-items:center;justify-content:center;font-weight:700;
      font-family:'Barlow Condensed',sans-serif;
    }
    #rrh-chat-window {
      position:fixed; bottom:170px; right:28px; z-index:9997;
      width:380px; max-width:calc(100vw - 32px);
      background:#111; border:1px solid rgba(201,168,76,.25);
      border-radius:0; box-shadow:0 16px 64px rgba(0,0,0,.7);
      display:flex; flex-direction:column;
      transform:translateY(20px) scale(.95); opacity:0;
      transition:transform .35s cubic-bezier(.2,.9,.4,1.1), opacity .35s ease;
      pointer-events:none;
      font-family:'Barlow',sans-serif;
      max-height:560px;
    }
    #rrh-chat-window.open {
      transform:translateY(0) scale(1); opacity:1; pointer-events:all;
    }
    .rrh-chat-header {
      background:linear-gradient(135deg,#1a1a1a,#222);
      border-bottom:1px solid rgba(201,168,76,.2);
      padding:14px 16px; display:flex; align-items:center; gap:12px;
      flex-shrink:0;
    }
    .rrh-chat-avatar {
      width:38px; height:38px; border-radius:50%;
      background:linear-gradient(135deg,#c9a84c,#9a7a30);
      display:flex;align-items:center;justify-content:center;flex-shrink:0;
    }
    .rrh-chat-avatar svg { width:20px;height:20px;fill:#0a0a0a; }
    .rrh-chat-header-info { flex:1; }
    .rrh-chat-header-name {
      font-family:'Barlow Condensed',sans-serif; font-size:14px;
      font-weight:800; letter-spacing:1px; color:#fff; text-transform:uppercase;
    }
    .rrh-chat-header-status {
      font-size:11px; color:#4ade80; display:flex; align-items:center; gap:5px;
    }
    .rrh-status-dot {
      width:7px;height:7px;border-radius:50%;background:#4ade80;
      animation:rrhBlink 2s ease-in-out infinite;
    }
    @keyframes rrhBlink{0%,100%{opacity:1;}50%{opacity:.3;}}
    .rrh-chat-close {
      background:none;border:none;cursor:pointer;padding:4px;
      color:rgba(255,255,255,.5); transition:color .2s;
    }
    .rrh-chat-close:hover{color:#c9a84c;}
    .rrh-chat-close svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;}
    .rrh-chat-messages {
      flex:1; overflow-y:auto; padding:16px; display:flex;
      flex-direction:column; gap:12px; min-height:200px;
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
    .rrh-msg-avatar.user { background:#222; font-size:16px; }
    .rrh-bubble {
      max-width:78%; padding:10px 14px; font-size:13.5px; line-height:1.6;
      border-radius:0; position:relative;
    }
    .rrh-bubble.bot {
      background:#1a1a1a; color:rgba(255,255,255,.85);
      border-left:2px solid #c9a84c;
    }
    .rrh-bubble.user {
      background:linear-gradient(135deg,#c9a84c,#9a7a30);
      color:#0a0a0a; font-weight:500;
    }
    .rrh-bubble strong{color:#c9a84c;}
    .rrh-bubble.user strong{color:#0a0a0a;}
    .rrh-bubble i { color: #c9a84c; }
    .rrh-bubble.user i { color: #0a0a0a; }
    .rrh-msg-time {
      font-size:10px;color:rgba(255,255,255,.25);margin-top:4px;
      text-align:right;
    }
    .rrh-msg.user .rrh-msg-time{text-align:left;}
    .rrh-typing {
      display:flex;gap:8px;align-items:flex-start;
      animation:rrhMsgIn .3s ease both;
    }
    .rrh-typing-dots {
      background:#1a1a1a;border-left:2px solid #c9a84c;
      padding:12px 16px;display:flex;gap:5px;align-items:center;
    }
    .rrh-typing-dots span {
      width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.4);
      animation:rrhDot 1.2s ease-in-out infinite;
    }
    .rrh-typing-dots span:nth-child(2){animation-delay:.2s;}
    .rrh-typing-dots span:nth-child(3){animation-delay:.4s;}
    @keyframes rrhDot{0%,80%,100%{transform:scale(.8);opacity:.4;}40%{transform:scale(1);opacity:1;}}
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
    .rrh-qr i { margin-right: 4px; }
    .rrh-chat-input-row {
      display:flex;gap:0;border-top:1px solid rgba(201,168,76,.15);flex-shrink:0;
    }
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
      padding:6px 16px 8px;text-align:center;flex-shrink:0;
      border-top:1px solid rgba(255,255,255,.04);
    }
    .rrh-chat-footer span{font-size:10px;color:rgba(255,255,255,.18);letter-spacing:1px;text-transform:uppercase;}
    .rrh-chat-footer strong{color:rgba(201,168,76,.5);}
    /* tooltip */
    #rrh-chat-tooltip {
      position:fixed;bottom:168px;right:28px;z-index:9996;
      background:#fff;color:#0a0a0a;padding:8px 14px;
      font-family:'Barlow',sans-serif;font-size:13px;font-weight:500;
      box-shadow:0 4px 20px rgba(0,0,0,.3);
      transform:translateX(0);
      animation:rrhTooltip 3.5s ease forwards;
      pointer-events:none;white-space:nowrap;
    }
    #rrh-chat-tooltip::after {
      content:'';position:absolute;bottom:-6px;right:22px;
      border:6px solid transparent;border-top-color:#fff;border-bottom:none;
    }
    @keyframes rrhTooltip{
      0%{opacity:0;transform:translateY(8px);}
      15%{opacity:1;transform:translateY(0);}
      75%{opacity:1;}
      100%{opacity:0;}
    }
    @media(max-width:480px){
      #rrh-chat-window{bottom:90px;right:12px;width:calc(100vw - 24px);}
      #rrh-chat-btn{bottom:16px;right:76px;}
    }
  `;
  document.head.appendChild(style);

  /* ── BUILD DOM ───────────────────────────────────────────── */
  // Button
  const btn = document.createElement("button");
  btn.id = "rrh-chat-btn";
  btn.setAttribute("aria-label", "Open Chat");
  btn.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
    <div id="rrh-chat-badge">1</div>`;
  document.body.appendChild(btn);

  // Tooltip
  const tooltip = document.createElement("div");
  tooltip.id = "rrh-chat-tooltip";
  tooltip.innerHTML = '<i class="fas fa-hand-wave"></i> Hi! How can we help you?';
  document.body.appendChild(tooltip);
  setTimeout(() => tooltip.remove(), 4000);

  // Window
  const win = document.createElement("div");
  win.id = "rrh-chat-window";
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-label", "Road Rock Holdings Chat");
  win.innerHTML = `
    <div class="rrh-chat-header">
      <div class="rrh-chat-avatar">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      </div>
      <div class="rrh-chat-header-info">
        <div class="rrh-chat-header-name">RRH Assistant</div>
        <div class="rrh-chat-header-status">
          <div class="rrh-status-dot"></div> Online — Always here to help
        </div>
      </div>
      <button class="rrh-chat-close" id="rrh-chat-close-btn" aria-label="Close chat">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="rrh-chat-messages" id="rrh-chat-messages"></div>
    <div class="rrh-quick-replies" id="rrh-quick-replies"></div>
    <div class="rrh-chat-input-row">
      <input id="rrh-chat-input" placeholder="Ask me anything about Road Rock Holdings…" autocomplete="off" maxlength="300" />
      <button id="rrh-chat-send" aria-label="Send">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div class="rrh-chat-footer"><span>Powered by <strong>Road Rock Holdings AI</strong></span></div>`;
  document.body.appendChild(win);

  /* ── ELEMENTS ────────────────────────────────────────────── */
  const msgs = document.getElementById("rrh-chat-messages");
  const input = document.getElementById("rrh-chat-input");
  const sendBtn = document.getElementById("rrh-chat-send");
  const closeBtn = document.getElementById("rrh-chat-close-btn");
  const badge = document.getElementById("rrh-chat-badge");
  const qrContainer = document.getElementById("rrh-quick-replies");

  /* ── QUICK REPLIES ───────────────────────────────────────── */
  QUICK_REPLIES.forEach((qr) => {
    const el = document.createElement("button");
    el.className = "rrh-qr";
    el.innerHTML = qr.label;
    el.addEventListener("click", () => {
      appendMsg(qr.label.replace(/<[^>]*>/g, ''), "user");
      triggerResponse(qr.label.replace(/<[^>]*>/g, ''));
    });
    qrContainer.appendChild(el);
  });

  /* ── OPEN / CLOSE ────────────────────────────────────────── */
  let isOpen = false;
  function openChat() {
    isOpen = true;
    win.classList.add("open");
    badge.style.display = "none";
    input.focus();
    if (msgs.children.length === 0) sendWelcome();
  }
  function closeChat() {
    isOpen = false;
    win.classList.remove("open");
  }
  btn.addEventListener("click", () => (isOpen ? closeChat() : openChat()));
  closeBtn.addEventListener("click", closeChat);

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
    return t;
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
      const typing = showTyping();
      setTimeout(() => {
        removeTyping();
        appendMsg(pick(welcomes), "bot");
      }, 1200);
    }, 400);
  }

  function triggerResponse(userText) {
    const typing = showTyping();
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

  /* ── AUTO-OPEN after 8s (once per session) ───────────────── */
  if (!sessionStorage.getItem("rrh_chat_opened")) {
    setTimeout(() => {
      if (!isOpen) {
        sessionStorage.setItem("rrh_chat_opened", "1");
        openChat();
      }
    }, 8000);
  }
})();