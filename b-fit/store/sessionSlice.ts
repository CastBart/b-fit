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

type ExerciseProgress = {
  exerciseId: string;
  sets: Set[];
  activeSetNumber: number;
  notes?: string;
};

interface SessionState {
  workoutId: string | null;
  startTime: number | null;
  isActive: boolean;
  activeExerciseId: string | null;
  exerciseMap: Record<string, FlattenedExerciseNode>; // flatten linked list into a map
  headExerciseId: string | null;
  progress: Record<string, ExerciseProgress>;
}

const initialState: SessionState = {
  workoutId: null,
  startTime: null,
  isActive: false,
  activeExerciseId: null,
  exerciseMap: {},
  headExerciseId: null,
  progress: {},
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    startSession: (
      state,
      action: PayloadAction<{
        workoutId: string;
        headId: string;
        flattenedMap: Record<string, FlattenedExerciseNode>;
      }>
    ) => {
      state.workoutId = action.payload.workoutId;
      state.startTime = Date.now();
      state.isActive = true;
      state.exerciseMap = action.payload.flattenedMap;
      state.headExerciseId = action.payload.headId;
      state.activeExerciseId = action.payload.headId;

      Object.values(action.payload.flattenedMap).forEach((node) => {
        state.progress[node.id] = {
          exerciseId: node.id,
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
        ex.sets.push({
          setNumber: nextSetNumber,
          reps: 0,
          weight: 0,
          completed: false,
        });
      }
    },
    removeLastSet: (
      state,
      action: PayloadAction<{
        exerciseId: string;
      }>
    ) => {
      const ex = state.progress[action.payload.exerciseId];
      if (ex && ex.sets.length > 0) {
        ex.sets.pop();
      }
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

      const totalSets = activeProgress.sets.length;
      const supersetId = activeNode.supersetGroupId;

      // 🔁 Case 1: Not in a superset
      if (!supersetId) {
        if (activeProgress.activeSetNumber < totalSets) {
          activeProgress.activeSetNumber += 1;
        } else {
          // Move to the next exercise
          const nextId = activeNode.next;
          state.activeExerciseId = nextId ?? null;
        }
        return;
      }

      // 🔁 Case 2: In a superset group
      const supersetNodes = Object.values(state.exerciseMap).filter(
        (n) => n.supersetGroupId === supersetId
      );
      const currentIndex = supersetNodes.findIndex((n) => n.id === activeId);
      const nextIndex = (currentIndex + 1) % supersetNodes.length;
      const nextNode = supersetNodes[nextIndex];

      const currentProgress = state.progress[activeId];

      // Advance current set number if there are more sets
      if (currentProgress.activeSetNumber < totalSets) {
        currentProgress.activeSetNumber += 1;
      }

      // 🔍 Check if ALL sets of ALL exercises in the superset are complete
      const allComplete = supersetNodes.every((node) => {
        const prog = state.progress[node.id];
        return prog.sets.every((s) => s.completed);
      });

      if (allComplete) {
        // Move to the next exercise after the last superset node
        const lastSupersetNode = supersetNodes.reduce((acc, node) => {
          return state.exerciseMap[acc.id].next === node.id ? node : acc;
        }, supersetNodes[0]);

        const nextAfterSuperset = state.exerciseMap[lastSupersetNode.id].next;
        state.activeExerciseId = nextAfterSuperset ?? null;
      } else {
        // Keep cycling through superset members
        state.activeExerciseId = nextNode.id;
      }
    },
    undoLastCompletedSet: (
      state,
      action: PayloadAction<{
        exerciseId: string;
      }>
    ) => {
      const ex = state.progress[action.payload.exerciseId];
      if (ex) {
        // Iterate in reverse to find the last completed set
        for (let i = ex.sets.length - 1; i >= 0; i--) {
          if (ex.sets[i].completed) {
            ex.sets[i].completed = false;
            break;
          }
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
} = sessionSlice.actions;

export default sessionSlice.reducer;
