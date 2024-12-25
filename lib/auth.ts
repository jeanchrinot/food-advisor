import jwt from "jsonwebtoken"

// Chat Widget Authentication

export function generateWidgetToken(channelId, domain = "chatPage") {
  const payload = {
    channelId,
    domain,
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
    issuer: "AIxFlows",
  })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    console.error("Token verification failed:", err)
    return null
  }
}
