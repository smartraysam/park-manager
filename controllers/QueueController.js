const mongoose = require('mongoose');
const queueSchema = new mongoose.Schema({
    vehicleNo: String,
    entryTime: Date
});
const Queue = mongoose.model('Queue', queueSchema);

class QueueController {
// Method to add a vehicle to the exit queue and save it in MongoDB
static addToExitQueue = async (vehicle) => {
    try {
        const queueItem = new Queue({
            vehicleNo: vehicle.vehicleNo,
            entryTime: vehicle.entryTime
        });
        await queueItem.save();
        return queueItem;
    } catch (error) {
        throw new Error('Error adding vehicle to exit queue in database');
    }
};

// Method to remove a vehicle from the exit queue when it exits the park
static removeFromExitQueue = async (vehicleNo) => {
    try {
        await Queue.findOneAndDelete({ vehicleNo });
    } catch (error) {
        throw new Error('Error removing vehicle from exit queue in database');
    }
};

// Method to check if a vehicle is next in the exit queue based on entry time
static isNextInQueue = async (vehicleNo) => {
    try {
        const firstInQueue = await Queue.findOne().sort('entryTime');
        return firstInQueue && firstInQueue.vehicleNo === vehicleNo;
    } catch (error) {
        throw new Error('Error checking next vehicle in exit queue from database');
    }
};

}

export default QueueController;
