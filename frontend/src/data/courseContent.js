const COURSE_CONTENT = {
  "dmcst": {
    "modules": [
      {
        "id": "m1",
        "title": "Introduction to Cybersecurity",
        "topics": [
          {
            "id": "t0",
            "title": "What is Cybersecurity?",
            "explanation": "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes.\n\nIn the modern world, cybersecurity is not just an IT concern  it is a business-critical function. Every organization, from small startups to global enterprises, faces threats from hackers, nation-state actors, and insider threats.\n\n**Why Cybersecurity Matters:**\n- Over 4 billion records were exposed in data breaches in 2023 alone\n- The average cost of a data breach is .45 million (IBM, 2023)\n- Cybercrime is projected to cost the world .5 trillion annually by 2025\n\n**Core Pillars of Cybersecurity (CIA Triad):**\n1. **Confidentiality**  Ensuring information is only accessible to those authorized\n2. **Integrity**  Ensuring data is accurate and has not been tampered with\n3. **Availability**  Ensuring systems and data are accessible when needed\n\n**Types of Cybersecurity:**\n- Network Security: Protecting network infrastructure\n- Application Security: Securing software and apps\n- Endpoint Security: Protecting devices like laptops and phones\n- Cloud Security: Securing cloud-based systems\n- Operational Security: Processes for handling data assets",
            "videoUrl": "https://www.youtube.com/embed/inWWhr5tnEA",
            "quiz": [
              {
                "q": "What does the CIA Triad stand for in cybersecurity?",
                "options": [
                  "Confidentiality, Integrity, Availability",
                  "Central Intelligence Agency",
                  "Cyber Incident Analysis",
                  "Control, Inspect, Audit"
                ],
                "answer": "Confidentiality, Integrity, Availability",
                "explanation": "The CIA Triad is the foundation of cybersecurity: Confidentiality (data privacy), Integrity (data accuracy), and Availability (system uptime)."
              },
              {
                "q": "What is the projected annual cost of cybercrime by 2025?",
                "options": [
                  " trillion",
                  " trillion",
                  ".5 trillion",
                  " billion"
                ],
                "answer": ".5 trillion",
                "explanation": "Cybercrime Magazine projects cybercrime will cost the world .5 trillion annually by 2025, making it the third largest economy after the US and China."
              },
              {
                "q": "Which of the following is NOT a type of cybersecurity?",
                "options": [
                  "Network Security",
                  "Application Security",
                  "Physical Security",
                  "Endpoint Security"
                ],
                "answer": "Physical Security",
                "explanation": "Physical security is a separate domain. The main cybersecurity types are Network, Application, Endpoint, Cloud, and Operational Security."
              }
            ]
          },
          {
            "id": "t1",
            "title": "Career Paths in Cybersecurity",
            "explanation": "The cybersecurity field offers diverse and well-paying career paths. Understanding these paths helps you focus your learning and build the right skills for your goals.\n\n**Offensive Security (Red Team):**\n- **Penetration Tester**  Legally hack systems to find vulnerabilities before attackers do. Average salary: ,000-,000\n- **Red Team Operator**  Simulate advanced persistent threats against organizations\n- **Bug Bounty Hunter**  Find vulnerabilities in companies and get paid rewards\n- **Exploit Developer**  Create proof-of-concept exploits for vulnerabilities\n\n**Defensive Security (Blue Team):**\n- **SOC Analyst**  Monitor security alerts and respond to incidents 24/7\n- **Incident Responder**  Investigate and contain security breaches\n- **Threat Hunter**  Proactively search for hidden threats in networks\n- **SIEM Engineer**  Build and maintain security monitoring systems\n\n**Specialized Roles:**\n- **Malware Analyst**  Reverse engineer malicious software\n- **Digital Forensics Investigator**  Collect and analyze digital evidence\n- **Cloud Security Engineer**  Secure AWS, Azure, GCP environments\n- **Security Architect**  Design secure systems and infrastructure\n\n**Entry Requirements:**\nMost entry-level roles require: CompTIA Security+, basic networking knowledge, and hands-on lab experience. Higher roles require certifications like CEH, OSCP, CISSP.",
            "videoUrl": "https://www.youtube.com/embed/Ot6oiMFKQHc",
            "quiz": [
              {
                "q": "Which role involves legally hacking systems to find vulnerabilities?",
                "options": [
                  "SOC Analyst",
                  "Penetration Tester",
                  "SIEM Engineer",
                  "Cloud Architect"
                ],
                "answer": "Penetration Tester",
                "explanation": "A Penetration Tester (ethical hacker) is authorized to attack systems to discover vulnerabilities before malicious hackers do."
              },
              {
                "q": "What does SOC stand for?",
                "options": [
                  "Security Operations Center",
                  "System Operations Control",
                  "Secure Online Computing",
                  "Software Operations Console"
                ],
                "answer": "Security Operations Center",
                "explanation": "A SOC (Security Operations Center) is a team that monitors, detects, and responds to cybersecurity incidents around the clock."
              },
              {
                "q": "Which certification is most recommended for entry-level cybersecurity?",
                "options": [
                  "CISSP",
                  "OSCP",
                  "CompTIA Security+",
                  "CEH"
                ],
                "answer": "CompTIA Security+",
                "explanation": "CompTIA Security+ is the most widely recognized entry-level cybersecurity certification, covering core security concepts and practices."
              }
            ]
          },
          {
            "id": "t2",
            "title": "Setting Up Your Lab Environment",
            "explanation": "A home lab is essential for practicing cybersecurity skills safely and legally. You cannot learn cybersecurity just by reading  you must practice hands-on.\n\n**What You Need:**\n- Computer with at least 8GB RAM (16GB recommended)\n- VirtualBox or VMware Workstation (free/paid)\n- Kali Linux (primary attack machine)\n- Metasploitable 2 or 3 (intentionally vulnerable target)\n- Windows 10/11 VM (for Windows-based attacks)\n\n**Step-by-Step Setup:**\n\n1. **Install VirtualBox**  Download from virtualbox.org (free)\n2. **Download Kali Linux**  Get the VM image from kali.org\n3. **Import Kali into VirtualBox**  File > Import Appliance\n4. **Download Metasploitable**  From SourceForge\n5. **Create a Host-Only Network**  So VMs can communicate safely\n6. **Test connectivity**  Ping between VMs\n\n**Essential Tools Pre-installed in Kali:**\n- Nmap (network scanner)\n- Metasploit Framework (exploitation)\n- Burp Suite (web testing)\n- Wireshark (packet analysis)\n- John the Ripper (password cracking)\n- Aircrack-ng (wireless testing)\n\n**Safety Rules:**\n- NEVER attack systems you do not own or have written permission to test\n- Keep your lab on a host-only or NAT network\n- Use platforms like HackTheBox, TryHackMe for legal practice",
            "videoUrl": "https://www.youtube.com/embed/lZAoFs75_cs",
            "quiz": [
              {
                "q": "What is the minimum recommended RAM for a cybersecurity home lab?",
                "options": [
                  "4GB",
                  "8GB",
                  "16GB",
                  "32GB"
                ],
                "answer": "8GB",
                "explanation": "8GB is the minimum, but 16GB is recommended to run multiple VMs simultaneously (Kali + target machine)."
              },
              {
                "q": "Which tool is used for network scanning in Kali Linux?",
                "options": [
                  "Wireshark",
                  "Metasploit",
                  "Nmap",
                  "Burp Suite"
                ],
                "answer": "Nmap",
                "explanation": "Nmap (Network Mapper) is the industry-standard tool for network discovery, port scanning, and service detection."
              },
              {
                "q": "What is Metasploitable?",
                "options": [
                  "A hacking tool",
                  "An intentionally vulnerable VM for practice",
                  "A firewall application",
                  "A network monitoring tool"
                ],
                "answer": "An intentionally vulnerable VM for practice",
                "explanation": "Metasploitable is a deliberately vulnerable Linux VM designed for practicing penetration testing techniques in a safe environment."
              }
            ]
          },
          {
            "id": "t3",
            "title": "Linux Fundamentals",
            "explanation": "Linux is the foundation of cybersecurity. Most hacking tools, servers, and security systems run on Linux. Mastering the command line is non-negotiable.\n\n**Why Linux for Cybersecurity:**\n- Kali Linux is the standard pentesting OS\n- Most web servers run Linux (Apache, Nginx)\n- Better control and customization than Windows\n- Open source  you can see exactly how it works\n\n**Essential Linux Commands:**\n\n`\bash\n# Navigation\npwd          # Print working directory\nls -la       # List files with details\ncd /path     # Change directory\n\n# File Operations\ncat file.txt        # View file contents\ncp source dest      # Copy file\nmv source dest      # Move/rename file\nrm file.txt         # Delete file\n\n# Permissions\nchmod 755 file      # Change permissions\nchown user file     # Change owner\n\n# Network\nifconfig / ip a     # Show network interfaces\nping target         # Test connectivity\nnetstat -tulpn      # Show open ports\n\n# Process Management\nps aux              # List all processes\nkill PID            # Kill a process\ntop / htop          # Real-time process monitor\n\n# Package Management (Debian/Kali)\napt update          # Update package list\napt install nmap    # Install a package\n`\n\n**File System Structure:**\n- /  Root directory\n- /home  User home directories\n- /etc  Configuration files\n- /var/log  Log files\n- /tmp  Temporary files\n- /usr/bin  User programs",
            "videoUrl": "https://www.youtube.com/embed/ZtqBQ68cfJc",
            "quiz": [
              {
                "q": "Which command shows all running processes in Linux?",
                "options": [
                  "ls -la",
                  "ps aux",
                  "netstat -tulpn",
                  "chmod 755"
                ],
                "answer": "ps aux",
                "explanation": "ps aux shows all running processes with their PID, CPU usage, memory usage, and command name."
              },
              {
                "q": "Where are configuration files stored in Linux?",
                "options": [
                  "/home",
                  "/tmp",
                  "/etc",
                  "/usr/bin"
                ],
                "answer": "/etc",
                "explanation": "The /etc directory contains system-wide configuration files for all installed applications and services."
              },
              {
                "q": "What does chmod 755 do?",
                "options": [
                  "Deletes a file",
                  "Changes file ownership",
                  "Sets read/write/execute for owner, read/execute for others",
                  "Encrypts a file"
                ],
                "answer": "Sets read/write/execute for owner, read/execute for others",
                "explanation": "chmod 755 gives the owner full permissions (7=rwx) and group/others read+execute permissions (5=r-x)."
              }
            ]
          }
        ]
      },
      {
        "id": "m2",
        "title": "Networking Fundamentals",
        "topics": [
          {
            "id": "t0",
            "title": "OSI Model",
            "explanation": "The OSI (Open Systems Interconnection) model is a conceptual framework that standardizes how different network systems communicate. It has 7 layers, each with specific responsibilities.\n\n**The 7 Layers (Remember: Please Do Not Throw Sausage Pizza Away):**\n\n1. **Physical (Layer 1)**  Raw bits over cables, fiber, wireless\n2. **Data Link (Layer 2)**  MAC addresses, switches, frames\n3. **Network (Layer 3)**  IP addresses, routers, packets\n4. **Transport (Layer 4)**  TCP/UDP, ports, segmentation\n5. **Session (Layer 5)**  Establishes/maintains connections\n6. **Presentation (Layer 6)**  Encryption, compression, encoding\n7. **Application (Layer 7)**  HTTP, FTP, DNS, user-facing protocols\n\n**Why It Matters for Security:**\n- Attacks happen at specific layers (e.g., ARP spoofing at Layer 2, IP spoofing at Layer 3)\n- Firewalls operate at Layers 3-4\n- WAFs operate at Layer 7\n- Understanding layers helps you identify where an attack is occurring",
            "videoUrl": "https://www.youtube.com/embed/vv4y_uOneC0",
            "quiz": [
              {
                "q": "At which OSI layer do IP addresses operate?",
                "options": [
                  "Layer 1",
                  "Layer 2",
                  "Layer 3",
                  "Layer 4"
                ],
                "answer": "Layer 3",
                "explanation": "Layer 3 (Network layer) handles IP addressing and routing. Routers operate at this layer."
              },
              {
                "q": "Which layer handles encryption and data formatting?",
                "options": [
                  "Layer 5",
                  "Layer 6",
                  "Layer 7",
                  "Layer 4"
                ],
                "answer": "Layer 6",
                "explanation": "Layer 6 (Presentation layer) handles data translation, encryption, and compression."
              },
              {
                "q": "ARP spoofing attacks target which OSI layer?",
                "options": [
                  "Layer 1",
                  "Layer 2",
                  "Layer 3",
                  "Layer 7"
                ],
                "answer": "Layer 2",
                "explanation": "ARP (Address Resolution Protocol) operates at Layer 2 (Data Link). ARP spoofing manipulates MAC-to-IP mappings."
              }
            ]
          },
          {
            "id": "t1",
            "title": "TCP/IP Protocols",
            "explanation": "TCP/IP is the actual protocol suite used on the internet. Unlike the theoretical OSI model, TCP/IP is what networks actually use.\n\n**TCP vs UDP:**\n\n| Feature | TCP | UDP |\n|---------|-----|-----|\n| Connection | Connection-oriented | Connectionless |\n| Reliability | Guaranteed delivery | No guarantee |\n| Speed | Slower | Faster |\n| Use case | HTTP, FTP, SSH | DNS, VoIP, Gaming |\n\n**TCP Three-Way Handshake:**\n1. Client sends SYN\n2. Server responds SYN-ACK\n3. Client sends ACK\n\n**Common Ports to Know:**\n- 21  FTP\n- 22  SSH\n- 23  Telnet (insecure)\n- 25  SMTP (email)\n- 53  DNS\n- 80  HTTP\n- 443  HTTPS\n- 3389  RDP (Windows Remote Desktop)\n- 3306  MySQL\n\n**Security Implications:**\n- Open ports are attack surfaces\n- Unencrypted protocols (Telnet, FTP) expose credentials\n- SYN flood attacks exploit the TCP handshake",
            "videoUrl": "https://www.youtube.com/embed/CRdL1PcherM",
            "quiz": [
              {
                "q": "What port does SSH use by default?",
                "options": [
                  "21",
                  "22",
                  "23",
                  "25"
                ],
                "answer": "22",
                "explanation": "SSH (Secure Shell) uses port 22 for encrypted remote access. It replaced the insecure Telnet (port 23)."
              },
              {
                "q": "Which protocol guarantees packet delivery?",
                "options": [
                  "UDP",
                  "ICMP",
                  "TCP",
                  "ARP"
                ],
                "answer": "TCP",
                "explanation": "TCP (Transmission Control Protocol) uses acknowledgments and retransmission to guarantee reliable data delivery."
              },
              {
                "q": "What is the TCP three-way handshake sequence?",
                "options": [
                  "SYN, ACK, FIN",
                  "SYN, SYN-ACK, ACK",
                  "ACK, SYN, FIN",
                  "SYN, RST, ACK"
                ],
                "answer": "SYN, SYN-ACK, ACK",
                "explanation": "The TCP handshake: Client sends SYN, server responds SYN-ACK, client confirms with ACK. This establishes a connection."
              }
            ]
          },
          {
            "id": "t2",
            "title": "DNS and HTTP",
            "explanation": "DNS and HTTP are the backbone of the web. Understanding them is critical for web security testing.\n\n**DNS (Domain Name System):**\nDNS translates human-readable domain names into IP addresses.\n\nExample: www.google.com  142.250.80.46\n\n**DNS Resolution Process:**\n1. Browser checks local cache\n2. Queries local DNS resolver (your ISP)\n3. Resolver queries root nameservers\n4. Root refers to TLD nameserver (.com)\n5. TLD refers to authoritative nameserver\n6. Authoritative returns IP address\n\n**DNS Attack Types:**\n- DNS Spoofing/Cache Poisoning  Injecting false DNS records\n- DNS Tunneling  Exfiltrating data through DNS queries\n- DNS Amplification  DDoS using DNS servers\n\n**HTTP/HTTPS:**\nHTTP is the protocol for web communication. HTTPS adds TLS encryption.\n\n**HTTP Methods:**\n- GET  Retrieve data\n- POST  Submit data\n- PUT  Update data\n- DELETE  Remove data\n- OPTIONS  Check allowed methods\n\n**HTTP Status Codes:**\n- 200 OK\n- 301 Redirect\n- 403 Forbidden\n- 404 Not Found\n- 500 Server Error",
            "videoUrl": "https://www.youtube.com/embed/mpQZVYPuDGU",
            "quiz": [
              {
                "q": "What does DNS stand for?",
                "options": [
                  "Domain Name System",
                  "Dynamic Network Service",
                  "Data Network Security",
                  "Digital Name Server"
                ],
                "answer": "Domain Name System",
                "explanation": "DNS (Domain Name System) is the internet phone book  it translates domain names like google.com into IP addresses."
              },
              {
                "q": "Which HTTP method is used to submit form data?",
                "options": [
                  "GET",
                  "PUT",
                  "POST",
                  "DELETE"
                ],
                "answer": "POST",
                "explanation": "POST sends data in the request body, making it suitable for form submissions, logins, and creating resources."
              },
              {
                "q": "What HTTP status code means Forbidden?",
                "options": [
                  "200",
                  "301",
                  "403",
                  "404"
                ],
                "answer": "403",
                "explanation": "403 Forbidden means the server understood the request but refuses to authorize it  you lack permission."
              }
            ]
          },
          {
            "id": "t3",
            "title": "Network Monitoring with Wireshark",
            "explanation": "Wireshark is the world most popular network protocol analyzer. It captures and displays network traffic in real-time, allowing you to see exactly what is happening on a network.\n\n**Installing Wireshark:**\n`\bash\nsudo apt install wireshark\n`\n\n**Key Features:**\n- Capture live network traffic\n- Read saved capture files (.pcap)\n- Filter traffic by protocol, IP, port\n- Follow TCP/UDP streams\n- Decrypt TLS traffic (with keys)\n\n**Essential Display Filters:**\n`\nhttp                    # Show only HTTP traffic\ndns                     # Show only DNS queries\ntcp.port == 80          # Traffic on port 80\nip.addr == 192.168.1.1  # Traffic to/from specific IP\nhttp.request.method == POST  # Only POST requests\n`\n\n**What to Look For:**\n- Cleartext credentials in HTTP/FTP/Telnet\n- Unusual DNS queries (possible tunneling)\n- Large data transfers (possible exfiltration)\n- Port scans (many SYN packets to different ports)\n- ARP requests (possible ARP scanning)",
            "videoUrl": "https://www.youtube.com/embed/lb1Dw0elw0Q",
            "quiz": [
              {
                "q": "What file extension do Wireshark capture files use?",
                "options": [
                  ".txt",
                  ".pcap",
                  ".log",
                  ".cap"
                ],
                "answer": ".pcap",
                "explanation": "Wireshark saves captures as .pcap (packet capture) files, which can be shared and analyzed later."
              },
              {
                "q": "Which Wireshark filter shows only DNS traffic?",
                "options": [
                  "http",
                  "tcp",
                  "dns",
                  "arp"
                ],
                "answer": "dns",
                "explanation": "The filter dns shows only DNS protocol packets, useful for detecting DNS tunneling or unusual domain lookups."
              },
              {
                "q": "What can Wireshark detect in cleartext protocols?",
                "options": [
                  "Encrypted passwords",
                  "Credentials in HTTP/FTP/Telnet",
                  "Firewall rules",
                  "SSL certificates"
                ],
                "answer": "Credentials in HTTP/FTP/Telnet",
                "explanation": "Protocols like HTTP, FTP, and Telnet transmit data unencrypted. Wireshark can capture usernames and passwords in plaintext."
              }
            ]
          }
        ]
      }
    ]
  }
};
export default COURSE_CONTENT;