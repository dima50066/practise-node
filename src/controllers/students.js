import { getAllStudents, getStudentById } from '../services/students.js';
import createHttpError from 'http-errors';

export const getStudentsController = async (req, res, next) => {
  try {
    const students = await getAllStudents();

    res.json({
      status: 200,
      message: 'Students fetched successfully',
      data: students,
    });
  } catch (err) {
    next(err);
  }
};

export const getStudentByIdController = async (req, res) => {
  const { id } = req.params;
  const student = await getStudentById(id);

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }
  res.json({
    status: 200,
    message: 'Student fetched successfully',
    data: student,
  });
};
