// DEMO DATA ONLY. Replace each name and personal record with approved real results.
// Bench and squat are demo single-rep records; row is a demo three-clean-rep load. Each lift ranks independently within its weight class.
// photo is optional: add an image to assets/athletes/ and set photo to its relative path.
const records = [
  {
    sex: "female", division: "Under 120 lb",
    athletes: [
      { name: "Amara Joseph", bench: 115, squat: 175, row: 110, photo: "" },
      { name: "Leah Baptiste", bench: 115, squat: 170, row: 105, photo: "" },
      { name: "Tiana Charles", bench: 115, squat: 165, row: 100, photo: "" },
      { name: "Rhea Singh", bench: 100, squat: 160, row: 95, photo: "" },
      { name: "Nadia Ali", bench: 100, squat: 135, row: 90, photo: "" },
      { name: "Sasha Pierre", bench: 100, squat: 130, row: 85, photo: "" },
      { name: "Imani Williams", bench: 85, squat: 125, row: 80, photo: "" },
      { name: "Keisha Thomas", bench: 85, squat: 120, row: 75, photo: "" },
      { name: "Maya Mohammed", bench: 85, squat: 95, row: 70, photo: "" },
      { name: "Zara Lewis", bench: 70, squat: 90, row: 65, photo: "" },
    ]
  },
  {
    sex: "female", division: "120–154 lb",
    athletes: [
      { name: "Alyssa Grant", bench: 145, squat: 225, row: 140, photo: "" },
      { name: "Danielle Ramdial", bench: 145, squat: 220, row: 135, photo: "" },
      { name: "Anika James", bench: 145, squat: 215, row: 130, photo: "" },
      { name: "Renee Persad", bench: 130, squat: 210, row: 125, photo: "" },
      { name: "Jada Noel", bench: 130, squat: 185, row: 120, photo: "" },
      { name: "Nia Maharaj", bench: 130, squat: 180, row: 115, photo: "" },
      { name: "Kira Brown", bench: 115, squat: 175, row: 110, photo: "" },
      { name: "Soraya Khan", bench: 115, squat: 170, row: 105, photo: "" },
      { name: "Talia Smith", bench: 115, squat: 145, row: 100, photo: "" },
      { name: "Shanice Edwards", bench: 100, squat: 140, row: 95, photo: "" },
    ]
  },
  {
    sex: "female", division: "155–187 lb",
    athletes: [
      { name: "Kayla Francis", bench: 170, squat: 265, row: 165, photo: "" },
      { name: "Asha Roberts", bench: 170, squat: 260, row: 160, photo: "" },
      { name: "Melina George", bench: 170, squat: 255, row: 155, photo: "" },
      { name: "Trisha Daniel", bench: 155, squat: 250, row: 150, photo: "" },
      { name: "Neela Clarke", bench: 155, squat: 225, row: 145, photo: "" },
      { name: "Arielle John", bench: 155, squat: 220, row: 140, photo: "" },
      { name: "Simone Fraser", bench: 140, squat: 215, row: 135, photo: "" },
      { name: "Priya Bissoon", bench: 140, squat: 210, row: 130, photo: "" },
      { name: "Nadine Henry", bench: 140, squat: 185, row: 125, photo: "" },
      { name: "Janelle Martin", bench: 125, squat: 180, row: 120, photo: "" },
    ]
  },
  {
    sex: "female", division: "188 lb+",
    athletes: [
      { name: "Kelsey Carter", bench: 190, squat: 295, row: 185, photo: "" },
      { name: "Farah Hosein", bench: 190, squat: 290, row: 180, photo: "" },
      { name: "Bianca Roberts", bench: 190, squat: 285, row: 175, photo: "" },
      { name: "Camille Davis", bench: 175, squat: 280, row: 170, photo: "" },
      { name: "Alana Cooper", bench: 175, squat: 255, row: 165, photo: "" },
      { name: "Tamika Wilson", bench: 175, squat: 250, row: 160, photo: "" },
      { name: "Selena Joseph", bench: 160, squat: 245, row: 155, photo: "" },
      { name: "Rochelle Ellis", bench: 160, squat: 240, row: 150, photo: "" },
      { name: "Marissa Alfred", bench: 160, squat: 215, row: 145, photo: "" },
      { name: "Tara Alexander", bench: 145, squat: 210, row: 140, photo: "" },
    ]
  },
  {
    sex: "male", division: "Under 150 lb",
    athletes: [
      { name: "Akeem Peters", bench: 205, squat: 315, row: 205, photo: "" },
      { name: "Devin James", bench: 205, squat: 310, row: 200, photo: "" },
      { name: "Dario Singh", bench: 205, squat: 305, row: 195, photo: "" },
      { name: "Andre Pierre", bench: 190, squat: 300, row: 190, photo: "" },
      { name: "Malik Joseph", bench: 190, squat: 275, row: 185, photo: "" },
      { name: "Nathaniel Charles", bench: 190, squat: 270, row: 180, photo: "" },
      { name: "Kareem Mohammed", bench: 175, squat: 265, row: 175, photo: "" },
      { name: "Aaron Ali", bench: 175, squat: 260, row: 170, photo: "" },
      { name: "Jayden Williams", bench: 175, squat: 235, row: 165, photo: "" },
      { name: "Micah Thomas", bench: 160, squat: 230, row: 160, photo: "" },
    ]
  },
  {
    sex: "male", division: "150–187 lb",
    athletes: [
      { name: "Isaiah Baptiste", bench: 255, squat: 395, row: 250, photo: "" },
      { name: "Adrian Grant", bench: 255, squat: 390, row: 245, photo: "" },
      { name: "Ryan Persad", bench: 255, squat: 385, row: 240, photo: "" },
      { name: "Denzel Brown", bench: 240, squat: 380, row: 235, photo: "" },
      { name: "Ethan Maharaj", bench: 240, squat: 355, row: 230, photo: "" },
      { name: "Kyle Lewis", bench: 240, squat: 350, row: 225, photo: "" },
      { name: "Jason Noel", bench: 225, squat: 345, row: 220, photo: "" },
      { name: "Damian Roberts", bench: 225, squat: 340, row: 215, photo: "" },
      { name: "Jamal Edwards", bench: 225, squat: 315, row: 210, photo: "" },
      { name: "Shane Khan", bench: 210, squat: 310, row: 205, photo: "" },
    ]
  },
  {
    sex: "male", division: "188–220 lb",
    athletes: [
      { name: "Marcus Francis", bench: 305, squat: 465, row: 300, photo: "" },
      { name: "Jared Daniel", bench: 305, squat: 460, row: 295, photo: "" },
      { name: "Omar Clarke", bench: 305, squat: 455, row: 290, photo: "" },
      { name: "Jerome George", bench: 290, squat: 450, row: 285, photo: "" },
      { name: "Stefan Henry", bench: 290, squat: 425, row: 280, photo: "" },
      { name: "Niko Martin", bench: 290, squat: 420, row: 275, photo: "" },
      { name: "Caleb Hosein", bench: 275, squat: 415, row: 270, photo: "" },
      { name: "Reese Carter", bench: 275, squat: 410, row: 265, photo: "" },
      { name: "Tristan John", bench: 275, squat: 385, row: 260, photo: "" },
      { name: "Ravi Bissoon", bench: 260, squat: 380, row: 255, photo: "" },
    ]
  },
  {
    sex: "male", division: "221 lb+",
    athletes: [
      { name: "Joel Benjamin", bench: 340, squat: 525, row: 335, photo: "" },
      { name: "Dylan Alfred", bench: 340, squat: 520, row: 330, photo: "" },
      { name: "Brandon Ellis", bench: 340, squat: 515, row: 325, photo: "" },
      { name: "Cory Alexander", bench: 325, squat: 510, row: 320, photo: "" },
      { name: "Marlon Wilson", bench: 325, squat: 485, row: 315, photo: "" },
      { name: "Xavier Davis", bench: 325, squat: 480, row: 310, photo: "" },
      { name: "Leon Cooper", bench: 310, squat: 475, row: 305, photo: "" },
      { name: "Tyrell Smith", bench: 310, squat: 470, row: 300, photo: "" },
      { name: "Dante Ramdial", bench: 310, squat: 445, row: 295, photo: "" },
      { name: "Justin Fraser", bench: 295, squat: 440, row: 290, photo: "" },
    ]
  },
];

