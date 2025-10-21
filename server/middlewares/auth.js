import { clerkClient } from "@clerk/express";

// Middleware to check userId and hasPremiumPlan
export const auth = async (req, res, next) => {


  
  try {
    const { userId, has } = await req.auth();
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized - No user ID" });
    }

    const hasPremiumPlan = await has({ plan: "premium" });
    const user = await clerkClient.users.getUser(userId);

    // Set userId first
    req.userId = userId;
    req.plan = hasPremiumPlan ? "premium" : "free";

    // Only manage free_usage for free tier users
    if (!hasPremiumPlan) {
      req.free_usage = user.privateMetadata?.free_usage || 0;
    } else {
      req.free_usage = 0; // Premium users have unlimited
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ success: false, message: "Authentication failed: " + error.message });
  }
};