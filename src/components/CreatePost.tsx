import React, { useState } from 'react';
import { X, Image, Waves, Clock, Plus, Trash2, Award, TrendingUp } from 'lucide-react';

interface CreatePostProps {
  onClose: () => void;
}

interface WorkoutStep {
  step: number;
  type: string;
  stroke: string;
  distance: string;
  sets: number;
  cycle: string;
  intensity: string;
}

export function CreatePost({ onClose }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [totalDistance, setTotalDistance] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [workoutSteps, setWorkoutSteps] = useState<WorkoutStep[]>([
    { step: 1, type: 'Warm-up', stroke: 'Free', distance: '200m', sets: 1, cycle: '3:00', intensity: '60%' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post submission
    onClose();
  };

  const addWorkoutStep = () => {
    const newStep: WorkoutStep = {
      step: workoutSteps.length + 1,
      type: 'Main Set',
      stroke: 'Free',
      distance: '',
      sets: 1,
      cycle: '',
      intensity: '80%'
    };
    setWorkoutSteps([...workoutSteps, newStep]);
  };

  const removeWorkoutStep = (stepNumber: number) => {
    const updated = workoutSteps
      .filter((ws) => ws.step !== stepNumber)
      .map((ws, index) => ({ ...ws, step: index + 1 }));
    setWorkoutSteps(updated);
  };

  const updateWorkoutStep = (stepNumber: number, key: keyof WorkoutStep, value: any) => {
    setWorkoutSteps(workoutSteps.map((ws) => (ws.step === stepNumber ? { ...ws, [key]: value } : ws)));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-card border-b border-gray-200 dark:border-gray-700 px-4 py-4 flex items-center justify-between z-10">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-lg text-gray-900 dark:text-card-foreground">Share Training Program</h3>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 dark:bg-cyan-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-cyan-600 transition-colors"
          >
            Post
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Program Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Program Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Freestyle Endurance Builder (Level 2)"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Difficulty *</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Elite">Elite</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Program Description</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe the purpose and key points of this training program..."
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400"
              rows={3}
            />
          </div>

          {/* Total Stats */}
          <div className="space-y-3">
            <h4 className="text-sm text-gray-700 dark:text-gray-300">Total Distance & Time</h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Waves className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Total Distance</span>
                </div>
                <input
                  type="text"
                  value={totalDistance}
                  onChange={(e) => setTotalDistance(e.target.value)}
                  placeholder="1500m"
                  className="w-full bg-transparent text-blue-600 dark:text-cyan-400 outline-none"
                />
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 border border-green-100 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-green-500 dark:text-green-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Total Time</span>
                </div>
                <input
                  type="text"
                  value={totalTime}
                  onChange={(e) => setTotalTime(e.target.value)}
                  placeholder="28:30"
                  className="w-full bg-transparent text-green-600 dark:text-green-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Workout Program */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm text-gray-700 dark:text-gray-300">Training Program *</h4>
              <button
                type="button"
                onClick={addWorkoutStep}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 dark:bg-cyan-500 text-white rounded-lg text-xs hover:bg-blue-600 dark:hover:bg-cyan-600 transition-colors"
              >
                <Plus className="w-3 h-3" />
                Add Step
              </button>
            </div>

            {/* Excel-style Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-blue-500 dark:bg-cyan-600 text-white">
                    <th className="px-2 py-2 text-center border-r border-blue-400 dark:border-cyan-500 w-8">#</th>
                    <th className="px-2 py-2 text-left border-r border-blue-400 dark:border-cyan-500">Type</th>
                    <th className="px-2 py-2 text-left border-r border-blue-400 dark:border-cyan-500">Stroke</th>
                    <th className="px-2 py-2 text-center border-r border-blue-400 dark:border-cyan-500 w-14">Dist</th>
                    <th className="px-2 py-2 text-center border-r border-blue-400 dark:border-cyan-500 w-10">x</th>
                    <th className="px-2 py-2 text-center border-r border-blue-400 dark:border-cyan-500 w-12">Rest</th>
                    <th className="px-2 py-2 text-center border-r border-blue-400 dark:border-cyan-500 w-12">Int.</th>
                    <th className="px-2 py-2 text-center w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {workoutSteps.map((step, index) => (
                    <tr 
                      key={step.step}
                      className={`${
                        index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                      } hover:bg-blue-50 dark:hover:bg-cyan-900/20 transition-colors`}
                    >
                      <td className="px-2 py-2 text-center border-r border-gray-200 dark:border-gray-700">
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-500 dark:bg-cyan-500 text-white rounded-full text-xs">
                          {step.step}
                        </span>
                      </td>
                      <td className="px-1 py-1 border-r border-gray-200 dark:border-gray-700">
                        <select
                          value={step.type}
                          onChange={(e) => updateWorkoutStep(step.step, 'type', e.target.value)}
                          className="w-full px-1 py-1 text-xs bg-transparent dark:text-gray-300 border-0 outline-none"
                        >
                          <option value="Warm-up">Warm-up</option>
                          <option value="Drill">Drill</option>
                          <option value="Main Set">Main Set</option>
                          <option value="Speed">Speed</option>
                          <option value="Cool Down">Cool Down</option>
                          <option value="Rest">Rest</option>
                        </select>
                      </td>
                      <td className="px-1 py-1 border-r border-gray-200 dark:border-gray-700">
                        <select
                          value={step.stroke}
                          onChange={(e) => updateWorkoutStep(step.step, 'stroke', e.target.value)}
                          className="w-full px-1 py-1 text-xs bg-transparent border-0 outline-none text-blue-600 dark:text-cyan-400"
                        >
                          <option value="Free">Free</option>
                          <option value="Back">Back</option>
                          <option value="Breast">Breast</option>
                          <option value="Fly">Fly</option>
                          <option value="IM">IM</option>
                          <option value="Kick">Kick</option>
                          <option value="Fly Kick">Fly Kick</option>
                          <option value="Pull">Pull</option>
                          <option value="-">-</option>
                        </select>
                      </td>
                      <td className="px-1 py-1 border-r border-gray-200 dark:border-gray-700">
                        <input
                          type="text"
                          value={step.distance}
                          onChange={(e) => updateWorkoutStep(step.step, 'distance', e.target.value)}
                          placeholder="100m"
                          className="w-full px-1 py-1 text-xs bg-transparent dark:text-gray-300 border-0 outline-none text-center"
                        />
                      </td>
                      <td className="px-1 py-1 border-r border-gray-200 dark:border-gray-700">
                        <input
                          type="number"
                          value={step.sets}
                          onChange={(e) => updateWorkoutStep(step.step, 'sets', parseInt(e.target.value) || 1)}
                          className="w-full px-1 py-1 text-xs bg-transparent dark:text-gray-300 border-0 outline-none text-center"
                        />
                      </td>
                      <td className="px-1 py-1 border-r border-gray-200 dark:border-gray-700">
                        <input
                          type="text"
                          value={step.cycle}
                          onChange={(e) => updateWorkoutStep(step.step, 'cycle', e.target.value)}
                          placeholder="1:30"
                          className="w-full px-1 py-1 text-xs bg-transparent dark:text-gray-300 border-0 outline-none text-center"
                        />
                      </td>
                      <td className="px-1 py-1 border-r border-gray-200 dark:border-gray-700">
                        <input
                          type="text"
                          value={step.intensity}
                          onChange={(e) => updateWorkoutStep(step.step, 'intensity', e.target.value)}
                          placeholder="80%"
                          className="w-full px-1 py-1 text-xs bg-transparent dark:text-gray-300 border-0 outline-none text-center"
                        />
                      </td>
                      <td className="px-1 py-1 text-center">
                        {workoutSteps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeWorkoutStep(step.step)}
                            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded text-red-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Image Upload */}
          <button
            type="button"
            className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:border-blue-400 dark:hover:border-cyan-400 hover:text-blue-500 dark:hover:text-cyan-400 transition-colors"
          >
            <Image className="w-5 h-5" />
            <span>Add Photo (Optional)</span>
          </button>
        </form>
      </div>
    </div>
  );
}