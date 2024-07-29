type WorkoutCardProps = {
  title: string;
  description: string;
};

export default function WorkoutCard({ title, description }: WorkoutCardProps)  {
  return (
    <div className="bg-gray-800 text-white rounded-lg p-6 text-center">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="mb-4">{description}</p>
      <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded">
        Details
      </button>
    </div>
  );
}
