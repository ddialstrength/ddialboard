# D’Dial leaderboard design preview

Open `index.html` in a browser. This preview contains 10 slides: four women’s divisions, four men’s divisions, and one exercise leaderboard for each sex. It runs from local files without a server. Pause and use the arrows at the bottom right to inspect each slide.

## Update the demo athletes

Edit `assets/records.js`. Each division has ten `athletes`. For each athlete, edit `name`, `bench`, `squat`, and `deadlift`. All weights are personal records in **pounds**. The browser calculates `total = bench + squat + deadlift`, sorts the division by total, and lists the ten highest lifts for each exercise across that sex’s four divisions. Equal totals or lifts are sorted alphabetically by name.

`photo` is optional. To add a portrait, put a PNG, JPEG, or WebP image in `assets/athletes/` and set `photo: "assets/athletes/filename.jpg"`. Empty photo fields show a silhouette. Replace the demo names and numbers with checked results before any public deployment. The visible `DEMO DATA` label marks this version as a preview.

The weight class labels are editable in the same file. For this preview they use round pound boundaries: women under 120, 120–154, 155–187, 188+; men under 150, 150–187, 188–220, 221+. Confirm class boundaries before using real results.

The background uses the supplied arena image on all ten slides. The first three places use the supplied taller transparent gold, silver, and bronze podium images. Editable portraits (or silhouettes), names, and totals are layered over them. The header logo uses the existing metallic DFC mask.
