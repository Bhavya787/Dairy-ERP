const db = require('../config/database');

class Product {
  static async sellProducts(vendorId, products) {
    try {
      // Begin transaction
      const connection = await db.getConnection();
      await connection.beginTransaction();
      
      try {
        // Get current date
        const today = new Date().toISOString().split('T')[0];
        
        // Build dynamic query based on provided products
        let fields = ['date'];
        let placeholders = ['?'];
        let values = [today];
        
        for (const [key, value] of Object.entries(products)) {
          if (value && value > 0) {
            fields.push(key);
            placeholders.push('?');
            values.push(value);
          }
        }
        
        // Insert into vendor table
        if (fields.length > 1) { // Only if there are products to insert
          const query = `INSERT INTO vendor_${vendorId} (${fields.join(', ')}) VALUES (${placeholders.join(', ')})`;
          await connection.query(query, values);
        }
        
        await connection.commit();
        return { success: true };
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      throw error;
    }
  }
  
  static async getProductPrices(vendorId) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM product_prices WHERE vendorId = ?',
        [vendorId]
      );
      
      if (rows.length === 0) {
        throw new Error('No product prices found for this vendor');
      }
      
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
