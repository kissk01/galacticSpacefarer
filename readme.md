# Galactic Spacefarer

The application exposes a CAP OData V4 service and two SAP Fiori UIs:

- `Spacefarer Form Entry`
  Purpose: create and edit a `Spacefarer`
- `Galactic Users`
  Purpose: browse the visible `Spacefarers` and open their details

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

## Start The Project

Run the CAP server:

```bash
pnpm watch
```

The application will start on:

```text
http://localhost:4004
```

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
- Includes draft handling

### 2. Galactic Users

URL:

```text
http://localhost:4004/spacefarerbrowse/index.html
```

Description:

- List Report + Object Page
- Used to browse the visible `Spacefarers`
- Open a selected user and view their details

## Service Endpoint

Main OData service:

```text
http://localhost:4004/odata/v4/galactic/
```

## Notes For Reviewers

- Local authentication is mocked for convenience
- Row-level visibility is driven by the authenticated user's `planet`
- Seed data is provided through CSV files in `db/data/`
- The repository contains two separate UIs on purpose:
  one focused on create/edit, one focused on browse/details
