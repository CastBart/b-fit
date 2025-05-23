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
          sets: [],
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
      action: PayloadAction<{
        exerciseId: string;
        setNumber: number;
        reps: number;
        weight: number;
      }>
    ) => {
      const ex = state.progress[action.payload.exerciseId];
      if (ex) {
        const targetSet = ex.sets.find(
          (s) => s.setNumber === action.payload.setNumber
        );
        if (targetSet) {
          targetSet.reps = action.payload.reps;
          targetSet.weight = action.payload.weight;
          targetSet.completed = true;
        }
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

    setActiveExerciseId: (
      state,
      action: PayloadAction<string>
    ) => {
      state.activeExerciseId = action.payload;
    },

    goToExercise: (state, action: PayloadAction<string>) => {
      state.activeExerciseId = action.payload;
    },

    updateExerciseMap:(state, action: PayloadAction<{newMap: Record<string, FlattenedExerciseNode>, newHead: string}>)=>{
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
