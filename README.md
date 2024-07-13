
# Project Requirements

## Section 1 - Add Invoice with Autocomplete for Product Input
- **Mandatory Invoice Data**:
  - Date
  - Customer Name
  - Salesperson Name
  - Notes (optional)
  - Multiple Products Sold
- **Autocomplete Product Suggestions**:
  - As the user types, provide product suggestions.
  - Each product suggestion should include:
    - Product Name
    - Product Picture
    - Stock
    - Price
  - Product data can be hardcoded in JSON format.
- **POST API**:
  - Use `fetch` or `axios` to save the invoice to the database.
- **Form Validation**:
  - The form cannot be submitted if any of the input boxes are empty.
  - Show a warning message for invalid inputs (label or tooltip).
- **Submission Notification**:
  - Upon successful submission, display a proper notification pop-up.

## Section 2 - Invoice Card
- **Invoice Cards with Pagination**:
  - Show invoices that have been published.
  - The invoice cards should display a summary including:
    - Customer Name
    - Salesperson Name
    - Total Amount Paid
    - Notes
- **Backend Query**:
  - Query invoice data from the backend using a GET API.
  - Implement lazy loading for data retrieval.

## Section 3 - Time-Series Graph
- **Revenue Projection Graph**:
  - Display revenue from invoices for daily, weekly, and monthly periods.
  - Enable users to pan and zoom to specific periods.
  - Auto scroll when new data is pushed.

## Implementation Requirements and Hints
- **Framework and State Management**:
  - Use React.js for the frontend.
  - Use Redux for state management.
- **Backend**:
  - Use Node.js for the backend.
- **Database**:
  - Use MySQL or PostgreSQL for the database.
- **Component Design**:
  - Build components as modular as possible to avoid code duplication.
- **UI Design**:
  - Add creative details to make the UI appealing.
- **Professionalism**:
  - Position yourself as a professional in the WidaTech work environment.
  - Ask questions for requirement gathering to ensure understanding of client expectations.

## Submission
- **Source Code Project**:
  - Submit your source code project with a README document containing the required content stated above.
- **Repository**:
  - Create a repository on Github or Gitlab and commit your work there.
  - Submit the public link of the repository after completion.
- **Email Submission**:
  - Email the repository link to `hiring@wida-tech.com`.
  - CC the email to `hannling.tan@wida-tech.com` and `rey@wida-tech.com`.

## How to run

Make sure to create a table using this format

```sql
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    sales_person_name VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    notes TEXT,
    products_sold TEXT NOT NULL,
    total_amount NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

If you want to generate dummy files, then run this command

```sql
INSERT INTO invoices (sales_person_name, customer_name, notes, products_sold, total_amount, created_at, updated_at)
SELECT
  'Sales Person ' || (ARRAY['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan'])[floor(random() * 5 + 1)] AS sales_person_name,
  'Customer ' || (ARRAY['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])[floor(random() * 10 + 1)] AS customer_name,
  CASE WHEN random() < 0.7 THEN 'Note for invoice ' || gen_random_uuid() ELSE NULL END AS notes,
  'Product ' || (ARRAY['X', 'Y', 'Z'])[floor(random() * 3 + 1)] || ', Quantity: ' || floor(random() * 10 + 1)::text AS products_sold,
  (random() * 1000 + 100)::numeric(10, 2) AS total_amount,
  timestamp '2023-07-13 00:00:00' +
    (random() * (interval '365 days') +
    (random() * (interval '24 hours'))) AS created_at,
  timestamp '2023-07-13 00:00:00' +
    (random() * (interval '365 days') +
    (random() * (interval '24 hours'))) AS updated_at
FROM generate_series(1, 5000);

UPDATE invoices SET updated_at = created_at + (random() * interval '7 days');
```

Make sure to put BE port on to the .env file like in .env.example

```bash
PORT=3001

DB_HOST=localhost
DB_DATABASE=xxx
DB_USERNAME=xxx
DB_PASSWORD=xxx
DB_PORT=xxx
```

Then run it using the dev command

```bash
pnpm dev
```
