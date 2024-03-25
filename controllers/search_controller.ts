import { Request, Response } from 'express';
import SearchStatistic from '../models/search_model';

export const createSearch = async (req: Request, res: Response) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a search!',
    });
  }

  try {
    const search = new SearchStatistic(body);
    await search.save();
    return res.status(201).json({
      success: true,
      data: search,
      message: 'Search Statistics created!',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
      message: 'Search Statistics not created!',
    });
  }
};

export const getSearchs = async (req: Request, res: Response) => {
  try {
    const searches = await SearchStatistic.find({});

    if (!searches.length) {
      return res
        .status(404)
        .json({ success: false, error: `Search Statistics not found` });
    }

    return res.status(200).json({ success: true, data: searches });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};