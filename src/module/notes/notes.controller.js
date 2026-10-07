import { Router } from "express";
import {
  createNote,
  deleteAllNotesForUser,
  deleteNote,
  getNote,
  getNoteByContent,
  getNotesWithUserInfo,
  getNotesWithUserInfoWithAggregate,
  replaceNote,
  retrievePaginatedListOfNotes,
  updateSingleNote,
  updateTitleOfAllNotes,
} from "./notes.service.js";
const noteRouter = Router();
noteRouter.post("/", async (req, res, next) => {
  try {
    const result = await createNote(req.query.userId, req.body);
    return res.status(201).json({ message: "Note created.", data: result });
  } catch (error) {
    next(error);
  }
});
noteRouter.patch("/:noteId", async (req, res, next) => {
  try {
    const result = await updateSingleNote(
      req.params.noteId,
      req.query.userId,
      req.body,
    );
    return res.status(200).json({ message: "Note updated.", data: result });
  } catch (error) {
    next(error);
  }
});
noteRouter.put("/replace/:noteId", async (req, res, next) => {
  try {
    const result = await replaceNote(
      req.params.noteId,
      req.query.userId,
      req.body,
    );
    return res.status(200).json({ message: "updated", note: result });
  } catch (error) {
    next(error);
  }
});
noteRouter.patch("/all/title", async (req, res, next) => {
  try {
    const result = await updateTitleOfAllNotes(req.query.userId, req.body);
    return res.status(200).json({ message: "All notes updated.", result });
  } catch (error) {
    next(error);
  }
});
noteRouter.delete("/del/:noteId", async (req, res, next) => {
  try {
    const result = await deleteNote(req.params.noteId, req.query.userId);
    return res.status(200).json({ message: "deleted", note: result });
  } catch (error) {
    next(error);
  }
});
noteRouter.get("/paginate/sort", async (req, res, next) => {
  try {
    const result = await retrievePaginatedListOfNotes(
      req.query.userId,
      req.query.page,
      req.query.limit,
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
noteRouter.get("/get-notes/:noteId", async (req, res, next) => {
  try {
    const result = await getNote(req.params.noteId, req.query.userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
noteRouter.get("/note-by-content", async (req, res, next) => {
  try {
    const result = await getNoteByContent(req.query.userId, req.query.content);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
noteRouter.get("/note-with-user-info", async (req, res, next) => {
  try {
    const result = await getNotesWithUserInfo(req.query.userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
noteRouter.get("/aggregate", async (req, res, next) => {
  try {
    const result = await getNotesWithUserInfoWithAggregate(
      req.query.userId,
      req.query.title,
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
noteRouter.delete("/del-notes-for-user", async (req, res, next) => {
  try {
    const result = await deleteAllNotesForUser(req.query.userId);
    res.status(200).json({ message: "deleted", result });
  } catch (error) {
    next(error);
  }
});
export default noteRouter;
