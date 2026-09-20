# Graph Report - .  (2026-07-08)

## Corpus Check
- Corpus is ~32,165 words - fits in a single context window. You may not need a graph.

## Summary
- 720 nodes · 1152 edges · 71 communities (52 shown, 19 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 128 edges (avg confidence: 0.53)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Frontend Pages and UI Components|Frontend Pages and UI Components]]
- [[_COMMUNITY_Backend Accounts Authentication|Backend Accounts Authentication]]
- [[_COMMUNITY_Frontend Package Dependencies|Frontend Package Dependencies]]
- [[_COMMUNITY_Frontend Layout and Sidebar|Frontend Layout and Sidebar]]
- [[_COMMUNITY_Backend Loan Product Management|Backend Loan Product Management]]
- [[_COMMUNITY_Backend Amortization Tests|Backend Amortization Tests]]
- [[_COMMUNITY_Frontend User Navigation and Auth|Frontend User Navigation and Auth]]
- [[_COMMUNITY_Graphify Skill Documentation|Graphify Skill Documentation]]
- [[_COMMUNITY_Frontend Layout and Toast|Frontend Layout and Toast]]
- [[_COMMUNITY_Frontend Package Configuration|Frontend Package Configuration]]
- [[_COMMUNITY_Frontend TypeScript Configuration|Frontend TypeScript Configuration]]
- [[_COMMUNITY_Frontend UI Component Library|Frontend UI Component Library]]
- [[_COMMUNITY_Backend Amortization Serializers|Backend Amortization Serializers]]
- [[_COMMUNITY_Project Documentation|Project Documentation]]
- [[_COMMUNITY_Backend Amortization API Tests|Backend Amortization API Tests]]
- [[_COMMUNITY_Frontend Menu Components|Frontend Menu Components]]
- [[_COMMUNITY_Backend Amortization Service Core|Backend Amortization Service Core]]
- [[_COMMUNITY_Backend Amortization API Views|Backend Amortization API Views]]
- [[_COMMUNITY_Frontend Carousel Components|Frontend Carousel Components]]
- [[_COMMUNITY_Frontend Chart Components|Frontend Chart Components]]
- [[_COMMUNITY_Graphify Export Documentation|Graphify Export Documentation]]
- [[_COMMUNITY_Frontend Dialog Components|Frontend Dialog Components]]
- [[_COMMUNITY_Docker Configuration|Docker Configuration]]
- [[_COMMUNITY_Backend Requirements|Backend Requirements]]
- [[_COMMUNITY_Frontend Public Assets|Frontend Public Assets]]
- [[_COMMUNITY_Backend Configuration|Backend Configuration]]
- [[_COMMUNITY_Frontend Configuration|Frontend Configuration]]
- [[_COMMUNITY_Backend URL Configuration|Backend URL Configuration]]
- [[_COMMUNITY_Backend Settings|Backend Settings]]
- [[_COMMUNITY_Frontend Middleware|Frontend Middleware]]
- [[_COMMUNITY_Backend Celery Configuration|Backend Celery Configuration]]
- [[_COMMUNITY_Backend CORS Configuration|Backend CORS Configuration]]
- [[_COMMUNITY_Backend Database Configuration|Backend Database Configuration]]
- [[_COMMUNITY_Backend API Configuration|Backend API Configuration]]
- [[_COMMUNITY_Frontend Environment Configuration|Frontend Environment Configuration]]
- [[_COMMUNITY_Backend Authentication Configuration|Backend Authentication Configuration]]
- [[_COMMUNITY_Backend Logging Configuration|Backend Logging Configuration]]
- [[_COMMUNITY_Backend Security Configuration|Backend Security Configuration]]
- [[_COMMUNITY_Backend Templates Configuration|Backend Templates Configuration]]
- [[_COMMUNITY_Backend WSGI Configuration|Backend WSGI Configuration]]
- [[_COMMUNITY_Frontend Next Configuration|Frontend Next Configuration]]
- [[_COMMUNITY_Frontend PostCSS Configuration|Frontend PostCSS Configuration]]
- [[_COMMUNITY_Frontend Tailwind Configuration|Frontend Tailwind Configuration]]
- [[_COMMUNITY_Frontend ESLint Configuration|Frontend ESLint Configuration]]
- [[_COMMUNITY_Frontend Git Configuration|Frontend Git Configuration]]
- [[_COMMUNITY_Backend Git Configuration|Backend Git Configuration]]
- [[_COMMUNITY_Docker Git Configuration|Docker Git Configuration]]
- [[_COMMUNITY_Frontend Build Configuration|Frontend Build Configuration]]
- [[_COMMUNITY_Backend Build Configuration|Backend Build Configuration]]
- [[_COMMUNITY_Docker Build Configuration|Docker Build Configuration]]
- [[_COMMUNITY_Project Build Configuration|Project Build Configuration]]
- [[_COMMUNITY_Frontend Test Configuration|Frontend Test Configuration]]
- [[_COMMUNITY_Backend Test Configuration|Backend Test Configuration]]
- [[_COMMUNITY_Project Test Configuration|Project Test Configuration]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 47 edges
2. `User` - 23 edges
3. `UserProfile` - 23 edges
4. `TestAmortizationService` - 22 edges
5. `compilerOptions` - 19 edges
6. `LoanParameters` - 18 edges
7. `TestAmortizationEndpoint` - 17 edges
8. `EmailVerification` - 16 edges
9. `PhoneVerification` - 16 edges
10. `CustomTokenObtainPairView` - 15 edges

## Surprising Connections (you probably didn't know these)
- `LoanAmortizationInputSerializer` --uses--> `AmortizationSchedule`  [INFERRED]
  backend/apps/amortization/serializers.py → backend/apps/amortization/services.py
- `LoanAmortizationInputSerializer` --uses--> `AmortizationTerm`  [INFERRED]
  backend/apps/amortization/serializers.py → backend/apps/amortization/services.py
- `AmortizationScheduleView` --uses--> `AmortizationScheduleSerializer`  [INFERRED]
  backend/apps/amortization/views.py → backend/apps/amortization/serializers.py
- `TestAmortizationEndpoint` --uses--> `LoanParameters`  [INFERRED]
  backend/apps/amortization/tests.py → backend/apps/amortization/services.py
- `AmortizationScheduleView` --uses--> `LoanParameters`  [INFERRED]
  backend/apps/amortization/views.py → backend/apps/amortization/services.py

## Import Cycles
- 1-file cycle: `backend/config/celery.py -> backend/config/celery.py`
- 1-file cycle: `frontend/src/lib/placeholder-images.ts -> frontend/src/lib/placeholder-images.ts`

## Communities (71 total, 19 thin omitted)

### Community 0 - "Frontend Pages and UI Components"
Cohesion: 0.05
Nodes (60): LoginFormValues, loginSchema, loanTerms, loanTypes, loanApplicationsData, days, months, SignupFormValues (+52 more)

### Community 1 - "Backend Accounts Authentication"
Cohesion: 0.07
Nodes (40): AbstractUser, EmailVerificationAdmin, PhoneVerificationAdmin, UserAdmin, UserProfileInline, Command, EmailVerification, PhoneVerification (+32 more)

### Community 2 - "Frontend Package Dependencies"
Cohesion: 0.05
Nodes (44): dependencies, class-variance-authority, clsx, date-fns, dotenv, embla-carousel-react, firebase, genkit (+36 more)

### Community 3 - "Frontend Layout and Sidebar"
Cohesion: 0.07
Nodes (32): checkAuth(), ProtectedLayout(), DashboardLayout(), Separator, Sidebar, SidebarContent, SidebarContext, SidebarFooter (+24 more)

### Community 4 - "Backend Loan Product Management"
Cohesion: 0.16
Nodes (11): APIView, LoanProductAdmin, LoanProduct, LoanProductSerializer, Check that the name is unique (case-insensitive)., LoanProductDetailView, LoanProductListView, Request (+3 more)

### Community 5 - "Backend Amortization Tests"
Cohesion: 0.10
Nodes (10): LoanParameters, LoanValidationError, Raised when loan parameters fail business-rule validation., Immutable value object holding the raw inputs from the user., Interest in each term should be ≤ the previous term (declining balance)., Principal component in each term should be ≥ the previous term., Passing 39 instead of 0.39 must be rejected., Term 0 (disbursement) + N payment terms = N+1 rows. (+2 more)

### Community 6 - "Frontend User Navigation and Auth"
Cohesion: 0.10
Nodes (22): Avatar, AvatarFallback, AvatarImage, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem (+14 more)

### Community 7 - "Graphify Skill Documentation"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native AGENTS.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 8 - "Frontend Layout and Toast"
Cohesion: 0.12
Nodes (18): metadata, ApplyPage(), SignupPage(), Toast, ToastClose, ToastDescription, ToastTitle, toastVariants (+10 more)

### Community 9 - "Frontend Package Configuration"
Cohesion: 0.08
Nodes (23): description, devDependencies, autoprefixer, genkit-cli, postcss, tailwindcss, @types/js-cookie, @types/node (+15 more)

### Community 10 - "Frontend TypeScript Configuration"
Cohesion: 0.09
Nodes (22): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+14 more)

