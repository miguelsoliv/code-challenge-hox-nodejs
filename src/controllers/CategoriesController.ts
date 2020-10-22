import { Response, RequestHandler } from 'express';
import { getRepository } from 'typeorm';

import Category from '../models/Category';

const store: RequestHandler = async (request, response): Promise<Response> => {
  const { name } = request.body;

  const categoriesRepo = getRepository(Category);

  const category = categoriesRepo.create({
    name,
  });

  await categoriesRepo.save(category);

  return response.status(200).json(category);
};

const update: RequestHandler = async (request, response): Promise<Response> => {
  const { id } = request.params;
  const { name } = request.body;

  const categoriesRepo = getRepository(Category);

  const category = await categoriesRepo.save({
    id,
    name,
  });

  return response.status(200).json(category);
};

const remove: RequestHandler = async (request, response): Promise<Response> => {
  const { id } = request.params;

  const categoriesRepo = getRepository(Category);

  await categoriesRepo.delete(id);

  return response.status(204).send();
};

const show: RequestHandler = async (request, response): Promise<Response> => {
  const { id } = request.params;

  const categoriesRepo = getRepository(Category);

  const category = await categoriesRepo.findOneOrFail(id);

  return response.status(200).json(category);
};

const index: RequestHandler = async (_, response): Promise<Response> => {
  const categoriesRepo = getRepository(Category);

  const category = await categoriesRepo.find();

  return response.status(200).json(category);
};

export default { store, update, remove, show, index };
