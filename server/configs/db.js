import  {neon} from '@neondatabase/serverless';
import cors from 'cors';
import express from 'express';
import { clerkMiddleware } from '@clerk/express'
const sql = neon(`${process.env.DATABASE_URL}`);


export default sql;