### Community 11 - "Frontend UI Component Library"
Cohesion: 0.14
Nodes (12): Checkbox, MenubarShortcut(), Progress, RadioGroup, RadioGroupItem, ScrollArea, ScrollBar, Skeleton() (+4 more)

### Community 12 - "Backend Amortization Serializers"
Cohesion: 0.20
Nodes (14): AmortizationScheduleSerializer, AmortizationSummarySerializer, AmortizationTermSerializer, AmortizationTotalsSerializer, Serializers for the Amortization API.  Input  → LoanAmortizationInputSerializer, Serializes a single amortization term row., Serializes the summary block (remaining amounts)., Serializes the footer totals row. (+6 more)

### Community 13 - "Project Documentation"
Cohesion: 0.12
Nodes (16): Author: Zed Paala, Backend, Backend Development, Development, DevOps & Tools, Django NextJS Docker - Loan Management System(LMS), Docker Services, Frontend (+8 more)

### Community 14 - "Backend Amortization API Tests"
Cohesion: 0.12
Nodes (3): Tests for the Loan Amortization API.  Run with:     python manage.py test amorti, TestAmortizationEndpoint, TestCase

### Community 15 - "Frontend Menu Components"
Cohesion: 0.12
Nodes (10): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarSubContent (+2 more)

