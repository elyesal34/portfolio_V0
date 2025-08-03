import '@testing-library/jest-dom'

// Mock pour window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
})

// Mock pour requestAnimationFrame
Object.defineProperty(window, 'requestAnimationFrame', {
  value: (callback: FrameRequestCallback) => setTimeout(callback, 0),
  writable: true,
})

// Mock pour setTimeout - éviter la récursion
const originalSetTimeout = global.setTimeout
global.setTimeout = vi.fn((callback: (...args: any[]) => void, delay?: number) => {
  return originalSetTimeout(callback, delay || 0)
}) 