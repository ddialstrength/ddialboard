# D’Dial Strength Board

`index.html` rotates an opening invitation and the current results over the same arena artwork. Only weight classes and exercise tables with a recorded result appear. The old November 1 announcement remains archived at `teaser.html`.

The ↻ control loads the latest published `assets/records.js` with a fresh URL, rebuilds the slides, and restarts from the invitation without reloading the browser page. Local edits must be deployed to GitHub Pages before this control can show them. It does not reload new CSS or application code.

## Updating results

Edit `assets/records.js`. Add a contestant once in the correct division with their name and the verified load in `bench`, `squat`, or `row`. Leave an unattempted exercise as `null`. Loads are pounds. The display ranks each exercise independently and shows up to four contestants per division. When at least two weight classes have results for one sex, a Strength Board summary appears for that sex. Keep precise weigh-ins in staff records, outside this public repository.

Maya Cross-Lovelace is entered in the women’s 155–187 lb division with a 140 lb bench press. Ancir Russell is entered in the men’s 188–220 lb division with a 225 lb bench press. Their exact weigh-ins are intentionally omitted. Clarify the upper and lower limits for every division before accepting future borderline weigh-ins.

Use a consistent staff verification process before posting new records. For the chest-supported row, the board currently labels an attempt as three clean reps; confirm that standard with the trainers before entering a row result. Do not fill missing results with zero.
