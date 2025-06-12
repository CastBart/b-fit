import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ExerciseNode,
  FlattenedExerciseNode,
} from "@/lib/exercise-linked-list";

type Set = {
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
};

export type ExerciseProgress = {
  exerciseId: string;
  sets: Set[];
  activeSetNumber: number;
  notes?: string;
};

interface TimerState {
  isRunning: boolean;
  timeLeft: number;
}

interface SessionState {
  workoutId: string | null;
  workoutName: string;
  startTime: number | null;
  isActive: boolean;
  workoutCompleted: boolean;
  activeExerciseId: string | null;
  exerciseMap: Record<string, FlattenedExerciseNode>; // flatten linked list into a map
  headExerciseId: string | null;
  progress: Record<string, ExerciseProgress>;
  timer: TimerState | null;
}

const initialState: SessionState = {
  workoutId: null,
  workoutName: "",
  startTime: null,
  isActive: false,
  workoutCompleted: false,
  activeExerciseId: null,
  exerciseMap: {},
  headExerciseId: null,
  progress: {},
  timer: null,
};

/**
 * Helper function to determin the timer start time based on the exercise type
 * @param type of timer based on the exercise
 * @returns number in seconds
 */
function getTimerDuration(type: "small" | "medium" | "large"): number {
  switch (type) {
    case "small":
      return 90; // 1:30
    case "medium":
      return 120; // 2:00
    case "large":
      return 180; // 3:00
    default:
      return 120; // fallback
  }
}

/**
 * Function returning the id the next exercise that is incomplete
 * @param startId ID of the next exercise of the active exercise
 * @param exerciseMap exercise map
 * @param progress progress of the exercise
 * @returns ID of the next exercise or null if all sets are completed
 */