### Community 16 - "Backend Amortization Service Core"
Cohesion: 0.24
Nodes (8): AmortizationService, Decimal, Stateless service that computes a full amortization schedule.      Usage::, Entry point.  Validates parameters, runs the amortization engine,         and re, Convert annual interest rate to a monthly periodic rate., Compute the fixed monthly payment using the standard annuity formula., Generate the list of AmortizationTerm rows (term 0 … term n)., Aggregate totals and construct the final AmortizationSchedule.

### Community 17 - "Backend Amortization API Views"
Cohesion: 0.18
Nodes (9): LoanAmortizationInputSerializer, Decimal, Validates and deserializes the POST body for the amortization endpoint.      Fie, URL routing for the amortization app., AmortizationScheduleView, Request, Response, Views for the Amortization API.  Endpoints --------- POST /api/amortization/sche (+1 more)

### Community 18 - "Frontend Carousel Components"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 19 - "Frontend Chart Components"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 20 - "Graphify Export Documentation"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 21 - "Frontend Dialog Components"
Cohesion: 0.22
Nodes (8): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle

### Community 22 - "Docker Configuration"
Cohesion: 0.22
Nodes (8): SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle, sheetVariants

### Community 23 - "Backend Requirements"
Cohesion: 0.29
Nodes (4): AppConfig, AccountsConfig, AmortizationConfig, LoanProductConfig

### Community 24 - "Frontend Public Assets"
Cohesion: 0.29
Nodes (4): IsEmailVerified, IsOwnerOrReadOnly, Custom permission to check if user's email is verified., Custom permission to only allow owners of an object to edit it.

### Community 25 - "Backend Configuration"
Cohesion: 0.29
Nodes (6): DialogContent, DialogDescription, DialogFooter(), DialogHeader(), DialogOverlay, DialogTitle

### Community 26 - "Frontend Configuration"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 27 - "Backend URL Configuration"
Cohesion: 0.47
Nodes (5): custom_exception_handler(), _get_error_code(), _get_error_message(), Custom exception handler for consistent error responses., Custom exception handler that returns a consistent error response format:     {

### Community 28 - "Backend Settings"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 29 - "Frontend Middleware"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 30 - "Backend Celery Configuration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native AGENTS.md integration, graphify reference: commit hook and native AGENTS.md integration

### Community 31 - "Backend CORS Configuration"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 33 - "Backend API Configuration"
Cohesion: 0.50
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

### Community 34 - "Frontend Environment Configuration"
Cohesion: 0.67
Nodes (3): buttonVariants, Calendar(), CalendarProps

### Community 35 - "Backend Authentication Configuration"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

## Knowledge Gaps
- **266 isolated node(s):** `Migration`, `Migration`, `Migration`, `Migration`, `Migration` (+261 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Frontend UI Component Library` to `Frontend Pages and UI Components`, `Backend API Configuration`, `Frontend Environment Configuration`, `Frontend Layout and Sidebar`, `Backend Authentication Configuration`, `Frontend User Navigation and Auth`, `Frontend Menu Components`, `Frontend Carousel Components`, `Frontend Chart Components`, `Frontend Dialog Components`, `Docker Configuration`, `Backend Configuration`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `AmortizationScheduleView` connect `Backend Amortization API Views` to `Backend Amortization Service Core`, `Backend Amortization Tests`, `Backend Loan Product Management`, `Backend Amortization Serializers`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Frontend Package Dependencies` to `Frontend Package Configuration`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Are the 17 inferred relationships involving `User` (e.g. with `EmailVerificationAdmin` and `PhoneVerificationAdmin`) actually correct?**
  _`User` has 17 INFERRED edges - model-reasoned connections that need verification._
- **Are the 17 inferred relationships involving `UserProfile` (e.g. with `EmailVerificationAdmin` and `PhoneVerificationAdmin`) actually correct?**
  _`UserProfile` has 17 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `TestAmortizationService` (e.g. with `AmortizationService` and `LoanParameters`) actually correct?**
  _`TestAmortizationService` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Migration`, `Migration`, `Migration` to the rest of the system?**
  _306 weakly-connected nodes found - possible documentation gaps or missing edges._