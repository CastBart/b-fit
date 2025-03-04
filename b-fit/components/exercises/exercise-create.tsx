import { Button } from "@/components/ui/button";

interface CreateExerciseProps{
    className?: string;
}

export default function CreateExercise({className}:CreateExerciseProps){
    return (
        <Button className={className}>Create</Button>
    )
}