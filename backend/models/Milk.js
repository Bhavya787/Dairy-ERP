const db = require('../config/database');

class Milk {
  static async buyMilk(token, quantity, amount) {
    try {
      const expense = parseFloat(quantity) * parseFloat(amount);
      const expense_name = "Milk Purchase";
      
      // Begin transaction
      const connection = await db.getConnection();
      await connection.beginTransaction();
      
      try {
        // Check if token_X table exists, if not create it
        await connection.query(`
          CREATE TABLE IF NOT EXISTS token_${token} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            date DATE NOT NULL,
            amount_per_ltr DECIMAL(10, 2) NOT NULL,
            quantity DECIMAL(10, 2) NOT NULL,
            total_amount DECIMAL(10, 2) NOT NULL
          )
        `);
        
        // Insert data into the token table
        await connection.query(
          `INSERT INTO token_${token} (date, amount_per_ltr, quantity, total_amount) 
           VALUES (CURDATE(), ?, ?, ?)`,
          [amount, quantity, expense]
        );
        
        // Update farmer's net amount
        await connection.query(
          "UPDATE farmers SET net_amount = net_amount + ? WHERE token_id = ?",
          [expense, token]
        );
        
        // Check existing expenses for the current date
        const [result] = await connection.query(
          "SELECT total_expense FROM expenses WHERE date = CURDATE() AND expense_name = ?",
          [expense_name]
        );
        
        if (result.length > 0) {
          // Update existing record
          const existing_expense = parseFloat(result[0].total_expense);
          const new_total_expense = existing_expense + expense;
          
          await connection.query(
            "UPDATE expenses SET total_expense = ? WHERE date = CURDATE() AND expense_name = ?",
            [new_total_expense, expense_name]
          );
        } else {
          // Insert new record
          await connection.query(
            "INSERT INTO expenses (date, expense_name, total_expense) VALUES (CURDATE(), ?, ?)",
            [expense_name, expense]
          );
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
  
  static async milkBifurcation(looseMilk, milkForProduct) {
    try {
      // Begin transaction
      const connection = await db.getConnection();
      await connection.beginTransaction();
      
      try {
        // Insert into milk_bifurcation table
        await connection.query(
          "INSERT INTO milk_bifurcation(date, loose_milk, milk_for_product) VALUES (CURDATE(), ?, ?)",
          [looseMilk, milkForProduct]
        );
        
        // Check if there is an existing entry for 'Loose Milk' for today in payments table
        const [result] = await connection.query(
          "SELECT amount FROM payments WHERE payment_name = 'Loose Milk' AND date = CURDATE()"
        );
        
        if (result.length > 0) {
          // Add the new loose_milk value to the existing amount
          const currentAmount = parseFloat(result[0].amount);
          const newAmount = currentAmount + parseFloat(looseMilk);
          
          await connection.query(
            "UPDATE payments SET amount = ? WHERE payment_name = 'Loose Milk' AND date = CURDATE()",
            [newAmount]
          );
        } else {
          // Insert a new entry if none exists
          await connection.query(
            "INSERT INTO payments(date, payment_name, amount) VALUES (CURDATE(), 'Loose Milk', ?)",
            [looseMilk]
          );
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
}

module.exports = Milk;
