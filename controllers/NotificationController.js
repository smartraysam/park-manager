// module that handles file storage endpoints
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import mime from 'mime-types';
import fs from 'fs';
import { promisify } from 'util';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class NotificationController {

  static async getUserById(userId) {
    const usersCollection = dbClient.client.db().collection('users');
    return usersCollection.findOne({ _id: ObjectId(userId) });
  }
}

export default FilesController;
