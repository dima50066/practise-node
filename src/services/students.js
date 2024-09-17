import { StudentsCollection } from '../db/models/students.js';

export const getAllStudents = async () => {
  try {
    const students = await StudentsCollection.find();
    console.log('Fetched all students', students);

    if (!students) {
      throw new Error('No students found');
    }

    return students;
  } catch (err) {
    console.error('Failed to fetch students', err);
    throw err;
  }
};

export const getStudentById = async (id) => {
  try {
    const student = await StudentsCollection.findById(id);
    console.log('Fetched student', student);

    if (!student) {
      throw new Error('Student not found');
    }

    return student;
  } catch (err) {
    console.error('Failed to fetch student', err);
    throw err;
  }
};

export const createStudent = async (payload) => {
  const student = await StudentsCollection.create(payload);
  return student;
};

export const deleteStudent = async (id) => {
  const student = await StudentsCollection.findByIdAndDelete(id);
  return student;
};

export const updateStudents = async (id, payload, options) => {
  const rawResult = await StudentsCollection.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(!rawResult.lastErrorObject.upserted),
  };
};
