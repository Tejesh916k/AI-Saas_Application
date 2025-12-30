import Groq from "groq-sdk";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const generateBLogTitle = async (req, res) => {
  try {
    const { prompt } = req.body;
    const { userId, plan, free_usage } = req;

    // Free plan limit
    if (plan === "free" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free usage limit reached. Upgrade to premium."
      });
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
      temperature: 0.7
    });

    const content = response.choices[0].message.content;

    // Store in Neon
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    // Increment usage ONLY for free users
   

    res.json({ success: true, content });

  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};


export const generateArticle = async (req, res) => {
  try {
    const { prompt } = req.body;
    const { userId, plan, free_usage } = req;

    // Free plan limit
    if (plan === "free" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free usage limit reached. Upgrade to premium."
      });
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600,
      temperature: 0.7
    });

    const content = response.choices[0].message.content;

    // Store in Neon
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    // Increment usage ONLY for free users
    if (plan === "free") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1
        }
      });
    }

    res.json({ success: true, content });

  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const { userId, plan, free_usage, publish } = req;

    // Free plan limit
    if (plan === "free" ) {
      return res.json({
        success: false,
        message: "this feature is only for premium users."
      });
    }

    const formData = new FormData()
    formData.append('prompt', 'shot of vaporwave fashion dog in miami')
    const {data}=await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API_KEY,
        'responseType': 'arraybuffer',
      }
    })

    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

    ṁ,jkg ylujtf ;ydxt6c
    ,[l1'
      ]0
    // Store in Neon
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    // Increment usage ONLY for free users
   

    res.json({ success: true, content });

  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};
