import { act, renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '@/hooks/useFetch';

describe('useFetch hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns initial state with loading true', () => {
    const fetchFn = jest.fn().mockResolvedValue('test data');
    const { result } = renderHook(() => useFetch(fetchFn));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('fetches data and updates state on success', async () => {
    const fetchFn = jest.fn().mockResolvedValue('test data');
    const { result } = renderHook(() => useFetch(fetchFn));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBe('test data');
    expect(result.current.error).toBeNull();
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('refetch triggers new fetch', async () => {
    const fetchFn = jest.fn().mockResolvedValue('initial data');
    const { result } = renderHook(() => useFetch(fetchFn));
    
    await waitFor(() => {
      expect(result.current.data).toBe('initial data');
    });
    
    fetchFn.mockResolvedValue('updated data');
    
    await act(async () => {
      await result.current.refetch();
    });
    
    expect(fetchFn).toHaveBeenCalledTimes(2);
    expect(result.current.data).toBe('updated data');
  });

  it('refetch handles errors', async () => {
    const fetchFn = jest.fn().mockResolvedValue('initial data');
    const { result } = renderHook(() => useFetch(fetchFn));
    
    await waitFor(() => {
      expect(result.current.data).toBe('initial data');
    });
    
    const error = new Error('Refetch failed');
    fetchFn.mockRejectedValue(error);
    
    await act(async () => {
      try {
        await result.current.refetch();
      } catch (e) {
        // Expected to throw
      }
    });
    
    expect(result.current.error).toEqual(error);
  });

  it('returns refetch function', () => {
    const fetchFn = jest.fn().mockResolvedValue('test');
    const { result } = renderHook(() => useFetch(fetchFn));
    
    expect(typeof result.current.refetch).toBe('function');
  });

  it('handles generic type correctly', async () => {
    interface TestData {
      id: number;
      name: string;
    }
    
    const fetchFn = jest.fn().mockResolvedValue<TestData>({ id: 1, name: 'Test' });
    const { result } = renderHook(() => useFetch<TestData>(fetchFn));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toEqual({ id: 1, name: 'Test' });
  });
});