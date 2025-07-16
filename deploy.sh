#!/bin/bash

# === 請先設定以下參數 ===
VPS_USER=joker
VPS_IP=167.172.93.121
VPS_FRONTEND_PATH=/srv/www/frontend
DOMAIN=joker.jienian.tw

# === 1. Build 前端 ===
echo "🔨 Building frontend..."
pnpm run build || { echo "❌ Build failed"; exit 1; }

# === 2. 上傳到 VPS ===
echo "📤 Uploading frontend to VPS..."
rsync -rP --delete dist/ $VPS_USER@$VPS_IP:$VPS_FRONTEND_PATH

# === 3. Reload Caddy ===
# echo "🔁 Reloading Caddy on VPS..."
# ssh $VPS_USER@$VPS_IP "sudo systemctl reload caddy"

echo "✅ Deploy complete! Visit: https://$DOMAIN"
