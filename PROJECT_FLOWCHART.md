# Nagrik Sewa - Project Flowchart

## System Architecture Overview

```mermaid
graph TB
    Start([User Visits Platform]) --> UserType{User Type?}
    
    %% Customer Flow
    UserType -->|Customer| CustomerReg[Customer Registration/Login]
    CustomerReg --> CustomerDash[Customer Dashboard]
    CustomerDash --> SearchService[Search for Service]
    SearchService --> ViewWorkers[View Available Workers]
    ViewWorkers --> FilterWorkers{Filter by Location,<br/>Rating, Price}
    FilterWorkers --> SelectWorker[Select Worker]
    SelectWorker --> BookService[Book Service]
    BookService --> Payment[Make Payment]
    Payment --> TrackWorker[Track Worker Real-time]
    TrackWorker --> ServiceComplete[Service Completed]
    ServiceComplete --> RateWorker[Rate & Review Worker]
    RateWorker --> CustomerEnd([End])
    
    %% Worker Flow
    UserType -->|Worker| WorkerReg[Worker Registration]
    WorkerReg --> KYCVerify[KYC & Document Verification]
    KYCVerify --> SkillAssessment[Skill Assessment]
    SkillAssessment --> WorkerDash[Worker Dashboard]
    WorkerDash --> ViewBookings[View Booking Requests]
    ViewBookings --> AcceptBooking{Accept Request?}
    AcceptBooking -->|Yes| UpdateLocation[Share Live Location]
    AcceptBooking -->|No| ViewBookings
    UpdateLocation --> CompleteService[Complete Service]
    CompleteService --> ReceivePayment[Receive Payment]
    ReceivePayment --> WorkerEnd([End])
    
    %% AI Chatbot Integration
    CustomerDash --> Chatbot[AI Chatbot]
    WorkerDash --> Chatbot
    Chatbot --> AIAssist{Assistance Type}
    AIAssist -->|Booking Help| SearchService
    AIAssist -->|Resume Building| ResumeBuilder[AI Resume Builder]
    AIAssist -->|General Query| FAQ[Answer Query]
    FAQ --> CustomerDash
    
    %% Admin Flow
    UserType -->|Admin| AdminLogin[Admin Login]
    AdminLogin --> AdminPanel[Admin Dashboard]
    AdminPanel --> ManageUsers[Manage Users]
    AdminPanel --> ViewAnalytics[View Analytics]
    AdminPanel --> HandleDisputes[Handle Disputes]
    AdminPanel --> ManageServices[Manage Services]
```

## Detailed Technical Flow

```mermaid
graph LR
    subgraph "Frontend - React + Vite"
        A[User Interface] --> B[React Components]
        B --> C[Context Providers]
        C --> D[API Calls]
    end
    
    subgraph "Backend - Node.js + Express"
        E[Express Routes] --> F[Middleware]
        F --> G[Controllers]
        G --> H[Services]
        H --> I[Database Models]
    end
    
    subgraph "Database - MongoDB"
        J[(MongoDB Collections)]
        J --> K[Users]
        J --> L[Workers]
        J --> M[Bookings]
        J --> N[Services]
        J --> O[Messages]
    end
    
    subgraph "External Services"
        P[Google OAuth]
        Q[Google Gemini AI]
        R[Email Service]
        S[SMS Service]
        T[Payment Gateway]
    end
    
    D --> E
    I --> J
    H --> P
    H --> Q
    H --> R
    H --> S
    H --> T
```

## User Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    participant G as Google OAuth
    
    U->>F: Click Login/Register
    F->>U: Show Auth Options
    
    alt Email/Password Login
        U->>F: Enter Credentials
        F->>B: POST /auth/login
        B->>DB: Verify Credentials
        DB->>B: User Data
        B->>B: Generate JWT Token
        B->>F: Return Token + User
        F->>F: Store Token
        F->>U: Redirect to Dashboard
    else Google OAuth
        U->>F: Click Google Login
        F->>G: Request OAuth
        G->>U: Show Google Login
        U->>G: Authorize
        G->>B: OAuth Token
        B->>DB: Create/Find User
        DB->>B: User Data
        B->>F: Return JWT + User
        F->>U: Redirect to Dashboard
    end
```

## Service Booking Flow

```mermaid
stateDiagram-v2
    [*] --> SearchService: Customer searches
    SearchService --> BrowseWorkers: View available workers
    BrowseWorkers --> FilterResults: Apply filters
    FilterResults --> ViewProfile: Select worker
    ViewProfile --> CreateBooking: Book service
    
    CreateBooking --> PendingPayment: Booking created
    PendingPayment --> PaymentProcessing: Customer pays
    PaymentProcessing --> BookingConfirmed: Payment success
    PaymentProcessing --> PaymentFailed: Payment fails
    PaymentFailed --> PendingPayment: Retry
    
    BookingConfirmed --> WorkerNotified: Notify worker
    WorkerNotified --> WorkerAccepts: Worker accepts
    WorkerNotified --> WorkerRejects: Worker rejects
    WorkerRejects --> [*]: Cancel booking
    
    WorkerAccepts --> InProgress: Service starts
    InProgress --> LocationTracking: Track worker
    LocationTracking --> ServiceComplete: Work done
    ServiceComplete --> RatingReview: Customer rates
    RatingReview --> [*]: Completed
