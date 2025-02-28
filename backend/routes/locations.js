const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Location = require('../models/Location');
const { geocodeAddress, calculateDistance } = require('../utils/googleMaps');

// @route   POST api/locations
// @desc    Register or update a location
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { address, type, isAvailable } = req.body;

    // Geocode the address
    const geoLocation = await geocodeAddress(address);

    // Create or update location
    let location = await Location.findOne({ user: req.user.id });
    
    if (location) {
      location.location.coordinates = geoLocation.coordinates;
      location.address = address;
      location.type = type;
      location.isAvailable = isAvailable;
      location.lastUpdated = Date.now();
    } else {
      location = new Location({
        user: req.user.id,
        type,
        location: {
          coordinates: geoLocation.coordinates
        },
        address,
        isAvailable
      });
    }

    await location.save();
    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/locations/nearby
// @desc    Get nearby donors/blood banks
// @access  Private
router.get('/nearby', auth, async (req, res) => {
  try {
    const { latitude, longitude, radius = 10000, type } = req.query; // radius in meters

    const locations = await Location.find({
      type,
      isAvailable: true,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: radius
        }
      }
    }).populate('user', ['name', 'phone', 'email']);

    // Calculate distance for each location
    const locationsWithDistance = await Promise.all(
      locations.map(async (loc) => {
        const distance = await calculateDistance(
          [longitude, latitude],
          loc.location.coordinates
        );
        return {
          ...loc.toObject(),
          distance
        };
      })
    );

    res.json(locationsWithDistance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/locations/blood-banks
// @desc    Get all blood banks
// @access  Public
router.get('/blood-banks', async (req, res) => {
  try {
    const bloodBanks = await Location.find({
      type: 'bloodbank'
    }).populate('user', ['name', 'phone']);
    res.json(bloodBanks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 