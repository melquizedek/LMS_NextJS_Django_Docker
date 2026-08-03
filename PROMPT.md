we're building a loan management system (LMS) and we're using Next.js for the frontend and Django for the backend.
Should follow the workflows below:

# Application Workflows

## 1. User Registration & Authentication
### Borrower Registration Flow
1. User visits registration page
2. Fills out basic information (name, email, phone, any government ID)
3. Uploads profile image and ID document
4. Receives SMS/Email verification code
5. Verifies phone/email
6. Account created with 'borrower' role
7. Profile completion (address, employment details)
8. Account marked as verified after document review

### Staff Registration (Admin Only)
1. Admin creates staff account
2. System generates temporary password
3. Staff receives email with login credentials
4. Staff logs in and sets new password
5. Role assigned (Credit Officer, Treasury, Admin)

## 2. Loan Application Workflow
   Borrower → Draft Application → Submit → Credit Officer Review →
   Approval/Rejection → Treasury Disbursement → Active Loan → Repayment
   
### Detailed Steps:

#### Borrower Side:
1. Browse available loan products
2. Select loan product and amount
3. Fill application form (income, expenses, purpose)
4. Upload required documents
5. Review and submit application
6. Receive application confirmation
   
#### Credit Officer Side:
1. Receive notification of new application
2. Review application details and documents
3. Verify borrower information
4. Assess creditworthiness
5. Make approval/rejection decision
6. Add review notes
7. Update application status
   
#### Treasury Side (if approved):
1. Receive approved applications queue
2. Generate loan agreement
3. Process disbursement
4. Update loan status to active
5. Generate payment schedule

## 3. Repayment Tracking Workflow

Payment Due → Borrower Payment → Treasury Processing →
Balance Update → Schedule Update → Notifications

# API Design
### Authentication Endpoints
- POST /api/auth/register/
- POST /api/auth/login/
- POST /api/auth/refresh/
- POST /api/auth/logout/
- POST /api/auth/verify-phone/
- POST /api/auth/reset-password/

### Loan Management Endpoints
- GET /api/loan-products/
- GET /api/loan-applications/
- POST /api/loan-applications/
- GET /api/loan-applications/{id}/
- PUT /api/loan-applications/{id}/
- POST /api/loan-applications/{id}/submit/
- POST /api/loan-applications/{id}/review/
- GET /api/loans/
- GET /api/loans/{id}/
- GET /api/loans/{id}/payment-schedule/
- POST /api/loans/{id}/payments/
- GET /api/loans/{id}/payments/

### Reporting Endpoints
- GET /api/reports/portfolio-summary/
- GET /api/reports/loan-performance/
- GET /api/reports/payment-collections/
- GET /api/reports/overdue-loans/
