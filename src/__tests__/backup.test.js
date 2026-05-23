import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { exportData } from '../utils/backup'

function setupMocks() {
  const clickSpy = vi.fn()
  const anchor = { href: '', download: '', click: clickSpy }

  vi.spyOn(document, 'createElement').mockImplementation((tag) =>
    tag === 'a' ? anchor : document.createElement.wrappedMethod?.(tag)
  )

  const createObjectURL = vi.fn().mockReturnValue('blob:mock-url')
  const revokeObjectURL = vi.fn()
  vi.stubGlobal('URL', { createObjectURL, revokeObjectURL })

  return { anchor, clickSpy, createObjectURL, revokeObjectURL }
}

beforeEach(() => vi.clearAllMocks())
afterEach(() => vi.restoreAllMocks())

describe('exportData', () => {
  test('triggers a click on an anchor element', () => {
    const { clickSpy } = setupMocks()
    exportData({})
    expect(clickSpy).toHaveBeenCalledOnce()
  })

  test('sets download filename with today\'s date', () => {
    const { anchor } = setupMocks()
    const today = new Date().toISOString().slice(0, 10)
    exportData({})
    expect(anchor.download).toBe(`pokopia-tracker-${today}.json`)
  })

  test('sets href to the created object URL', () => {
    const { anchor } = setupMocks()
    exportData({})
    expect(anchor.href).toBe('blob:mock-url')
  })

  test('creates a Blob of type application/json', () => {
    const { createObjectURL } = setupMocks()
    exportData({ '1': { met: true } })
    const blob = createObjectURL.mock.calls[0][0]
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('application/json')
  })

  test('exported blob contains the correct data', async () => {
    const { createObjectURL } = setupMocks()
    const data = { '1': { met: true, hasHouse: false }, '42': { met: true } }
    exportData(data)
    const blob = createObjectURL.mock.calls[0][0]
    const text = await blob.text()
    expect(JSON.parse(text)).toEqual(data)
  })

  test('revokes the object URL after download', () => {
    const { revokeObjectURL } = setupMocks()
    exportData({})
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
  })

  test('exported JSON is human-readable (pretty-printed)', async () => {
    const { createObjectURL } = setupMocks()
    exportData({ '1': { met: true } })
    const blob = createObjectURL.mock.calls[0][0]
    const text = await blob.text()
    expect(text).toContain('\n')
    expect(text).toContain('  ')
  })
})
