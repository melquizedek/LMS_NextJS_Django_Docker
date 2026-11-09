import { cn } from '@/utils/cn';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar');
  });

  it('handles tailwind merge conflicts', () => {
    expect(cn('p-2 p-4')).toBe('p-4');
  });

  it('handles complex tailwind classes', () => {
    expect(cn('text-red-500 bg-blue-500', 'text-green-500')).toBe('bg-blue-500 text-green-500');
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('', '', '')).toBe('');
  });

  it('handles array inputs', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('handles object inputs', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('handles mixed inputs', () => {
    expect(cn('base', { conditional: true }, ['array', 'classes'])).toBe('base conditional array classes');
  });
});