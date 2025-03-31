import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import Exercises from "@/components/exercises/exercises";
import { fetchUserExercises } from "@/actions/fetch-exercises";

export default async function Page() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["exercises"],
    queryFn: () => fetchUserExercises(),
  })
  return (
    <div className="max-w-[600px] mx-auto">
      <div className="flex flex-col border rounded-3xl p-4 my-10 h-[calc(100vh-9rem)] m-2">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Exercises mode="view" />
        </HydrationBoundary>
      </div>
    </div>
  );
}