```

## AI Chatbot Interaction Flow

```mermaid
graph TD
    A[User Opens Chat] --> B[AI Chatbot]
    B --> C{User Type Detection}
    
    C -->|Customer| D[Customer Intent]
    C -->|Worker| E[Worker Intent]
    
    D --> D1{Intent Type}
    D1 -->|Booking| D2[Help with Service Booking]
    D1 -->|Information| D3[Service Information]
    D1 -->|Support| D4[Customer Support]
    D1 -->|Other| D5[General Query]
    
    E --> E1{Intent Type}
    E1 -->|Registration| E2[Help with Registration]
    E1 -->|Resume| E3[AI Resume Builder]
    E1 -->|Earnings| E4[Earnings Information]
    E1 -->|Training| E5[Skill Training Info]
    
    D2 --> F[Gemini AI Response]
    D3 --> F
    D4 --> F
    D5 --> F
    E2 --> F
    E3 --> G[Generate Resume]
    E4 --> F
    E5 --> F
    
    F --> H[Display Response]
    G --> H
    H --> I{Satisfied?}
    I -->|No| B
    I -->|Yes| J([End Chat])
```

## Payment Processing Flow

```mermaid
graph LR
    A[Customer Books Service] --> B[Calculate Price]
    B --> C[Show Payment Options]
    C --> D{Payment Method}
    
    D -->|Card| E[Process Card Payment]
    D -->|UPI| F[Process UPI Payment]
    D -->|Wallet| G[Process Wallet Payment]
    
    E --> H[Payment Gateway]
    F --> H
    G --> H
    
    H --> I{Payment Status}
    I -->|Success| J[Update Booking Status]
    I -->|Failed| K[Show Error]
    
    J --> L[Hold Payment in Escrow]
    L --> M[Service Completed]
    M --> N[Release Payment to Worker]
    N --> O[Update Transaction Records]
    
    K --> C
```

## Real-time Location Tracking

```mermaid
sequenceDiagram
    participant C as Customer
    participant F as Frontend
    participant S as Socket Server
    participant W as Worker App
    
    C->>F: Open Booking Details
    F->>S: Connect to Socket
    S->>F: Connection Established
    
    loop Every 30 seconds
        W->>W: Get GPS Location
        W->>S: Emit Location Update
        S->>F: Broadcast Location
        F->>C: Update Map
    end
    
    W->>S: Service Started
    S->>F: Status Update
    F->>C: Show "Service Started"
    
    W->>S: Service Completed
    S->>F: Status Update
    F->>C: Show "Service Completed"
    S->>F: Disconnect Socket
