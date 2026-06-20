#!/bin/bash
# ==============================================================================
# CONTAINER ENTRYPOINT SCRIPT
# Runs as root inside the container on startup to inject the SSH public key.
# ==============================================================================

set -e

# Write the public key passed from the Host environment variable
if [ -n "$SSH_PUBLIC_KEY" ]; then
  mkdir -p /home/sycord/.ssh
  echo "$SSH_PUBLIC_KEY" > /home/sycord/.ssh/authorized_keys
  chmod 700 /home/sycord/.ssh
  chmod 600 /home/sycord/.ssh/authorized_keys
  chown -R sycord:sycord /home/sycord/.ssh
fi

# Disable password login for maximum security
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config

# Start the SSH Daemon in the foreground
exec /usr/sbin/sshd -D