require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');
const Preorder = require('./models/Preorder');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error('MONGODB_URI environment variable not set');
    }
    
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    return false;
  }
};

// Open SQLite Database
const openSQLiteDB = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./preorders.db', (err) => {
      if (err) {
        console.error('Error connecting to SQLite database:', err.message);
        reject(err);
      } else {
        console.log('Connected to the SQLite database.');
        resolve(db);
      }
    });
  });
};

// Get all preorders from SQLite
const getPreordersFromSQLite = (db) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM preorders', [], (err, rows) => {
      if (err) {
        console.error('Error fetching preorders from SQLite:', err.message);
        reject(err);
      } else {
        console.log(`Found ${rows.length} preorders in SQLite.`);
        resolve(rows);
      }
    });
  });
};

// Migrate data from SQLite to MongoDB
const migrateData = async () => {
  try {
    // Connect to MongoDB
    const mongoConnected = await connectDB();
    if (!mongoConnected) {
      console.error('Failed to connect to MongoDB. Exiting migration.');
      process.exit(1);
    }

    // Connect to SQLite
    const sqliteDB = await openSQLiteDB();
    
    // Get preorders from SQLite
    const preorders = await getPreordersFromSQLite(sqliteDB);
    
    // If no preorders found, exit
    if (!preorders.length) {
      console.log('No preorders found in SQLite database.');
      sqliteDB.close();
      await mongoose.connection.close();
      process.exit(0);
    }
    
    // Insert preorders into MongoDB
    console.log('Migrating preorders to MongoDB...');
    
    const migratedCount = { success: 0, failed: 0 };
    
    for (const preorder of preorders) {
      try {
        await Preorder.create({
          email: preorder.email,
          signup_date: preorder.signup_date ? new Date(preorder.signup_date) : new Date(),
          notified: preorder.notified === 1 // Convert SQLite integer to Boolean
        });
        migratedCount.success++;
      } catch (error) {
        console.error(`Failed to migrate preorder for ${preorder.email}:`, error.message);
        migratedCount.failed++;
      }
    }
    
    console.log(`Migration complete: ${migratedCount.success} succeeded, ${migratedCount.failed} failed.`);
    
    // Close connections
    sqliteDB.close(() => console.log('SQLite connection closed.'));
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
};

// Run migration
migrateData(); 