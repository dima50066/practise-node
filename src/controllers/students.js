import {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudents,
} from '../services/students.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortOrder, sortBy } = parseSortParams(req.query);

  const filter = parseFilterParams(req.query);

  const students = await getAllStudents({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  });

  res.json({
    status: 200,
    message: 'Students fetched successfully',
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }
  res.json({
    status: 200,
    message: 'Student fetched successfully',
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  const student = await createStudent(req.body);
  res.status(201).json({
    status: 201,
    message: 'Student created successfully',
    data: student,
  });
};

export const deleteStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await deleteStudent(studentId);

  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const result = await updateStudents(studentId, req.body, { upsert: true });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Student upserted successfully',
    data: result.student,
  });
};

export const patchStudentController = async (req, res) => {
  const { studentId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const result = await updateStudents(studentId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.json({
    status: 200,
    message: 'Student patched successfully',
    data: result.student,
  });
};
