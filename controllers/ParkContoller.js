import { ObjectId } from 'mongodb';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';
// Import Mongoose
const mongoose = require('mongoose');

// Define a Mongoose schema for the parked vehicles
const vehicleSchema = new mongoose.Schema({
  vehicleNo: String,
  driverName: String,
  rfidTag: String,
  phoneNumber: String,
  status: String,
});

// Create a Mongoose model for the parked vehicles
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

class ParkController {
  // Method to add a vehicle to the park and save it in MongoDB
  static PostVehicle = async (payload) => {
    const { vehicleNo, driverName, rfidTag, phoneNumber } = payload;
    try {
      const vehicle = new Vehicle({
        vehicleNo,
        driverName,
        rfidTag,
        phoneNumber,
        status: 'entry',
      });
      await vehicle.save();
      return vehicle;
    } catch (error) {
      throw new Error('Error saving vehicle to database');
    }
  };

  // Method to retrieve all parked vehicles from MongoDB
  static GetVehicle = async () => {
    try {
      const vehicles = await Vehicle.find();
      return vehicles;
    } catch (error) {
      throw new Error('Error retrieving vehicles from database');
    }
  };

  // Method to check the status of a vehicle (entry or exit) from MongoDB
  static CheckVehicle = async (vehicleNo) => {
    try {
      const vehicle = await Vehicle.findOne({ vehicleNo });
      if (vehicle) {
        return vehicle.status;
      } else {
        return 'Vehicle not found';
      }
    } catch (error) {
      throw new Error('Error checking vehicle status from database');
    }
  };
}

export default ParkController;
