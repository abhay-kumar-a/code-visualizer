import { useState, useMemo } from 'react'
import { Canvas, Controls } from '../components/Visualizer'
import { bubbleSort, selectionSort, insertionSort, type SortStep } from '../utils/algorithms/sorting'
import { binarySearch, linearSearch, type SearchStep } from '../utils/algorithms/searching'
import { generateRandomArray } from '../utils/visualizers/helpers'
import useAnimation from '../hooks/useAnimation'
import Button from '../components/common/Button'

type AlgorithmType = 'bubbleSort' | 'selectionSort' | 'insertionSort' | 'binarySearch' | 'linearSearch'

function Visualize() {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubbleSort')
  const [inputArray, setInputArray] = useState<number[]>(() => generateRandomArray(10))
  const [target, setTarget] = useState<number>(50)
  const [speed, setSpeed] = useState<number>(500)

  const steps = useMemo((): (SortStep | SearchStep)[] => {
    switch (algorithm) {
      case 'bubbleSort':
        return bubbleSort(inputArray)
      case 'selectionSort':
        return selectionSort(inputArray)
      case 'insertionSort':
        return insertionSort(inputArray)
      case 'binarySearch':
        return binarySearch(inputArray, target)
      case 'linearSearch':
        return linearSearch(inputArray, target)
      default:
        return bubbleSort(inputArray)
    }
  }, [algorithm, inputArray, target])

  const {
    currentStep,
    currentData,
    isPlaying,
    play,
    pause,
    reset,
    step,
    goToStep,
    totalSteps,
  } = useAnimation(steps, { duration: speed })

  const isSortingAlgorithm = ['bubbleSort', 'selectionSort', 'insertionSort'].includes(algorithm)
  const currentSortData = currentData as SortStep
  const currentSearchData = currentData as SearchStep

  const generateNewArray = () => {
    setInputArray(generateRandomArray(10))
    reset()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Algorithm Visualizer</h1>

      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-white mb-1">Algorithm</label>
            <select
              value={algorithm}
              onChange={(e) => {
                setAlgorithm(e.target.value as AlgorithmType)
                reset()
              }}
              className="p-2 rounded bg-slate-700 text-white border border-slate-600"
            >
              <option value="bubbleSort">Bubble Sort</option>
              <option value="selectionSort">Selection Sort</option>
              <option value="insertionSort">Insertion Sort</option>
              <option value="binarySearch">Binary Search</option>
              <option value="linearSearch">Linear Search</option>
            </select>
          </div>

          {!isSortingAlgorithm && (
            <div>
              <label className="block text-white mb-1">Target Value</label>
              <input
                type="number"
                value={target}
                onChange={(e) => {
                  setTarget(Number(e.target.value))
                  reset()
                }}
                className="p-2 rounded bg-slate-700 text-white border border-slate-600 w-24"
              />
            </div>
          )}

          <div className="flex items-end">
            <Button onClick={generateNewArray} variant="secondary">
              Generate New Array
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        {isSortingAlgorithm ? (
          <Canvas
            data={currentSortData?.array || inputArray}
            highlights={currentSortData?.comparing || []}
          />
        ) : (
          <div className="bg-slate-800 rounded-lg p-4">
            <Canvas
              data={currentSearchData?.array || inputArray}
              highlights={currentSearchData?.mid !== null ? [currentSearchData.mid!] : []}
            />
            {currentSearchData && (
              <div className="mt-4 text-white">
                <p>
                  Target: {currentSearchData.target} | 
                  {currentSearchData.found 
                    ? ' Found!' 
                    : ` Searching in range [${currentSearchData.left}, ${currentSearchData.right}]`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <Controls
        isPlaying={isPlaying}
        onPlay={play}
        onPause={pause}
        onReset={reset}
        onStep={step}
        currentStep={currentStep}
        totalSteps={totalSteps}
        speed={speed}
        onSpeedChange={setSpeed}
      />

      <div className="mt-6">
        <input
          type="range"
          min="0"
          max={totalSteps - 1}
          value={currentStep}
          onChange={(e) => goToStep(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  )
}

export default Visualize
