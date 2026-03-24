# e2b.Dockerfile for Kali Linux Desktop
FROM kalilinux/kali-rolling

# Avoid interactive prompts during build
ENV DEBIAN_FRONTEND=noninteractive

# Update and install core dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    wget \
    sudo \
    procps \
    python3 \
    python3-pip \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install Kali Desktop (XFCE) and VNC
RUN apt-get update && apt-get install -y \
    xfce4 \
    xfce4-goodies \
    tigervnc-standalone-server \
    dbus-x11 \
    x11-xserver-utils \
    xdotool \
    && rm -rf /var/lib/apt/lists/*

# Install Pentesting Tools (Headless core)
RUN apt-get update && apt-get install -y \
    nmap \
    metasploit-framework \
    sqlmap \
    exploitdb \
    netcat-traditional \
    wireshark-common \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js for E2B communication
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Set up user 'e2b'
RUN useradd -m -s /bin/bash e2b \
    && echo "e2b ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Configure VNC
USER e2b
WORKDIR /home/e2b
RUN mkdir -p /home/e2b/.vnc
RUN echo "password" | vncpasswd -f > /home/e2b/.vnc/passwd && chmod 600 /home/e2b/.vnc/passwd
RUN touch /home/e2b/.vnc/xstartup && chmod +x /home/e2b/.vnc/xstartup
RUN echo "#!/bin/sh\nunset SESSION_MANAGER\nunset DBUS_SESSION_BUS_ADDRESS\nstartxfce4 &" > /home/e2b/.vnc/xstartup

# Expose VNC port
EXPOSE 5901

# Entrypoint (handled by E2B but good to have)
CMD ["/usr/bin/vncserver", "-fg", ":1", "-geometry", "1280x800", "-depth", "24"]
