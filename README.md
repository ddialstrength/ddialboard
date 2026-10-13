# D’Dial leaderboard design preview

Open `index.html` in a browser. This preview contains 10 slides: four women’s weight classes, four men’s weight classes, and a Strength Board summary for each sex. Each weight-class slide has separate Bench Press, Squat, and Chest-Supported Row tables, with the top four for each exercise. Each summary shows one leader from each weight class per exercise. It runs from local files without a server. Pause and use the arrows at the bottom right to inspect each slide.

## Update the demo athletes

Edit `assets/records.js`. Each division has ten `athletes`. For each athlete, edit `name`, `bench`, `squat`, and `row`. All loads are in **pounds**. Bench and squat are single-rep records. Row is the heaviest load completed for **three clean reps** on the same chest-supported row machine, with the same setup and a controlled return on every rep. The browser ranks each exercise independently within its weight class, shows the top four, and picks each class leader for the Strength Board. Equal loads are ordered alphabetically by name; decide a competition tie-break rule before using real results. No combined total is calculated.

The old optional `photo` fields remain in the data for future use but are not displayed in these tables. The row numbers are new fictional sample loads, not converted deadlift records. Replace the demo names and all numbers with checked results before any public deployment. The visible `DEMO DATA` label marks this version as a preview.

The weight class labels are editable in the same file. For this preview they use round pound boundaries: women under 120, 120–154, 155–187, 188+; men under 150, 150–187, 188–220, 221+. Confirm class boundaries before using real results.

The arena background, logo, clock, female pink glow, and male blue glow remain. All three tables use the same silver metallic styling; the first-place row uses restrained gold text. The prior podium artwork is retained in `assets/` but is not used by the new table layout.

