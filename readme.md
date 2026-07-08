# Galactic Spacefarer

The application exposes a CAP OData V4 service and two SAP Fiori UIs:

- `Spacefarer Form Entry`
  Purpose: create and edit a `Spacefarer`
- `Galactic Users`
  Purpose: browse the visible `Spacefarers` and open their details

## Navigation

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Start The Project](#start-the-project)
6. [Unit Tests](#unit-tests)
7. [Database Setup](#database-setup)
8. [Login](#login)
9. [Authorization Behavior](#authorization-behavior)
10. [Available Pages](#available-pages)
11. [Draft Behavior](#draft-behavior)
12. [Email Behavior](#email-behavior)
13. [Service Endpoint](#service-endpoint)
14. [Notes For Reviewers](#notes-for-reviewers)

## Tech Stack

- SAP CAP
- SQLite
- SAP Fiori Elements
- UI5 Tooling
- TypeScript

## Project Structure

| Path                     | Purpose                                   |
| ------------------------ | ----------------------------------------- |
| `db/`                    | CDS domain model and seed data            |
| `srv/`                   | CAP service definitions and runtime logic |
| `app/spacefarer/`        | Form Entry Object Page app                |
| `app/spacefarer-browse/` | List Report / Object Page app             |
| `readme.md`              | Project usage guide                       |

## Prerequisites

- Node.js LTS
- `pnpm`

## Installation

Install dependencies from the project root:

```bash
pnpm install
```

Install dependencies for both UI applications as well:

```bash
cd app/spacefarer
pnpm install
```

```bash
cd app/spacefarer-browse
pnpm install
```

Then return to the project root before starting the CAP server.

## Start The Project

Run the CAP server:

```bash
pnpm watch
```

The application will start on:

```text
http://localhost:4004
```

## Unit Tests

The repository includes a small set of basic unit tests for the CAP service helper logic.

Run them from the project root:

```bash
pnpm test
```

Current test scope:

- default value handling
- input normalization
- position field synchronization
- basic numeric validation rules

## Database Setup

The project uses SQLite for local development.

If you need to recreate the local database, run:

```bash
pnpm deploy-sqlite
```

If the schema has changed and the database gets out of sync, the quickest reset is:

1. Stop the server
2. Delete `db.sqlite`
3. Run `pnpm deploy-sqlite`
4. Start the server again with `pnpm watch`

## Login

Local development uses mocked CAP authentication. You must log in before using the UI.

Available users:

- `earth.user` / `password`
- `mars.user` / `password`

## Authorization Behavior

Access to `Spacefarers` is filtered by the logged-in user's `planet` attribute.

Examples:

- `earth.user` only sees Earth spacefarers
- `mars.user` only sees Mars spacefarers

This is implemented in the CAP service layer for local development and is designed to mirror claim-based filtering in a production setup.

## Available Pages

### 1. Spacefarer Form Entry

URL:

```text
http://localhost:4004/spacefarer/webapp/index.html
```

Description:

- Form Entry Object Page
- Used to create or edit a `Spacefarer`
- Includes draft-friendly handling

### 2. Galactic Users

URL:

```text
http://localhost:4004/spacefarerbrowse/index.html
```

Description:

- List Report + Object Page
- Used to browse the visible `Spacefarers`
- Open a selected user and view their details

## Draft Behavior

The `Spacefarer Form Entry` app intentionally keeps CAP draft behavior enabled for a Fiori-friendly create/edit flow.

What this means:

- The UI can create a draft record first and let the user complete the form step by step
- The initial create request may succeed even when the payload is still incomplete
- Final business validation is expected during later draft editing and activation, not only on the very first draft creation call

This is intentional for the SAP Fiori Elements experience. It avoids blocking the user too early in the object page create flow.

Important for API testing:

- A `POST /Spacefarers` can return `201 Created` because CAP is creating a draft-compatible entry
- This behavior is kept on purpose to support the Fiori app UX
- Review API responses together with draft state and activation behavior, not only the first POST result

## Email Behavior

Creating a `Spacefarer` triggers an onboarding email from the CAP service.

Current implementation notes:

- The project is not wired to a real production mail service
- The current mail logic is still test-oriented and should be treated as demo behavior
- For now, the email feature is included to show integration structure rather than production-ready mail delivery

## Service Endpoint

Main OData service:

```text
http://localhost:4004/odata/v4/galactic/
```

## Notes For Reviewers

- Local authentication is mocked for convenience
- Row-level visibility is driven by the authenticated user's `planet`
- Seed data is provided through CSV files in `db/data/`
- Email sending is currently demo-oriented, not a production-ready real mail integration
- The create/edit UI intentionally uses CAP draft behavior to support the Fiori object page workflow
- The repository contains two separate UIs on purpose:
  one focused on create/edit, one focused on browse/details
