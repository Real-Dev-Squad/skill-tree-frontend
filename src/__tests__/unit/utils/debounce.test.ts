import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { debounce } from "@/utils/debounce"
	
type AnyFunction = (...args: unknown[]) => unknown;
type DebounceFunction<T extends AnyFunction> = (...args: Parameters<T>) => void;

describe("debounce", () => {
    let mockFn: ReturnType<typeof vi.fn<AnyFunction>>;
    let debouncedFn: DebounceFunction<AnyFunction>;

    beforeEach(() => {
        mockFn = vi.fn<AnyFunction>();
        debouncedFn = debounce(mockFn, 300);
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should delay function execution", () => {
        debouncedFn();
        expect(mockFn).not.toBeCalled();

        vi.advanceTimersByTime(299);
        expect(mockFn).not.toBeCalled();

        vi.advanceTimersByTime(1);
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should cancel previous timer if called again within delay", () => {
        debouncedFn();
        debouncedFn();
        debouncedFn();

        vi.advanceTimersByTime(299);
        expect(mockFn).not.toBeCalled();

        vi.advanceTimersByTime(1);
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should pass arguments to the original function", () => {
        debouncedFn("test", 123);
        vi.runAllTimers();

        expect(mockFn).toHaveBeenCalledWith("test", 123);
    });

    it("should use default delay if not provided", () => {
        const defaultDebouncedFn = debounce(mockFn);
        defaultDebouncedFn();

        vi.advanceTimersByTime(299);
        expect(mockFn).not.toBeCalled();

        vi.advanceTimersByTime(1);
        expect(mockFn).toBeCalled();
    });

    it("should allow multiple debounced functions to coexist", () => {
        const mockFn2 = vi.fn<AnyFunction>();
        const debouncedFn2 = debounce(mockFn2, 500);

        debouncedFn();
        debouncedFn2();

        vi.advanceTimersByTime(300);
        expect(mockFn).toBeCalled();
        expect(mockFn2).not.toBeCalled();

        vi.advanceTimersByTime(200);
        expect(mockFn2).toBeCalled();
    });
});
