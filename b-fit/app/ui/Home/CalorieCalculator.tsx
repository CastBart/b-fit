export default function CalorieCounter() {
  return (
    <section className="">
      <h1>Calorie Counter Section</h1>
      <p>This feature of the web application is used to calculate the daily intake of calories for an individual based on the provided data of:</p>
      <ul className="list-disc px-4 mx-4">
        <li>Weight</li>
        <li>Height</li>
        <li>Age</li>
        <li>Gender</li>
        <li>Activity Level</li>
      </ul>
      <p>This calculation is of the individual's calories per day to stay at the same weight. The feature can also calculate calories based on your goals such as gain muscle, lose fat or maintain.</p>
    </section>
  );
}
