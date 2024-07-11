-- Table to store invoice details
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    sales_person_name VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    notes TEXT
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
