-- Table to store invoice details
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    sales_person_name VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    notes TEXT,
    products_sold TEXT NOT NULL,
    total_amount NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--);
