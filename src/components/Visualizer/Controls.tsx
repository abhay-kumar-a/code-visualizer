import Button from '../common/Button'

interface ControlsProps {
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onStep: (direction?: 'next' | 'prev') => void
  currentStep: number
  totalSteps: number
  speed: number
  onSpeedChange: (speed: number) => void
}

function Controls({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onStep,
  currentStep,
  totalSteps,
  speed,
  onSpeedChange,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-700 rounded-lg">
      <div className="flex gap-2">
        {isPlaying ? (
          <Button onClick={onPause}>Pause</Button>
        ) : (
          <Button onClick={onPlay}>Play</Button>
        )}
        <Button onClick={onReset} variant="secondary">Reset</Button>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => onStep('prev')}
          variant="secondary"
          disabled={currentStep === 0}
        >
          Prev
        </Button>
        <Button
          onClick={() => onStep('next')}
          variant="secondary"
          disabled={currentStep === totalSteps - 1}
        >
          Next
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-white text-sm">Speed:</label>
        <input
          type="range"
          min="100"
          max="2000"
          value={2000 - speed}
          onChange={(e) => onSpeedChange(2000 - Number(e.target.value))}
          className="w-32"
        />
      </div>

      <div className="text-white text-sm">
        Step: {currentStep + 1} / {totalSteps}
      </div>
    </div>
  )
}

export default Controls
