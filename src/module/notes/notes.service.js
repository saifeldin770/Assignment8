import mongoose from "mongoose";
import notesModel from "../../DB/model/notes.model.js";
import {
  aggregate,
  create,
  deleteMany,
  find,
  findByIdAndDelete,
  findByIdAndUpdate,
  findOne,
  updateMany,
} from "../../DB/repo/repo.db.js";
import { populate } from "dotenv";
export async function createNote(userId, noteData) {
  if (!userId) {
    throw new Error(`user id not found.`, { cause: { statusCode: 400 } });
  }
  userId = new mongoose.Types.ObjectId(userId);
  const note = await create({
    model: notesModel,
    data: { ...noteData, userId },
  });
  return note;
}
export async function updateSingleNote(noteId, userId, noteData) {
  if (!noteId || !userId) {
    throw new Error("Note Id or User Id is missed.", {
      cause: { statusCode: 400 },
    });
  }
  const note = await findOne({ model: notesModel, filter: { _id: noteId } });
  if (!note) {
    throw new Error(`Note not found.`, { cause: { statusCode: 404 } });
  }
  if (note.userId.toString() != userId) {
    throw new Error(`You are not the Owner.`, { cause: { statusCode: 403 } });
  }
  const updatedNote = await findByIdAndUpdate({
    model: notesModel,
    id: noteId,
    data: { ...noteData, $inc: { __v: 1 } },
    options: { runValidators: true, returnDocument: "after" },
  });
  return updatedNote;
}
export async function replaceNote(noteId, userId, noteData) {
  if (!userId || !noteId) {
    throw new Error(`User Id or Note Id missed.`, {
      cause: { statusCode: 400 },
    });
  }
  const note = await findOne({ model: notesModel, filter: { _id: noteId } });
  if (!note) {
    throw new Error(`Note not found.`, { cause: { statusCode: 404 } });
  }
  if (note.userId.toString() !== userId) {
    throw new Error(`You are not the owner.`, { cause: { statusCode: 403 } });
  }
  const replacedNote = await findByIdAndUpdate({
    model: notesModel,
    id: noteId,
    data: { ...noteData, userId, $inc: { __v: 1 } },
    options: {
      runValidators: true,
      returnDocument: "after",
      overwrite: true,
    },
  });
  return replacedNote;
}
export async function updateTitleOfAllNotes(userId, noteData) {
  const { title } = noteData || {};
  if (!userId || !title) {
    throw new Error(`User id or title is missed.`, {
      cause: { statusCode: 400 },
    });
  }
  const note = await updateMany({
    model: notesModel,
    filter: { userId },
    data: { title, $inc: { __v: 1 } },
    options: {
      runValidators: true,
    },
  });
  if (note.matchedCount == 0) {
    throw new Error(`No note found.`, { cause: { statusCode: 404 } });
  }
  return note;
}
export async function deleteNote(noteId, userId) {
  if (!noteId || !userId) {
    throw new Error(`User Id or Note Id is missed.`, {
      cause: { statusCode: 400 },
    });
  }
  const note = await findOne({ model: notesModel, filter: { _id: noteId } });
  if (!note) {
    throw new Error(`Note not found.`, { cause: { statusCode: 404 } });
  }
  if (note.userId.toString() !== userId) {
    throw new Error(`You are not the owner.`, { cause: { statusCode: 403 } });
  }
  const deletedNote = await findByIdAndDelete({
    model: notesModel,
    id: noteId,
  });
  return deletedNote;
}
export async function retrievePaginatedListOfNotes(
  userId,
  page = 1,
  limit = 3,
) {
  if (!userId) {
    throw new Error(`User id is required.`, { cause: { statusCode: 400 } });
  }
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.max(1, parseInt(limit) || 3);
  const skip = (pageNum - 1) * limitNum;
  const notes = await find({
    model: notesModel,
    filter: { userId },
    options: {
      sort: {
        createdAt: -1,
      },
      skip: skip,
      limit: limitNum,
    },
  });
  return notes;
}
export async function getNote(noteId, userId) {
  if (!noteId || !userId) {
    throw new Error(`Note Id or User Id is missed.`, {
      cause: { statusCode: 400 },
    });
  }
  const note = await findOne({ model: notesModel, filter: { _id: noteId } });
  if (!note) {
    throw new Error(`Note not found.`, { cause: { statusCode: 404 } });
  }
  if (note.userId.toString() !== userId) {
    throw new Error(`You are not the owner.`, { cause: { statusCode: 403 } });
  }
  return note;
}
export async function getNoteByContent(userId, content) {
  if (!userId || !content) {
    throw new Error(`User Id or content are missed.`, {
      cause: { statusCode: 400 },
    });
  }
  const note = await findOne({
    model: notesModel,
    filter: { userId, content },
  });
  if (!note) {
    throw new Error(`No note found.`, { cause: { statusCode: 404 } });
  }
  return note;
}
export async function getNotesWithUserInfo(userId) {
  if (!userId) {
    throw new Error(`User id is required.`, { cause: { statusCode: 400 } });
  }
  const notes = await find({
    model: notesModel,
    filter: { userId },
    projection: "title userId createdAt",
    options: {
      populate: { path: "userId", select: "email -_id" },
    },
  });
  return notes;
}
export async function getNotesWithUserInfoWithAggregate(userId, title) {
  if (!userId) {
    throw new Error(`User Id is required.`, { cause: { statusCode: 400 } });
  }
  const matchCondition = {
    userId: new mongoose.Types.ObjectId(userId),
  };
  if (title) {
    matchCondition.title = title;
  }
  const notes = await aggregate({
    model: notesModel,
    options: [
      { $match: matchCondition },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          title: 1,
          userId: 1,
          createdAt: 1,
          "user.name": 1,
          "user.email": 1,
        },
      },
    ],
  });
  return notes;
}
export async function deleteAllNotesForUser(userId) {
  if (!userId) {
    throw new Error(`User Id is required.`, { cause: { statusCode: 400 } });
  }
  const deletedNotes = await deleteMany({
    model: notesModel,
    filter: { userId },
  });
  return deletedNotes;
}
