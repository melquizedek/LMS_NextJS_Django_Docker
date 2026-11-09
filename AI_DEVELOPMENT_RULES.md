# AI Development Rules

These rules apply to all code you write, modify, or review in this project. The human developer directs the work and reviews your output. Your job is to produce code that is easy to read, verify, and debug, not code that is merely clever or compact.

---

## 1. Working With the Developer

The developer's time goes to reading, reviewing, testing, and directing, so make those activities cheap.

- Keep changes small and focused. One task per change, with no unrelated refactors mixed in.
- Use clear names and plain constructs. Add a short comment only where the *why* is not obvious from the code.
- After making a change, summarize what you changed, how to test it, and anything you did not verify.
- When fixing a bug, first identify the cause or reproduce the failure. Do not guess at fixes.
- Write tests for new behavior, or tell the developer which tests are needed if you cannot run them.
- If a requirement is ambiguous, ask one focused question. If you proceed anyway, state your assumptions up front.

## 2. Fundamentals and Structure

Fundamentals (loops, functions, conditionals, data types) are used correctly and simply. Structure is what lets the developer steer you, so make it visible.

- Prefer straightforward constructs over obscure language tricks. The developer must be able to understand every line you write.
- For any non-trivial task, outline the plan first: which files, functions, and interfaces will be involved. Wait for approval if the change is large.
- Follow the existing project structure and conventions before proposing new ones.

## 3. Program Flow

Make the three flows of the program explicit and correct.

**Control flow**
- Make the execution sequence obvious. Avoid deeply nested conditionals; use early returns or small helper functions instead.
- Use `try/catch` (or the language equivalent) around operations that can fail, and keep the guarded block small.

**Data flow**
- Trace data end to end: user input → validation → API → database → response → UI.
- When adding a feature, verify each hop is connected. Name any hop you could not check.

**Error flow**
- For every operation that can fail (network calls, file access, parsing, user input), decide what happens on failure.
- Validate input at the boundary. Return or display clear error messages. Never swallow errors silently.
- Handle the failure cases, not only the happy path: timeouts, empty responses, invalid input, missing records.

## 4. Variables and Data

**Scope**
- Declare variables in the narrowest scope that works. Avoid globals.
- Keep the boundaries of what each function can access clear, to prevent scope-related bugs.

**Inputs and outputs**
- Give every function explicit parameters and a defined return value. Use type hints or annotations where the language supports them.
- Do not rely on hidden inputs such as global state or environment values unless they are documented.
- Make sure each function's inputs and outputs match the requirement it serves.

**State**
- Identify what state exists, where it lives, and what changes it.
- When state changes, update every component that depends on it. Prefer a single source of truth over duplicated state.

## 5. Structure and Architecture

**Abstraction**
- Hide complex logic behind simple, well-named interfaces so that other developers can use a module without reading its internals.

**Modularity**
- Give each file and function a single responsibility.
- Split a file when it starts doing more than one job.

**Architecture**
- Respect the separation between frontend, backend, and database. Before writing code, decide which layer owns the logic.
  - Frontend: presentation and user interaction.
  - Backend: business logic, validation, and authorization.
  - Database: storage and queries.
- Do not put business logic in the UI or database queries in the presentation layer.

## 6. Execution and Environment

**Side effects**
- Separate pure functions (same input, same output, no external changes) from operations that change external state (writing files, calling APIs, updating a database, mutating shared data).
- Keep side effects at the edges of the program and the core logic pure and easy to test.
- Name functions so it is clear when they have side effects.

**Request-response cycle**
- When building endpoints, think through the full HTTP cycle: the request (method, headers, body), validation, processing, and the response (status code, body, errors).
- Use correct status codes and a consistent response format.

**Concurrency**
- Watch for timing problems whenever code runs concurrently: async calls, background jobs, multiple users, shared resources.
- Do not assume operations complete in the order they started.
- Flag any race condition or timing risk to the developer explicitly, because these bugs are hard to catch in review and need human attention.

---

## 7. Testing and Quality Verification

Code is not done when it is written. It is done when it has been tested and scanned. Run these steps after every implementation, and report the real results.

### Test the change

1. **Build and lint.** Confirm the project compiles and passes the configured linter and formatter.
2. **Run the existing test suite.** Make sure the change did not break anything that worked before.
3. **Run the tests for the new code.** Every new behavior and every bug fix needs at least one test. Cover the normal case, edge cases (empty, null, boundary values), and the failure paths from Section 3.
4. **Check the behavior directly when tests are not enough.** For endpoints, UI changes, or integrations, exercise the feature by hand or with a script and note what you did.
5. **Fix failures at the cause.** Do not delete, skip, or weaken a test to make it pass. If a test is wrong, explain why before changing it.

### Scan with SonarQube

After the tests pass, run a SonarQube analysis on the changed code.

1. **Use the project's configured scan.** Prefer the existing `sonar-project.properties`, build plugin task, or CI script. If none exists, ask the developer before inventing one. A typical command looks like this:
   ```bash
   sonar-scanner \
     -Dsonar.host.url="$SONAR_HOST_URL" \
     -Dsonar.token="$SONAR_TOKEN"
   ```
2. **Generate coverage first** if the project sends coverage reports to SonarQube, so the scan reflects the tests you just ran.
3. **Check the quality gate result**, with attention to the new code in particular. Review all of these:
  - Bugs
  - Vulnerabilities
  - Security hotspots (each one needs a decision, not just a glance)
  - Code smells
  - Coverage on new code
  - Duplication on new code
4. **Fix every issue your change introduced.** Fix existing issues in files you touched only if the fix is small and safe. Otherwise, mention them to the developer and leave them alone.
5. **Re-run the scan** after fixes until the quality gate passes.
6. **Do not suppress findings to get a green result.** Do not use `// NOSONAR`, exclusion patterns, or lowered thresholds unless the developer approves, and explain the reason when you ask.

### Credentials and access

- Read the server URL and token from environment variables or the project's secret store. Never hardcode a token or commit it to a file.
- If you cannot run the scan (no server access, missing token, no scanner installed), say so clearly. Give the exact command the developer should run, and do not report the quality gate as passed.

### Reporting

Include a short verification summary in your final message:

- Which tests you ran, and the pass/fail counts.
- Whether the SonarQube quality gate passed, and any remaining issues with their severity.
- Anything you could not run or verify, and why.

Never say tests or scans passed unless you actually ran them and saw the result.

---

## Before You Finish

Check each item before reporting that the work is done:

- [ ] The change is small, focused, and follows existing conventions.
- [ ] Inputs and outputs of every new function are explicit.
- [ ] Failure cases are handled, not only the happy path.
- [ ] Side effects are isolated from core logic.
- [ ] Any concurrency or timing risk has been flagged.
- [ ] Build and lint pass, and the existing test suite still passes.
- [ ] New tests cover the new behavior, including edge cases and failure paths.
- [ ] A SonarQube scan was run, and the quality gate passes with no new issues from this change (or the reason it could not run is stated).
- [ ] No tests were skipped and no findings were suppressed without approval.
- [ ] You have told the developer what changed, how to test it, what the test and scan results were, and what you did not verify.
