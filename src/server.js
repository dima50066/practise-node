// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { getAllStudents, getStudentById } from './services/students.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.get('/students', async (req, res) => {
    try {
      const students = await getAllStudents();
      if (!students || students.length === 0) {
        return res.status(404).json({ message: 'No students found' });
      }
      res.status(200).json({ data: students });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error });
    }
  });

  app.get('/students/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const student = await getStudentById(id);
      if (!student) {
        res.status(404).json({ message: 'Student not found' });
      } else {
        res.status(200).json({ data: student });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching contact by ID ${id}', error });
    }
  });

  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });
};
