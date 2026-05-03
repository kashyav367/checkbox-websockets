# checkbox-websockets

A small realtime demo that synchronises a large grid of checkboxes across browsers using WebSockets (`socket.io`). Open the app in multiple tabs to see checkbox state update live for everyone.

## Features
- Real-time checkbox synchronization across connected clients.
- Efficient server-side state for many checkboxes (pre-sized array).
- Simple static client served from the `public/` folder.

## Demo
1. Install dependencies.
2. Start the server and open `http://localhost:3000` in two or more browser tabs.
3. Toggle checkboxes in one tab — they update across all tabs instantly.

## Prerequisites
- Node.js 18 or newer
- A package manager (recommended: `pnpm`, `npm`, or `yarn`)

## Install
From the project root run (uses `pnpm` if available):

```powershell
pnpm install
# or
npm install
```

## Run
Start the server with Node (the server listens on `PORT` or 3000 by default):

```powershell
node server.js
# or with environment variable
$env:PORT=4000; node server.js
```

Then open `http://localhost:3000` in your browser.

Quick health check (server responds with "pong"):

```powershell
curl http://localhost:3000/ping
```

## Project structure
- [server.js](server.js) — Express + Socket.IO server (serves `public/`, holds checkbox state).
- [package.json](package.json) — project metadata and scripts.
- [public/index.html](public/index.html) — client UI.
- [public/index.js](public/index.js) — client-side Socket.IO code.

## How it works (brief)
- The server keeps a single `checkboxes` array representing the current state.
- When a client toggles a checkbox it emits `socket:checked` or `socket:unchecked`.
- The server updates state and broadcasts the change to all clients using Socket.IO.

## Contributing
Feel free to open issues or PRs. Suggestions:
- Add persistence (e.g., save state to a file or DB).
- Add authentication or per-user state.
- Add tests and CI.

## Author
Ankit Singh

## License
This project is provided under the MIT License. Replace or update this section as needed.


