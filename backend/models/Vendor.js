const db = require('../config/database');

class Vendor {
  static async register(vendorName, enterprise, gstno, address, mobno) {
    try {
      // Insert vendor data
      const [result] = await db.query(
        'INSERT INTO vendor (name, enterprise, gstno, address, mobno, amount) VALUES (?, ?, ?, ?, ?, 0.0)',
        [vendorName, enterprise, gstno, address, mobno]
      );
      
      const vendorId = result.insertId;
      
      // Create vendor table
      await db.query(`
        CREATE TABLE IF NOT EXISTS vendor_${vendorId} (
          id INT AUTO_INCREMENT PRIMARY KEY,
          date DATE NULL,
          MilkCM500Quan INT NULL,
          MilkCM200Quan INT NULL,
          MilkTM500Quan INT NULL,
          MilkTM200Quan INT NULL,
          Lassi200Quan INT NULL,
          LassiCUP200Quan INT NULL,
          LassiMANGOCUP200Quan INT NULL,
          Dahi200Quan INT NULL,
          Dahi500Quan INT NULL,
          Dahi2LTQuan INT NULL,
          Dahi5LTQuan INT NULL,
          Dahi10LTQuan INT NULL,
          Dahi2LTQuan15 INT NULL,
          Dahi5LTQuan15 INT NULL,
          Dahi10LTQuan15 INT NULL,
          ButtermilkQuan INT NULL,
          Khova500Quan INT NULL,
          Khoya1000Quan INT NULL,
          Shrikhand100Quan INT NULL,
          Shrikhand250Quan INT NULL,
          Ghee200Quan INT NULL,
          Ghee500Quan INT NULL,
          Ghee15LTQuan INT NULL,
          PaneerlooseQuan INT NULL,
          khovalooseQuan INT NULL
        );
      `);
      
      return vendorId;
    } catch (error) {
      throw error;
    }
  }
  
  static async getAllVendors() {
    try {
      const [rows] = await db.query('SELECT * FROM vendor');
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  static async setProductPrices(vendorId, prices) {
    try {
      // Check if prices already exist for this vendor
      const [existingPrices] = await db.query(
        'SELECT COUNT(*) as count FROM product_prices WHERE vendorId = ?',
        [vendorId]
      );
      
      if (existingPrices[0].count > 0) {
        // Update existing prices
        await db.query(
          `UPDATE product_prices SET 
           MilkCM500Price = ?, MilkCM200Price = ?, MilkTM500Price = ?, MilkTM200Price = ?,
           Lassi200Price = ?, LassiCUP200Price = ?, LassiMANGOCUP200Price = ?,
           Dahi200Price = ?, Dahi500Price = ?, Dahi2LTPrice = ?, Dahi5LTPrice = ?, Dahi10LTPrice = ?,
           Dahi2LTPrice15 = ?, Dahi5LTPrice15 = ?, Dahi10LTPrice15 = ?,
           ButtermilkPrice = ?, Khova500Price = ?, Khoya1000Price = ?,
           Shrikhand100Price = ?, Shrikhand250Price = ?,
           Ghee200Price = ?, Ghee500Price = ?, Ghee15LTPrice = ?,
           PaneerloosePrice = ?, khovaloosePrice = ?
           WHERE vendorId = ?`,
          [
            prices.MilkCM500Price, prices.MilkCM200Price, prices.MilkTM500Price, prices.MilkTM200Price,
            prices.Lassi200Price, prices.LassiCUP200Price, prices.LassiMANGOCUP200Price,
            prices.Dahi200Price, prices.Dahi500Price, prices.Dahi2LTPrice, prices.Dahi5LTPrice, prices.Dahi10LTPrice,
            prices.Dahi2LTPrice15, prices.Dahi5LTPrice15, prices.Dahi10LTPrice15,
            prices.ButtermilkPrice, prices.Khova500Price, prices.Khoya1000Price,
            prices.Shrikhand100Price, prices.Shrikhand250Price,
            prices.Ghee200Price, prices.Ghee500Price, prices.Ghee15LTPrice,
            prices.PaneerloosePrice, prices.khovaloosePrice,
            vendorId
          ]
        );
      } else {
        // Insert new prices
        await db.query(
          `INSERT INTO product_prices (
            vendorId, MilkCM500Price, MilkCM200Price, MilkTM500Price, MilkTM200Price,
            Lassi200Price, LassiCUP200Price, LassiMANGOCUP200Price,
            Dahi200Price, Dahi500Price, Dahi2LTPrice, Dahi5LTPrice, Dahi10LTPrice,
            Dahi2LTPrice15, Dahi5LTPrice15, Dahi10LTPrice15,
            ButtermilkPrice, Khova500Price, Khoya1000Price,
            Shrikhand100Price, Shrikhand250Price,
            Ghee200Price, Ghee500Price, Ghee15LTPrice,
            PaneerloosePrice, khovaloosePrice
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            vendorId,
            prices.MilkCM500Price, prices.MilkCM200Price, prices.MilkTM500Price, prices.MilkTM200Price,
            prices.Lassi200Price, prices.LassiCUP200Price, prices.LassiMANGOCUP200Price,
            prices.Dahi200Price, prices.Dahi500Price, prices.Dahi2LTPrice, prices.Dahi5LTPrice, prices.Dahi10LTPrice,
            prices.Dahi2LTPrice15, prices.Dahi5LTPrice15, prices.Dahi10LTPrice15,
            prices.ButtermilkPrice, prices.Khova500Price, prices.Khoya1000Price,
            prices.Shrikhand100Price, prices.Shrikhand250Price,
            prices.Ghee200Price, prices.Ghee500Price, prices.Ghee15LTPrice,
            prices.PaneerloosePrice, prices.khovaloosePrice
          ]
        );
      }
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
  
  static async recordPayment(vendorId, amount) {
    try {
      // Update vendor amount
      await db.query(
        'UPDATE vendor SET amount = amount + ? WHERE id = ?',
        [amount, vendorId]
      );
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Vendor;
