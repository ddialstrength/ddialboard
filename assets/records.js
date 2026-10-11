// DEMO DATA ONLY. Replace each name and personal record with approved real results.
// Each athlete has one best lift in pounds per exercise. Total and ranks are calculated in app.js.
// photo is optional: add an image to assets/athletes/ and set photo to its relative path.
const records = [
  {
    sex: "female", division: "Under 120 lb",
    athletes: [
      { name: "Amara Joseph", bench: 115, squat: 175, deadlift: 215, photo: "" },
      { name: "Leah Baptiste", bench: 115, squat: 170, deadlift: 210, photo: "" },
      { name: "Tiana Charles", bench: 115, squat: 165, deadlift: 190, photo: "" },
      { name: "Rhea Singh", bench: 100, squat: 160, deadlift: 185, photo: "" },
      { name: "Nadia Ali", bench: 100, squat: 135, deadlift: 180, photo: "" },
      { name: "Sasha Pierre", bench: 100, squat: 130, deadlift: 160, photo: "" },
      { name: "Imani Williams", bench: 85, squat: 125, deadlift: 155, photo: "" },
      { name: "Keisha Thomas", bench: 85, squat: 120, deadlift: 150, photo: "" },
      { name: "Maya Mohammed", bench: 85, squat: 95, deadlift: 130, photo: "" },
      { name: "Zara Lewis", bench: 70, squat: 90, deadlift: 125, photo: "" },
    ]
  },
  {
    sex: "female", division: "120–154 lb",
    athletes: [
      { name: "Alyssa Grant", bench: 145, squat: 225, deadlift: 270, photo: "" },
      { name: "Danielle Ramdial", bench: 145, squat: 220, deadlift: 265, photo: "" },
      { name: "Anika James", bench: 145, squat: 215, deadlift: 245, photo: "" },
      { name: "Renee Persad", bench: 130, squat: 210, deadlift: 240, photo: "" },
      { name: "Jada Noel", bench: 130, squat: 185, deadlift: 235, photo: "" },
      { name: "Nia Maharaj", bench: 130, squat: 180, deadlift: 215, photo: "" },
      { name: "Kira Brown", bench: 115, squat: 175, deadlift: 210, photo: "" },
      { name: "Soraya Khan", bench: 115, squat: 170, deadlift: 205, photo: "" },
      { name: "Talia Smith", bench: 115, squat: 145, deadlift: 185, photo: "" },
      { name: "Shanice Edwards", bench: 100, squat: 140, deadlift: 180, photo: "" },
    ]
  },
  {
    sex: "female", division: "155–187 lb",
    athletes: [
      { name: "Kayla Francis", bench: 170, squat: 265, deadlift: 315, photo: "" },
      { name: "Asha Roberts", bench: 170, squat: 260, deadlift: 310, photo: "" },
      { name: "Melina George", bench: 170, squat: 255, deadlift: 290, photo: "" },
      { name: "Trisha Daniel", bench: 155, squat: 250, deadlift: 285, photo: "" },
      { name: "Neela Clarke", bench: 155, squat: 225, deadlift: 280, photo: "" },
      { name: "Arielle John", bench: 155, squat: 220, deadlift: 260, photo: "" },
      { name: "Simone Fraser", bench: 140, squat: 215, deadlift: 255, photo: "" },
      { name: "Priya Bissoon", bench: 140, squat: 210, deadlift: 250, photo: "" },
      { name: "Nadine Henry", bench: 140, squat: 185, deadlift: 230, photo: "" },
      { name: "Janelle Martin", bench: 125, squat: 180, deadlift: 225, photo: "" },
    ]
  },
  {
    sex: "female", division: "188 lb+",
    athletes: [
      { name: "Kelsey Carter", bench: 190, squat: 295, deadlift: 350, photo: "" },
      { name: "Farah Hosein", bench: 190, squat: 290, deadlift: 345, photo: "" },
      { name: "Bianca Roberts", bench: 190, squat: 285, deadlift: 325, photo: "" },
      { name: "Camille Davis", bench: 175, squat: 280, deadlift: 320, photo: "" },
      { name: "Alana Cooper", bench: 175, squat: 255, deadlift: 315, photo: "" },
      { name: "Tamika Wilson", bench: 175, squat: 250, deadlift: 295, photo: "" },
      { name: "Selena Joseph", bench: 160, squat: 245, deadlift: 290, photo: "" },
      { name: "Rochelle Ellis", bench: 160, squat: 240, deadlift: 285, photo: "" },
      { name: "Marissa Alfred", bench: 160, squat: 215, deadlift: 265, photo: "" },
      { name: "Tara Alexander", bench: 145, squat: 210, deadlift: 260, photo: "" },
    ]
  },
  {
    sex: "male", division: "Under 150 lb",
    athletes: [
      { name: "Akeem Peters", bench: 205, squat: 315, deadlift: 370, photo: "" },
      { name: "Devin James", bench: 205, squat: 310, deadlift: 365, photo: "" },
      { name: "Dario Singh", bench: 205, squat: 305, deadlift: 345, photo: "" },
      { name: "Andre Pierre", bench: 190, squat: 300, deadlift: 340, photo: "" },
      { name: "Malik Joseph", bench: 190, squat: 275, deadlift: 335, photo: "" },
      { name: "Nathaniel Charles", bench: 190, squat: 270, deadlift: 315, photo: "" },
      { name: "Kareem Mohammed", bench: 175, squat: 265, deadlift: 310, photo: "" },
      { name: "Aaron Ali", bench: 175, squat: 260, deadlift: 305, photo: "" },
      { name: "Jayden Williams", bench: 175, squat: 235, deadlift: 285, photo: "" },
      { name: "Micah Thomas", bench: 160, squat: 230, deadlift: 280, photo: "" },
    ]
  },
  {
    sex: "male", division: "150–187 lb",
    athletes: [
      { name: "Isaiah Baptiste", bench: 255, squat: 395, deadlift: 460, photo: "" },
      { name: "Adrian Grant", bench: 255, squat: 390, deadlift: 455, photo: "" },
      { name: "Ryan Persad", bench: 255, squat: 385, deadlift: 435, photo: "" },
      { name: "Denzel Brown", bench: 240, squat: 380, deadlift: 430, photo: "" },
      { name: "Ethan Maharaj", bench: 240, squat: 355, deadlift: 425, photo: "" },
      { name: "Kyle Lewis", bench: 240, squat: 350, deadlift: 405, photo: "" },
      { name: "Jason Noel", bench: 225, squat: 345, deadlift: 400, photo: "" },
      { name: "Damian Roberts", bench: 225, squat: 340, deadlift: 395, photo: "" },
      { name: "Jamal Edwards", bench: 225, squat: 315, deadlift: 375, photo: "" },
      { name: "Shane Khan", bench: 210, squat: 310, deadlift: 370, photo: "" },
    ]
  },
  {
    sex: "male", division: "188–220 lb",
    athletes: [
      { name: "Marcus Francis", bench: 305, squat: 465, deadlift: 540, photo: "" },
      { name: "Jared Daniel", bench: 305, squat: 460, deadlift: 535, photo: "" },
      { name: "Omar Clarke", bench: 305, squat: 455, deadlift: 515, photo: "" },
      { name: "Jerome George", bench: 290, squat: 450, deadlift: 510, photo: "" },
      { name: "Stefan Henry", bench: 290, squat: 425, deadlift: 505, photo: "" },
      { name: "Niko Martin", bench: 290, squat: 420, deadlift: 485, photo: "" },
      { name: "Caleb Hosein", bench: 275, squat: 415, deadlift: 480, photo: "" },
      { name: "Reese Carter", bench: 275, squat: 410, deadlift: 475, photo: "" },
      { name: "Tristan John", bench: 275, squat: 385, deadlift: 455, photo: "" },
      { name: "Ravi Bissoon", bench: 260, squat: 380, deadlift: 450, photo: "" },
    ]
  },
  {
    sex: "male", division: "221 lb+",
    athletes: [
      { name: "Joel Benjamin", bench: 340, squat: 525, deadlift: 610, photo: "" },
      { name: "Dylan Alfred", bench: 340, squat: 520, deadlift: 605, photo: "" },
      { name: "Brandon Ellis", bench: 340, squat: 515, deadlift: 585, photo: "" },
      { name: "Cory Alexander", bench: 325, squat: 510, deadlift: 580, photo: "" },
      { name: "Marlon Wilson", bench: 325, squat: 485, deadlift: 575, photo: "" },
      { name: "Xavier Davis", bench: 325, squat: 480, deadlift: 555, photo: "" },
      { name: "Leon Cooper", bench: 310, squat: 475, deadlift: 550, photo: "" },
      { name: "Tyrell Smith", bench: 310, squat: 470, deadlift: 545, photo: "" },
      { name: "Dante Ramdial", bench: 310, squat: 445, deadlift: 525, photo: "" },
      { name: "Justin Fraser", bench: 295, squat: 440, deadlift: 520, photo: "" },
    ]
  },
];
