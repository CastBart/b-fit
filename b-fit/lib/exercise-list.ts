import {
  Exercise,
  MuscleGroup,
  ExerciseType,
  ExerciseEquipment,
  ExerciseOwnership,
} from "./definitions";
//exercise seed
const exercises: Exercise[] = [
  {
    id: "ex-001",
    owner: ExerciseOwnership.BFit,
    name: "Squat",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings, MuscleGroup.Lower_Back, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand with feet shoulder-width apart, toes slightly out. 2. Place a barbell across your upper back (not on your neck). 3. Brace your core, keep your chest up, and look straight ahead. 4. Initiate the movement by pushing your hips back and bending your knees, as if sitting into a chair. 5. Descend until your thighs are parallel to the floor or deeper if comfortable, ensuring your knees track in line with your toes. 6. Drive through your heels to return to the starting position, squeezing your glutes at the top."
  },
  {
    id: "ex-002",
    owner: ExerciseOwnership.BFit,
    name: "Dumbbell Bench Press",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Front_Delts, MuscleGroup.Triceps],
    type: ExerciseType.Large,
    instructions: "1. Lie on a flat bench with a dumbbell in each hand, palms facing each other or slightly forward. 2. Position the dumbbells at chest height, slightly wider than your shoulders, with elbows bent at about a 90-degree angle. 3. Press the dumbbells upwards in a controlled motion until your arms are fully extended, squeezing your chest at the top. 4. Slowly lower the dumbbells back to the starting position, maintaining control throughout the movement. Avoid letting your elbows go too far below your shoulders."
  },
  {
    id: "ex-003",
    owner: ExerciseOwnership.BFit,
    name: "Pull-Ups",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [MuscleGroup.Biceps, MuscleGroup.Upper_Back, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Grab a pull-up bar with an overhand grip, hands slightly wider than shoulder-width apart. 2. Hang freely, engaging your core and retracting your shoulder blades. 3. Pull your body upwards by driving your elbows down towards your hips, aiming to get your chin over the bar. 4. Slowly lower yourself back to the starting position with control, extending your arms fully."
  },
  {
    id: "ex-004",
    owner: ExerciseOwnership.BFit,
    name: "Deadlift",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Hamstrings,
    auxiliaryMuscles: [MuscleGroup.Lower_Back, MuscleGroup.Glutes, MuscleGroup.Quads, MuscleGroup.Traps],
    type: ExerciseType.Large,
    instructions: "1. Stand with your mid-foot under the barbell, feet hip-width apart. 2. Bend at your knees and hips to grasp the bar with an overhand or mixed grip, hands just outside your shins. 3. Keep your back straight, chest up, and shoulders pulled back. 4. Take a deep breath, brace your core, and lift the weight by extending your hips and knees simultaneously. 5. Keep the bar close to your body as you stand up, finishing with your shoulders back and glutes squeezed. 6. Lower the bar with control by reversing the movement, pushing your hips back first."
  },
  {
    id: "ex-005",
    owner: ExerciseOwnership.BFit,
    name: "Overhead Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [MuscleGroup.Side_Delts, MuscleGroup.Triceps, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand with feet shoulder-width apart, holding a barbell at your upper chest, palms facing forward, hands slightly wider than shoulder-width. 2. Brace your core and keep your glutes squeezed. 3. Press the barbell directly overhead until your arms are fully extended and the bar is balanced over your mid-foot. 4. Slowly lower the barbell back to the starting position with control."
  },
  {
    id: "ex-006",
    owner: ExerciseOwnership.BFit,
    name: "Bent Over Barbell Row",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Upper_Back,
    auxiliaryMuscles: [MuscleGroup.Lats, MuscleGroup.Biceps, MuscleGroup.Lower_Back],
    type: ExerciseType.Large,
    instructions: "1. Stand with a barbell in front of you, feet shoulder-width apart. 2. Hinge at your hips, keeping a slight bend in your knees and your back straight, until your torso is almost parallel to the floor. 3. Grab the barbell with an overhand grip, slightly wider than shoulder-width. 4. Pull the barbell towards your lower chest/upper abdomen, squeezing your shoulder blades together. 5. Slowly lower the barbell back to the starting position with control."
  },
  {
    id: "ex-007",
    owner: ExerciseOwnership.BFit,
    name: "Dumbbell Lunges",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings],
    type: ExerciseType.Medium,
    instructions: "1. Stand tall with a dumbbell in each hand, arms relaxed at your sides. 2. Take a large step forward with one leg, lowering your hips until both knees are bent at approximately a 90-degree angle. Ensure your front knee is directly over your ankle and your back knee hovers just above the floor. 3. Push off with your front foot to return to the starting position. 4. Alternate legs or complete all reps on one leg before switching."
  },
  {
    id: "ex-008",
    owner: ExerciseOwnership.BFit,
    name: "Leg Press",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings],
    type: ExerciseType.Large,
    instructions: "1. Sit on the leg press machine with your back firmly against the pad. 2. Place your feet shoulder-width apart on the platform, knees bent at a 90-degree angle. 3. Release the safety catches. 4. Push the platform away from you by extending your knees and hips, without fully locking out your knees. 5. Slowly lower the platform back to the starting position, maintaining control. Ensure your lower back remains pressed against the pad."
  },
  {
    id: "ex-009",
    owner: ExerciseOwnership.BFit,
    name: "Lat Pulldown",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [MuscleGroup.Biceps, MuscleGroup.Upper_Back],
    type: ExerciseType.Medium,
    instructions: "1. Sit at the lat pulldown machine, adjusting the thigh pad to secure your legs. 2. Grasp the bar with a wide overhand grip, hands slightly wider than shoulder-width. 3. Lean back slightly (about 10-20 degrees), keep your chest up, and engage your core. 4. Pull the bar down towards your upper chest by squeezing your shoulder blades together and driving your elbows down. 5. Slowly release the bar back up to the starting position, allowing your lats to stretch fully."
  },
  {
    id: "ex-010",
    owner: ExerciseOwnership.BFit,
    name: "Dips",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [MuscleGroup.Chest, MuscleGroup.Front_Delts],
    type: ExerciseType.Medium,
    instructions: "1. Grasp parallel bars with an overhand grip, arms fully extended, supporting your body weight. 2. Keep your chest up and shoulders down. 3. Slowly lower your body by bending your elbows, allowing your torso to lean slightly forward if targeting chest, or keep it more upright for triceps focus. 4. Descend until your shoulders are below your elbows (or as deep as comfortable). 5. Push through your hands to return to the starting position, fully extending your arms."
  },
  {
    id: "ex-011",
    owner: ExerciseOwnership.BFit,
    name: "Bicep Curls",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand or sit with a dumbbell in each hand, arms extended down, palms facing forward. 2. Keep your elbows close to your body and your upper arms stationary. 3. Curl the dumbbells upwards towards your shoulders, squeezing your biceps at the top. 4. Slowly lower the dumbbells back to the starting position with control."
  },
  {
    id: "ex-012",
    owner: ExerciseOwnership.BFit,
    name: "Bicep Curls",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand with a barbell held with an underhand grip, hands shoulder-width apart, arms extended down. 2. Keep your elbows close to your body and your upper arms stationary. 3. Curl the barbell upwards towards your chest, squeezing your biceps at the top. 4. Slowly lower the barbell back to the starting position with control."
  },
  {
    id: "ex-013",
    owner: ExerciseOwnership.BFit,
    name: "Bicep Curls",
    equipment: ExerciseEquipment.EzBar,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand with an EZ bar held with an underhand grip (on the angled parts), hands about shoulder-width apart, arms extended down. 2. Keep your elbows close to your body and your upper arms stationary. 3. Curl the EZ bar upwards towards your chest, squeezing your biceps at the top. 4. Slowly lower the EZ bar back to the starting position with control."
  },
  {
    id: "ex-014",
    owner: ExerciseOwnership.BFit,
    name: "Rope Tricep Pushdowns",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand facing a cable machine, attach a rope attachment to the high pulley. 2. Grasp the rope with a neutral grip (palms facing each other). 3. Keep your elbows tucked close to your sides and your upper arms stationary. 4. Extend your forearms downwards, straightening your arms and pulling the rope apart at the bottom. 5. Slowly return the rope to the starting position, feeling a stretch in your triceps."
  },
  {
    id: "ex-015",
    owner: ExerciseOwnership.BFit,
    name: "T-Bar Tricep Pushdowns",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand facing a cable machine, attach a straight or V-bar to the high pulley. 2. Grasp the bar with an overhand grip, hands about shoulder-width apart. 3. Keep your elbows tucked close to your sides and your upper arms stationary. 4. Extend your forearms downwards, straightening your arms and squeezing your triceps. 5. Slowly return the bar to the starting position, feeling a stretch in your triceps."
  },
  {
    id: "ex-016",
    owner: ExerciseOwnership.BFit,
    name: "Lateral Raises",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Side_Delts,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand with a dumbbell in each hand, arms extended down at your sides, palms facing your body. 2. Keep a slight bend in your elbows and maintain a stable torso. 3. Raise the dumbbells out to the sides, leading with your elbows, until your arms are parallel to the floor. 4. Slowly lower the dumbbells back to the starting position with control, avoiding swinging."
  },
  {
    id: "ex-017",
    owner: ExerciseOwnership.BFit,
    name: "Leg Curls",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Hamstrings,
    auxiliaryMuscles: [MuscleGroup.Calves],
    type: ExerciseType.Small,
    instructions: "1. Lie face down on the leg curl machine, positioning your Achilles heels just under the pad. 2. Adjust the machine so your knees are aligned with the pivot point. 3. Grasp the handles for stability. 4. Curl your legs upwards by contracting your hamstrings, bringing the pad towards your glutes. 5. Slowly lower the weight back to the starting position with control."
  },
  {
    id: "ex-018",
    owner: ExerciseOwnership.BFit,
    name: "Leg Extensions",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit on the leg extension machine, positioning your shins against the pad just above your ankles. 2. Adjust the backrest so your knees are aligned with the pivot point of the machine. 3. Grasp the handles for stability. 4. Extend your legs upwards by contracting your quadriceps, fully straightening your knees. 5. Slowly lower the weight back to the starting position with control."
  },
  {
    id: "ex-019",
    owner: ExerciseOwnership.BFit,
    name: "Calf Raises",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Calves,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand with your feet hip-width apart, either on a flat surface or with the balls of your feet on an elevated surface (like a step or block) for a greater range of motion. 2. Keep your torso upright and core engaged. 3. Slowly raise your heels off the ground, pushing up onto the balls of your feet and squeezing your calves at the top. 4. Slowly lower your heels back down, allowing for a stretch in your calves if on an elevated surface."
  },
  {
    id: "ex-020",
    owner: ExerciseOwnership.BFit,
    name: "Plank",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Start in a push-up position, then lower down onto your forearms, keeping your body in a straight line from head to heels. 2. Engage your core, glutes, and quadriceps to prevent your hips from sagging or rising too high. 3. Keep your neck neutral, looking at the floor. 4. Hold this position for the desired duration, focusing on maintaining a rigid body."
  },
  {
    id: "ex-021",
    owner: ExerciseOwnership.BFit,
    name: "Crunches",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on your back with your knees bent and feet flat on the floor, hip-width apart. 2. Place your hands lightly behind your head or crossed over your chest. 3. Engage your core and lift your head, neck, and shoulders off the floor, curling your torso towards your knees. Avoid pulling on your neck. 4. Hold briefly at the top, then slowly lower yourself back to the starting position with control."
  },
  {
    id: "ex-022",
    owner: ExerciseOwnership.BFit,
    name: "Russian Twists",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit on the floor with your knees bent and feet flat, leaning back slightly to engage your core. 2. Lift your feet off the floor (optional, for increased difficulty). 3. Clasp your hands together or hold a light weight. 4. Twist your torso to one side, bringing your hands towards the floor next to your hip. 5. Twist to the opposite side, maintaining control. Continue alternating sides."
  },
  {
    id: "ex-023",
    owner: ExerciseOwnership.BFit,
    name: "Hanging Leg Raises",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Medium,
    instructions: "1. Hang from a pull-up bar with an overhand or neutral grip, arms fully extended. 2. Keep your body stable and avoid swinging. 3. Engage your core and slowly raise your legs upwards, keeping them as straight as possible, until they are parallel to the floor or higher. 4. Slowly lower your legs back to the starting position with control, avoiding swinging."
  },
  {
    id: "ex-024",
    owner: ExerciseOwnership.BFit,
    name: "Incline Dumbbell Press",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Front_Delts, MuscleGroup.Triceps],
    type: ExerciseType.Medium,
    instructions: "1. Set an adjustable bench to an incline of 30-45 degrees. 2. Lie on the bench with a dumbbell in each hand, palms facing each other or slightly forward. 3. Position the dumbbells at upper chest height, slightly wider than your shoulders, with elbows bent. 4. Press the dumbbells upwards in a controlled motion until your arms are fully extended, squeezing your upper chest. 5. Slowly lower the dumbbells back to the starting position, maintaining control."
  },
  {
    id: "ex-025",
    owner: ExerciseOwnership.BFit,
    name: "Decline Barbell Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Triceps, MuscleGroup.Front_Delts],
    type: ExerciseType.Medium,
    instructions: "1. Lie on a decline bench, securing your feet under the pads. 2. Grab the barbell with an overhand grip, slightly wider than shoulder-width. 3. Lower the barbell to your lower chest, keeping your elbows tucked slightly. 4. Press the barbell upwards until your arms are fully extended, engaging your lower chest. 5. Slowly lower the barbell back to the starting position with control."
  },
  {
    id: "ex-026",
    owner: ExerciseOwnership.BFit,
    name: "Cable Flys",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand in the center of a cable crossover machine, grasping a D-handle in each hand from the high pulleys. 2. Take a small step forward, keeping a slight bend in your elbows and your chest up. 3. Bring your hands together in front of your chest in a wide arc, squeezing your chest muscles. 4. Slowly return your hands to the starting position, allowing your chest to stretch."
  },
  {
    id: "ex-027",
    owner: ExerciseOwnership.BFit,
    name: "Seated Cable High Row",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Upper_Back,
    auxiliaryMuscles: [MuscleGroup.Lats, MuscleGroup.Biceps],
    type: ExerciseType.Medium,
    instructions: "1. Sit at a cable row machine with a wide grip bar attached to the high pulley. 2. Grasp the bar with a wide overhand grip. 3. Lean back slightly, keep your chest up, and pull the bar towards your upper chest, squeezing your shoulder blades together. 4. Slowly release the bar back to the starting position, allowing your upper back muscles to stretch."
  },
  {
    id: "ex-028",
    owner: ExerciseOwnership.BFit,
    name: "Seated Cable Low Row",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [MuscleGroup.Upper_Back, MuscleGroup.Biceps],
    type: ExerciseType.Medium,
    instructions: "1. Sit at a cable row machine with a V-bar or close-grip handle attached to the low pulley. 2. Place your feet on the foot platform and grasp the handle. 3. Keep your back straight and lean slightly forward, then pull the handle towards your lower abdomen. 4. Squeeze your shoulder blades together and engage your lats. 5. Slowly extend your arms back to the starting position, controlling the weight."
  },
  {
    id: "ex-029",
    owner: ExerciseOwnership.BFit,
    name: "Face Pulls",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Rear_Delts,
    auxiliaryMuscles: [MuscleGroup.Upper_Back],
    type: ExerciseType.Small,
    instructions: "1. Stand facing a cable machine with a rope attachment set at eye level. 2. Grasp the rope with a neutral grip (palms facing each other) and take a step back to create tension. 3. Pull the rope towards your face, pulling your elbows wide and back, squeezing your rear delts and upper back. 4. Slowly extend your arms back to the starting position with control."
  },
  {
    id: "ex-030",
    owner: ExerciseOwnership.BFit,
    name: "Front Squats",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Position a barbell across the front of your shoulders, resting on your deltoids, with your elbows high and hands gripping the bar. 2. Stand with feet shoulder-width apart, toes slightly out. 3. Brace your core, keep your chest up, and descend into a squat, keeping your torso as upright as possible. 4. Descend until your thighs are parallel to the floor or deeper. 5. Drive through your heels to return to the starting position."
  },
  {
    id: "ex-031",
    owner: ExerciseOwnership.BFit,
    name: "Bulgarian Split Squats",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings],
    type: ExerciseType.Medium,
    instructions: "1. Stand a few feet in front of a bench or elevated surface, holding a dumbbell in each hand. 2. Place the top of one foot on the bench behind you. 3. Keep your torso upright and descend by bending your front knee, allowing your back knee to drop towards the floor. 4. Lower until your front thigh is parallel to the floor, or as deep as comfortable, ensuring your front knee tracks over your ankle. 5. Drive through your front heel to return to the starting position. 6. Complete all reps on one leg before switching."
  },
  {
    id: "ex-032",
    owner: ExerciseOwnership.BFit,
    name: "Romanian Deadlift",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Hamstrings,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Lower_Back],
    type: ExerciseType.Medium,
    instructions: "1. Stand tall with a barbell held in front of you, hands shoulder-width apart, palms facing your body. 2. Keep a slight bend in your knees throughout the movement. 3. Hinge at your hips, pushing your glutes back and keeping your back straight. 4. Lower the barbell towards the floor, keeping it close to your shins, until you feel a strong stretch in your hamstrings. 5. Squeeze your glutes and hamstrings to return to the starting position, driving your hips forward."
  },
  {
    id: "ex-033",
    owner: ExerciseOwnership.BFit,
    name: "Good Mornings",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Hamstrings,
    auxiliaryMuscles: [MuscleGroup.Lower_Back, MuscleGroup.Glutes],
    type: ExerciseType.Medium,
    instructions: "1. Place a barbell across your upper back, similar to a squat. 2. Stand with feet shoulder-width apart, with a slight bend in your knees. 3. Keeping your back straight and core engaged, slowly hinge at your hips, pushing your glutes back as far as possible. 4. Lower your torso until it's nearly parallel to the floor, or until you feel a strong stretch in your hamstrings. 5. Squeeze your glutes and hamstrings to return to the upright position, maintaining a straight back."
  },
  {
    id: "ex-034",
    owner: ExerciseOwnership.BFit,
    name: "Hip Thrusts",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [MuscleGroup.Hamstrings],
    type: ExerciseType.Medium,
    instructions: "1. Sit on the floor with your upper back against a bench, knees bent, and feet flat on the floor. 2. Roll a barbell over your hips (use a pad for comfort). 3. Drive through your heels, lift your hips off the floor, and squeeze your glutes at the top until your body forms a straight line from your shoulders to your knees. 4. Slowly lower your hips back to the starting position with control."
  },
  {
    id: "ex-035",
    owner: ExerciseOwnership.BFit,
    name: "Arnold Press",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [MuscleGroup.Side_Delts, MuscleGroup.Triceps],
    type: ExerciseType.Medium,
    instructions: "1. Sit on a bench with back support, holding a dumbbell in each hand at shoulder height, palms facing your body. 2. As you press the dumbbells overhead, simultaneously rotate your palms to face forward. 3. Fully extend your arms overhead, squeezing your deltoids. 4. Reverse the movement, rotating your palms back towards your body as you lower the dumbbells to the starting position."
  },
  {
    id: "ex-036",
    owner: ExerciseOwnership.BFit,
    name: "Dumbell Shrugs",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Traps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand tall with a dumbbell in each hand, arms extended down at your sides, palms facing your body. 2. Keep your arms straight and your core engaged. 3. Shrug your shoulders straight up towards your ears, squeezing your traps at the top. 4. Slowly lower your shoulders back to the starting position with control."
  },
  {
    id: "ex-037",
    owner: ExerciseOwnership.BFit,
    name: "Preacher Curls",
    equipment: ExerciseEquipment.EzBar,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit at a preacher curl bench, resting your upper arms on the pad. 2. Grasp an EZ bar with an underhand grip, hands on the angled parts, arms extended but not locked. 3. Curl the bar upwards towards your shoulders, squeezing your biceps. 4. Slowly lower the bar back to the starting position, feeling a full stretch in your biceps."
  },
  {
    id: "ex-038",
    owner: ExerciseOwnership.BFit,
    name: "Preacher Curls",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit at a preacher curl bench, resting your upper arm (one at a time) on the pad. 2. Grasp a dumbbell with an underhand grip, arm extended but not locked. 3. Curl the dumbbell upwards towards your shoulder, squeezing your biceps. 4. Slowly lower the dumbbell back to the starting position, feeling a full stretch in your biceps. 5. Complete all reps on one arm before switching."
  },
  {
    id: "ex-039",
    owner: ExerciseOwnership.BFit,
    name: "Skull Crushers",
    equipment: ExerciseEquipment.EzBar,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on a flat bench with an EZ bar held with an overhand grip (on the angled parts), arms extended straight up over your chest. 2. Keep your upper arms stationary and elbows pointing forward. 3. Slowly lower the EZ bar towards your forehead by bending only at your elbows. 4. Extend your arms back to the starting position, squeezing your triceps."
  },
  {
    id: "ex-040",
    owner: ExerciseOwnership.BFit,
    name: "Skull Crushers",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on a flat bench with a dumbbell in each hand, arms extended straight up over your chest, palms facing each other. 2. Keep your upper arms stationary and elbows pointing forward. 3. Slowly lower the dumbbells towards your temples by bending only at your elbows. 4. Extend your arms back to the starting position, squeezing your triceps."
  },
  {
    id: "ex-041",
    owner: ExerciseOwnership.BFit,
    name: "Wrist Curls",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Forearms,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit on a bench, resting your forearms on your thighs with your wrists hanging off the edge, palms facing up, holding a dumbbell in each hand. 2. Let the dumbbells roll down to your fingertips, then curl your wrists upwards as high as possible, squeezing your forearms. 3. Slowly lower the dumbbells back down, feeling a stretch in your forearms."
  },
  {
    id: "ex-042",
    owner: ExerciseOwnership.BFit,
    name: "Reverse Wrist Curls",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Forearms,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit on a bench, resting your forearms on your thighs with your wrists hanging off the edge, palms facing down, holding a dumbbell in each hand. 2. Let the dumbbells roll down to your fingertips, then curl your wrists upwards as high as possible, squeezing your forearms. 3. Slowly lower the dumbbells back down, feeling a stretch in your forearms."
  },
  {
    id: "ex-043",
    owner: ExerciseOwnership.BFit,
    name: "Push-ups",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Front_Delts, MuscleGroup.Triceps],
    type: ExerciseType.Medium,
    instructions: "1. Start in a plank position with your hands slightly wider than shoulder-width apart, fingers pointing forward, and body in a straight line from head to heels. 2. Lower your chest towards the floor by bending your elbows, keeping them tucked slightly. 3. Push through your hands to return to the starting position, fully extending your arms and squeezing your chest."
  },
  {
    id: "ex-044",
    owner: ExerciseOwnership.BFit,
    name: "Chin-Ups",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [MuscleGroup.Lats],
    type: ExerciseType.Medium,
    instructions: "1. Grasp a pull-up bar with an underhand grip, hands shoulder-width apart. 2. Hang freely, engaging your core. 3. Pull your body upwards, leading with your chest, until your chin clears the bar. Focus on engaging your biceps and lats. 4. Slowly lower yourself back to the starting position with control, extending your arms fully."
  },
  {
    id: "ex-045",
    owner: ExerciseOwnership.BFit,
    name: "T-Bar Row",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Upper_Back,
    auxiliaryMuscles: [MuscleGroup.Lats, MuscleGroup.Biceps],
    type: ExerciseType.Medium,
    instructions: "1. Load one end of a barbell into a landmine attachment or a corner, and stand over the other end. 2. Attach a V-handle or close-grip handle under the barbell. 3. Hinge at your hips, keeping your back straight and chest up. 4. Pull the handle towards your lower chest/upper abdomen, squeezing your shoulder blades together. 5. Slowly lower the barbell back to the starting position with control."
  },
  {
    id: "ex-046",
    owner: ExerciseOwnership.BFit,
    name: "Pendlay Row",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Upper_Back,
    auxiliaryMuscles: [MuscleGroup.Lats, MuscleGroup.Lower_Back],
    type: ExerciseType.Large,
    instructions: "1. Stand with a barbell in front of you, feet shoulder-width apart. 2. Hinge at your hips, keeping a straight back and chest up, until your torso is parallel to the floor. 3. Grasp the barbell with an overhand grip, slightly wider than shoulder-width. 4. Explosively pull the barbell towards your lower chest/upper abdomen, squeezing your shoulder blades together. 5. Lower the barbell completely to the floor between each rep, resetting your position."
  },
  {
    id: "ex-047",
    owner: ExerciseOwnership.BFit,
    name: "Goblet Squat",
    equipment: ExerciseEquipment.Kettlebells,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Core],
    type: ExerciseType.Medium,
    instructions: "1. Stand with feet slightly wider than shoulder-width, toes slightly out. 2. Hold a kettlebell vertically against your chest with both hands, gripping the horns of the handle. 3. Keep your chest up and elbows tucked. 4. Descend into a squat, keeping your heels on the ground and pushing your knees out. 5. Lower until your thighs are parallel to the floor or deeper. 6. Drive through your heels to return to the starting position."
  },
  {
    id: "ex-048",
    owner: ExerciseOwnership.BFit,
    name: "Goblet Squat",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Core],
    type: ExerciseType.Medium,
    instructions: "1. Stand with feet slightly wider than shoulder-width, toes slightly out. 2. Hold a dumbbell vertically against your chest with both hands, cupping the top head of the dumbbell. 3. Keep your chest up and elbows tucked. 4. Descend into a squat, keeping your heels on the ground and pushing your knees out. 5. Lower until your thighs are parallel to the floor or deeper. 6. Drive through your heels to return to the starting position."
  },
  {
    id: "ex-049",
    owner: ExerciseOwnership.BFit,
    name: "Kettlebell Swings",
    equipment: ExerciseEquipment.Kettlebells,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [MuscleGroup.Hamstrings, MuscleGroup.Lower_Back, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand with feet slightly wider than shoulder-width, toes slightly out, with a kettlebell in front of you. 2. Hinge at your hips, keeping a slight bend in your knees and a straight back, to grasp the kettlebell with both hands. 3. Hike the kettlebell back between your legs, then explosively drive your hips forward, squeezing your glutes, to swing the kettlebell up to chest or eye level. 4. Allow the kettlebell to swing back down, hinging at your hips for the next repetition. The movement is driven by your hips, not your arms."
  },
  {
    id: "ex-050",
    owner: ExerciseOwnership.BFit,
    name: "Sumo Deadlift",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [MuscleGroup.Hamstrings, MuscleGroup.Quads, MuscleGroup.Lower_Back, MuscleGroup.Traps],
    type: ExerciseType.Large,
    instructions: "1. Stand with your feet much wider than shoulder-width apart, toes pointed significantly outwards, with the barbell over your mid-foot. 2. Bend at your knees and hips to grasp the bar with an overhand or mixed grip, hands inside your knees. 3. Keep your back straight, chest up, and shoulders pulled back. 4. Take a deep breath, brace your core, and lift the weight by extending your hips and knees simultaneously. 5. Keep the bar close to your body as you stand up, finishing with your shoulders back and glutes squeezed. 6. Lower the bar with control by reversing the movement, pushing your hips back first."
  },
  {
    id: "ex-051",
    owner: ExerciseOwnership.BFit,
    name: "Hack Squat",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes],
    type: ExerciseType.Medium,
    instructions: "1. Position yourself in the hack squat machine with your back firmly against the pad and shoulders under the pads. 2. Place your feet shoulder-width apart on the platform, slightly forward or in line with your hips, depending on desired emphasis. 3. Release the safety catches. 4. Lower the weight by bending your knees, keeping your back straight and hips close to the pad. 5. Descend until your thighs are parallel to the platform or deeper. 6. Drive through your heels to push the platform back up, without locking your knees."
  },
  {
    id: "ex-052",
    owner: ExerciseOwnership.BFit,
    name: "Sissy Squats",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand upright, holding onto a stable object for balance (e.g., a pole or machine). 2. Rise onto the balls of your feet. 3. Lean back, allowing your knees to come forward while keeping your torso and thighs in a straight line. 4. Descend until your knees are fully bent and your calves are nearly touching your hamstrings. 5. Return to the starting position by pushing through your quads, maintaining the straight line."
  },
  {
    id: "ex-053",
    owner: ExerciseOwnership.BFit,
    name: "Hyperextensions",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Lower_Back,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings],
    type: ExerciseType.Small,
    instructions: "1. Position yourself in a hyperextension bench, with your hips just above the pad, securing your ankles under the footpads. 2. Cross your arms over your chest or place hands lightly behind your head. 3. Keeping your back straight, slowly lower your torso towards the floor by hinging at your hips. 4. Raise your torso back to the starting position, squeezing your glutes and lower back at the top. Avoid hyperextending your lower back."
  },
  {
    id: "ex-054",
    owner: ExerciseOwnership.BFit,
    name: "Ab Rollout",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Medium,
    instructions: "1. Kneel on the floor with an ab wheel (or barbell with plates) in front of you, hands gripping the handles. 2. Keep your back straight and core tight. 3. Slowly roll the wheel forward, extending your arms and allowing your body to straighten as you roll. 4. Go as far as you can without letting your hips sag or back arch. 5. Engage your core to pull the wheel back towards your knees, returning to the starting position."
  },
  {
    id: "ex-055",
    owner: ExerciseOwnership.BFit,
    name: "Wood Chops",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Medium,
    instructions: "1. Stand sideways to a cable machine with a D-handle attached to a high pulley. 2. Grasp the handle with both hands and pivot your feet to face the machine. 3. Rotate your torso downwards and across your body, pulling the cable handle towards your opposite knee in a chopping motion. 4. Control the weight as you return to the starting position, allowing for a stretch in your obliques."
  },
  {
    id: "ex-056",
    owner: ExerciseOwnership.BFit,
    name: "Side Bends",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand tall with your feet hip-width apart, holding a dumbbell in one hand, arm extended down at your side. 2. Keep your core tight and back straight. 3. Slowly bend directly to the side of the arm holding the dumbbell, allowing the weight to pull you down. 4. Contract your obliques to pull your torso back up to the starting position. 5. Complete all reps on one side before switching hands and sides."
  },
  {
    id: "ex-057",
    owner: ExerciseOwnership.BFit,
    name: "Side Bends",
    equipment: ExerciseEquipment.Kettlebells,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand tall with your feet hip-width apart, holding a kettlebell in one hand, arm extended down at your side. 2. Keep your core tight and back straight. 3. Slowly bend directly to the side of the arm holding the kettlebell, allowing the weight to pull you down. 4. Contract your obliques to pull your torso back up to the starting position. 5. Complete all reps on one side before switching hands and sides."
  },
  {
    id: "ex-058",
    owner: ExerciseOwnership.BFit,
    name: "Hammer Curls",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [MuscleGroup.Forearms],
    type: ExerciseType.Small,
    instructions: "1. Stand or sit with a dumbbell in each hand, arms extended down, palms facing each other (neutral grip). 2. Keep your elbows close to your body and your upper arms stationary. 3. Curl the dumbbells upwards towards your shoulders, maintaining the neutral grip throughout the movement. 4. Slowly lower the dumbbells back to the starting position with control."
  },
  {
    id: "ex-059",
    owner: ExerciseOwnership.BFit,
    name: "Overhead Tricep Extension",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit or stand holding a dumbbell with both hands, extending it overhead. 2. Keep your elbows close to your head and pointing forward. 3. Slowly lower the dumbbell behind your head by bending your elbows, feeling a stretch in your triceps. 4. Extend your arms back to the starting position, squeezing your triceps at the top."
  },
  {
    id: "ex-060",
    owner: ExerciseOwnership.BFit,
    name: "Pec Deck Machine",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit on the pec deck machine with your back against the pad, feet flat on the floor. 2. Place your forearms against the pads, with your elbows slightly bent. 3. Push the pads together in front of your chest, squeezing your chest muscles. 4. Slowly return the pads to the starting position, allowing for a stretch in your chest."
  },
  {
    id: "ex-061",
    owner: ExerciseOwnership.BFit,
    name: "Cable Crossover",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand in the center of a cable crossover machine, grasping a D-handle in each hand from the high pulleys. 2. Take a small step forward, keeping a slight bend in your elbows and your chest up. 3. Bring your hands together in front of your chest in a wide arc, squeezing your chest muscles. 4. Slowly return your hands to the starting position, allowing your chest to stretch."
  },
  {
    id: "ex-062",
    owner: ExerciseOwnership.BFit,
    name: "Dumbbell Flys",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on a flat bench with a dumbbell in each hand, arms extended straight up over your chest, palms facing each other, with a slight bend in your elbows. 2. Slowly lower the dumbbells out to the sides in a wide arc, feeling a stretch in your chest. 3. Bring the dumbbells back up to the starting position, squeezing your chest muscles. Avoid letting the dumbbells touch at the top."
  },
  {
    id: "ex-063",
    owner: ExerciseOwnership.BFit,
    name: "Squat",
    equipment: ExerciseEquipment.SmithMachine,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings],
    type: ExerciseType.Large,
    instructions: "1. Position a bench or box behind you if you want to control depth. 2. Place the barbell on the Smith machine across your upper back, hands slightly wider than shoulder-width. 3. Unlock the bar. 4. Descend into a squat, keeping your back straight and core engaged. The machine guides the movement, making it more stable. 5. Drive through your heels to return to the starting position. 6. Re-rack the bar when finished."
  },
  {
    id: "ex-064",
    owner: ExerciseOwnership.BFit,
    name: "Bench Press",
    equipment: ExerciseEquipment.SmithMachine,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Front_Delts, MuscleGroup.Triceps],
    type: ExerciseType.Large,
    instructions: "1. Lie on a flat bench under the Smith machine, positioning the bar over your mid-chest. 2. Grasp the bar with an overhand grip, slightly wider than shoulder-width. 3. Unlock the bar and lower it to your chest with control. 4. Press the bar back up until your arms are fully extended, engaging your chest. 5. Re-rack the bar when finished."
  },
  {
    id: "ex-065",
    owner: ExerciseOwnership.BFit,
    name: "Trap Bar Deadlift",
    equipment: ExerciseEquipment.TrapBar,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings, MuscleGroup.Lower_Back],
    type: ExerciseType.Large,
    instructions: "1. Stand inside the trap bar with your feet hip-width apart. 2. Bend at your knees and hips to grasp the handles, keeping your back straight and chest up. 3. Lift the weight by extending your hips and knees simultaneously, keeping the trap bar centered. 4. Stand tall, squeezing your glutes at the top. 5. Lower the trap bar with control by reversing the movement."
  },
  {
    id: "ex-066",
    owner: ExerciseOwnership.BFit,
    name: "Clean and Jerk",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Lower_Back, MuscleGroup.Front_Delts, MuscleGroup.Triceps, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Start with the barbell on the floor, feet hip-width apart, grip slightly wider than shoulder-width. 2. **Clean:** Perform a deadlift motion, then explosively pull the bar up, shrugging your shoulders and pulling with your arms to catch the bar in a front rack position (bar resting on front delts, elbows high). 3. **Jerk:** Dip slightly by bending your knees, then explosively drive upwards, pressing the barbell overhead while simultaneously performing a split jerk (one foot forward, one back) or push jerk (feet remain parallel). 4. Stand tall with the bar overhead, then return to the starting position."
  },
  {
    id: "ex-067",
    owner: ExerciseOwnership.BFit,
    name: "Snatch",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Lower_Back, MuscleGroup.Upper_Back, MuscleGroup.Front_Delts, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Start with the barbell on the floor, feet hip-width apart, with a very wide grip (such that the bar reaches your hip crease when standing tall). 2. Perform a deadlift motion, then explosively pull the bar up, shrugging your shoulders and pulling with your arms to pull yourself under the bar. 3. Catch the barbell overhead in a deep squat position, arms fully extended. 4. Stand up from the squat with the barbell overhead. 5. Lower the bar back to the floor with control."
  },
  {
    id: "ex-068",
    owner: ExerciseOwnership.BFit,
    name: "Box Jumps",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings, MuscleGroup.Calves],
    type: ExerciseType.Medium,
    instructions: "1. Stand a comfortable distance in front of a sturdy box or elevated surface. 2. Bend slightly at your knees and hips, then explosively swing your arms and jump onto the box, landing softly with both feet. 3. Stand up fully on the box. 4. Step or jump back down to the starting position with control. Focus on a soft landing to absorb impact."
  },
  {
    id: "ex-069",
    owner: ExerciseOwnership.BFit,
    name: "TRX Rows",
    equipment: ExerciseEquipment.TRX,
    primaryMuscle: MuscleGroup.Upper_Back,
    auxiliaryMuscles: [MuscleGroup.Lats, MuscleGroup.Biceps, MuscleGroup.Core],
    type: ExerciseType.Medium,
    instructions: "1. Grasp the TRX handles with an overhand or neutral grip, leaning back with your feet planted, body in a straight line. The more you lean back, the harder it is. 2. Engage your core and pull your chest towards your hands, squeezing your shoulder blades together. 3. Slowly lower yourself back to the starting position with control, extending your arms fully."
  },
  {
    id: "ex-070",
    owner: ExerciseOwnership.BFit,
    name: "TRX Push-ups",
    equipment: ExerciseEquipment.TRX,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Front_Delts, MuscleGroup.Triceps, MuscleGroup.Core],
    type: ExerciseType.Medium,
    instructions: "1. Place your feet in the TRX foot cradles, facing away from the anchor point, and get into a plank position with hands on the floor, slightly wider than shoulder-width. 2. Lower your chest towards the floor by bending your elbows, keeping your body in a straight line. 3. Push through your hands to return to the starting position, fully extending your arms and squeezing your chest. (Alternatively, you can perform this standing, holding the handles and leaning into the push-up)."
  },
  {
    id: "ex-071",
    owner: ExerciseOwnership.BFit,
    name: "Band Pull-Aparts",
    equipment: ExerciseEquipment.ResistanceBands,
    primaryMuscle: MuscleGroup.Rear_Delts,
    auxiliaryMuscles: [MuscleGroup.Upper_Back],
    type: ExerciseType.Small,
    instructions: "1. Hold a resistance band with both hands, palms facing down, arms extended straight out in front of you at shoulder height, hands shoulder-width apart. 2. Keeping your arms straight, pull the band apart by squeezing your shoulder blades together, bringing the band towards your chest. 3. Slowly return the band to the starting position with control."
  },
  {
    id: "ex-072",
    owner: ExerciseOwnership.BFit,
    name: "Banded Good Mornings",
    equipment: ExerciseEquipment.ResistanceBands,
    primaryMuscle: MuscleGroup.Hamstrings,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Lower_Back],
    type: ExerciseType.Small,
    instructions: "1. Stand with your feet hip-width apart, loop a resistance band around your neck and under your feet. 2. Keep a slight bend in your knees and your back straight. 3. Hinge at your hips, pushing your glutes back as far as possible, allowing your torso to lean forward. 4. Lower until you feel a stretch in your hamstrings. 5. Squeeze your glutes and hamstrings to return to the upright position, maintaining a straight back."
  },
  {
    id: "ex-073",
    owner: ExerciseOwnership.BFit,
    name: "Banded Tricep Pushdowns",
    equipment: ExerciseEquipment.ResistanceBands,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Anchor a resistance band to a high point (e.g., a sturdy pole or door frame). 2. Grasp the ends of the band with an overhand grip, keeping your elbows tucked close to your sides and upper arms stationary. 3. Extend your forearms downwards, straightening your arms and squeezing your triceps. 4. Slowly return your forearms to the starting position, feeling a stretch in your triceps."
  },
  {
    id: "ex-074",
    owner: ExerciseOwnership.BFit,
    name: "Pullover",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [MuscleGroup.Chest, MuscleGroup.Triceps],
    type: ExerciseType.Medium,
    instructions: "1. Lie perpendicular to a flat bench with only your upper back supported, feet flat on the floor, hips dropped. 2. Hold one dumbbell with both hands, cupping one end, arms extended over your chest. 3. Keeping a slight bend in your elbows, slowly lower the dumbbell behind your head until you feel a stretch in your lats and chest. 4. Pull the dumbbell back over your chest in an arc, squeezing your lats. Avoid arching your lower back excessively."
  },
  {
    id: "ex-075",
    owner: ExerciseOwnership.BFit,
    name: "Pullover",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [MuscleGroup.Chest, MuscleGroup.Triceps],
    type: ExerciseType.Medium,
    instructions: "1. Stand facing a cable machine with a straight bar or rope attachment connected to the high pulley. 2. Grasp the bar with an overhand grip, step back to create tension, and slightly hinge at your hips, keeping your arms extended. 3. Pull the bar down towards your thighs in an arc, engaging your lats. 4. Slowly return the bar to the starting position, feeling a stretch in your lats."
  },
  {
    id: "ex-076",
    owner: ExerciseOwnership.BFit,
    name: "Pullover",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [MuscleGroup.Chest, MuscleGroup.Triceps],
    type: ExerciseType.Medium,
    instructions: "1. Sit in the pullover machine, securing yourself against the pads. 2. Grasp the handles, keeping your arms extended with a slight bend in your elbows. 3. Pull the handles down and around in an arc towards your thighs, engaging your lats. 4. Slowly return the handles to the starting position, feeling a stretch in your lats."
  },
  {
    id: "ex-077",
    owner: ExerciseOwnership.BFit,
    name: "Seated Dumbbell Press",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [MuscleGroup.Side_Delts, MuscleGroup.Triceps],
    type: ExerciseType.Medium,
    instructions: "1. Sit on a bench with back support, holding a dumbbell in each hand at shoulder height, palms facing forward or slightly inward. 2. Keep your core braced. 3. Press the dumbbells directly overhead until your arms are fully extended. 4. Slowly lower the dumbbells back to the starting position with control."
  },
  {
    id: "ex-078",
    owner: ExerciseOwnership.BFit,
    name: "Upright Row",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [MuscleGroup.Traps, MuscleGroup.Biceps, MuscleGroup.Side_Delts],
    type: ExerciseType.Medium,
    instructions: "1. Stand with a barbell held in front of you, hands closer than shoulder-width apart, palms facing your body. 2. Keep the bar close to your body and pull it upwards towards your chin, leading with your elbows. 3. Raise your elbows as high as possible, squeezing your shoulders and traps at the top. 4. Slowly lower the barbell back to the starting position with control. Be mindful of shoulder discomfort; if experienced, try a wider grip or different exercise."
  },
  {
    id: "ex-079",
    owner: ExerciseOwnership.BFit,
    name: "Upright Row",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [MuscleGroup.Traps, MuscleGroup.Biceps, MuscleGroup.Side_Delts],
    type: ExerciseType.Medium,
    instructions: "1. Stand facing a cable machine with a straight bar attachment on the low pulley. 2. Grasp the bar with an overhand grip, hands closer than shoulder-width apart. 3. Keep the bar close to your body and pull it upwards towards your chin, leading with your elbows. 4. Raise your elbows as high as possible, squeezing your shoulders and traps at the top. 5. Slowly lower the bar back to the starting position with control. Be mindful of shoulder discomfort."
  },
  {
    id: "ex-080",
    owner: ExerciseOwnership.BFit,
    name: "Concentration Curls",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit on a bench with your legs spread, feet flat on the floor. 2. Lean forward and rest your tricep against your inner thigh, holding a dumbbell with an underhand grip, arm extended. 3. Curl the dumbbell upwards towards your shoulder, focusing on squeezing your bicep and isolating the muscle. 4. Slowly lower the dumbbell back to the starting position with control. 5. Complete all reps on one arm before switching."
  },
  {
    id: "ex-081",
    owner: ExerciseOwnership.BFit,
    name: "Tricep Kickbacks",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Hold a dumbbell in one hand. Hinge at your hips, keeping your back straight and elbow tucked close to your side, upper arm parallel to the floor. 2. Extend your forearm straight back, contracting your tricep at the top. 3. Slowly return your forearm to the starting position, maintaining control. 4. Complete all reps on one arm before switching."
  },
  {
    id: "ex-082",
    owner: ExerciseOwnership.BFit,
    name: "Tricep Kickbacks",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand facing a cable machine with a single D-handle attached to the low pulley. 2. Grasp the handle, hinge at your hips, and tuck your elbow close to your side, upper arm parallel to the floor. 3. Extend your forearm straight back, contracting your tricep at the top. 4. Slowly return your forearm to the starting position, maintaining control. 5. Complete all reps on one arm before switching."
  },
  {
    id: "ex-083",
    owner: ExerciseOwnership.BFit,
    name: "Glute-Ham Raise",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Hamstrings,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Lower_Back],
    type: ExerciseType.Medium,
    instructions: "1. Position yourself in a glute-ham raise machine, securing your ankles under the pads and knees on the knee pads. 2. Start upright, then slowly lower your torso towards the floor by extending at your knees and hips, feeling a stretch in your hamstrings. 3. Once fully extended, engage your hamstrings and glutes to pull your body back up to the starting position. This is an advanced exercise."
  },
  {
    id: "ex-084",
    owner: ExerciseOwnership.BFit,
    name: "Calf Press on Leg Press Machine",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Calves,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit on a leg press machine, placing the balls of your feet on the bottom edge of the platform, heels hanging off. 2. Release the safety catches. 3. Push the platform away by extending your ankles, pushing up onto the balls of your feet and squeezing your calves. 4. Slowly lower the platform by flexing your ankles, allowing your heels to drop for a stretch in your calves."
  },
  {
    id: "ex-085",
    owner: ExerciseOwnership.BFit,
    name: "Seated Calf Raise",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Calves,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit on the seated calf raise machine, placing the balls of your feet on the platform and positioning your thighs under the knee pads. 2. Release the safety catches. 3. Push the weight up by extending your ankles, pushing up onto the balls of your feet and squeezing your calves. 4. Slowly lower the weight by flexing your ankles, allowing your heels to drop for a stretch in your calves."
  },
  {
    id: "ex-086",
    owner: ExerciseOwnership.BFit,
    name: "Abductor Machine",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Abductors,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit on the abductor machine, positioning your knees against the inner pads. 2. Keep your back against the pad and grasp the handles. 3. Push your knees outwards against the pads, squeezing your outer thighs and glutes. 4. Slowly return your knees to the starting position with control."
  },
  {
    id: "ex-087",
    owner: ExerciseOwnership.BFit,
    name: "Adductor Machine",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Adductors,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit on the adductor machine, positioning your knees against the outer pads. 2. Keep your back against the pad and grasp the handles. 3. Pull your knees inwards, squeezing your inner thighs. 4. Slowly return your knees to the starting position with control."
  },
  {
    id: "ex-088",
    owner: ExerciseOwnership.BFit,
    name: "Cable Kickbacks",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Attach an ankle strap to a low pulley cable. 2. Face the machine, attach the strap to one ankle, and hold onto the machine for support. 3. Keep a slight bend in your standing leg and your torso upright. 4. Extend the strapped leg straight back and slightly up, squeezing your glute at the top. Avoid arching your back. 5. Slowly return the leg to the starting position with control. 6. Complete all reps on one leg before switching."
  },
  {
    id: "ex-089",
    owner: ExerciseOwnership.BFit,
    name: "Bicycle Crunches",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on your back with your hands lightly behind your head, knees bent, and feet off the floor. 2. Bring one knee towards your chest while simultaneously bringing the opposite elbow towards that knee, twisting your torso. 3. Extend the other leg straight. 4. Alternate sides in a pedaling motion, maintaining control and engaging your core. Focus on twisting your torso, not just moving your limbs."
  },
  {
    id: "ex-090",
    owner: ExerciseOwnership.BFit,
    name: "Leg Raises",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on your back with your legs straight, hands under your glutes for support, or by your sides. 2. Keep your lower back pressed into the floor. 3. Slowly raise your legs straight up towards the ceiling until they are perpendicular to the floor, or as high as comfortable without arching your back. 4. Slowly lower your legs back down towards the floor, stopping just before they touch, maintaining control throughout the movement."
  },
  {
    id: "ex-091",
    owner: ExerciseOwnership.BFit,
    name: "Flutter Kicks",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on your back with your hands under your glutes for support, or by your sides. 2. Lift both legs slightly off the floor, keeping them straight. 3. Perform small, rapid up-and-down movements with your legs, as if kicking in water. Keep your lower back pressed into the floor and your core engaged throughout."
  },
  {
    id: "ex-092",
    owner: ExerciseOwnership.BFit,
    name: "V-Ups",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Medium,
    instructions: "1. Lie on your back with your arms extended overhead and legs straight. 2. Simultaneously lift your torso and legs off the floor, reaching your hands towards your toes, forming a 'V' shape with your body. 3. Lower your body back to the starting position with control, without letting your arms or legs fully rest on the floor between reps."
  },
  {
    id: "ex-093",
    owner: ExerciseOwnership.BFit,
    name: "Toes to Bar",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [MuscleGroup.Lats],
    type: ExerciseType.Medium,
    instructions: "1. Hang from a pull-up bar with an overhand grip, arms fully extended. 2. Initiate a kip swing if needed for momentum, then engage your core and rapidly bring your feet up to touch the bar. 3. Control the descent back to the starting position. Focus on a strong core contraction."
  },
  {
    id: "ex-094",
    owner: ExerciseOwnership.BFit,
    name: "Single Arm Dumbbell Row",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [MuscleGroup.Upper_Back, MuscleGroup.Biceps],
    type: ExerciseType.Medium,
    instructions: "1. Place one knee and one hand on a flat bench for support, with the other foot on the floor. 2. Hold a dumbbell in the free hand, arm extended towards the floor, palm facing your body. 3. Keep your back straight and core engaged. 4. Pull the dumbbell upwards towards your hip, keeping your elbow close to your body and squeezing your shoulder blade. 5. Slowly lower the dumbbell back to the starting position. 6. Complete all reps on one arm before switching."
  },
  {
    id: "ex-095",
    owner: ExerciseOwnership.BFit,
    name: "Reverse Pec Deck",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Rear_Delts,
    auxiliaryMuscles: [MuscleGroup.Upper_Back],
    type: ExerciseType.Small,
    instructions: "1. Sit facing the reverse pec deck machine, with your chest against the pad. 2. Grasp the handles with a neutral grip (palms facing each other), arms extended forward. 3. Pull the handles outwards and backwards, squeezing your shoulder blades and engaging your rear delts. 4. Slowly return the handles to the starting position with control."
  },
  {
    id: "ex-096",
    owner: ExerciseOwnership.BFit,
    name: "Machine Chest Press",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Front_Delts, MuscleGroup.Triceps],
    type: ExerciseType.Medium,
    instructions: "1. Sit on the chest press machine with your back firmly against the pad. 2. Grasp the handles with an overhand grip, hands slightly wider than shoulder-width, and elbows bent. 3. Press the handles forward, extending your arms without locking your elbows, squeezing your chest muscles. 4. Slowly return the handles to the starting position with control."
  },
  {
    id: "ex-097",
    owner: ExerciseOwnership.BFit,
    name: "Machine Shoulder Press",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [MuscleGroup.Side_Delts, MuscleGroup.Triceps],
    type: ExerciseType.Medium,
    instructions: "1. Sit on the shoulder press machine with your back firmly against the pad. 2. Grasp the handles with an overhand grip, hands slightly wider than shoulder-width, and elbows bent. 3. Press the handles overhead, extending your arms without locking your elbows, squeezing your shoulders. 4. Slowly return the handles to the starting position with control."
  },
  {
    id: "ex-098",
    owner: ExerciseOwnership.BFit,
    name: "Machine Row",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Upper_Back,
    auxiliaryMuscles: [MuscleGroup.Lats, MuscleGroup.Biceps],
    type: ExerciseType.Medium,
    instructions: "1. Sit on the rowing machine with your chest against the pad (if applicable) or back straight. 2. Grasp the handles with your preferred grip (wide, neutral, or close). 3. Pull the handles towards your torso by squeezing your shoulder blades together and driving your elbows back. 4. Slowly extend your arms back to the starting position, allowing your back muscles to stretch."
  },
  {
    id: "ex-099",
    owner: ExerciseOwnership.BFit,
    name: "Landmine Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Front_Delts, MuscleGroup.Triceps, MuscleGroup.Core],
    type: ExerciseType.Medium,
    instructions: "1. Load one end of a barbell into a landmine attachment. 2. Stand facing the landmine, holding the free end of the barbell with both hands at chest height, slightly below your chin. 3. Keeping your core tight, press the barbell upwards and forward by extending your arms. 4. Slowly lower the barbell back to the starting position with control."
  },
  {
    id: "ex-100",
    owner: ExerciseOwnership.BFit,
    name: "Landmine Squat",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings],
    type: ExerciseType.Medium,
    instructions: "1. Load one end of a barbell into a landmine attachment. 2. Stand facing the landmine, holding the free end of the barbell with both hands at chest height, close to your body. 3. Keep your chest up and back straight. 4. Descend into a squat, keeping your heels on the ground and the bar close to your body. 5. Drive through your heels to return to the starting position."
  },
  {
    id: "ex-101",
    owner: ExerciseOwnership.BFit,
    name: "Zercher Squat",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Core, MuscleGroup.Upper_Back, MuscleGroup.Biceps],
    type: ExerciseType.Large,
    instructions: "1. Set a barbell in a squat rack at elbow height. 2. Step under the bar and cradle it in the crook of your elbows, hands clasped in front of you. 3. Stand with feet shoulder-width apart, toes slightly out. 4. Brace your core, keep your chest up, and descend into a squat, maintaining an upright torso. 5. Descend until your thighs are parallel to the floor or deeper. 6. Drive through your heels to return to the starting position."
  },
  {
    id: "ex-102",
    owner: ExerciseOwnership.BFit,
    name: "Farmers Walk",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Forearms,
    auxiliaryMuscles: [MuscleGroup.Traps, MuscleGroup.Core, MuscleGroup.Glutes],
    type: ExerciseType.Large,
    instructions: "1. Stand with a heavy dumbbell in each hand, arms extended down at your sides, maintaining an upright posture. 2. Engage your core, squeeze your shoulder blades back, and walk a designated distance, focusing on small, controlled steps. 3. Avoid shrugging your shoulders or leaning to one side. Maintain a strong grip throughout the walk."
  },
  {
    id: "ex-103",
    owner: ExerciseOwnership.BFit,
    name: "Farmers Walk",
    equipment: ExerciseEquipment.Kettlebells,
    primaryMuscle: MuscleGroup.Forearms,
    auxiliaryMuscles: [MuscleGroup.Traps, MuscleGroup.Core, MuscleGroup.Glutes],
    type: ExerciseType.Large,
    instructions: "1. Stand with a heavy kettlebell in each hand, arms extended down at your sides, maintaining an upright posture. 2. Engage your core, squeeze your shoulder blades back, and walk a designated distance, focusing on small, controlled steps. 3. Avoid shrugging your shoulders or leaning to one side. Maintain a strong grip throughout the walk."
  },
  {
    id: "ex-104",
    owner: ExerciseOwnership.BFit,
    name: "Turkish Get-Up",
    equipment: ExerciseEquipment.Kettlebells,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [MuscleGroup.Front_Delts, MuscleGroup.Glutes, MuscleGroup.Quads],
    type: ExerciseType.Large,
    instructions: "1. Lie on your back, holding a kettlebell with one arm extended straight up. 2. Bend the knee on the same side as the kettlebell, foot flat on the floor. Extend the other arm and leg out. 3. **Roll to elbow:** Roll onto the opposite elbow, keeping the kettlebell arm straight. 4. **Press to hand:** Push up onto the opposite hand. 5. **Hip Bridge:** Lift your hips off the floor. 6. **Sweep leg:** Sweep your straight leg back and under, positioning your knee under your hip. 7. **Lunge to stand:** Come to a kneeling lunge position, then stand up. 8. Reverse the entire process to return to the starting position. This is a complex exercise; practice with light weight."
  },
  {
    id: "ex-105",
    owner: ExerciseOwnership.BFit,
    name: "Rack Pulls",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Lower_Back,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings, MuscleGroup.Traps, MuscleGroup.Upper_Back],
    type: ExerciseType.Large,
    instructions: "1. Set a barbell in a power rack at a height just above or below your knees. 2. Stand with your mid-foot under the barbell, feet hip-width apart. 3. Bend at your knees and hips to grasp the bar with an overhand or mixed grip, hands just outside your shins. 4. Keep your back straight, chest up, and shoulders pulled back. 5. Take a deep breath, brace your core, and lift the weight by extending your hips and knees simultaneously. 6. Pull the bar up until your hips and knees are fully extended, squeezing your glutes and traps. 7. Lower the bar with control back to the pins."
  },
  {
    id: "ex-106",
    owner: ExerciseOwnership.BFit,
    name: "Zottman Curl",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [MuscleGroup.Forearms],
    type: ExerciseType.Small,
    instructions: "1. Stand or sit with a dumbbell in each hand, arms extended down, palms facing forward. 2. Curl the dumbbells upwards towards your shoulders, as in a standard bicep curl. 3. At the top of the movement, rotate your wrists so your palms face down. 4. Slowly lower the dumbbells back to the starting position with your palms facing down, emphasizing the eccentric (lowering) phase for forearm engagement. 5. Rotate your palms back to face forward before the next repetition."
  },
  {
    id: "ex-107",
    owner: ExerciseOwnership.BFit,
    name: "Diamond Push-ups",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [MuscleGroup.Chest, MuscleGroup.Front_Delts],
    type: ExerciseType.Medium,
    instructions: "1. Start in a push-up position, but bring your hands close together directly under your chest, forming a diamond shape with your thumbs and index fingers. 2. Keep your body in a straight line from head to heels. 3. Lower your chest towards your hands by bending your elbows, keeping them tucked close to your body. 4. Push through your hands to return to the starting position, fully extending your arms and squeezing your triceps."
  },
  {
    id: "ex-108",
    owner: ExerciseOwnership.BFit,
    name: "Spider Curls",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie face down on an incline bench set to about 45-60 degrees, with your chest supported and arms hanging straight down, holding a dumbbell in each hand, palms facing forward. 2. Keep your upper arms stationary and curl the dumbbells upwards towards your shoulders, squeezing your biceps. 3. Slowly lower the dumbbells back to the starting position with control, feeling a full stretch in your biceps."
  },
  {
    id: "ex-109",
    owner: ExerciseOwnership.BFit,
    name: "JM Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on a flat bench, holding a barbell with a close grip (about shoulder-width apart), arms extended over your chest. 2. Lower the barbell by bending your elbows and allowing them to flare out slightly, bringing the bar towards your upper chest or neck. 3. As the bar approaches your chest, press it back up and slightly away from you, similar to a close-grip bench press combined with a skull crusher. Focus on tricep contraction."
  },
  {
    id: "ex-110",
    owner: ExerciseOwnership.BFit,
    name: "Cable Lateral Raises",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Side_Delts,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand sideways to a low pulley cable machine, attaching an ankle strap or D-handle to the cable. 2. Grasp the handle with the hand furthest from the machine, or attach it to your ankle. 3. Keep a slight bend in your elbow (if using hand) or knee (if using ankle strap) and raise your arm/leg out to the side until parallel to the floor, leading with the elbow/knee. 4. Slowly lower the weight back to the starting position with control. 5. Complete all reps on one side before switching."
  },
  {
    id: "ex-111",
    owner: ExerciseOwnership.BFit,
    name: "Cable Front Raises",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand facing a low pulley cable machine, attaching a straight bar or D-handle to the cable. 2. Grasp the bar/handle with an overhand grip, arms extended down in front of you. 3. Keeping your arm straight (but not locked), raise the bar/handle upwards and forwards until your arm is parallel to the floor at shoulder height. 4. Slowly lower the weight back to the starting position with control."
  },
  {
    id: "ex-112",
    owner: ExerciseOwnership.BFit,
    name: "Cable Reverse Flys",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Rear_Delts,
    auxiliaryMuscles: [MuscleGroup.Upper_Back],
    type: ExerciseType.Small,
    instructions: "1. Stand in the center of a cable crossover machine. 2. Grasp the right handle with your left hand and the left handle with your right hand, crossing your arms in front of you. 3. Take a step back to create tension, with a slight bend in your elbows. 4. Pull the handles outwards and backwards in a wide arc, squeezing your rear delts and upper back. 5. Slowly return the handles to the starting position with control."
  },
  {
    id: "ex-113",
    owner: ExerciseOwnership.BFit,
    name: "Barbell Hip Thrust",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [MuscleGroup.Hamstrings],
    type: ExerciseType.Medium,
    instructions: "1. Sit on the floor with your upper back against a bench, knees bent, and feet flat on the floor. 2. Roll a barbell over your hips (use a pad for comfort). 3. Drive through your heels, lift your hips off the floor, and squeeze your glutes at the top until your body forms a straight line from your shoulders to your knees. 4. Slowly lower your hips back to the starting position with control."
  },
  {
    id: "ex-114",
    owner: ExerciseOwnership.BFit,
    name: "Pistol Squats",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand on one leg, extending the other leg straight out in front of you. You can extend your arms forward for balance. 2. Slowly lower into a deep squat on one leg, keeping your balance and your back straight. 3. Descend as low as possible, ideally until your hamstring touches your calf, keeping the extended leg off the floor. 4. Drive through your heel to return to the standing position. This is an advanced bodyweight exercise requiring significant balance and strength."
  },
  {
    id: "ex-115",
    owner: ExerciseOwnership.BFit,
    name: "Pistol Squats",
    equipment: ExerciseEquipment.TRX,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand facing the TRX anchor point, holding the handles in front of you for balance. 2. Extend one leg straight out in front of you or slightly to the side. 3. Slowly lower into a deep squat on the standing leg, using the TRX handles for assistance to maintain balance and control. 4. Descend as low as possible, ideally until your hamstring touches your calf, keeping the extended leg off the floor. 5. Drive through your heel to return to the standing position. 6. Complete all reps on one leg before switching."
  },
  {
    id: "ex-116",
    owner: ExerciseOwnership.BFit,
    name: "Muscle-Ups",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [MuscleGroup.Biceps, MuscleGroup.Triceps, MuscleGroup.Chest, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Grasp a pull-up bar with an overhand grip, slightly wider than shoulder-width. 2. Initiate a powerful kip or false grip pull, pulling your body up explosively higher than a regular pull-up. 3. As your chest approaches the bar, transition over the bar by pushing downwards with your hands, rotating your wrists and body over the bar. 4. Finish in a dip position above the bar. 5. Lower yourself with control by reversing the movement."
  },
  {
    id: "ex-117",
    owner: ExerciseOwnership.BFit,
    name: "Handstand Push-ups",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [MuscleGroup.Side_Delts, MuscleGroup.Triceps, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Kick up into a handstand position against a wall or free-standing (advanced). 2. Keep your core tight and body straight. 3. Slowly lower your head towards the floor by bending your elbows, controlling the descent. 4. Press back up through your hands and shoulders until your arms are fully extended, returning to the handstand position. This is an advanced bodyweight exercise."
  },
  {
    id: "ex-118",
    owner: ExerciseOwnership.BFit,
    name: "Dragon Flag",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Large,
    instructions: "1. Lie on a flat bench, grasping the bench behind your head with both hands for stability. 2. Keeping your body straight from shoulders to toes, slowly raise your entire body off the bench, pivoting at your shoulders, until your body is at an angle (or fully vertical if advanced). 3. Slowly lower your body back down with control, maintaining the straight line, stopping just before your feet touch the bench. This is an advanced core exercise."
  },
  {
    id: "ex-119",
    owner: ExerciseOwnership.BFit,
    name: "L-Sit",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [MuscleGroup.Triceps, MuscleGroup.Quads],
    type: ExerciseType.Medium,
    instructions: "1. Sit on the floor with your legs straight out in front of you. 2. Place your hands on the floor next to your hips, fingers pointing forward. 3. Push through your hands to lift your hips and legs off the floor, keeping your legs straight and forming an 'L' shape with your body. 4. Hold this position for the desired duration, engaging your core, triceps, and quads."
  },
  {
    id: "ex-120",
    owner: ExerciseOwnership.BFit,
    name: "Front Lever",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [MuscleGroup.Core, MuscleGroup.Upper_Back],
    type: ExerciseType.Large,
    instructions: "1. Hang from a pull-up bar with an overhand grip, hands shoulder-width apart. 2. Pull your body upwards and tilt your torso back, extending your legs straight out in front of you until your entire body is parallel to the floor, facing up. 3. Hold this position with a straight body, engaging your lats, core, and upper back. This is a very advanced bodyweight skill."
  },
  {
    id: "ex-121",
    owner: ExerciseOwnership.BFit,
    name: "Back Lever",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Core, MuscleGroup.Lats, MuscleGroup.Biceps],
    type: ExerciseType.Large,
    instructions: "1. Hang from a pull-up bar with an overhand grip, hands shoulder-width apart. 2. Pull your body up and over the bar, then rotate your body backwards, extending your legs straight behind you until your entire body is parallel to the floor, facing down. 3. Hold this position with a straight body, engaging your chest, core, lats, and biceps. This is a very advanced bodyweight skill."
  },
  {
    id: "ex-122",
    owner: ExerciseOwnership.BFit,
    name: "Planche Push-ups",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [MuscleGroup.Chest, MuscleGroup.Triceps, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Start in a push-up position with hands placed wide, fingers pointing back or out to the sides. 2. Lean forward significantly, shifting your weight over your hands, and lift your feet off the ground, keeping your body straight and parallel to the floor. 3. Perform a push-up while maintaining the planche position, lowering your body towards the floor and pressing back up. This is an extremely advanced bodyweight exercise."
  },
  {
    id: "ex-123",
    owner: ExerciseOwnership.BFit,
    name: "Close Grip Bench Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [MuscleGroup.Chest, MuscleGroup.Front_Delts],
    type: ExerciseType.Medium,
    instructions: "1. Lie on a flat bench, grasping a barbell with an overhand grip, hands shoulder-width apart or slightly narrower. 2. Lower the barbell to your lower chest, keeping your elbows tucked close to your body. 3. Press the barbell back up until your arms are fully extended, squeezing your triceps. 4. Slowly lower the barbell back to the starting position with control."
  },
  {
    id: "ex-124",
    owner: ExerciseOwnership.BFit,
    name: "Incline Barbell Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Front_Delts, MuscleGroup.Triceps],
    type: ExerciseType.Large,
    instructions: "1. Set an adjustable bench to an incline of 30-45 degrees. 2. Lie on the bench, grasping a barbell with an overhand grip, slightly wider than shoulder-width. 3. Lower the barbell to your upper chest with control. 4. Press the barbell back up until your arms are fully extended, engaging your upper chest. 5. Slowly lower the barbell back to the starting position."
  },
  {
    id: "ex-125",
    owner: ExerciseOwnership.BFit,
    name: "Decline Dumbbell Press",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Triceps],
    type: ExerciseType.Medium,
    instructions: "1. Lie on a decline bench, securing your feet under the pads. 2. Hold a dumbbell in each hand, palms facing each other or slightly forward. 3. Position the dumbbells at lower chest height, slightly wider than your shoulders, with elbows bent. 4. Press the dumbbells upwards in a controlled motion until your arms are fully extended, squeezing your lower chest. 5. Slowly lower the dumbbells back to the starting position, maintaining control."
  },
  {
    id: "ex-126",
    owner: ExerciseOwnership.BFit,
    name: "Chest Dips",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Triceps, MuscleGroup.Front_Delts],
    type: ExerciseType.Medium,
    instructions: "1. Grasp parallel bars with an overhand grip, arms fully extended, supporting your body weight. 2. To emphasize chest, lean your torso forward significantly. 3. Slowly lower your body by bending your elbows, allowing them to flare out slightly, until your shoulders are below your elbows. 4. Push through your hands to return to the starting position, focusing on engaging your chest muscles."
  },
  {
    id: "ex-127",
    owner: ExerciseOwnership.BFit,
    name: "Yates Row",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Upper_Back,
    auxiliaryMuscles: [MuscleGroup.Lats, MuscleGroup.Biceps],
    type: ExerciseType.Large,
    instructions: "1. Stand with a barbell in front of you, feet shoulder-width apart. 2. Hinge slightly at your hips (less than a traditional bent-over row), keeping your back straight and chest up. 3. Grab the barbell with an underhand grip, slightly wider than shoulder-width. 4. Pull the barbell towards your lower chest/upper abdomen, squeezing your shoulder blades together. 5. Slowly lower the barbell back to the starting position with control. This version allows for heavier weight and more trap involvement."
  },
  {
    id: "ex-128",
    owner: ExerciseOwnership.BFit,
    name: "Kroc Rows",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [MuscleGroup.Upper_Back, MuscleGroup.Biceps, MuscleGroup.Forearms],
    type: ExerciseType.Medium,
    instructions: "1. Place one knee and one hand on a flat bench for support, with the other foot on the floor. 2. Hold a very heavy dumbbell in the free hand, arm extended towards the floor, palm facing your body. 3. Keep your back straight and core engaged. 4. Explosively pull the dumbbell upwards towards your hip, allowing for some body English if needed to move maximum weight. Focus on pulling with your back and lats. 5. Lower the dumbbell back to the starting position with control. This exercise is often performed for high reps with heavy weight."
  },
  {
    id: "ex-129",
    owner: ExerciseOwnership.BFit,
    name: "Straight Arm Pulldown",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand facing a cable machine with a straight bar or rope attachment connected to the high pulley. 2. Grasp the bar with an overhand grip, step back to create tension, and slightly hinge at your hips, keeping your arms straight (but not locked). 3. Pull the bar down towards your thighs in an arc, engaging your lats and keeping your arms straight. 4. Slowly return the bar to the starting position, feeling a stretch in your lats."
  },
  {
    id: "ex-130",
    owner: ExerciseOwnership.BFit,
    name: "Reverse Grip Lat Pulldown",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [MuscleGroup.Biceps],
    type: ExerciseType.Medium,
    instructions: "1. Sit at the lat pulldown machine, adjusting the thigh pad to secure your legs. 2. Grasp the bar with an underhand grip, hands about shoulder-width apart. 3. Lean back slightly, keep your chest up, and pull the bar down towards your upper chest by squeezing your lats and engaging your biceps. 4. Slowly release the bar back up to the starting position, allowing your lats to stretch fully."
  },
  {
    id: "ex-131",
    owner: ExerciseOwnership.BFit,
    name: "Behind the Neck Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [MuscleGroup.Side_Delts, MuscleGroup.Triceps],
    type: ExerciseType.Large,
    instructions: "1. Sit on a bench with back support or stand, holding a barbell behind your neck with a wide overhand grip. 2. Press the barbell directly overhead until your arms are fully extended. 3. Slowly lower the barbell back down behind your neck with control. Be cautious with this exercise, as it can be hard on the shoulders for some individuals."
  },
  {
    id: "ex-132",
    owner: ExerciseOwnership.BFit,
    name: "Bradford Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Side_Delts,
    auxiliaryMuscles: [MuscleGroup.Front_Delts, MuscleGroup.Rear_Delts],
    type: ExerciseType.Medium,
    instructions: "1. Stand or sit with a barbell held at your upper chest, palms facing forward. 2. Press the bar straight up until it clears your head, then smoothly lower it behind your neck. 3. From behind your neck, press it straight up again, and smoothly lower it back to the front. This is a continuous motion, going from front to back over your head. Focus on control and shoulder mobility."
  },
  {
    id: "ex-133",
    owner: ExerciseOwnership.BFit,
    name: "Pike Push-ups",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [MuscleGroup.Triceps],
    type: ExerciseType.Medium,
    instructions: "1. Start in a push-up position, then walk your feet closer to your hands, lifting your hips high into an inverted V-shape. Keep your legs and back as straight as possible. 2. Lower your head towards the floor by bending your elbows, allowing them to flare out slightly. 3. Push through your hands and shoulders to return to the starting pike position. This targets the shoulders more than traditional push-ups."
  },
  {
    id: "ex-134",
    owner: ExerciseOwnership.BFit,
    name: "Dumbbell Front Raises",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand with a dumbbell in each hand, arms extended down in front of your thighs, palms facing your body. 2. Keep your arms straight (but not locked) and raise the dumbbells forward and upwards until they are parallel to the floor at shoulder height. 3. Slowly lower the dumbbells back to the starting position with control, avoiding swinging."
  },
  {
    id: "ex-135",
    owner: ExerciseOwnership.BFit,
    name: "Dumbbell Rear Delt Flys",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Rear_Delts,
    auxiliaryMuscles: [MuscleGroup.Upper_Back],
    type: ExerciseType.Small,
    instructions: "1. Sit on the end of a flat bench and lean forward, letting the dumbbells hang directly below your shoulders, palms facing each other, with a slight bend in your elbows. 2. Keep your back straight. 3. Raise the dumbbells out to the sides in a wide arc, squeezing your shoulder blades together and focusing on your rear delts. 4. Slowly lower the dumbbells back to the starting position with control, avoiding swinging."
  },
  {
    id: "ex-136",
    owner: ExerciseOwnership.BFit,
    name: "Barbell Front Raise",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand with a barbell held in front of you, hands shoulder-width apart or slightly wider, palms facing your body. 2. Keep your arms straight (but not locked) and raise the barbell forward and upwards until it is parallel to the floor at shoulder height. 3. Slowly lower the barbell back to the starting position with control, avoiding swinging."
  },
  {
    id: "ex-137",
    owner: ExerciseOwnership.BFit,
    name: "Cable Rope Hammer Curls",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [MuscleGroup.Forearms],
    type: ExerciseType.Small,
    instructions: "1. Stand facing a low pulley cable machine, attach a rope attachment. 2. Grasp the rope with a neutral grip (palms facing each other), arms extended down. 3. Keep your elbows close to your body and your upper arms stationary. 4. Curl the rope upwards towards your shoulders, maintaining the neutral grip. 5. Slowly lower the rope back to the starting position with control."
  },
  {
    id: "ex-138",
    owner: ExerciseOwnership.BFit,
    name: "Cable Rope Overhead Tricep Extension",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand facing away from a low pulley cable machine, attach a rope attachment. 2. Grasp the rope with a neutral grip (palms facing each other) and extend it overhead, keeping your elbows close to your head. 3. Slowly lower the rope behind your head by bending your elbows, feeling a stretch in your triceps. 4. Extend your arms back to the starting position, squeezing your triceps at the top."
  },
  {
    id: "ex-139",
    owner: ExerciseOwnership.BFit,
    name: "Single Leg Romanian Deadlift",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Hamstrings,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Core],
    type: ExerciseType.Medium,
    instructions: "1. Stand tall, holding a dumbbell in one hand (opposite to the leg that will extend back). 2. Keep a slight bend in your standing knee. 3. Hinge at your hip, extending your non-standing leg straight back behind you for balance, while simultaneously lowering the dumbbell towards the floor. 4. Keep your back straight and core engaged. 5. Lower until your torso is parallel to the floor or you feel a strong stretch in your hamstring. 6. Squeeze your glute and hamstring to return to the starting position. 7. Complete all reps on one leg before switching."
  },
  {
    id: "ex-140",
    owner: ExerciseOwnership.BFit,
    name: "Step-Ups",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes],
    type: ExerciseType.Medium,
    instructions: "1. Stand in front of a sturdy box or bench, holding a dumbbell in each hand. 2. Step onto the box with one foot, driving through your heel to stand up on the box, bringing the other foot up to meet it. 3. Step back down with control, one foot at a time. 4. Alternate leading legs or complete all reps on one leg before switching."
  },
  {
    id: "ex-141",
    owner: ExerciseOwnership.BFit,
    name: "Walking Lunges",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings],
    type: ExerciseType.Medium,
    instructions: "1. Stand tall with a dumbbell in each hand, arms relaxed at your sides. 2. Take a large step forward with one leg, lowering your hips until both knees are bent at approximately a 90-degree angle. Ensure your front knee is directly over your ankle and your back knee hovers just above the floor. 3. Instead of returning to the starting position, push off with your back foot and step forward with the other leg into the next lunge. 4. Continue alternating legs as you walk forward."
  },
  {
    id: "ex-142",
    owner: ExerciseOwnership.BFit,
    name: "Reverse Lunges",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [MuscleGroup.Quads, MuscleGroup.Hamstrings],
    type: ExerciseType.Medium,
    instructions: "1. Stand tall with a dumbbell in each hand, arms relaxed at your sides. 2. Take a large step backward with one leg, lowering your hips until both knees are bent at approximately a 90-degree angle. Ensure your front knee is directly over your ankle and your back knee hovers just above the floor. 3. Push off with your back foot to return to the starting position. 4. Alternate legs or complete all reps on one leg before switching."
  },
  {
    id: "ex-143",
    owner: ExerciseOwnership.BFit,
    name: "Copenhagen Plank",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Adductors,
    auxiliaryMuscles: [MuscleGroup.Core],
    type: ExerciseType.Small,
    instructions: "1. Lie on your side next to a bench or elevated surface. 2. Place the inside of your top foot on the bench, keeping your leg straight. 3. Prop yourself up on your bottom elbow, keeping your body in a straight line from head to heels. 4. Lift your hips off the floor, engaging your inner thigh (adductor) of the top leg and your core. 5. Hold this position for the desired duration. 6. Repeat on the other side."
  },
  {
    id: "ex-144",
    owner: ExerciseOwnership.BFit,
    name: "Banded Hip Abduction",
    equipment: ExerciseEquipment.ResistanceBands,
    primaryMuscle: MuscleGroup.Abductors,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand with a resistance band looped around your ankles or just above your knees. 2. Keep your core engaged and your body upright. 3. Slowly move one leg straight out to the side, against the resistance of the band, squeezing your outer glute. 4. Slowly return the leg to the starting position with control. 5. Complete all reps on one leg before switching, or perform walking abductions."
  },
  {
    id: "ex-145",
    owner: ExerciseOwnership.BFit,
    name: "Glute Bridges",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [MuscleGroup.Hamstrings],
    type: ExerciseType.Small,
    instructions: "1. Lie on your back with your knees bent and feet flat on the floor, hip-width apart, arms by your sides. 2. Drive through your heels, lift your hips off the floor, and squeeze your glutes at the top until your body forms a straight line from your shoulders to your knees. 3. Slowly lower your hips back to the starting position with control."
  },
  {
    id: "ex-146",
    owner: ExerciseOwnership.BFit,
    name: "Frog Pumps",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on your back with the soles of your feet together and knees bent outwards, forming a diamond shape with your legs. 2. Place your hands lightly on the floor or behind your head. 3. Drive through the outer edges of your feet, lift your hips off the floor, and squeeze your glutes vigorously at the top. 4. Slowly lower your hips back down with control."
  },
  {
    id: "ex-147",
    owner: ExerciseOwnership.BFit,
    name: "Donkey Kicks",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Start on all fours (hands and knees) on the floor, hands directly under your shoulders and knees under your hips. 2. Keep your back straight and core engaged. 3. Lift one leg, keeping the knee bent at 90 degrees, and push the sole of your foot towards the ceiling, squeezing your glute at the top. 4. Slowly lower the leg back to the starting position with control. 5. Complete all reps on one leg before switching."
  },
  {
    id: "ex-148",
    owner: ExerciseOwnership.BFit,
    name: "Fire Hydrants",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Abductors,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Start on all fours (hands and knees) on the floor, hands directly under your shoulders and knees under your hips. 2. Keep your back straight and core engaged. 3. Lift one leg out to the side, keeping the knee bent at 90 degrees and the foot flexed, as if a dog lifting its leg to a fire hydrant. 4. Keep your hips stable and avoid shifting your weight excessively. 5. Slowly lower the leg back to the starting position with control. 6. Complete all reps on one leg before switching."
  },
  {
    id: "ex-149",
    owner: ExerciseOwnership.BFit,
    name: "Clamshells",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Abductors,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on your side with your knees bent at a 90-degree angle and stacked on top of each other. Rest your head on your bottom arm or support it with your hand. 2. Keep your feet together. 3. Engage your core and slowly lift your top knee upwards, rotating it outwards, without letting your hips roll back. 4. Squeeze your outer glute at the top. 5. Slowly lower your knee back to the starting position with control. 6. Complete all reps on one side before switching."
  },
  {
    id: "ex-150",
    owner: ExerciseOwnership.BFit,
    name: "Side Plank",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on your side with your legs straight and stacked. 2. Prop yourself up on one elbow, ensuring your elbow is directly under your shoulder. 3. Engage your core and glutes to lift your hips off the floor, forming a straight line from your head to your heels. 4. Hold this position for the desired duration. 5. Repeat on the other side."
  },
  {
    id: "ex-151",
    owner: ExerciseOwnership.BFit,
    name: "Hollow Body Hold",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on your back with your arms extended overhead and legs straight. 2. Engage your core, pressing your lower back into the floor. 3. Lift your head, shoulders, and legs slightly off the floor, keeping your body in a slightly curved, 'hollow' shape. 4. Hold this position, ensuring your lower back remains in contact with the floor. The lower your arms and legs are, the harder it is."
  },
  {
    id: "ex-152",
    owner: ExerciseOwnership.BFit,
    name: "Dead Bug",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on your back with your knees bent at 90 degrees directly over your hips, and arms extended straight up towards the ceiling. 2. Press your lower back firmly into the floor. 3. Slowly extend one arm overhead towards the floor while simultaneously extending the opposite leg straight towards the floor. Keep them hovering just above the ground. 4. Return to the starting position with control. 5. Alternate sides, moving slowly and deliberately, ensuring your lower back stays pressed down."
  },
  {
    id: "ex-153",
    owner: ExerciseOwnership.BFit,
    name: "Bird Dog",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [MuscleGroup.Lower_Back, MuscleGroup.Glutes],
    type: ExerciseType.Small,
    instructions: "1. Start on all fours (hands and knees) on the floor, hands directly under your shoulders and knees under your hips. 2. Keep your back straight and core engaged. 3. Slowly extend one arm straight forward and the opposite leg straight back, keeping them parallel to the floor. 4. Maintain a stable torso and avoid rotating your hips. 5. Return to the starting position with control. 6. Alternate sides, moving slowly and deliberately."
  },
  {
    id: "ex-154",
    owner: ExerciseOwnership.BFit,
    name: "Superman",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Lower_Back,
    auxiliaryMuscles: [MuscleGroup.Glutes],
    type: ExerciseType.Small,
    instructions: "1. Lie face down on the floor with your arms extended straight out in front of you and legs straight behind you. 2. Engage your lower back and glutes to simultaneously lift your arms, chest, and legs off the floor a few inches. 3. Hold briefly at the top, squeezing your lower back and glutes. 4. Slowly lower your body back to the starting position with control."
  },
  {
    id: "ex-155",
    owner: ExerciseOwnership.BFit,
    name: "Reverse Crunches",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on your back with your knees bent, feet flat on the floor, and arms by your sides. 2. Bring your knees towards your chest, then slowly lift your hips off the floor, curling your lower back and pushing your knees towards the ceiling. 3. Hold briefly at the top, squeezing your lower abs. 4. Slowly lower your hips back to the floor with control, without letting your feet touch."
  },
  {
    id: "ex-156",
    owner: ExerciseOwnership.BFit,
    name: "Barbell Shrugs",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Traps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand with a barbell held in front of you with an overhand grip, hands shoulder-width apart or slightly wider, arms extended down. 2. Keep your arms straight and your core engaged. 3. Shrug your shoulders straight up towards your ears, squeezing your traps at the top. 4. Slowly lower your shoulders back to the starting position with control."
  },
  {
    id: "ex-157",
    owner: ExerciseOwnership.BFit,
    name: "Sled Push",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Calves, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand behind a sled, grasping the handles with a firm grip, arms extended. 2. Lean forward into the sled, keeping your back straight and core engaged. 3. Drive through your legs, taking short, powerful steps to push the sled forward. 4. Maintain a consistent lean and powerful leg drive throughout the distance."
  },
  {
    id: "ex-158",
    owner: ExerciseOwnership.BFit,
    name: "Sled Pull",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Upper_Back,
    auxiliaryMuscles: [MuscleGroup.Lats, MuscleGroup.Biceps, MuscleGroup.Core, MuscleGroup.Glutes],
    type: ExerciseType.Large,
    instructions: "1. Attach a rope or strap to the sled. 2. Grasp the rope/strap with both hands. 3. Lean back, engaging your core and pulling the sled towards you by walking backward or performing short, powerful pulls. 4. Focus on engaging your upper back, lats, and core as you pull the sled. Keep your back straight."
  },
  {
    id: "ex-159",
    owner: ExerciseOwnership.BFit,
    name: "Battle Ropes",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [MuscleGroup.Front_Delts, MuscleGroup.Lats, MuscleGroup.Biceps, MuscleGroup.Triceps],
    type: ExerciseType.Large,
    instructions: "1. Anchor a battle rope firmly and stand facing the anchor point, holding one end of the rope in each hand. 2. Adopt a slightly bent-knee, athletic stance with your core engaged. 3. Perform continuous waves with the ropes by moving your arms up and down, or side to side, or in circles. 4. Maintain a powerful, rhythmic motion, engaging your core and shoulders throughout the exercise."
  },
  {
    id: "ex-160",
    owner: ExerciseOwnership.BFit,
    name: "Tire Flips",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Lower_Back, MuscleGroup.Upper_Back, MuscleGroup.Chest],
    type: ExerciseType.Large,
    instructions: "1. Stand facing a large tire, with your feet hip-width apart and toes pointed slightly out. 2. Get into a low squat position, with your shoulders under the tire and hands gripping the bottom edge of the tire with a mixed grip (one hand underhand, one overhand). 3. Drive through your legs, lift with your hips, and push with your chest and shoulders to get the tire to tip. 4. As it tips, quickly reposition your hands to push it over. 5. Walk forward to the next position for the next flip."
  },
  {
    id: "ex-161",
    owner: ExerciseOwnership.BFit,
    name: "Sledgehammer Slams",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [MuscleGroup.Lats, MuscleGroup.Front_Delts],
    type: ExerciseType.Large,
    instructions: "1. Stand facing a tire or suitable striking surface, holding a sledgehammer with both hands, one hand near the head, the other lower on the handle. 2. Raise the sledgehammer overhead, bringing it to one side of your head. 3. Explosively drive the sledgehammer down onto the tire, engaging your core and lats, and shifting your weight. 4. Control the rebound and prepare for the next slam, alternating sides or maintaining one side for reps."
  },
  {
    id: "ex-162",
    owner: ExerciseOwnership.BFit,
    name: "Burpees",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Quads, MuscleGroup.Glutes, MuscleGroup.Core, MuscleGroup.Front_Delts],
    type: ExerciseType.Large,
    instructions: "1. Start in a standing position. 2. Drop into a squat, placing your hands on the floor in front of you. 3. Kick your feet back into a plank position. 4. Perform a push-up (optional, for full burpee). 5. Jump your feet back towards your hands. 6. Explosively jump up into the air, reaching your arms overhead. 7. Land softly and immediately transition into the next repetition."
  },
  {
    id: "ex-163",
    owner: ExerciseOwnership.BFit,
    name: "Jumping Jacks",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Side_Delts, MuscleGroup.Calves],
    type: ExerciseType.Small,
    instructions: "1. Start in a standing position with your feet together and arms at your sides. 2. Simultaneously jump your feet out to the sides (wider than shoulder-width) while swinging your arms overhead until your hands meet. 3. Immediately jump your feet back together while bringing your arms back to your sides. 4. Maintain a quick, rhythmic pace."
  },
  {
    id: "ex-164",
    owner: ExerciseOwnership.BFit,
    name: "Mountain Climbers",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [MuscleGroup.Quads, MuscleGroup.Front_Delts],
    type: ExerciseType.Medium,
    instructions: "1. Start in a plank position with your hands directly under your shoulders and body in a straight line. 2. Keep your core tight and back flat. 3. Rapidly bring one knee towards your chest, then quickly switch and bring the other knee towards your chest, as if running in place. 4. Maintain a consistent pace and avoid letting your hips rise too high."
  },
  {
    id: "ex-165",
    owner: ExerciseOwnership.BFit,
    name: "High Knees",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Core, MuscleGroup.Calves],
    type: ExerciseType.Small,
    instructions: "1. Stand tall with your feet hip-width apart. 2. Begin running in place, bringing your knees up towards your chest as high as possible. 3. Pump your arms in coordination with your leg movements. 4. Maintain a fast pace, focusing on a quick lift of the knees and soft landing."
  },
  {
    id: "ex-166",
    owner: ExerciseOwnership.BFit,
    name: "Butt Kicks",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Hamstrings,
    auxiliaryMuscles: [MuscleGroup.Glutes],
    type: ExerciseType.Small,
    instructions: "1. Stand tall with your feet hip-width apart. 2. Begin running in place, bringing your heels up towards your glutes as high as possible. 3. Pump your arms in coordination with your leg movements. 4. Focus on a quick, rhythmic motion, engaging your hamstrings with each kick."
  },
  {
    id: "ex-167",
    owner: ExerciseOwnership.BFit,
    name: "Box Squats",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [MuscleGroup.Quads, MuscleGroup.Hamstrings, MuscleGroup.Lower_Back],
    type: ExerciseType.Large,
    instructions: "1. Set up a box or bench behind you in a squat rack. 2. Place a barbell across your upper back, hands slightly wider than shoulder-width. 3. Stand with feet shoulder-width apart, toes slightly out. 4. Brace your core, keep your chest up, and initiate the squat by pushing your hips back to sit down onto the box. 5. Pause briefly on the box, maintaining tension, then drive through your heels to return to the starting position."
  },
  {
    id: "ex-168",
    owner: ExerciseOwnership.BFit,
    name: "Sumo Deadlift High Pull",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [MuscleGroup.Hamstrings, MuscleGroup.Traps, MuscleGroup.Side_Delts],
    type: ExerciseType.Large,
    instructions: "1. Set up in a sumo deadlift stance with a barbell (feet wide, toes out, hands inside knees). 2. Initiate the pull like a sumo deadlift, but as the bar passes your knees, explosively extend your hips and knees, shrugging your shoulders and pulling the bar upwards towards your chin, leading with your elbows. 3. The bar should reach upper chest height. 4. Lower the bar back to the floor with control, reversing the movement."
  },
  {
    id: "ex-169",
    owner: ExerciseOwnership.BFit,
    name: "Power Clean",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings, MuscleGroup.Lower_Back, MuscleGroup.Traps],
    type: ExerciseType.Large,
    instructions: "1. Start with the barbell on the floor, feet hip-width apart, grip slightly wider than shoulder-width. 2. Perform a deadlift motion, then explosively pull the bar up, shrugging your shoulders and pulling with your arms to catch the bar in a front rack position (bar resting on front delts, elbows high) in a quarter-squat or power position. 3. Stand tall with the bar in the front rack. 4. Lower the bar back to the floor with control."
  },
  {
    id: "ex-170",
    owner: ExerciseOwnership.BFit,
    name: "Hang Clean",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings, MuscleGroup.Traps],
    type: ExerciseType.Large,
    instructions: "1. Start with the barbell held in front of you, arms extended, just above your knees (the 'hang' position). 2. Explosively extend your hips and knees, shrugging your shoulders and pulling the bar upwards to catch it in a front rack position (bar resting on front delts, elbows high) in a quarter-squat or power position. 3. Stand tall with the bar in the front rack. 4. Lower the bar back to the hang position or floor with control."
  },
  {
    id: "ex-171",
    owner: ExerciseOwnership.BFit,
    name: "Push Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [MuscleGroup.Triceps, MuscleGroup.Quads, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand with a barbell in a front rack position (on your front delts, elbows high), feet hip-width apart. 2. Perform a shallow dip by bending your knees slightly, keeping your torso upright. 3. Explosively drive upwards with your legs, using the momentum to press the barbell overhead until your arms are fully extended. 4. Control the descent of the barbell back to the front rack position."
  },
  {
    id: "ex-172",
    owner: ExerciseOwnership.BFit,
    name: "Split Jerk",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Front_Delts, MuscleGroup.Triceps, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand with a barbell in a front rack position (on your front delts, elbows high), feet hip-width apart. 2. Perform a shallow dip by bending your knees slightly. 3. Explosively drive upwards with your legs, pressing the barbell overhead while simultaneously splitting your feet into a lunge-like position (one foot forward, one foot back). 4. Land with the bar locked out overhead, then bring your feet back together. 5. Control the descent of the barbell back to the front rack position."
  },
  {
    id: "ex-173",
    owner: ExerciseOwnership.BFit,
    name: "Thrusters",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Front_Delts, MuscleGroup.Triceps, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand with a barbell in a front rack position (on your front delts, elbows high), feet shoulder-width apart. 2. Descend into a full front squat, keeping your chest up and core tight. 3. As you drive up from the squat, immediately transition into pressing the barbell overhead until your arms are fully extended. 4. Control the barbell back to the front rack position as you descend into the next squat. This is a fluid, continuous movement."
  },
  {
    id: "ex-174",
    owner: ExerciseOwnership.BFit,
    name: "Wall Balls",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Front_Delts, MuscleGroup.Triceps, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand facing a wall, about arm's length away, holding a medicine ball at chest height. 2. Perform a full squat, keeping your chest up. 3. As you drive up from the squat, explosively throw the medicine ball straight up against the wall, aiming for a target. 4. Catch the ball as it descends and immediately absorb the impact by descending into the next squat. This is a continuous, rhythmic movement."
  },
  {
    id: "ex-175",
    owner: ExerciseOwnership.BFit,
    name: "Rope Climbs",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [MuscleGroup.Biceps, MuscleGroup.Forearms, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand at the base of a rope, grasping it firmly with both hands, one hand above the other. 2. Use your legs to wrap around the rope (either J-hook or S-wrap technique) to secure your feet and provide leverage. 3. Pull yourself up with your arms, then push up with your legs to ascend the rope. 4. Re-grip higher on the rope and repeat. 5. Descend slowly and with control, releasing your grip and unwrapping your feet as you go down."
  },
  {
    id: "ex-176",
    owner: ExerciseOwnership.BFit,
    name: "Pegboard Ascents",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Lats,
    auxiliaryMuscles: [MuscleGroup.Biceps, MuscleGroup.Forearms, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand at the base of a pegboard, holding two pegs. 2. Insert one peg into a hole above you. 3. Pull yourself up with the lower arm while simultaneously pushing up with the other arm (if supported), and quickly insert the lower peg into a higher hole. 4. Continue alternating arms, ascending the pegboard by pulling and pushing your way up. This requires significant upper body and grip strength."
  },
  {
    id: "ex-177",
    owner: ExerciseOwnership.BFit,
    name: "Ring Dips",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [MuscleGroup.Chest, MuscleGroup.Front_Delts, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Grasp gymnastic rings with a false grip (optional, for advanced users), supporting your body weight with arms fully extended, rings turned slightly out. 2. Keep your chest up and shoulders down. 3. Slowly lower your body by bending your elbows, allowing the rings to rotate slightly outwards. Descend until your shoulders are below your elbows. 4. Push through your hands to return to the starting position, stabilizing the rings throughout the movement. This is an advanced exercise due to stability demands."
  },
  {
    id: "ex-178",
    owner: ExerciseOwnership.BFit,
    name: "Ring Rows",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Upper_Back,
    auxiliaryMuscles: [MuscleGroup.Lats, MuscleGroup.Biceps, MuscleGroup.Core],
    type: ExerciseType.Medium,
    instructions: "1. Grasp the gymnastic rings with an overhand or neutral grip, leaning back with your feet planted, body in a straight line. The lower the rings and more horizontal your body, the harder it is. 2. Engage your core and pull your chest towards your hands, squeezing your shoulder blades together. 3. Slowly lower yourself back to the starting position with control, extending your arms fully and controlling the rings."
  },
  {
    id: "ex-179",
    owner: ExerciseOwnership.BFit,
    name: "Ring Push-ups",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Front_Delts, MuscleGroup.Triceps, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Place your hands on gymnastic rings set at a comfortable height, supporting your body in a plank position with hands directly under your shoulders. 2. Lower your chest towards the floor by bending your elbows, allowing the rings to separate slightly and rotate outwards. 3. Push through your hands to return to the starting position, stabilizing the rings and squeezing your chest. This is a more challenging variation of push-ups due to instability."
  },
  {
    id: "ex-180",
    owner: ExerciseOwnership.BFit,
    name: "Inverted Row",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Upper_Back,
    auxiliaryMuscles: [MuscleGroup.Lats, MuscleGroup.Biceps],
    type: ExerciseType.Medium,
    instructions: "1. Set a barbell in a squat rack at a height where you can hang underneath it with your body straight. 2. Grasp the barbell with an overhand grip, slightly wider than shoulder-width. 3. Hang underneath the bar with your body in a straight line from head to heels. 4. Pull your chest towards the bar by squeezing your shoulder blades together. 5. Slowly lower yourself back to the starting position with control. The more horizontal your body, the harder it is."
  },
  {
    id: "ex-181",
    owner: ExerciseOwnership.BFit,
    name: "Floor Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [MuscleGroup.Chest, MuscleGroup.Front_Delts],
    type: ExerciseType.Medium,
    instructions: "1. Lie on the floor with a barbell held over your chest, arms extended. Your upper arms will be resting on the floor. 2. Lower the barbell towards your chest, allowing your elbows to rest on the floor at the bottom of the movement. 3. Press the barbell back up until your arms are fully extended, focusing on tricep and chest contraction. This variation limits range of motion and emphasizes lockout strength."
  },
  {
    id: "ex-182",
    owner: ExerciseOwnership.BFit,
    name: "Pin Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [MuscleGroup.Chest, MuscleGroup.Front_Delts],
    type: ExerciseType.Medium,
    instructions: "1. Set up a barbell in a power rack with safety pins set at a desired height (e.g., just above your chest, or mid-range). 2. Lie on a flat bench underneath the barbell. 3. Lower the barbell to the pins, allowing it to rest completely. 4. From a dead stop on the pins, explosively press the barbell upwards until your arms are fully extended. 5. Lower the bar back to the pins with control. This helps build strength at specific sticking points."
  },
  {
    id: "ex-183",
    owner: ExerciseOwnership.BFit,
    name: "Spoto Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Triceps, MuscleGroup.Front_Delts],
    type: ExerciseType.Medium,
    instructions: "1. Lie on a flat bench, grasping a barbell with an overhand grip, slightly wider than shoulder-width. 2. Lower the barbell towards your chest with control, but stop 1-2 inches short of touching your chest. 3. Hold this 'floating' position for a 1-2 second count, maintaining tension throughout your chest and triceps. 4. Press the barbell back up until your arms are fully extended. This emphasizes control and builds strength off the chest."
  },
  {
    id: "ex-184",
    owner: ExerciseOwnership.BFit,
    name: "Larsen Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [MuscleGroup.Triceps, MuscleGroup.Front_Delts],
    type: ExerciseType.Medium,
    instructions: "1. Lie on a flat bench, but do not place your feet on the floor. Instead, either keep your legs straight and lifted, or bend your knees and keep your feet off the bench (challenging your core and stability). 2. Grasp a barbell with an overhand grip, slightly wider than shoulder-width. 3. Lower the barbell to your chest with control. 4. Press the barbell back up until your arms are fully extended. This exercise increases stability demands and can improve leg drive in the regular bench press."
  },
  {
    id: "ex-185",
    owner: ExerciseOwnership.BFit,
    name: "Pause Squat",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Hamstrings, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Set up for a regular barbell squat. 2. Descend into your squat as usual. 3. At the bottom of the squat (thighs parallel or deeper), pause for 2-3 seconds, maintaining tension and a tight core. 4. Drive through your heels to return to the starting position. This helps build strength out of the bottom position and improves control."
  },
  {
    id: "ex-186",
    owner: ExerciseOwnership.BFit,
    name: "Pause Deadlift",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Hamstrings,
    auxiliaryMuscles: [MuscleGroup.Lower_Back, MuscleGroup.Glutes, MuscleGroup.Quads],
    type: ExerciseType.Large,
    instructions: "1. Set up for a regular barbell deadlift. 2. Begin the lift as usual. 3. At a predetermined sticking point (e.g., just off the floor, or at the knees), pause the lift for 2-3 seconds, maintaining your form and tension. 4. Complete the lift by standing tall. 5. Lower the bar back to the floor with control. This helps strengthen specific weak points in the deadlift."
  },
  {
    id: "ex-187",
    owner: ExerciseOwnership.BFit,
    name: "Deficit Deadlift",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Hamstrings,
    auxiliaryMuscles: [MuscleGroup.Lower_Back, MuscleGroup.Glutes, MuscleGroup.Quads],
    type: ExerciseType.Large,
    instructions: "1. Stand on an elevated surface (e.g., a sturdy platform or plates) with the barbell on the floor in front of you, increasing the range of motion. 2. Perform a deadlift as usual, ensuring your back remains straight and form is maintained throughout the extended range of motion. 3. This increases the challenge of the initial pull from the floor. 4. Lower the bar back to the floor with control."
  },
  {
    id: "ex-188",
    owner: ExerciseOwnership.BFit,
    name: "Snatch Grip Deadlift",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Upper_Back,
    auxiliaryMuscles: [MuscleGroup.Hamstrings, MuscleGroup.Lower_Back, MuscleGroup.Glutes, MuscleGroup.Traps],
    type: ExerciseType.Large,
    instructions: "1. Set up for a deadlift, but use a very wide overhand grip on the barbell (similar to a snatch grip). 2. This wide grip forces a deeper hinge and a more horizontal torso angle, emphasizing the upper back and hamstrings more. 3. Perform the deadlift as usual, maintaining a straight back and pulling with your legs and back. 4. Lower the bar back to the floor with control."
  },
  {
    id: "ex-189",
    owner: ExerciseOwnership.BFit,
    name: "Jefferson Squat",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Adductors, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand over a barbell with one leg in front and one behind the bar, feet wider than shoulder-width. 2. Grab the barbell with one hand in front and one behind your legs, using a mixed grip. 3. Keep your back straight and chest up, then descend into a squat. 4. Your body will naturally twist slightly. Lower until your thighs are parallel or deeper. 5. Drive through your feet to return to the starting position. 6. Alternate which leg is forward and which hand is in front on subsequent sets to ensure balanced development."
  },
  {
    id: "ex-190",
    owner: ExerciseOwnership.BFit,
    name: "Seated Good Mornings",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Lower_Back,
    auxiliaryMuscles: [MuscleGroup.Hamstrings, MuscleGroup.Glutes],
    type: ExerciseType.Small,
    instructions: "1. Sit on a flat bench with a barbell across your upper back (similar to a squat). 2. Place your feet flat on the floor, slightly wider than hip-width. 3. Keeping your back straight and core engaged, slowly lean forward at your hips, allowing your torso to hinge over your thighs. 4. Lower as far as comfortable while maintaining a straight back, feeling a stretch in your hamstrings and lower back. 5. Squeeze your glutes and lower back to return to the upright position."
  },
  {
    id: "ex-191",
    owner: ExerciseOwnership.BFit,
    name: "Cuban Press",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Side_Delts,
    auxiliaryMuscles: [MuscleGroup.Rear_Delts, MuscleGroup.Traps],
    type: ExerciseType.Small,
    instructions: "1. Stand or sit, holding a dumbbell in each hand. 2. Start with dumbbells at your sides, then raise them to a 'scarecrow' position: elbows bent at 90 degrees, upper arms parallel to floor, palms facing forward. 3. From this position, externally rotate your shoulders, bringing the dumbbells up as if doing an upright row. 4. Then, press the dumbbells overhead as in a shoulder press. 5. Reverse the movement back down with control. This complex movement targets multiple shoulder muscles and improves mobility."
  },
  {
    id: "ex-192",
    owner: ExerciseOwnership.BFit,
    name: "Lu Raises",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Side_Delts,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on your side on an incline bench, with your upper body supported and one arm hanging down holding a light dumbbell, palm facing your body. 2. Keep your arm straight but not locked. 3. Raise the dumbbell directly out to the side until it's parallel to the floor, leading with your elbow. 4. Slowly lower the dumbbell back to the starting position with control. 5. Complete all reps on one arm before switching."
  },
  {
    id: "ex-193",
    owner: ExerciseOwnership.BFit,
    name: "Powell Raise",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Rear_Delts,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie face down on an incline bench set to a low angle, with your upper body supported and one arm hanging down holding a light dumbbell, palm facing in. 2. Keep your arm straight but not locked. 3. Raise the dumbbell out to the side and slightly back, focusing on squeezing your rear delt. 4. Slowly lower the dumbbell back to the starting position with control. 5. Complete all reps on one arm before switching."
  },
  {
    id: "ex-194",
    owner: ExerciseOwnership.BFit,
    name: "Poliquin Flys",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Chest,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on an incline bench (about 30 degrees), holding a dumbbell in each hand, palms facing each other. 2. With arms almost straight but a slight bend in the elbows, lower the dumbbells out to the sides in a wide arc. 3. As you bring the dumbbells back up, rotate your wrists so your palms face forward at the top, squeezing your chest. 4. Slowly reverse the movement, rotating palms back to face each other as you lower. This emphasizes different parts of the chest during the movement."
  },
  {
    id: "ex-195",
    owner: ExerciseOwnership.BFit,
    name: "Tate Press",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on a flat bench, holding a dumbbell in each hand, arms extended straight up over your chest, palms facing each other. 2. Keep your upper arms stationary. 3. Bend your elbows and bring the dumbbells towards your upper chest/armpits, allowing your elbows to flare out to the sides. 4. Extend your arms back to the starting position, squeezing your triceps. This is a unique tricep exercise that targets the lockout."
  },
  {
    id: "ex-196",
    owner: ExerciseOwnership.BFit,
    name: "California Press",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Lie on a flat bench, grasping a barbell with a close grip (shoulder-width), arms extended over your chest. 2. This exercise combines elements of a close-grip bench press and a skull crusher. 3. Lower the barbell down towards your upper chest/neck, bending your elbows. As you lower, allow your elbows to tuck in slightly and then flare out as the bar approaches your chest. 4. Press the barbell back up, combining the upward extension with a slight push forward. This is a hybrid movement designed to target the triceps broadly."
  },
  {
    id: "ex-197",
    owner: ExerciseOwnership.BFit,
    name: "Drag Curls",
    equipment: ExerciseEquipment.Barbell,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand with a barbell held with an underhand grip, hands shoulder-width apart, arms extended down. 2. Keep your elbows tucked in close to your sides and actively pull the barbell straight up your body, dragging it along your torso. 3. Focus on squeezing your biceps hard at the top, not letting your elbows move forward. 4. Slowly lower the barbell back down, maintaining the 'drag' motion."
  },
  {
    id: "ex-198",
    owner: ExerciseOwnership.BFit,
    name: "Waiter Curls",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand or sit, holding a single dumbbell vertically with both hands cupping the top head, palms facing up, as if holding a tray. 2. Keep your elbows close to your body and your upper arms stationary. 3. Curl the dumbbell upwards towards your chin, squeezing your biceps. 4. Slowly lower the dumbbell back to the starting position with control."
  },
  {
    id: "ex-199",
    owner: ExerciseOwnership.BFit,
    name: "Incline Curls",
    equipment: ExerciseEquipment.Dumbbells,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Sit on an incline bench set to 45-60 degrees, holding a dumbbell in each hand, arms extended down with palms facing forward. 2. Keep your elbows tucked close to your sides and your upper arms stationary (they will be behind your body due to the incline). 3. Curl the dumbbells upwards towards your shoulders, squeezing your biceps. 4. Slowly lower the dumbbells back to the starting position, feeling a deep stretch in your biceps."
  },
  {
    id: "ex-200",
    owner: ExerciseOwnership.BFit,
    name: "Nordic Hamstring Curls",
    equipment: ExerciseEquipment.Bodyweight,
    primaryMuscle: MuscleGroup.Hamstrings,
    auxiliaryMuscles: [MuscleGroup.Glutes],
    type: ExerciseType.Medium,
    instructions: "1. Kneel on the floor, ideally with your ankles securely anchored (e.g., under a sturdy bar or held by a partner). 2. Keep your body in a straight line from your head to your knees. 3. Slowly lean forward, controlling the descent by resisting with your hamstrings, until you can no longer hold the position and fall forward (catch yourself with your hands). 4. Use your hamstrings to pull yourself back up to the starting position. This is an advanced exercise."
  },
  {
    id: "ex-201",
    owner: ExerciseOwnership.BFit,
    name: "Reverse Hyperextensions",
    equipment: ExerciseEquipment.Machine,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [MuscleGroup.Hamstrings, MuscleGroup.Lower_Back],
    type: ExerciseType.Medium,
    instructions: "1. Lie face down on a reverse hyperextension machine, grasping the handles, with your hips at the edge of the pad and legs hanging freely. 2. Keep your back straight and core engaged. 3. Squeeze your glutes and hamstrings to raise your legs upwards and backwards, until they are parallel to the floor or slightly higher. 4. Slowly lower your legs back to the starting position with control, feeling a stretch in your glutes and hamstrings."
  },
  {
    id: "ex-202",
    owner: ExerciseOwnership.BFit,
    name: "Cable Pull-Throughs",
    equipment: ExerciseEquipment.Cable,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [MuscleGroup.Hamstrings],
    type: ExerciseType.Small,
    instructions: "1. Stand facing away from a low pulley cable machine with a rope attachment between your legs. 2. Hinge at your hips, pushing your glutes back, allowing the rope to pull through your legs. 3. Keep your back straight and a slight bend in your knees. 4. Drive your hips forward explosively, squeezing your glutes hard at the top, bringing your torso upright. 5. Slowly return to the starting position by hinging at your hips. The movement is driven by the glutes, not the lower back."
  },
  {
    id: "ex-203",
    owner: ExerciseOwnership.BFit,
    name: "Kettlebell Goblet Lunge",
    equipment: ExerciseEquipment.Kettlebells,
    primaryMuscle: MuscleGroup.Quads,
    auxiliaryMuscles: [MuscleGroup.Glutes, MuscleGroup.Core],
    type: ExerciseType.Medium,
    instructions: "1. Stand tall, holding a kettlebell vertically against your chest with both hands (goblet position). 2. Take a large step forward with one leg, lowering your hips until both knees are bent at approximately a 90-degree angle. Ensure your front knee is directly over your ankle and your back knee hovers just above the floor. 3. Push off with your front foot to return to the starting position. 4. Alternate legs or complete all reps on one leg before switching."
  },
  {
    id: "ex-204",
    owner: ExerciseOwnership.BFit,
    name: "Kettlebell Clean and Press",
    equipment: ExerciseEquipment.Kettlebells,
    primaryMuscle: MuscleGroup.Front_Delts,
    auxiliaryMuscles: [MuscleGroup.Quads, MuscleGroup.Glutes, MuscleGroup.Core, MuscleGroup.Triceps],
    type: ExerciseType.Large,
    instructions: "1. Stand with a kettlebell between your feet. 2. **Clean:** Hinge at your hips to grab the kettlebell. Explosively extend your hips and knees to pull the kettlebell up, rotating your wrist to 'rack' it in the front rack position (resting on your forearm against your bicep). 3. **Press:** From the rack position, press the kettlebell overhead until your arm is fully extended. 4. Lower the kettlebell back to the rack, then to the floor with control. 5. Complete all reps on one arm before switching."
  },
  {
    id: "ex-205",
    owner: ExerciseOwnership.BFit,
    name: "Kettlebell Snatch",
    equipment: ExerciseEquipment.Kettlebells,
    primaryMuscle: MuscleGroup.Glutes,
    auxiliaryMuscles: [MuscleGroup.Hamstrings, MuscleGroup.Lower_Back, MuscleGroup.Front_Delts, MuscleGroup.Core],
    type: ExerciseType.Large,
    instructions: "1. Stand with a kettlebell between your feet. 2. Hinge at your hips to grab the kettlebell. 3. Explosively extend your hips and knees, pulling the kettlebell upwards. As it reaches chest height, quickly punch your hand through the handle and flip the kettlebell over your wrist to catch it overhead in a locked-out position. 4. Lower the kettlebell back down with control, reversing the motion. 5. Complete all reps on one arm before switching."
  },
  {
    id: "ex-206",
    owner: ExerciseOwnership.BFit,
    name: "TRX Atomic Push-up",
    equipment: ExerciseEquipment.TRX,
    primaryMuscle: MuscleGroup.Core,
    auxiliaryMuscles: [MuscleGroup.Chest, MuscleGroup.Front_Delts, MuscleGroup.Triceps],
    type: ExerciseType.Large,
    instructions: "1. Place your feet in the TRX foot cradles, facing away from the anchor point, and get into a push-up position with hands on the floor, slightly wider than shoulder-width. 2. Perform a push-up. 3. At the top of the push-up, bring your knees towards your chest in a controlled 'pike' or 'crunch' motion, lifting your hips slightly. 4. Extend your legs back to the plank position, then immediately descend into the next push-up. This combines upper body strength with core stability."
  },
  {
    id: "ex-207",
    owner: ExerciseOwnership.BFit,
    name: "TRX Bicep Curl",
    equipment: ExerciseEquipment.TRX,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [MuscleGroup.Core],
    type: ExerciseType.Small,
    instructions: "1. Stand facing the TRX anchor point, grasping the handles with an underhand grip, palms facing up. 2. Lean back with your body in a straight line, arms extended. The more you lean back, the harder it is. 3. Keep your elbows high and fixed. 4. Curl your body upwards by bending your elbows and squeezing your biceps, bringing your hands towards your temples. 5. Slowly lower yourself back to the starting position with control, extending your arms fully."
  },
  {
    id: "ex-208",
    owner: ExerciseOwnership.BFit,
    name: "TRX Tricep Extension",
    equipment: ExerciseEquipment.TRX,
    primaryMuscle: MuscleGroup.Triceps,
    auxiliaryMuscles: [MuscleGroup.Core],
    type: ExerciseType.Small,
    instructions: "1. Stand facing away from the TRX anchor point, grasping the handles with an overhand grip, palms facing down. 2. Lean forward with your body in a straight line, arms extended in front of you. The more you lean forward, the harder it is. 3. Keep your upper arms stationary. 4. Slowly lower your body by bending your elbows, allowing your hands to go behind your head. 5. Extend your arms back to the starting position, pushing through your triceps to return to the straight-arm position."
  },
  {
    id: "ex-209",
    owner: ExerciseOwnership.BFit,
    name: "Banded Bicep Curls",
    equipment: ExerciseEquipment.ResistanceBands,
    primaryMuscle: MuscleGroup.Biceps,
    auxiliaryMuscles: [],
    type: ExerciseType.Small,
    instructions: "1. Stand on the middle of a resistance band, grasping the ends with an underhand grip, arms extended down. 2. Keep your elbows close to your body and your upper arms stationary. 3. Curl your hands upwards towards your shoulders, squeezing your biceps against the band's resistance. 4. Slowly lower your hands back to the starting position with control."
  },
  {
    id: "ex-210",
    owner: ExerciseOwnership.BFit,
    name: "Banded Face Pulls",
    equipment: ExerciseEquipment.ResistanceBands,
    primaryMuscle: MuscleGroup.Rear_Delts,
    auxiliaryMuscles: [MuscleGroup.Upper_Back],
    type: ExerciseType.Small,
    instructions: "1. Anchor a resistance band to a sturdy point at eye level. 2. Grasp the ends of the band with a neutral grip (palms facing each other) and take a step back to create tension. 3. Pull the band towards your face, pulling your elbows wide and back, squeezing your rear delts and upper back. 4. Slowly extend your arms back to the starting position with control."
  }
];
export default exercises;