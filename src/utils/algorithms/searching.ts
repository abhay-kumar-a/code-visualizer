export interface SearchStep {
  array: number[]
  left: number
  right: number
  mid: number | null
  found: boolean
  target: number
}

export function binarySearch(arr: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = []
  const array = [...arr].sort((a, b) => a - b)
  let left = 0
  let right = array.length - 1

  steps.push({ array: [...array], left, right, mid: null, found: false, target })

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    steps.push({ array: [...array], left, right, mid, found: array[mid] === target, target })

    if (array[mid] === target) {
      return steps
    }

    if (array[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  steps.push({ array: [...array], left, right, mid: null, found: false, target })
  return steps
}

export function linearSearch(arr: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = []
  const array = [...arr]

  for (let i = 0; i < array.length; i++) {
    steps.push({ array: [...array], left: 0, right: array.length - 1, mid: i, found: array[i] === target, target })
    if (array[i] === target) {
      return steps
    }
  }

  steps.push({ array: [...array], left: 0, right: array.length - 1, mid: null, found: false, target })
  return steps
}
