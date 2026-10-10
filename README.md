# D’Dial Fitness Club — Record Board

Responsive static website for displaying gym records on phones, tablets, laptops, PCs and 32–64" TVs.

## Display sequence
1. Overview screen: shows all weight divisions and the current record holders for Bench Press, Squat and Deadlift.
2. After 30 seconds, the board slides into Female divisions, one division per slide.
3. It then cycles through Male divisions, one division per slide.
4. The loop returns to the overview and repeats automatically.

## Editing the records
Open `assets/records.js` and edit the `records` array. Each row contains:
- `sex`: `female` or `male`
- `division`: weight class label
- `limit`: numeric upper limit for sorting
- `bench`, `squat`, `deadlift`: `{ name, weight, date }`

The current entries are sample/demo records so the layout can be previewed immediately.

## Running
This is a plain static site. Open `index.html` directly or serve the folder from any web server.

For a TV, open the site in the browser and use **Fullscreen**. Auto-rotation runs every 30 seconds.
