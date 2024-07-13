
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
