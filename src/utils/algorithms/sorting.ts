export interface SortStep {
  array: number[]
  comparing: number[]
  sorted: number[]
}

export function bubbleSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = []
  const array = [...arr]
  const n = array.length
  const sorted: number[] = []

  steps.push({ array: [...array], comparing: [], sorted: [] })

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...array], comparing: [j, j + 1], sorted: [...sorted] })
      
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
        steps.push({ array: [...array], comparing: [j, j + 1], sorted: [...sorted] })
      }
    }
    sorted.unshift(n - 1 - i)
  }
  
  sorted.unshift(0)
  steps.push({ array: [...array], comparing: [], sorted })

  return steps
}

export function selectionSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = []
  const array = [...arr]
  const n = array.length
  const sorted: number[] = []

  steps.push({ array: [...array], comparing: [], sorted: [] })

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      steps.push({ array: [...array], comparing: [minIdx, j], sorted: [...sorted] })
      if (array[j] < array[minIdx]) {
        minIdx = j
      }
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]]
    }
    sorted.push(i)
    steps.push({ array: [...array], comparing: [], sorted: [...sorted] })
  }
  
  sorted.push(n - 1)
  steps.push({ array: [...array], comparing: [], sorted })

  return steps
}

export function insertionSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = []
  const array = [...arr]
  const n = array.length

  steps.push({ array: [...array], comparing: [], sorted: [0] })

  for (let i = 1; i < n; i++) {
    const key = array[i]
    let j = i - 1

    steps.push({ array: [...array], comparing: [i], sorted: Array.from({ length: i }, (_, k) => k) })

    while (j >= 0 && array[j] > key) {
      steps.push({ array: [...array], comparing: [j, j + 1], sorted: Array.from({ length: i }, (_, k) => k) })
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = key
    steps.push({ array: [...array], comparing: [], sorted: Array.from({ length: i + 1 }, (_, k) => k) })
  }

  return steps
}
