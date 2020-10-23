import { hash, compare } from 'bcryptjs';

export const generateHash = async (stringToHash: string): Promise<string> => {
  return hash(stringToHash, 8);
};

export const compareHashs = async (
  nonHashedString: string,
  hashedString: string
): Promise<boolean> => {
  return compare(nonHashedString, hashedString);
};