function findNextIncompleteNode(
  startId: string | null,
  exerciseMap: Record<string, FlattenedExerciseNode>,
  progress: Record<string, ExerciseProgress>
): string | null {
  let currentId = startId;
  while (currentId) {
    const node = exerciseMap[currentId];
    const prog = progress[currentId];
    const isComplete = prog.sets.every((s) => s.completed);
    if (!isComplete) return currentId;
    currentId = node.next;
  }
  return null;
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    startSession: (
      state,
      action: PayloadAction<{
        workoutId: string;
        workoutName: string;
        headId: string;
        flattenedMap: Record<string, FlattenedExerciseNode>;
      }>
    ) => {
      state.workoutId = action.payload.workoutId;
      state.workoutName = action.payload.workoutName;
      state.startTime = Date.now();
      state.isActive = true;
      state.workoutCompleted = false;
      state.exerciseMap = action.payload.flattenedMap;
      state.headExerciseId = action.payload.headId;
      state.activeExerciseId = action.payload.headId;

      Object.values(action.payload.flattenedMap).forEach((node) => {
        state.progress[node.instanceId] = {
          exerciseId: node.instanceId,
          sets: Array.from({ length: 3 }, (_, i) => ({
            setNumber: i + 1,
            reps: 0,
            weight: 0,
            completed: false,
          })),
          activeSetNumber: 1,
        };
      });
    },

    addSet: (
      state,
      action: PayloadAction<{
        exerciseId: string;
      }>
    ) => {
      const ex = state.progress[action.payload.exerciseId];
      if (ex) {
        const nextSetNumber = ex.sets.length + 1;

        // Check if all existing sets were completed
        const allSetsCompleted = ex.sets.every((set) => set.completed);

        // Add new set
        ex.sets.push({
          setNumber: nextSetNumber,
          reps: 0,
          weight: 0,
          completed: false,
        });

        // Make new set active only if all previous sets were completed
        if (allSetsCompleted) {
          ex.activeSetNumber = nextSetNumber;
        }

        // Mark workout as not completed
        state.workoutCompleted = false;
      }
    },

    removeLastSet: (
      state,
      action: PayloadAction<{
        exerciseId: string;
      }>
    ) => {
      const ex = state.progress[action.payload.exerciseId];
      if (!ex || ex.sets.length === 0) return;

      // Remove last set
      ex.sets.pop();

      // Reset activeSetNumber if needed
      ex.activeSetNumber = Math.min(
        ex.activeSetNumber,
        ex.sets.length === 0 ? 1 : ex.sets.length
      );

      // ✅ Check if all exercises are complete
      const allComplete = Object.values(state.progress).every(
        (prog) =>
          prog.sets.length > 0 && prog.sets.every((set) => set.completed)
      );

      state.workoutCompleted = allComplete;
    },

    updateSet: (
      state,
      action: PayloadAction<{
        exerciseId: string;
        setNumber: number;
        reps?: number;
        weight?: number;
      }>
    ) => {
      const ex = state.progress[action.payload.exerciseId];
      if (ex) {
        const targetSet = ex.sets.find(
          (s) => s.setNumber === action.payload.setNumber
        );
        if (targetSet) {
          if (action.payload.reps !== undefined) {
            targetSet.reps = action.payload.reps;
          }
          if (action.payload.weight !== undefined) {
            targetSet.weight = action.payload.weight;
          }
        }
      }
    },

    completeSet: (
      state,
      action: PayloadAction<{ reps: number; weight: number }>
    ) => {
      const activeId = state.activeExerciseId;
      if (!activeId) return;

      const activeNode = state.exerciseMap[activeId];
      const activeProgress = state.progress[activeId];
      if (!activeNode || !activeProgress) return;

      const activeSetIndex = activeProgress.activeSetNumber - 1;
      const set = activeProgress.sets[activeSetIndex];
      if (!set || set.completed) return;

      // ✅ Mark current set as completed
      set.completed = true;
      set.reps = action.payload.reps;
      set.weight = action.payload.weight;

      const startRestTimerIfApplicable = () => {
        const exerciseType = activeNode.type; // <-- we already store "small" | "medium" | "large" in node
        const duration = getTimerDuration(exerciseType);
        state.timer = { isRunning: true, timeLeft: duration };
      };

      const totalSets = activeProgress.sets.length;
      const supersetId = activeNode.supersetGroupId;

      // 🔁 Case 1: Not in a superset
      if (!supersetId) {
        if (activeProgress.activeSetNumber < totalSets) {
          activeProgress.activeSetNumber += 1;
        } else {
          const nextId = findNextIncompleteNode(
            activeNode.next,
            state.exerciseMap,
            state.progress
          );

          if (nextId) {
            state.activeExerciseId = nextId;
          } else {
            // If all next nodes are complete, try scanning entire list
            const fallback = Object.values(state.exerciseMap).find((node) => {
              const prog = state.progress[node.instanceId];
              return prog.sets.some((s) => !s.completed);
            });
            if (fallback) {
              state.activeExerciseId = fallback.instanceId;
            } else {
              state.workoutCompleted = true;
            }
          }
        }
        return;
      }

      // 🔁 Case 2: In a superset group
      const supersetNodes = Object.values(state.exerciseMap).filter(
        (n) => n.supersetGroupId === supersetId
      );

      const currentIndex = supersetNodes.findIndex(
        (n) => n.instanceId === activeId
      );
      const nextIndex = (currentIndex + 1) % supersetNodes.length;
      const nextNode = supersetNodes[nextIndex];

      if (activeProgress.activeSetNumber < totalSets) {
        activeProgress.activeSetNumber += 1;
      }

      const allComplete = supersetNodes.every((node) => {
        const prog = state.progress[node.instanceId];
        return prog.sets.every((s) => s.completed);
      });

      if (allComplete) {
        // Get last node in the chain
        const lastSupersetNode = supersetNodes.reduce((acc, node) => {
          return state.exerciseMap[acc.instanceId].next === node.instanceId
            ? node
            : acc;
        }, supersetNodes[0]);

        const nextUnfinished = findNextIncompleteNode(
          state.exerciseMap[lastSupersetNode.instanceId].next,
          state.exerciseMap,
          state.progress
        );

        if (nextUnfinished) {
          state.activeExerciseId = nextUnfinished;
        } else {
          // Fallback full scan
          const fallback = Object.values(state.exerciseMap).find((node) => {
            const prog = state.progress[node.instanceId];
            return prog.sets.some((s) => !s.completed);
          });
          if (fallback) {
            state.activeExerciseId = fallback.instanceId;
          } else {
            state.workoutCompleted = true; // ✅
          }
        }
      } else {
        // Move to next in superset
        state.activeExerciseId = nextNode.instanceId;
      }
    },

    undoLastCompletedSet: (
      state,
      action: PayloadAction<{
        exerciseId: string;
      }>
    ) => {
      const ex = state.progress[action.payload.exerciseId];
      if (!ex) return;

      // Iterate in reverse to find the last completed set
      for (let i = ex.sets.length - 1; i >= 0; i--) {
        if (ex.sets[i].completed) {
          ex.sets[i].completed = false;

          // Set activeSetNumber to 1-based index of this undone set
          ex.activeSetNumber = i + 1;

          // Also make this exercise the active one again
          state.activeExerciseId = action.payload.exerciseId;

          // Undoing a set implies workout is not complete
          state.workoutCompleted = false;

          break;
        }
      }
    },

    addNote: (
      state,
      action: PayloadAction<{ exerciseId: string; note: string }>
    ) => {
      const ex = state.progress[action.payload.exerciseId];
      if (ex) {
        ex.notes = action.payload.note;
      }
    },

    setActiveExerciseId: (state, action: PayloadAction<string>) => {
      state.activeExerciseId = action.payload;
    },

    addExercises: (
      state,
      action: PayloadAction<{
        newExerciseMap: Record<string, FlattenedExerciseNode>;
        newProgressMap: Record<string, ExerciseProgress>;
      }>
    ) => {
      debugger;
      const { newExerciseMap, newProgressMap } = action.payload;
      // state.exerciseMap = newExerciseMap;
      //Merge new nodes
      for (const [id, node] of Object.entries(newExerciseMap)) {
        state.exerciseMap[id] = node;
      }
      const tempMap = state.exerciseMap;
      // Merge new progress
      for (const [id, progress] of Object.entries(newProgressMap)) {
        state.progress[id] = progress;
      }

      //update workout completed state
      state.workoutCompleted = false;

      // If no activeExerciseId yet, set to first added node
      if (!state.activeExerciseId) {
        state.activeExerciseId = Object.keys(newExerciseMap)[0];
      }
    },

    removeExercise: (
      state,
      action: PayloadAction<{
        newExerciseMap: SessionState["exerciseMap"];
        newProgress: SessionState["progress"];
        newHeadId: string | null;
        newActiveId: string | null;
      }>
    ) => {
      state.exerciseMap = action.payload.newExerciseMap;
      state.progress = action.payload.newProgress;
      state.headExerciseId = action.payload.newHeadId;
      state.activeExerciseId = action.payload.newActiveId;

      state.workoutCompleted = Object.values(state.progress).every((p) =>
        p.sets.every((s) => s.completed)
      );
    },

    goToExercise: (state, action: PayloadAction<string>) => {
      state.activeExerciseId = action.payload;
    },

    updateExerciseMap: (
      state,
      action: PayloadAction<{
        newMap: Record<string, FlattenedExerciseNode>;
        newHead: string;
      }>
    ) => {
      state.exerciseMap = action.payload.newMap;
      state.headExerciseId = action.payload.newHead;
    },

    startTimer: (state, action: PayloadAction<number>) => {
      state.timer = {
        isRunning: true,
        timeLeft: action.payload,
      };
    },

    tickTimer: (state) => {
      if (state.timer && state.timer.isRunning && state.timer.timeLeft > 0) {
        state.timer.timeLeft -= 1;
      }
      if (state.timer?.timeLeft === 0) {
        state.timer.isRunning = false;
      }
    },

    stopTimer: (state) => {
      if (state.timer) {
        state.timer.isRunning = false;
      }
    },

    resetTimer: (state) => {
      state.timer = null;
    },

    endSession: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  startSession,
  addSet,
  removeLastSet,
  updateSet,
  undoLastCompletedSet,
  completeSet,
  addNote,
  setActiveExerciseId,
  goToExercise,
  updateExerciseMap,
  endSession,
  addExercises,
  removeExercise,
} = sessionSlice.actions;

export default sessionSlice.reducer;
