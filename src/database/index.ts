import { createConnection, Connection } from 'typeorm';

import dbConfig from '../config/database';

export default async (
  connName: 'default' | 'test' = 'default'
): Promise<Connection> => {
  return createConnection(Object.assign(dbConfig, { name: connName }));
};
