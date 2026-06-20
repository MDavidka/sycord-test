FROM ubuntu:22.04

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install core tools, build tools, and SSH server
RUN apt-get update && apt-get install -y \
  openssh-server \
  curl \
  git \
  sudo \
  build-essential \
  libpng-dev \
  libwebp-dev \
  && rm -rf /var/lib/apt/lists/*

# Create SSH run directory
RUN mkdir /var/run/sshd

# Install Node.js LTS (v20)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g pnpm

# Create the standard non-root developer user 'sycord'
RUN useradd -m -s /bin/bash sycord \
  && echo "sycord ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Create workspace and deployment folders
RUN mkdir -p /workspace && chown -R sycord:sycord /workspace

# Copy the entrypoint and deployment scripts
COPY entrypoint.sh /entrypoint.sh
COPY sycord-deploy /usr/bin/sycord-deploy

RUN chmod +x /entrypoint.sh /usr/bin/sycord-deploy

EXPOSE 22
ENTRYPOINT ["/entrypoint.sh"]