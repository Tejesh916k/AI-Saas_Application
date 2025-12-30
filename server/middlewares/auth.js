import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId, has } = req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    // Check subscription
    const hasPremiumPlan = await has({ plan: "premium" });

    // Fetch user from Clerk
    const user = await clerkClient.users.getUser(userId);

    // Read free usage safely
    const freeUsage = user.privateMetadata?.free_usage ?? 0;

    // Attach to request
    req.userId = userId;
    req.plan = hasPremiumPlan ? "premium" : "free";
    req.free_usage = freeUsage;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
