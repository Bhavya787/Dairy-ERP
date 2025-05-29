const db = require('../config/database');

class Farmer {
  static async register(name, mobno, accno, ifsc, branch) {
    try {
      // Insert farmer data
      const [result] = await db.query(
        'INSERT INTO farmers (name, mobno, accno, ifsc, branch, net_amount) VALUES (?, ?, ?, ?, ?, 0.0)',
        [name, mobno, accno, ifsc, branch]
      );
      
      const token_id = result.insertId;
      
      // Create token table for this farmer
      await db.query(`
        CREATE TABLE IF NOT EXISTS token_${token_id} (
          id INT AUTO_INCREMENT PRIMARY KEY,
          date DATE NOT NULL,
          amount_per_ltr DECIMAL(10, 2) NOT NULL,
          quantity DECIMAL(10, 2) NOT NULL,
          total_amount DECIMAL(10, 2) NOT NULL
        );
      `);
      
      return token_id;
    } catch (error) {
      throw error;
    }
  }
  
  static async getAllFarmers() {
    try {
      const [rows] = await db.query('SELECT * FROM farmers');
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  static async payFarmer(token_id, amount_paid) {
    try {
      // Check if farmer exists
      const [farmer] = await db.query(
        'SELECT * FROM farmers WHERE token_id = ?',
        [token_id]
      );
      
      if (farmer.length === 0) {
        throw new Error('Farmer not found');
      }
      
      // Update farmer's net amount
      await db.query(
        'UPDATE farmers SET net_amount = net_amount - ? WHERE token_id = ?',
        [amount_paid, token_id]
      );
      
      return { 
        success: true, 
        message: 'Payment processed successfully',
        amount_paid
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Farmer;
