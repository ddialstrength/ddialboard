# D’Dial Strength Board

`index.html` rotates the opening invitation, two information slides, and current results over the arena artwork. The information slides remain visible for 28 seconds each; the invitation and leaderboard slides retain their 20-second rotation. Only weight classes and exercise tables with a verified result appear. The old November 1 announcement remains archived at `teaser.html`.

The ↻ control loads the latest published `assets/records.js` with a fresh URL, rebuilds the slides, and restarts from the invitation without reloading the browser page. Local edits must be deployed to GitHub Pages before this control can show them. It does not reload new CSS or application code.

## Competition process

- The competition is for D’Dial Fitness Club members. Exercises are bench press, squat, and chest-supported row. Divisions are based on sex and bodyweight class.
- A member asks a floor instructor for an official attempt and weighs in without shoes before warming up.
- The member warms up and receives up to three attempts in the official session. Floor instructors supervise, judge, and spot attempts, including technique and safety.
- Verified results are reported to Joel. Joel and Ernesto maintain the public board. Only weight classes and verified competition results are displayed publicly; exact weigh-ins belong in private staff records.
- Attempt frequency is undecided. Specific exercise standards remain under instructor supervision and require written confirmation. Do not publish an unconfirmed repetition or technique requirement as an official rule.

## Updating results

Edit `assets/records.js`. Add a contestant once in the correct division with their confirmed public display name and verified load in `bench`, `squat`, or `row`. Leave an unattempted exercise as `null`. Loads are pounds. The display ranks each exercise independently and shows up to four contestants per division. When at least two weight classes have results for one sex, a Strength Board summary appears for that sex. Keep precise weigh-ins and private participant details outside this public repository and its history. Do not use zero as a placeholder.

Maya Cross-Lovelace is entered in the women’s 155–187 lb division with a 140 lb bench press. Ancir Russell is entered in the men’s 188–220 lb division with a **245 lb** bench press. Their exact weigh-ins are intentionally omitted. Clarify the upper and lower limits for every division before accepting future borderline weigh-ins.