```

## Data Models Relationship

```mermaid
erDiagram
    USER ||--o{ BOOKING : creates
    USER ||--o{ WORKER_PROFILE : has
    USER ||--o{ RESUME : has
    USER ||--o{ MESSAGE : sends
    
    WORKER_PROFILE ||--o{ BOOKING : accepts
    WORKER_PROFILE ||--o{ SERVICE : offers
    WORKER_PROFILE ||--o{ RATING : receives
    
    BOOKING ||--|| SERVICE : includes
    BOOKING ||--|| PAYMENT : has
    BOOKING ||--o{ MESSAGE : contains
    BOOKING ||--|| RATING : has
    
    SERVICE ||--o{ BOOKING : booked_in
    
    USER {
        string id PK
        string email
        string phone
        string role
        string firstName
        string lastName
        boolean isVerified
        date createdAt
    }
    
    WORKER_PROFILE {
        string id PK
        string userId FK
        array services
        object location
        float rating
        int completedJobs
        boolean isVerified
    }
    
    BOOKING {
        string id PK
        string customerId FK
        string workerId FK
        string serviceId FK
        string status
        date scheduledDate
        float price
    }
    
    SERVICE {
        string id PK
        string name
        string category
        string description
        float basePrice
    }
    
    RESUME {
        string id PK
        string userId FK
        object personalInfo
        array workExperience
        array education
        array skills
    }
```

## Multi-Language Support Flow

```mermaid
graph TD
    A[User Opens App] --> B[Detect System Language]
    B --> C{Language Supported?}
    C -->|Yes| D[Set Default Language]
    C -->|No| E[Set English Default]
    
    D --> F[Load Language Context]
    E --> F
    
    F --> G[User Clicks Language Selector]
    G --> H[Show 13+ Languages]
    H --> I[User Selects Language]
    I --> J[Update Language Context]
    J --> K[Update Font Family]
    K --> L[Re-render All Components]
    L --> M[Save Preference to LocalStorage]
    
    M --> N{User Uses Chatbot?}
    N -->|Yes| O[AI Responds in Selected Language]
    N -->|No| P[Continue Using App]
```

## Security & Verification Flow

```mermaid
graph TB
    A[User Registration] --> B[Email Verification]
    B --> C[Send OTP]
    C --> D{OTP Valid?}
    D -->|No| E[Show Error]
    D -->|Yes| F[Email Verified]
    
    F --> G{User Type}
    G -->|Worker| H[KYC Process]
    G -->|Customer| I[Account Active]
    
    H --> J[Upload Aadhaar]
    J --> K[Upload Photo]
    K --> L[Police Verification]
    L --> M[Skill Verification]
    M --> N[Admin Approval]
    N --> O{Approved?}
    O -->|Yes| P[Worker Profile Active]
    O -->|No| Q[Request More Docs]
    Q --> J
    
    E --> C
```

## Admin Dashboard Operations

```mermaid
graph TD
    A[Admin Login] --> B[Admin Dashboard]
    B --> C[View Statistics]
    B --> D[User Management]
    B --> E[Booking Management]
    B --> F[Dispute Resolution]
    B --> G[Analytics]
    
    D --> D1[Approve/Reject Workers]
    D --> D2[Ban/Suspend Users]
    D --> D3[View User Details]
    
    E --> E1[View All Bookings]
    E --> E2[Cancel Bookings]
    E --> E3[Refund Processing]
    
    F --> F1[Review Complaints]
    F --> F2[Chat with Users]
    F --> F3[Take Action]
    
    G --> G1[Revenue Analytics]
    G --> G2[User Growth]
    G --> G3[Service Performance]
    G --> G4[Geographic Data]
```

## Emergency SOS Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant E as Emergency Services
    participant C as Contacts
    
    U->>F: Press SOS Button
    F->>F: Get Current Location
    F->>B: POST /emergency/sos
    B->>B: Create Emergency Record
    
    par Notify Authorities
        B->>E: Send Alert with Location
    and Notify Emergency Contacts
        B->>C: SMS to Contacts
        B->>C: Call Emergency Numbers
    and Send to Admin
        B->>B: Alert Admin Dashboard
    end
    
    B->>F: Confirmation Sent
    F->>U: Show "Help is on the way"
    
    loop Every 1 minute
        F->>B: Send Location Update
        B->>E: Update Location
    end
```

## Resume Builder AI Flow

```mermaid
graph LR
    A[Worker Opens Resume Builder] --> B[Choose Template]
    B --> C[Fill Personal Info]
    C --> D[Add Work Experience]
    D --> E[Add Skills]
    E --> F[Click AI Enhance]
    
    F --> G[Send to Gemini AI]
    G --> H{AI Processing}
    H --> I[Improve Descriptions]
    H --> J[Optimize Keywords]
    H --> K[Format Content]
    H --> L[Add Achievements]
    
    I --> M[Combine Results]
    J --> M
    K --> M
    L --> M
    
    M --> N[Show Enhanced Resume]
    N --> O{Worker Satisfied?}
    O -->|Yes| P[Download/Save Resume]
    O -->|No| Q[Manual Edit]
    Q --> N
    
    P --> R[Store in Database]
    R --> S[Share with Customers]
```

---

## Technology Stack Flow

```mermaid
graph TB
    subgraph "Client Layer"
        A1[React 18.3.1]
        A2[TypeScript 5.5.3]
        A3[Vite 6.3.6]
        A4[Tailwind CSS]
        A5[shadcn/ui]
    end
    
    subgraph "Server Layer"
        B1[Node.js]
        B2[Express.js]
        B3[TypeScript]
        B4[Socket.io]
    end
    
    subgraph "Database Layer"
        C1[(MongoDB)]
        C2[Mongoose ODM]
    end
    
    subgraph "Authentication"
        D1[JWT]
        D2[Google OAuth 2.0]
        D3[bcrypt]
    end
    
    subgraph "AI & ML"
        E1[Google Gemini AI]
        E2[Natural Language Processing]
    end
    
    subgraph "External APIs"
        F1[EmailJS]
        F2[Twilio SMS]
        F3[Razorpay Payment]
        F4[Google Maps]
    end
    
    A1 --> B1
    A2 --> B3
    B2 --> C1
    C1 --> C2
    B2 --> D1
    B2 --> D2
    B2 --> E1
    B2 --> F1
    B2 --> F2
    B2 --> F3
    A1 --> F4
```

---

## Deployment Architecture

```mermaid
graph TB
    subgraph "Development"
        Dev1[Local Machine]
        Dev2[npm run dev]
        Dev3[localhost:8080]
    end
    
    subgraph "Version Control"
        Git1[Git]
        Git2[GitHub]
    end
    
    subgraph "Production Environment"
        Prod1[Vercel/Netlify]
        Prod2[Build Process]
        Prod3[CDN Distribution]
    end
    
    subgraph "Database"
        DB1[MongoDB Atlas]
        DB2[Cloud Backup]
    end
    
    subgraph "Monitoring"
        Mon1[Error Tracking]
        Mon2[Analytics]
        Mon3[Performance Monitoring]
    end
    
    Dev1 --> Git1
    Git1 --> Git2
    Git2 --> Prod1
    Prod1 --> Prod2
    Prod2 --> Prod3
    Prod3 --> DB1
    Prod3 --> Mon1
    Prod3 --> Mon2
    Prod3 --> Mon3
```

