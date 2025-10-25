import './App.css'
import NutriVision from './components/NutriVision';

function App() {
  return (
    // <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <section className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Food Calorie Rating System</h2>
          <NutriVision />
        </section>
      </div>
    // </div>
  );
}

export default App;
